;; FAST Pool - Self-service non-custodial stacking pool
;; The pool locks for 1 cycle, amount can be increased at each cycle.
;; Users trust the reward admin that they will receive their share of rewards.
;; Reward admin can be a contract as well.
;;
;; User calls delegate-stx once.
;; For next cycles, users can call delegate-stx
;; or ask automation, friends or family to extend stacking using delegate-stack-stx.

(define-map pox-addr-indices uint uint)

(define-data-var reward-admin principal tx-sender)
(define-data-var fp-pox-address {hashbytes: (buff 32), version: (buff 1)} {version: 0x00, hashbytes: 0x6d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce})

;; half cycle lenght is 1050 for mainnet
(define-constant half-cycle-length (/ (get reward-cycle-length (unwrap-panic (contract-call? 'SP000000000000000000002Q6VF78.pox-2 get-pox-info))) u2))


(define-constant err-unauthorized (err u401))
(define-constant err-too-early (err u500))
(define-constant err-decrease-forbidden (err u503))
;; Error code 9 is used by pox-2 contract
(define-constant err-stacking-permission-denied (err u609))

;; allowed contract-callers
(define-map allowance-contract-callers
    { sender: principal, contract-caller: principal }
    { until-burn-ht: (optional uint) })

;;
;; Public functions
;;

;; Delegates and stacks the caller's stx tokens for 1 cycle.
;; If possible, the pool's amount is committed.
(define-public (delegate-stx (amount-ustx uint))
  (let ((user-pox-addr (unwrap-panic (principal-destruct? tx-sender)))
        (user tx-sender)
        (current-cycle (contract-call? 'SP000000000000000000002Q6VF78.pox-2 current-pox-reward-cycle)))
    (asserts! (check-caller-allowed) err-stacking-permission-denied)
    (try! (as-bool-response-with-uint (contract-call? 'SP000000000000000000002Q6VF78.pox-2 delegate-stx amount-ustx (as-contract tx-sender) none none)))
    (delegate-stack-stx-inner amount-ustx user current-cycle)))

(define-private (delegate-stack-stx-inner (amount-ustx uint) (user principal) (current-cycle uint))
  (let ((start-burn-ht (+ burn-block-height u1))
        (pox-addr (var-get fp-pox-address)))
    (try! (as-tuple-response-with-uint (as-contract (contract-call? 'SP000000000000000000002Q6VF78.pox-2 delegate-stack-stx
                          user amount-ustx
                          pox-addr
                          start-burn-ht
                          u1))))
    (try! (as-contract (pox-delegate-stack-stx user amount-ustx pox-addr start-burn-ht u1)))
    (maybe-stack-aggregation-commit current-cycle)))


(define-private (pox-delegate-stack-stx (user principal) (amount-ustx uint) (pox-address {hashbytes: (buff 32), version: (buff 1)}) (start-burn-ht uint) (lock-period uint))
  (match (contract-call? 'SP000000000000000000002Q6VF78.pox-2 delegate-stack-stx
                              user amount-ustx
                              pox-address start-burn-ht lock-period)
                      stacker-details  (ok stacker-details)
                      error (if (is-eq error 3) ;; check whether user is already stacked
                              (pox-delegate-stack-extend-increase user amount-ustx pox-address start-burn-ht lock-period)
                              (err (* u1000 (to-uint error)))))
)

;; calls pox-2 delegate-stack-extend and delegate-stack-increase.
;; parameter amount-ustx must be lower or equal the stx balance and the delegated amount
(define-private (pox-delegate-stack-extend-increase (user principal)
                    (amount-ustx uint)
                    (pox-address (tuple (hashbytes (buff 32)) (version (buff 1))))
                    (start-burn-ht uint)
                    (lock-period uint))
  (let ((status (stx-account user)))
    (asserts! (>= amount-ustx (get locked status)) err-decrease-forbidden)
    (match (contract-call? 'SP000000000000000000002Q6VF78.pox-2 delegate-stack-extend
                                  user pox-address lock-period)
      success (if (> amount-ustx (get locked status))
                (match (contract-call? 'SP000000000000000000002Q6VF78.pox-2 delegate-stack-increase
                              user pox-address (- amount-ustx (get locked status)))
                    success-increase (ok {lock-amount: (get total-locked success-increase),
                                          stacker: user,
                                          unlock-burn-height: (get unlock-burn-height success)})
                    error-increase (err (* u1000000000 (to-uint error-increase))))
              (ok {lock-amount: (get locked status),
                   stacker: user,
                   unlock-burn-height: (get unlock-burn-height success)}))
      error (err (* u1000000 (to-uint error))))))

;; Stacks the delegated amount for the given user for the next cycle.
;; This function can be called by automation, friends or family for user that have delegated once.
;; This function can be called only after the current cycle is half through
(define-public (delegate-stack-stx (amount-ustx uint) (user principal))
  (let ((current-cycle (contract-call? 'SP000000000000000000002Q6VF78.pox-2 current-pox-reward-cycle)))
    (asserts! (can-lock-now current-cycle) err-too-early)
    (delegate-stack-stx-inner amount-ustx user current-cycle)))

;; Stacks the delegated amount for the given users for the next cycle.
;; This function can be called by automation, friends or family for users that have delegated once.
;; This function can be called only after the current cycle is half through
(define-public (delegate-stack-stx-many (users (list 30 {amount-ustx: uint, user: principal})))
  (let ((current-cycle (contract-call? 'SP000000000000000000002Q6VF78.pox-2 current-pox-reward-cycle))
        (start-burn-ht (+ burn-block-height u1)))
    (asserts! (can-lock-now current-cycle) err-too-early)
    (try! (as-contract (contract-call? .pox-delegation delegate-stack-stx users
                          (var-get fp-pox-address)
                          start-burn-ht
                          u1)))
    (maybe-stack-aggregation-commit current-cycle)))


(define-private (maybe-stack-aggregation-commit (current-cycle uint))
  (let ((total-amount-stacked (contract-call? .pox-delegation get-total (as-contract tx-sender) (+ u1 current-cycle) u1)))
        (and (> total-amount-stacked (contract-call? 'SP000000000000000000002Q6VF78.pox-2 get-stacking-minimum))
            (try! (match (stack-aggregation-commit (+ u1 current-cycle))
              success (ok success)
              error (err (to-uint (* 1000 error))))))
        (ok total-amount-stacked)))

(define-private (stack-aggregation-commit (reward-cycle uint))
  (match (map-get? pox-addr-indices reward-cycle)
            index (as-contract (contract-call? 'SP000000000000000000002Q6VF78.pox-2 stack-aggregation-increase (var-get fp-pox-address) reward-cycle index))
            (match (as-contract (contract-call? 'SP000000000000000000002Q6VF78.pox-2 stack-aggregation-commit-indexed (var-get fp-pox-address) reward-cycle))
              index (begin
                      (map-set pox-addr-indices reward-cycle index)
                      (ok true))
              error (err error))))
;;
;; Admin functions
;;

(define-public (set-fp-pox-address (pox-addr {hashbytes: (buff 32), version: (buff 1)}))
  (begin
    (asserts! (is-eq contract-caller (var-get reward-admin)) err-unauthorized)
    (ok (var-set fp-pox-address pox-addr))))

(define-public (set-admin (new-admin principal))
  (begin
    (asserts! (is-eq contract-caller (var-get reward-admin)) err-unauthorized)
    (ok (var-set reward-admin new-admin))))

;;
;; Read-only functions
;;

(define-read-only (get-pox-addr-index (cycle uint))
  (map-get? pox-addr-indices cycle))

(define-read-only (get-reward-admin)
  (var-get reward-admin))

(define-read-only (get-fp-pox-address)
  (var-get fp-pox-address))

(define-read-only (can-lock-now (cycle uint))
  (> burn-block-height (+ (contract-call? 'SP000000000000000000002Q6VF78.pox-2 reward-cycle-to-burn-height cycle) half-cycle-length)))

(define-read-only (get-first-result (results (response (list 30 (response {lock-amount: uint, stacker: principal, unlock-burn-height: uint} uint)) uint)))
  (unwrap-panic (element-at (unwrap-panic results) u0)))

;; converts response of type (response tuple int) to (response tuple uint)
(define-read-only (as-tuple-response-with-uint (result (response {lock-amount: uint, stacker: principal, unlock-burn-height: uint} int)))
  (match result success (ok success) err (err (to-uint err))))

;; converts response of type (response bool int) to (response bool uint)
(define-read-only (as-bool-response-with-uint (result (response bool int)))
  (match result success (ok success) err (err (to-uint err))))

;;
;; Functions about alloance of delegation/stacking contract calls
;;

;; Give a contract-caller authorization to call stacking methods
;;  normally, stacking methods may only be invoked by _direct_ transactions
;;   (i.e., the tx-sender issues a direct contract-call to the stacking methods)
;;  by issuing an allowance, the tx-sender may call through the allowed contract
(define-public (allow-contract-caller (caller principal) (until-burn-ht (optional uint)))
  (begin
    (asserts! (is-eq tx-sender contract-caller) err-stacking-permission-denied)
    (ok (map-set allowance-contract-callers
               { sender: tx-sender, contract-caller: caller }
               { until-burn-ht: until-burn-ht }))))

;; Revoke contract-caller authorization to call stacking methods
(define-public (disallow-contract-caller (caller principal))
  (begin
    (asserts! (is-eq tx-sender contract-caller) err-stacking-permission-denied)
    (ok (map-delete allowance-contract-callers { sender: tx-sender, contract-caller: caller }))))

(define-read-only (check-caller-allowed)
    (or (is-eq tx-sender contract-caller)
        (let ((caller-allowed
                 ;; if not in the caller map, return false
                 (unwrap! (map-get? allowance-contract-callers
                                    { sender: tx-sender, contract-caller: contract-caller })
                          false))
               (expires-at
                 ;; if until-burn-ht not set, then return true (because no expiry)
                 (unwrap! (get until-burn-ht caller-allowed) true)))
          ;; is the caller allowance still valid
          (< burn-block-height expires-at))))


;; Get the burn height at which a particular contract is allowed to stack for a particular principal.
;; Returns (some (some X)) if X is the burn height at which the allowance terminates
;; Returns (some none) if the caller is allowed indefinitely
;; Returns none if there is no allowance record
(define-read-only (get-allowance-contract-callers (sender principal) (calling-contract principal))
    (map-get? allowance-contract-callers { sender: sender, contract-caller: calling-contract })
)
