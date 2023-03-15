(define-trait pool-trait-ext ((delegate-stx (uint principal (optional uint)
              (optional (tuple (hashbytes (buff 32)) (version (buff 1))))
              (tuple (hashbytes (buff 32)) (version (buff 1)))
              uint) (response bool int))))

(define-constant err-not-found (err u404))
(define-constant err-non-positive-amount (err u500))
(define-constant err-no-stacker-info (err u501))
(define-constant err-no-user-info (err u502))
(define-constant err-decrease-forbidden (err u503))

;; keep track of the last delegation
;; pox-addr: raw bytes of user's account to receive rewards, can be encoded as btc or stx address
;; cycle: cycle id of time of delegation
;; lock-period: desired number of cycles to lock
(define-map user-data principal {pox-addr: (tuple (hashbytes (buff 32)) (version (buff 1))), cycle: uint, lock-period: uint})

;; Keep track of stackers grouped by pool, reward-cycle id and lock-period
;; "grouped-stackers-len" returns the number of lists for the given group
;; "grouped-stackers" returns the actual list
(define-map grouped-stackers {pool: principal, reward-cycle: uint, lock-period: uint, index: uint}
  (list 30 {lock-amount: uint, stacker: principal, unlock-burn-height: uint, pox-addr: (tuple (hashbytes (buff 32)) (version (buff 1))), cycle: uint, lock-period: uint}))
(define-map grouped-stackers-len {pool: principal, reward-cycle: uint, lock-period: uint} uint)

;; Keep track of total stxs stacked grouped by pool, reward-cycle id and lock-period
(define-map grouped-totals {pool: principal, reward-cycle: uint, lock-period: uint} uint)


