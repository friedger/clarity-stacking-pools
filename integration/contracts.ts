// Code generated with the stacksjs-helper-generator extension
// Manual edits will be overwritten

import { ClarityValue, BooleanCV, IntCV, UIntCV, BufferCV, OptionalCV, ResponseCV, PrincipalCV, ListCV, TupleCV, StringAsciiCV, StringUtf8CV, NoneCV } from "@stacks/transactions"

export namespace FpDelegationContract {
    export const address = "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM";
    export const name = "fp-delegation";

    // Functions
    export namespace Functions {
        // delegate-stack-stx
        export namespace DelegateStackStx {
            export const name = "delegate-stack-stx";

            export interface DelegateStackStxArgs {
                amountUstx: UIntCV,
                user: PrincipalCV,
            }

            export function args(args: DelegateStackStxArgs): ClarityValue[] {
                return [
                    args.amountUstx,
                    args.user,
                ];
            }

        }

        // delegate-stx
        export namespace DelegateStx {
            export const name = "delegate-stx";

            export interface DelegateStxArgs {
                amountUstx: UIntCV,
            }

            export function args(args: DelegateStxArgs): ClarityValue[] {
                return [
                    args.amountUstx,
                ];
            }

        }

        // get-first-result
        export namespace GetFirstResult {
            export const name = "get-first-result";

            export interface GetFirstResultArgs {
                results: ClarityValue,
            }

            export function args(args: GetFirstResultArgs): ClarityValue[] {
                return [
                    args.results,
                ];
            }

        }

    }
}

export namespace HelperContract {
    export const address = "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM";
    export const name = "helper";

    // Functions
    export namespace Functions {
        // get-stx-account
        export namespace GetStxAccount {
            export const name = "get-stx-account";

            export interface GetStxAccountArgs {
                user: PrincipalCV,
            }

            export function args(args: GetStxAccountArgs): ClarityValue[] {
                return [
                    args.user,
                ];
            }

        }

        // get-user-data
        export namespace GetUserData {
            export const name = "get-user-data";

            export interface GetUserDataArgs {
                user: PrincipalCV,
            }

            export function args(args: GetUserDataArgs): ClarityValue[] {
                return [
                    args.user,
                ];
            }

        }

    }
}

export namespace PoxDelegationContract {
    export const address = "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM";
    export const name = "pox-delegation";

    // Functions
    export namespace Functions {
        // delegate-stack-stx
        export namespace DelegateStackStx {
            export const name = "delegate-stack-stx";

            export interface DelegateStackStxArgs {
                users: ListCV,
                poxAddress: TupleCV,
                startBurnHt: UIntCV,
                lockPeriod: UIntCV,
            }

            export function args(args: DelegateStackStxArgs): ClarityValue[] {
                return [
                    args.users,
                    args.poxAddress,
                    args.startBurnHt,
                    args.lockPeriod,
                ];
            }

        }

        // delegate-stx
        export namespace DelegateStx {
            export const name = "delegate-stx";

            export interface DelegateStxArgs {
                amountUstx: UIntCV,
                delegateTo: PrincipalCV,
                untilBurnHt: NoneCV,
                poolPoxAddr: NoneCV,
                userPoxAddr: TupleCV,
                lockPeriod: UIntCV,
            }

            export function args(args: DelegateStxArgs): ClarityValue[] {
                return [
                    args.amountUstx,
                    args.delegateTo,
                    args.untilBurnHt,
                    args.poolPoxAddr,
                    args.userPoxAddr,
                    args.lockPeriod,
                ];
            }

        }

        // as-response-with-uint
        export namespace AsResponseWithUint {
            export const name = "as-response-with-uint";

            export interface AsResponseWithUintArgs {
                result: ClarityValue,
            }

            export function args(args: AsResponseWithUintArgs): ClarityValue[] {
                return [
                    args.result,
                ];
            }

        }

        // get-status
        export namespace GetStatus {
            export const name = "get-status";

            export interface GetStatusArgs {
                pool: PrincipalCV,
                user: PrincipalCV,
            }

            export function args(args: GetStatusArgs): ClarityValue[] {
                return [
                    args.pool,
                    args.user,
                ];
            }

        }

        // get-status-list
        export namespace GetStatusList {
            export const name = "get-status-list";

            export interface GetStatusListArgs {
                pool: PrincipalCV,
                rewardCycle: UIntCV,
                lockPeriod: UIntCV,
                index: UIntCV,
            }

            export function args(args: GetStatusListArgs): ClarityValue[] {
                return [
                    args.pool,
                    args.rewardCycle,
                    args.lockPeriod,
                    args.index,
                ];
            }

        }

        // get-status-lists-last-index
        export namespace GetStatusListsLastIndex {
            export const name = "get-status-lists-last-index";

            export interface GetStatusListsLastIndexArgs {
                pool: PrincipalCV,
                rewardCycle: UIntCV,
                lockPeriod: UIntCV,
            }

            export function args(args: GetStatusListsLastIndexArgs): ClarityValue[] {
                return [
                    args.pool,
                    args.rewardCycle,
                    args.lockPeriod,
                ];
            }

        }

        // get-stx-account
        export namespace GetStxAccount {
            export const name = "get-stx-account";

            export interface GetStxAccountArgs {
                user: PrincipalCV,
            }

            export function args(args: GetStxAccountArgs): ClarityValue[] {
                return [
                    args.user,
                ];
            }

        }

        // get-total
        export namespace GetTotal {
            export const name = "get-total";

            export interface GetTotalArgs {
                pool: PrincipalCV,
                rewardCycle: UIntCV,
                lockPeriod: UIntCV,
            }

            export function args(args: GetTotalArgs): ClarityValue[] {
                return [
                    args.pool,
                    args.rewardCycle,
                    args.lockPeriod,
                ];
            }

        }

        // get-user-data
        export namespace GetUserData {
            export const name = "get-user-data";

            export interface GetUserDataArgs {
                user: PrincipalCV,
            }

            export function args(args: GetUserDataArgs): ClarityValue[] {
                return [
                    args.user,
                ];
            }

        }

    }
}
