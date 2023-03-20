# Wrapper Contracts for pox-2 contract

## pox-pools-1-cycle (rewards in BTC)
A wrapper contract that allows users to provide a btc address during delegation to a stacking pool.
The btc address should be used by the pool operator to distribute the stacking rewards.

This contract is a generic protocol and can be used by many pools.

This contract will lock STX for 1 cycle only. Users can revoke pool membership at any time and their STX will unlock automatically 1 day after the end of the current cycle.

Users can increase the delegated amount of STX for the next cycle at any time before the pool closes.

## pox-pool-self-service
A wrapper contract that allows user to delegate and stack their STX at the same time.

This contract is can be used by one pool only. Rewards should be distributed to the default address.

This contract is not meant for smaller pools where the minimum requirement for 1 stacking slot might not be met because STX are locked immediately. If the pool does not hit the minimum, STX are locked without earning stacking rewards.

The pool operator is the contract itself; only reward distributions happens through the pool operator (=reward admin).

This contract will lock STX for 1 cycle only. Users can revoke pool membership at any time and their STX will unlock automatically 1 day after the end of the current cycle.

This contract can be adapted for rewards in BTC similar to pox-pools-1-cycle.

Users can increase the delegated amount of STX for the next cycle at any time before the start of the next cycle.
