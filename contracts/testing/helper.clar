;; Helper contract mainly to wrap read-only function in public functions
;; that can be used with "clarinet integrate".
;; Currently, it is not possible to use read-only functions in deployment plans.

(define-public (get-user-data (user principal))
  (ok (print (contract-call? .pox-pools-1-cycle get-user-data user))))

(define-public (get-stx-account (user principal))
  (ok (print (contract-call? .pox-pools-1-cycle get-stx-account user))))

(define-public (get-reward-set (reward-cycle uint))
  (ok (print (contract-call? .pox-pool-self-service get-reward-set reward-cycle))))

;; call wrapper contract from a contract
;; requires allowance
(define-public (delegate-stx (amount-ustx uint))
  (contract-call? .pox-pool-self-service delegate-stx amount-ustx))