;; Get stacker info
(define-private (pox-get-stacker-info (user principal))
   (contract-call? 'SP000000000000000000002Q6VF78.pox-2 get-stacker-info user))

;; Revoke and delegate stx
(define-private (pox-delegate-stx (amount-ustx uint) (delegate-to principal) (until-burn-ht (optional uint)))
  (let ((result-revoke (contract-call? 'SP000000000000000000002Q6VF78.pox-2 revoke-delegate-stx)))
    (match (contract-call? 'SP000000000000000000002Q6VF78.pox-2 delegate-stx amount-ustx delegate-to until-burn-ht none)
      success (ok success)
      error (err (* u1000 (to-uint error))))))

;;
;; Helper functions
;;

(define-private (min (amount-1 uint) (amount-2 uint))
  (if (< amount-1 amount-2)
    amount-1
    amount-2))

;; converts response of type (response tuple int) to (response tuple uint)
(define-read-only (as-response-with-uint (result (response {stacker: principal, total-locked: uint} int)))
  (match result success (ok success) err (err (to-uint err))))
;;
;; Helper functions for "grouped-stackers" map
;;

(define-private (merge-details (stacker {lock-amount: uint, stacker: principal, unlock-burn-height: uint}) (user {pox-addr: {hashbytes: (buff 32), version: (buff 1)}, cycle: uint, lock-period: uint}))
  {lock-amount: (get lock-amount stacker),
  stacker: (get stacker stacker),
  unlock-burn-height: (get unlock-burn-height stacker),
  pox-addr: (get pox-addr user),
  cycle: (get cycle user),
  lock-period: (get lock-period user)})

(define-private (insert-in-new-list (pool principal) (reward-cycle uint) (last-index uint) (details {lock-amount: uint, stacker: principal, unlock-burn-height: uint, pox-addr: (tuple (hashbytes (buff 32)) (version (buff 1))), cycle: uint, lock-period: uint}))
  (let ((index (+ last-index u1)))
    (map-insert grouped-stackers (print {pool: pool, reward-cycle: reward-cycle, lock-period: (get lock-period details), index: index}) (list details))
    (map-set grouped-stackers-len {pool: pool, reward-cycle: reward-cycle, lock-period: (get lock-period details)} index)))


;; Get the number of lists of stackers that have locked their stx for the given pool, cycle and lock-period.
(define-read-only (get-status-lists-last-index (pool principal) (reward-cycle uint) (lock-period uint))
  (default-to u0 (map-get? grouped-stackers-len {pool: pool, reward-cycle: reward-cycle, lock-period: lock-period}))
)

(define-private (map-set-details (pool principal) (details {lock-amount: uint, stacker: principal, unlock-burn-height: uint, pox-addr: (tuple (hashbytes (buff 32)) (version (buff 1))), cycle: uint, lock-period: uint}))
  (let ((reward-cycle (+ (contract-call? 'SP000000000000000000002Q6VF78.pox-2 current-pox-reward-cycle) u1))
        (lock-period (get lock-period details))
        (last-index (get-status-lists-last-index pool reward-cycle lock-period)))
      (match (map-get? grouped-stackers {pool: pool, reward-cycle: reward-cycle, lock-period: lock-period, index: last-index})
        stackers (match (as-max-len? (append stackers details) u30)
                updated-list (map-set grouped-stackers (print {pool: pool, reward-cycle: reward-cycle, lock-period: lock-period, index: last-index}) updated-list)
                (insert-in-new-list pool reward-cycle last-index details))
        (map-insert grouped-stackers (print {pool: pool, reward-cycle: reward-cycle, lock-period: (get lock-period details), index: last-index}) (list details)))
      (map-set grouped-totals {pool: pool, reward-cycle: reward-cycle, lock-period: lock-period} (+ (get-total pool reward-cycle lock-period) (get lock-amount details)))))

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
      success (match (contract-call? 'SP000000000000000000002Q6VF78.pox-2 delegate-stack-increase
                  user pox-address (- amount-ustx (get locked status)))
                success-increase (ok {lock-amount: (get total-locked success-increase),
                                      stacker: user,
                                      unlock-burn-height: (get unlock-height status)})
                error-increase (err (* u1000000000 (to-uint error-increase))))
      error (err (* u1000000 (to-uint error))))))

;; Genesis delegate-stack-stx call.
;; Stores the result in "grouped-stackers".
(define-private (pox-delegate-stack-stx (details {user: principal, amount-ustx: uint})
                  (context (tuple
                      (pox-address (tuple (hashbytes (buff 32)) (version (buff 1))))
                      (start-burn-ht uint)
                      (lock-period uint)
                      (result (list 30 (response (tuple (lock-amount uint) (stacker principal) (unlock-burn-height uint)) uint))))))
  (let ((user (get user details)))
    (let ((pox-address (get pox-address context))
        (start-burn-ht (get start-burn-ht context))
        (lock-period (get lock-period context))
        (amount-ustx (min (get amount-ustx details) (stx-get-balance user))))
      (let
        ((stack-result
          ;; call revoke and delegate-stack-stx
          (if (> amount-ustx u0)
            (match (map-get? user-data user)
              user-details (match (contract-call? 'SP000000000000000000002Q6VF78.pox-2 delegate-stack-stx
                              user amount-ustx
                              pox-address start-burn-ht lock-period)
                      stacker-details  (begin
                              ;; store result on success
                              (map-set-details tx-sender (merge-details stacker-details user-details))
                              (ok stacker-details))
                      error (if (is-eq error 3) ;; check whether user is already stacked
                              (pox-delegate-stack-extend-increase user amount-ustx pox-address start-burn-ht lock-period)
                              (err (* u1000 (to-uint error)))))
            err-not-found)
          err-non-positive-amount)))
        ;; return a tuple even if delegate-stack-stx call failed
        {pox-address: pox-address,
          start-burn-ht: start-burn-ht,
          lock-period: lock-period,
          result: (unwrap-panic (as-max-len? (append (get result context) stack-result) u30))}))))

;;
;; Public function
;;

;; Users call this function to delegate the stacking rights to a pool.
;;
;; user-pox-addr: raw bytes of user's address that should be used for payout of rewards by pool admins.
;; lock-period: desired lock period that pool admin should respect.
(define-public (delegate-stx (amount-ustx uint) (delegate-to principal) (until-burn-ht (optional uint))
              (pool-pox-addr (optional (tuple (hashbytes (buff 32)) (version (buff 1)))))
              (user-pox-addr (tuple (hashbytes (buff 32)) (version (buff 1))))
              (lock-period uint))
  (begin
    (map-set user-data tx-sender
                {pox-addr: user-pox-addr, cycle: (contract-call? 'SP000000000000000000002Q6VF78.pox-2 current-pox-reward-cycle), lock-period: lock-period})
    (pox-delegate-stx amount-ustx delegate-to until-burn-ht)))

;; Pool admins call this function to lock stacks of their pool members in batches
(define-public (delegate-stack-stx (users (list 30 (tuple
                                      (user principal)
                                      (amount-ustx uint))))
                                    (pox-address { version: (buff 1), hashbytes: (buff 32) })
                                    (start-burn-ht uint)
                                    (lock-period uint))
    (if true
      (ok (get result
        (fold pox-delegate-stack-stx users {start-burn-ht: start-burn-ht, pox-address: pox-address, lock-period: lock-period, result: (list)})))
      (err u1))) ;; defines uint as error type


;;
;; Read-only functions
;;

;; Returns the user's stacking details from pox contract,
;; the user's delegation details from "user-data" and the
;; total locked stacks for the given pool and user's stacking parameters.
;; Note, that user can stack with a different pool, results need to verify stacker-info.pox-addr
(define-read-only (get-status (pool principal) (user principal))
  (let ((stacker-info (unwrap! (pox-get-stacker-info user) err-no-stacker-info)))
      (ok {stacker-info: stacker-info,
           user-info: (unwrap! (map-get? user-data user) err-no-user-info),
           total: (get-total pool (get first-reward-cycle stacker-info) (get lock-period stacker-info))})))

;; Get a list of stackers that have locked their stx for the given pool, cycle and lock-period.
;; index: must be smaller than get-status-lists-last-index
(define-read-only (get-status-list (pool principal) (reward-cycle uint)  (lock-period uint) (index uint))
  {total: (get-total pool reward-cycle lock-period),
  status-list: (map-get? grouped-stackers {pool: pool, reward-cycle: reward-cycle, lock-period: lock-period, index: index})}
)

;; Get information about last delegation call for a given user
;; This information can be obsolete due to a normal revoke call
(define-read-only (get-user-data (user principal))
  (map-get? user-data user))

(define-read-only (get-stx-account (user principal))
  (stx-account user))

;; Get total stacks locked by given pool, reward-cycle and lock-period.
;; The total for a given reward cycle needs to be calculated off-chain
;; depending on the pool's policy.
(define-read-only (get-total (pool principal) (reward-cycle uint) (lock-period uint))
  (default-to u0 (map-get? grouped-totals {pool: pool, reward-cycle: reward-cycle, lock-period: lock-period}))
)
