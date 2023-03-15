(define-map pox-addr-indices uint uint)
(define-data-var pox-address {hashbytes: (buff 32), version: (buff 1)} {version: 0x00, hashbytes: 0x6d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce})

(define-public (delegate-stx (amount-ustx uint))
  (let ((user-pox-addr (unwrap-panic (principal-destruct? tx-sender)))
        (user tx-sender))
    (try! (contract-call? .pox-delegation delegate-stx amount-ustx (as-contract tx-sender) none none {version: 0x01, hashbytes: (get hash-bytes user-pox-addr)} u1))
    (delegate-stack-stx amount-ustx user)))

(define-public (delegate-stack-stx (amount-ustx uint) (user principal))
  (let ((start-burn-ht (+ burn-block-height u1))
        (current-cycle (contract-call? 'ST000000000000000000002AMW42H.pox-2 current-pox-reward-cycle)))
    (try! (get-first-result (as-contract (contract-call? .pox-delegation delegate-stack-stx (list {user: user, amount-ustx: amount-ustx})
                          (var-get pox-address)
                          start-burn-ht
                          u1))))
    (let ((total-amount-stacked (contract-call? .pox-delegation get-total (as-contract tx-sender) (+ u1 current-cycle) u1)))
      (and (> total-amount-stacked (contract-call? 'ST000000000000000000002AMW42H.pox-2 get-stacking-minimum))
          (try! (match (stack-aggregation-commit (+ u1 current-cycle))
            success (ok success)
            error (err (to-uint (* 1000 error))))))
      (ok total-amount-stacked))))

(define-private (stack-aggregation-commit (reward-cycle uint))
  (match (map-get? pox-addr-indices reward-cycle)
            index (as-contract (contract-call? 'ST000000000000000000002AMW42H.pox-2 stack-aggregation-increase (var-get pox-address) reward-cycle index))
            (match (as-contract (contract-call? 'ST000000000000000000002AMW42H.pox-2 stack-aggregation-commit-indexed (var-get pox-address) reward-cycle))
              index (begin
                      (map-set pox-addr-indices reward-cycle index)
                      (ok true))
              error (err error))))

(define-read-only (get-first-result (results (response (list 30 (response {lock-amount: uint, stacker: principal, unlock-burn-height: uint} uint)) uint)))
  (unwrap-panic (element-at (unwrap-panic results) u0)))

(as-contract (contract-call? 'ST000000000000000000002AMW42H.pox-2 allow-contract-caller .pox-delegation none))
