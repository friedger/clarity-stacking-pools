
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
    (try! (print fee-amount))
    (print (some stx-amount))
    (print (some stx-amount-slippeage))
    (try! (contract-call?
        'SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9.swap-helper-v1-03
        swap-helper
        token-x
        token-y
        btc-amount
        (some stx-amount-slippeage)))
    (ok true)))
