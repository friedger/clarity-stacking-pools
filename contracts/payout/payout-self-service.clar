(define-constant err-forbidden (err u403))
(define-constant err-not-found (err u404))
(define-constant err-too-early (err u500))
(define-constant err-insufficient-funds (err u501))
(define-constant err-unexpected (err u999))

(define-constant pox-info (unwrap-panic (contract-call? 'SP000000000000000000002Q6VF78.pox-3 get-pox-info)))
(define-data-var rewards-admin principal tx-sender)
(define-data-var reward-balance uint u0)
(define-data-var last-reward-id uint u0)

(define-map rewards uint {
  cycle: uint,
  amount-ustx: uint,
  total-stacked: uint})
(define-map unspent-amounts-ustx uint uint)

(define-data-var ctx-reward {
  cycle: uint,
  reward-id: uint,
  amount-ustx: uint,
  total-stacked: uint,
  id-header-hash: (buff 32)}
  {cycle: u0, reward-id: u0, amount-ustx: u0, total-stacked: u0, id-header-hash: 0x})
(define-data-var ctx-unspent-amount-ustx uint u0)

(define-public (distribute-rewards-many (users (list 200 principal)) (reward-id uint))
  (let ((unspent (unwrap! (map-get? unspent-amounts-ustx reward-id) err-not-found)))
    (try! (set-ctx-reward reward-id))
    (map-set unspent-amounts-ustx reward-id
      (unwrap! (fold distribute-reward-internal users (ok unspent)) err-unexpected))
    (ok true)))

(define-public (distribute-rewards (user principal) (reward-id uint))
  (let ((unspent (unwrap! (map-get? unspent-amounts-ustx reward-id) err-not-found)))
    (try! (set-ctx-reward reward-id))
    (map-set unspent-amounts-ustx reward-id
      (unwrap! (distribute-reward-internal user (ok unspent)) err-unexpected))
    (ok true)))

;; distribute a share of the current reward slice to the user
(define-private (distribute-reward-internal (user principal) (unspent-result (response uint uint)))
  (if (is-err unspent-result)
    unspent-result
    (let (
      (reward (var-get ctx-reward))
      (cycle (get cycle reward))
      (id-header-hash (get id-header-hash reward))
      (user-stacked (get-user-stacked user id-header-hash))
      (share-ustx (calculate-share
                      (get amount-ustx reward)
                      user-stacked
                      (get total-stacked reward)))
      (unspent (unwrap-panic unspent-result)))
      (asserts! (>= unspent share-ustx) err-unexpected)
      (try! (as-contract (stx-transfer-memo? share-ustx tx-sender user 0x72657761726473)))
      (ok (- unspent share-ustx)))))

(define-private (set-ctx-reward (reward-id uint))
  (let (
    (last-commit (unwrap! (contract-call? .pox-pool-self-service get-last-aggregation reward-id) err-not-found))
    (id-header-hash (unwrap! (get-block-info? id-header-hash last-commit) err-not-found))
    (reward-details (unwrap! (map-get? rewards reward-id) err-not-found)))
  (var-set ctx-reward (merge {id-header-hash: id-header-hash, reward-id: reward-id}
    reward-details))
  (ok true)))

(define-private (get-user-stacked (user principal) (id-header-hash (buff 32)))
  (get locked (at-block id-header-hash (stx-account user))))

(define-private (calculate-share (total-reward-amount-ustx uint)
                    (user-stacked uint)
                    (total-stacked uint))
  (/ (* total-reward-amount-ustx user-stacked) total-stacked))

(define-read-only (get-total-stacked (cycle-id uint))
  (let (
      (reward-set-index (unwrap! (contract-call? .pox-pool-self-service get-pox-addr-index cycle-id) err-not-found)))
    (ok (get total-ustx (unwrap!
      (contract-call? 'SP000000000000000000002Q6VF78.pox-3
        get-reward-set-pox-address
        cycle-id reward-set-index) err-not-found)))))

;;
;; Reward admin functions
;;

;; Method 1: reward admin deposits STX
(define-public (deposit-rewards (amount uint) (cycle uint))
  (begin
    (asserts! (is-rewards-admin) err-forbidden)
    (try! (stx-transfer? amount tx-sender (as-contract tx-sender)))
    (add-rewards amount cycle)))

(define-public (withdraw-rewards (amount uint) (reward-id uint))
  (let ((reward-admin tx-sender))
    (asserts! (is-rewards-admin) err-forbidden)
    (try! (as-contract (stx-transfer? amount tx-sender reward-admin)))
    (remove-rewards reward-id)))

;; Method 2: wrapped rewards are send to pool directly and
;; allocated by the reward admin to the cycle
(define-public (allocate-funds (amount uint) (cycle uint))
  (begin
    (asserts! (is-rewards-admin) err-forbidden)
    (add-rewards amount cycle)))

(define-public (desallocate-funds (amount uint) (reward-id uint))
  (begin
    (asserts! (is-rewards-admin) err-forbidden)
    (remove-rewards reward-id)))

(define-private (add-rewards (amount uint) (cycle uint))
  (let ((reserved-balance (var-get reward-balance))
    (new-reserved-balance (+ reserved-balance amount))
    (balance (as-contract (stx-get-balance tx-sender)))
    (reward-id (+ (var-get last-reward-id) u1))
    (total-stacked (unwrap! (get-total-stacked cycle) err-not-found)))
    ;; rewards can only be added after the end of the cycle
    (asserts! (> burn-block-height (+ (get first-burnchain-block-height pox-info) (* (get reward-cycle-length pox-info) (+ cycle u1)))) err-too-early)
    ;; amount must be less or equal than the unallocated balance
    (asserts! (<= new-reserved-balance balance) err-insufficient-funds)
    (var-set reward-balance new-reserved-balance)
    (var-set last-reward-id reward-id)
    (asserts!
      (map-insert rewards reward-id
        {cycle: cycle, amount-ustx: amount, total-stacked: total-stacked}) err-unexpected)
    (ok true)
  ))

(define-private (remove-rewards (reward-id uint))
  (let (
      (reserved-reward-balance (var-get reward-balance))
      (reward-details (unwrap! (map-get? rewards reward-id) err-not-found))
      (amount-ustx (unwrap! (map-get? unspent-amounts-ustx reward-id) err-not-found)))
    (asserts! (>= reserved-reward-balance amount-ustx) err-unexpected)
    (var-set reward-balance (- reserved-reward-balance amount-ustx))
    (map-delete rewards reward-id)
    (map-delete unspent-amounts-ustx reward-id)
    (ok true)))

(define-public (withdraw-stx (amount uint))
  (let ((reward-admin tx-sender))
    (asserts! (is-rewards-admin) err-forbidden)
    (as-contract (stx-transfer? amount tx-sender reward-admin))))

(define-read-only (is-rewards-admin)
  (is-eq contract-caller (var-get rewards-admin)))

(define-public (set-rewards-admin (new-admin principal))
  (begin
    (asserts! (is-rewards-admin) err-forbidden)
    (ok (var-set rewards-admin new-admin))))
