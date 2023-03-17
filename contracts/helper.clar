(define-public (get-user-data (user principal))
  (ok (print (contract-call? .pox-delegation get-user-data user))))

(define-public (get-stx-account (user principal))
  (ok (print (contract-call? .pox-delegation get-stx-account user))))

(define-public (delegate-stx (amount-ustx uint))
  (contract-call? .fp-delegation delegate-stx amount-ustx))
