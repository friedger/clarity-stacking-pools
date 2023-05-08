(define-constant err-forbidden (err u403))

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
          (* btc-amount u1000000)))
        (+ u1 (unwrap-panic fee-amount))))
    (stx-amount-slippeage (- stx-amount (/ (* stx-amount slippeage) u100))))
    (try! (contract-call?
        'SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9.swap-helper-v1-03
        swap-helper
        token-x
        token-y
        btc-amount
        (some stx-amount-slippeage)))
    (ok true)))


(define-data-var ctx-current-reward-id uint u0)

(define-public (distribute-rewards-many (users (list principal 200)) (reward-id uint))
  (begin
    (var-set ctx-reward-id reward-id)
    (ok (map distribute-reward-internal users))))

(define-public (distribute-rewards (user principal) (reward-id uint))
  (begin
    (var-set ctx-reward-id reward-id)
    (distribute-reward-internal user)))

(define-private (distribute-rewards-internal (user principal))
  (let (
    (reward-id (var-get ctx-reward-id))
    (cycle (get-reward-cycle reward-id))
    (total-stacked (get-total-stacked cycle))
    (user-stacked (get-user-stacked user cycle))
    (total-rewards (get-rewards reward-id))
    (share (calculate-share total-rewards user-stacked total-stacked)))
    (as-contract (stx-transfer-memo? share tx-sender user memo))))
;;
;; Reward admin functions
;;

;; Method 1: reward admin deposits STX
(define-public (deposit-rewards (amount uint) (cycle uint))
  (asserts! (is-rewards-admin) err-forbidden)
)

(define-public (withdraw-rewards (rewards-id uint))
  (asserts! (is-rewards-admin) err-forbidden)
)

;; Method 2: wrapped rewards are send to pool directly and
;; allocated by the reward admin to the cycle
(define-public (allocate-funds (amount uint) (cycle uint)))

(define-public (desallocate-funds (amount uint) (cycle uint)))
