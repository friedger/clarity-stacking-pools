;; finalize boombox 100 blocks before end of every stacking cycle
(impl-trait 'SP3C0TCQS0C0YY8E0V3EJ7V4X9571885D44M8EFWF.arkadiko-automation-trait-v1.automation-trait)

(define-map commits uint uint)
(define-constant users (list 'SP3C0TCQS0C0YY8E0V3EJ7V4X9571885D44M8EFWF))

(define-read-only (burn-height-to-reward-cycle (height uint))
    (/ (- height u666050) u2100))

;; What's the block height at the start of a given reward cycle?
(define-read-only (reward-cycle-to-burn-height (cycle uint))
    (+ u666050 (* cycle u2100)))

;; What's the current PoX reward cycle?
(define-read-only (current-pox-reward-cycle)
    (burn-height-to-reward-cycle burn-block-height))

(define-public (initialize)
  (ok true)
)

(define-read-only (check-job)
  (let ((reward-cycle (current-pox-reward-cycle))
        (start-of-cycle (reward-cycle-to-burn-height reward-cycle)))
    (asserts! (> burn-block-height (+ u1500 start-of-cycle)) (ok false))
    (ok (is-none (map-get? commits (+ u1 reward-cycle))))))

(define-public (run-job)
  (let ((next-cycle (+ u1 (current-pox-reward-cycle))))
    (asserts! (unwrap-panic (check-job)) (ok false))
    (map-insert commits next-cycle block-height)
    (try! (contract-call? .fp-delegation delegate-stack-stx-many users))
    (ok true)))

(define-read-only (get-commit (reward-cycle uint))
    (map-get? commits reward-cycle))
