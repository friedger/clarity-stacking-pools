;;(impl-trait 'ST000000000000000000002AMW42H.pool-registry.pox-trait))
(define-constant err-missing-user-pox-addr u100)
(define-constant err-map-set-failed u101)
(define-constant err-pox-failed u102)
(define-constant err-delegate-below-minimum u103)

(define-constant PREPARE_CYCLE_LENGTH u100)
(define-constant REWARD_CYCLE_LENGTH u2100)

(define-data-var first-burnchain-block-height uint u0)
(define-data-var pox-reward-cycle-length uint REWARD_CYCLE_LENGTH)
(define-data-var pox-prepare-cycle-length uint PREPARE_CYCLE_LENGTH)

(define-map user-data principal {pox-addr: (tuple (hashbytes (buff 20)) (version (buff 1))), cycle: uint, locking-period: uint})

;; What's the reward cycle number of the burnchain block height?
;; Will runtime-abort if height is less than the first burnchain block (this is intentional)
(define-private (burn-height-to-reward-cycle (height uint))
    (/ (- height (var-get first-burnchain-block-height)) (var-get pox-reward-cycle-length)))

;; What's the block height at the start of a given reward cycle?
(define-private (reward-cycle-to-burn-height (cycle uint))
    (+ (var-get first-burnchain-block-height) (* cycle (var-get pox-reward-cycle-length))))

;; What's the current PoX reward cycle?
(define-private (current-pox-reward-cycle)
    (burn-height-to-reward-cycle burn-block-height))


(define-private (pox-delegate-stx (amount-ustx uint) (delegate-to principal) (until-burn-ht (optional uint)))
  (if (> amount-ustx u100)
    (let ((result-revoke (contract-call? 'ST000000000000000000002AMW42H.pox revoke-delegate-stx)))
      (match (contract-call? 'ST000000000000000000002AMW42H.pox delegate-stx amount-ustx delegate-to until-burn-ht none)
        success (ok success)
        error (err {kind: "delegate-stx-failed", code: (to-uint error)})
      ))
    (err {kind: "permission-denied", code: err-delegate-below-minimum})))


(define-public (delegate-stx (amount-ustx uint) (delegate-to principal) (until-burn-ht (optional uint))
              (pool-pox-addr (optional (tuple (hashbytes (buff 20)) (version (buff 1)))))
              (user-pox-addr (tuple (hashbytes (buff 20)) (version (buff 1))))
              (locking-period uint))
  (begin
    (asserts! (map-set user-data tx-sender
                {pox-addr: user-pox-addr, cycle: (current-pox-reward-cycle), locking-period: locking-period})
      (err {kind: "map-fn-failed", code: err-map-set-failed}))
    (pox-delegate-stx amount-ustx delegate-to until-burn-ht)))


(define-read-only (get-user-data (user principal))
  (map-get? user-data user)
)
