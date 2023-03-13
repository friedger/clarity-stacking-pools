(define-public (get-user-data (user principal))
  (ok (print (contract-call? .pox-delegation get-user-data user))))

(define-public (get-stx-account (user principal))
  (ok (print (contract-call? .pox-delegation get-stx-account user))))

(define-public (burn-height-to-reward-cycle (height uint))
  (ok (print (contract-call? .pox-delegation burn-height-to-reward-cycle height))))

(define-public (burn-height-to-reward-cycle-2)
  (ok (print (contract-call? .pox-delegation burn-height-to-reward-cycle burn-block-height))))
