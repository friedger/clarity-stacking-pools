(define-constant err-forbidden (err u403))
(define-constant err-not-found (err u404))

(define-data-var rewards-admin principal tx-sender)

(define-map rewards uint {cycle: uint, amount-ustx: uint, total-stacked: uint})

;; input: 100 4
(define-public (swap-xbtc-to-stx (xbtc-amount uint) (slippeage uint))
  (let (
    (token-x 'SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9.token-wbtc)
    (token-y 'SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9.token-wstx)
    (fee-amount
      (contract-call?
        'SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9.swap-helper-v1-03
        fee-helper
        token-x
        token-y))
    (stx-amount
      (/
        (unwrap-panic (contract-call?
          'SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9.swap-helper-v1-03
          get-helper
          token-x
          token-y
          (* xbtc-amount u1000000)))
        (+ u1 (unwrap-panic fee-amount))))
    (stx-amount-slippeage (- stx-amount (/ (* stx-amount slippeage) u100))))
    (try! (contract-call?
        'SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9.swap-helper-v1-03
        swap-helper
        token-x
        token-y
        xbtc-amount
        (some stx-amount-slippeage)))
    (ok true)))


(define-data-var ctx-reward {cycle: uint, amount-ustx: uint, total-stacked: uint} {cycle: u0, amount-ustx: u0, total-stacked: u0})

(define-public (distribute-rewards-many (users (list 200 principal)) (reward-id uint))
  (begin
    (var-set ctx-reward (unwrap! (map-get? rewards reward-id) err-not-found))
    (ok (map distribute-reward-internal users))))

(define-public (distribute-rewards (user principal) (reward-id uint))
  (begin
    (var-set ctx-reward (unwrap! (map-get? rewards reward-id) err-not-found))
    (distribute-reward-internal user)))

;; distribute a share of the current reward slice to the user
(define-private (distribute-reward-internal (user principal))
  (let (
    (reward (var-get ctx-reward))
    (cycle (get cycle reward))
    (user-stacked (get-user-stacked user cycle))
    (share-ustx (calculate-share
                    (get amount-ustx reward)
                    user-stacked
                    (get total-stacked reward))))
    (as-contract (stx-transfer-memo? share-ustx tx-sender user 0x72657761726473))))

(define-private (get-user-stacked (user principal) (cycle uint))
  u100)

(define-private (calculate-share (total-reward-amount-ustx uint)
                    (user-stacked uint)
                    (total-stacked uint))
  (/ (* total-reward-amount-ustx user-stacked) total-stacked))
;;
;; Reward admin functions
;;

;; Method 1: reward admin deposits STX
(define-public (deposit-rewards (amount uint) (cycle uint))
  (begin
    (asserts! (is-rewards-admin) err-forbidden)
    (ok true)))

(define-public (withdraw-rewards (rewards-id uint))
  (begin
    (asserts! (is-rewards-admin) err-forbidden)
    (ok true)))

;; Method 2: wrapped rewards are send to pool directly and
;; allocated by the reward admin to the cycle
(define-public (allocate-funds (amount uint) (cycle uint))
  (begin
    (asserts! (is-rewards-admin) err-forbidden)
    (ok true)))

(define-public (desallocate-funds (amount uint) (cycle uint))
  (begin
    (asserts! (is-rewards-admin) err-forbidden)
    (ok true)))

(define-read-only (is-rewards-admin)
  (is-eq contract-caller (var-get rewards-admin)))

(define-public (set-rewards-admin (new-admin principal))
  (begin
    (asserts! (is-rewards-admin) err-forbidden)
    (ok (var-set rewards-admin new-admin))))
