(define-public (delegate-stack-stx
  (stacker principal) (amount-ustx uint)
  (pox-addr (tuple (hashbytes (buff 20)) (version (buff 1))))
  (start-burn-ht uint)
  (lock-period uint))
  (if true
    (ok {lock-amount: amount-ustx, stacker: stacker, unlock-burn-height: (+ start-burn-ht u100)})
    (err 1))
)

(define-public (delegate-stx (amount-ustx uint) (delegate-to principal) (until-burn-ht (optional uint))
              (pox-addr (optional (tuple (hashbytes (buff 20)) (version (buff 1))))))
  (if true
    (ok true)
    (err 1)
  )
)

(define-public (stack-aggregation-commit (pox-address (tuple (hashbytes (buff 20)) (version (buff 1)))) (reward-cycle uint))
 (if true
    (ok true)
    (err 1)
  )
)

(define-public (revoke-delegate-stx)
  (ok true)
)


;; Used for PoX parameters discovery
(define-read-only (get-pox-info)
    (ok {
        min-amount-ustx: u100,
        reward-cycle-id: u1,
        prepare-cycle-length: u10,
        first-burnchain-block-height: u1,
        reward-cycle-length: u50,
        rejection-fraction: u25,
        current-rejection-votes: u0,
        total-liquid-supply-ustx: stx-liquid-supply,
    })
)
