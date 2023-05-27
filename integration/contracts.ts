// Code generated with the stacksjs-helper-generator extension
// Manual edits will be overwritten

import { ClarityValue, BooleanCV, IntCV, UIntCV, BufferCV, OptionalCV, ResponseCV, PrincipalCV, ListCV, TupleCV, StringAsciiCV, StringUtf8CV, NoneCV } from "@stacks/transactions"

export namespace RestrictedTokenTraitContract {
    export const address = "SP3DX3H4FEYZJZ586MFBS25ZW3HZDMEW92260R2PR";
    export const name = "restricted-token-trait";

}

export namespace GovernanceTokenTraitContract {
    export const address = "SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9";
    export const name = "governance-token-trait";

}

export namespace SwapHelperV103Contract {
    export const address = "SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9";
    export const name = "swap-helper-v1-03";

    // Functions
    export namespace Functions {
        // swap-helper
        export namespace SwapHelper {
            export const name = "swap-helper";

            export interface SwapHelperArgs {
                tokenXTrait: ClarityValue,
                tokenYTrait: ClarityValue,
                dx: UIntCV,
                minDy: NoneCV,
            }

            export function args(args: SwapHelperArgs): ClarityValue[] {
                return [
                    args.tokenXTrait,
                    args.tokenYTrait,
                    args.dx,
                    args.minDy,
                ];
            }

        }

        // fee-helper
        export namespace FeeHelper {
            export const name = "fee-helper";

            export interface FeeHelperArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
            }

            export function args(args: FeeHelperArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                ];
            }

        }

        // get-given-helper
        export namespace GetGivenHelper {
            export const name = "get-given-helper";

            export interface GetGivenHelperArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
                dy: UIntCV,
            }

            export function args(args: GetGivenHelperArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                    args.dy,
                ];
            }

        }

        // get-helper
        export namespace GetHelper {
            export const name = "get-helper";

            export interface GetHelperArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
                dx: UIntCV,
            }

            export function args(args: GetHelperArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                    args.dx,
                ];
            }

        }

        // oracle-instant-helper
        export namespace OracleInstantHelper {
            export const name = "oracle-instant-helper";

            export interface OracleInstantHelperArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
            }

            export function args(args: OracleInstantHelperArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                ];
            }

        }

        // oracle-resilient-helper
        export namespace OracleResilientHelper {
            export const name = "oracle-resilient-helper";

            export interface OracleResilientHelperArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
            }

            export function args(args: OracleResilientHelperArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                ];
            }

        }

        // route-helper
        export namespace RouteHelper {
            export const name = "route-helper";

            export interface RouteHelperArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
            }

            export function args(args: RouteHelperArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                ];
            }

        }

    }
}

export namespace ProposalTraitContract {
    export const address = "SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9";
    export const name = "proposal-trait";

}

export namespace FixedWeightPoolV101Contract {
    export const address = "SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9";
    export const name = "fixed-weight-pool-v1-01";

    // Functions
    export namespace Functions {
        // add-to-position
        export namespace AddToPosition {
            export const name = "add-to-position";

            export interface AddToPositionArgs {
                tokenXTrait: ClarityValue,
                tokenYTrait: ClarityValue,
                weightX: UIntCV,
                weightY: UIntCV,
                poolTokenTrait: ClarityValue,
                dx: UIntCV,
                maxDy: NoneCV,
            }

            export function args(args: AddToPositionArgs): ClarityValue[] {
                return [
                    args.tokenXTrait,
                    args.tokenYTrait,
                    args.weightX,
                    args.weightY,
                    args.poolTokenTrait,
                    args.dx,
                    args.maxDy,
                ];
            }

        }

        // create-pool
        export namespace CreatePool {
            export const name = "create-pool";

            export interface CreatePoolArgs {
                tokenXTrait: ClarityValue,
                tokenYTrait: ClarityValue,
                weightX: UIntCV,
                weightY: UIntCV,
                poolTokenTrait: ClarityValue,
                multisigVote: PrincipalCV,
                dx: UIntCV,
                dy: UIntCV,
            }

            export function args(args: CreatePoolArgs): ClarityValue[] {
                return [
                    args.tokenXTrait,
                    args.tokenYTrait,
                    args.weightX,
                    args.weightY,
                    args.poolTokenTrait,
                    args.multisigVote,
                    args.dx,
                    args.dy,
                ];
            }

        }

        // reduce-position
        export namespace ReducePosition {
            export const name = "reduce-position";

            export interface ReducePositionArgs {
                tokenXTrait: ClarityValue,
                tokenYTrait: ClarityValue,
                weightX: UIntCV,
                weightY: UIntCV,
                poolTokenTrait: ClarityValue,
                percent: UIntCV,
            }

            export function args(args: ReducePositionArgs): ClarityValue[] {
                return [
                    args.tokenXTrait,
                    args.tokenYTrait,
                    args.weightX,
                    args.weightY,
                    args.poolTokenTrait,
                    args.percent,
                ];
            }

        }

        // set-contract-owner
        export namespace SetContractOwner {
            export const name = "set-contract-owner";

            export interface SetContractOwnerArgs {
                owner: PrincipalCV,
            }

            export function args(args: SetContractOwnerArgs): ClarityValue[] {
                return [
                    args.owner,
                ];
            }

        }

        // set-fee-rate-x
        export namespace SetFeeRateX {
            export const name = "set-fee-rate-x";

            export interface SetFeeRateXArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
                weightX: UIntCV,
                weightY: UIntCV,
                feeRateX: UIntCV,
            }

            export function args(args: SetFeeRateXArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                    args.weightX,
                    args.weightY,
                    args.feeRateX,
                ];
            }

        }

        // set-fee-rate-y
        export namespace SetFeeRateY {
            export const name = "set-fee-rate-y";

            export interface SetFeeRateYArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
                weightX: UIntCV,
                weightY: UIntCV,
                feeRateY: UIntCV,
            }

            export function args(args: SetFeeRateYArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                    args.weightX,
                    args.weightY,
                    args.feeRateY,
                ];
            }

        }

        // set-fee-rebate
        export namespace SetFeeRebate {
            export const name = "set-fee-rebate";

            export interface SetFeeRebateArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
                weightX: UIntCV,
                weightY: UIntCV,
                feeRebate: UIntCV,
            }

            export function args(args: SetFeeRebateArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                    args.weightX,
                    args.weightY,
                    args.feeRebate,
                ];
            }

        }

        // set-fee-to-address
        export namespace SetFeeToAddress {
            export const name = "set-fee-to-address";

            export interface SetFeeToAddressArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
                weightX: UIntCV,
                weightY: UIntCV,
                feeToAddress: PrincipalCV,
            }

            export function args(args: SetFeeToAddressArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                    args.weightX,
                    args.weightY,
                    args.feeToAddress,
                ];
            }

        }

        // set-oracle-average
        export namespace SetOracleAverage {
            export const name = "set-oracle-average";

            export interface SetOracleAverageArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
                weightX: UIntCV,
                weightY: UIntCV,
                newOracleAverage: UIntCV,
            }

            export function args(args: SetOracleAverageArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                    args.weightX,
                    args.weightY,
                    args.newOracleAverage,
                ];
            }

        }

        // set-oracle-enabled
        export namespace SetOracleEnabled {
            export const name = "set-oracle-enabled";

            export interface SetOracleEnabledArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
                weightX: UIntCV,
                weightY: UIntCV,
            }

            export function args(args: SetOracleEnabledArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                    args.weightX,
                    args.weightY,
                ];
            }

        }

        // swap-helper
        export namespace SwapHelper {
            export const name = "swap-helper";

            export interface SwapHelperArgs {
                tokenXTrait: ClarityValue,
                tokenYTrait: ClarityValue,
                weightX: UIntCV,
                weightY: UIntCV,
                dx: UIntCV,
                minDy: NoneCV,
            }

            export function args(args: SwapHelperArgs): ClarityValue[] {
                return [
                    args.tokenXTrait,
                    args.tokenYTrait,
                    args.weightX,
                    args.weightY,
                    args.dx,
                    args.minDy,
                ];
            }

        }

        // swap-wstx-for-y
        export namespace SwapWstxForY {
            export const name = "swap-wstx-for-y";

            export interface SwapWstxForYArgs {
                tokenYTrait: ClarityValue,
                weightY: UIntCV,
                dx: UIntCV,
                minDy: NoneCV,
            }

            export function args(args: SwapWstxForYArgs): ClarityValue[] {
                return [
                    args.tokenYTrait,
                    args.weightY,
                    args.dx,
                    args.minDy,
                ];
            }

        }

        // swap-x-for-y
        export namespace SwapXForY {
            export const name = "swap-x-for-y";

            export interface SwapXForYArgs {
                tokenXTrait: ClarityValue,
                tokenYTrait: ClarityValue,
                weightX: UIntCV,
                weightY: UIntCV,
                dx: UIntCV,
                minDy: NoneCV,
            }

            export function args(args: SwapXForYArgs): ClarityValue[] {
                return [
                    args.tokenXTrait,
                    args.tokenYTrait,
                    args.weightX,
                    args.weightY,
                    args.dx,
                    args.minDy,
                ];
            }

        }

        // swap-y-for-wstx
        export namespace SwapYForWstx {
            export const name = "swap-y-for-wstx";

            export interface SwapYForWstxArgs {
                tokenYTrait: ClarityValue,
                weightY: UIntCV,
                dy: UIntCV,
                minDx: NoneCV,
            }

            export function args(args: SwapYForWstxArgs): ClarityValue[] {
                return [
                    args.tokenYTrait,
                    args.weightY,
                    args.dy,
                    args.minDx,
                ];
            }

        }

        // swap-y-for-x
        export namespace SwapYForX {
            export const name = "swap-y-for-x";

            export interface SwapYForXArgs {
                tokenXTrait: ClarityValue,
                tokenYTrait: ClarityValue,
                weightX: UIntCV,
                weightY: UIntCV,
                dy: UIntCV,
                minDx: NoneCV,
            }

            export function args(args: SwapYForXArgs): ClarityValue[] {
                return [
                    args.tokenXTrait,
                    args.tokenYTrait,
                    args.weightX,
                    args.weightY,
                    args.dy,
                    args.minDx,
                ];
            }

        }

        // div-down
        export namespace DivDown {
            export const name = "div-down";

            export interface DivDownArgs {
                a: UIntCV,
                b: UIntCV,
            }

            export function args(args: DivDownArgs): ClarityValue[] {
                return [
                    args.a,
                    args.b,
                ];
            }

        }

        // div-up
        export namespace DivUp {
            export const name = "div-up";

            export interface DivUpArgs {
                a: UIntCV,
                b: UIntCV,
            }

            export function args(args: DivUpArgs): ClarityValue[] {
                return [
                    args.a,
                    args.b,
                ];
            }

        }

        // exp-fixed
        export namespace ExpFixed {
            export const name = "exp-fixed";

            export interface ExpFixedArgs {
                x: IntCV,
            }

            export function args(args: ExpFixedArgs): ClarityValue[] {
                return [
                    args.x,
                ];
            }

        }

        // get-balances
        export namespace GetBalances {
            export const name = "get-balances";

            export interface GetBalancesArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
                weightX: UIntCV,
                weightY: UIntCV,
            }

            export function args(args: GetBalancesArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                    args.weightX,
                    args.weightY,
                ];
            }

        }

        // get-contract-owner
        export namespace GetContractOwner {
            export const name = "get-contract-owner";

        }

        // get-exp-bound
        export namespace GetExpBound {
            export const name = "get-exp-bound";

        }

        // get-fee-rate-x
        export namespace GetFeeRateX {
            export const name = "get-fee-rate-x";

            export interface GetFeeRateXArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
                weightX: UIntCV,
                weightY: UIntCV,
            }

            export function args(args: GetFeeRateXArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                    args.weightX,
                    args.weightY,
                ];
            }

        }

        // get-fee-rate-y
        export namespace GetFeeRateY {
            export const name = "get-fee-rate-y";

            export interface GetFeeRateYArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
                weightX: UIntCV,
                weightY: UIntCV,
            }

            export function args(args: GetFeeRateYArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                    args.weightX,
                    args.weightY,
                ];
            }

        }

        // get-fee-rebate
        export namespace GetFeeRebate {
            export const name = "get-fee-rebate";

            export interface GetFeeRebateArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
                weightX: UIntCV,
                weightY: UIntCV,
            }

            export function args(args: GetFeeRebateArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                    args.weightX,
                    args.weightY,
                ];
            }

        }

        // get-fee-to-address
        export namespace GetFeeToAddress {
            export const name = "get-fee-to-address";

            export interface GetFeeToAddressArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
                weightX: UIntCV,
                weightY: UIntCV,
            }

            export function args(args: GetFeeToAddressArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                    args.weightX,
                    args.weightY,
                ];
            }

        }

        // get-helper
        export namespace GetHelper {
            export const name = "get-helper";

            export interface GetHelperArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
                weightX: UIntCV,
                weightY: UIntCV,
                dx: UIntCV,
            }

            export function args(args: GetHelperArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                    args.weightX,
                    args.weightY,
                    args.dx,
                ];
            }

        }

        // get-oracle-average
        export namespace GetOracleAverage {
            export const name = "get-oracle-average";

            export interface GetOracleAverageArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
                weightX: UIntCV,
                weightY: UIntCV,
            }

            export function args(args: GetOracleAverageArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                    args.weightX,
                    args.weightY,
                ];
            }

        }

        // get-oracle-enabled
        export namespace GetOracleEnabled {
            export const name = "get-oracle-enabled";

            export interface GetOracleEnabledArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
                weightX: UIntCV,
                weightY: UIntCV,
            }

            export function args(args: GetOracleEnabledArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                    args.weightX,
                    args.weightY,
                ];
            }

        }

        // get-oracle-instant
        export namespace GetOracleInstant {
            export const name = "get-oracle-instant";

            export interface GetOracleInstantArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
                weightX: UIntCV,
                weightY: UIntCV,
            }

            export function args(args: GetOracleInstantArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                    args.weightX,
                    args.weightY,
                ];
            }

        }

        // get-oracle-resilient
        export namespace GetOracleResilient {
            export const name = "get-oracle-resilient";

            export interface GetOracleResilientArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
                weightX: UIntCV,
                weightY: UIntCV,
            }

            export function args(args: GetOracleResilientArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                    args.weightX,
                    args.weightY,
                ];
            }

        }

        // get-pool-contracts
        export namespace GetPoolContracts {
            export const name = "get-pool-contracts";

            export interface GetPoolContractsArgs {
                poolId: UIntCV,
            }

            export function args(args: GetPoolContractsArgs): ClarityValue[] {
                return [
                    args.poolId,
                ];
            }

        }

        // get-pool-count
        export namespace GetPoolCount {
            export const name = "get-pool-count";

        }

        // get-pool-details
        export namespace GetPoolDetails {
            export const name = "get-pool-details";

            export interface GetPoolDetailsArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
                weightX: UIntCV,
                weightY: UIntCV,
            }

            export function args(args: GetPoolDetailsArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                    args.weightX,
                    args.weightY,
                ];
            }

        }

        // get-pool-exists
        export namespace GetPoolExists {
            export const name = "get-pool-exists";

            export interface GetPoolExistsArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
                weightX: UIntCV,
                weightY: UIntCV,
            }

            export function args(args: GetPoolExistsArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                    args.weightX,
                    args.weightY,
                ];
            }

        }

        // get-pools
        export namespace GetPools {
            export const name = "get-pools";

        }

        // get-pools-by-ids
        export namespace GetPoolsByIds {
            export const name = "get-pools-by-ids";

            export interface GetPoolsByIdsArgs {
                poolIds: ListCV,
            }

            export function args(args: GetPoolsByIdsArgs): ClarityValue[] {
                return [
                    args.poolIds,
                ];
            }

        }

        // get-position-given-burn
        export namespace GetPositionGivenBurn {
            export const name = "get-position-given-burn";

            export interface GetPositionGivenBurnArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
                weightX: UIntCV,
                weightY: UIntCV,
                token: UIntCV,
            }

            export function args(args: GetPositionGivenBurnArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                    args.weightX,
                    args.weightY,
                    args.token,
                ];
            }

        }

        // get-position-given-mint
        export namespace GetPositionGivenMint {
            export const name = "get-position-given-mint";

            export interface GetPositionGivenMintArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
                weightX: UIntCV,
                weightY: UIntCV,
                token: UIntCV,
            }

            export function args(args: GetPositionGivenMintArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                    args.weightX,
                    args.weightY,
                    args.token,
                ];
            }

        }

        // get-token-given-position
        export namespace GetTokenGivenPosition {
            export const name = "get-token-given-position";

            export interface GetTokenGivenPositionArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
                weightX: UIntCV,
                weightY: UIntCV,
                dx: UIntCV,
                maxDy: NoneCV,
            }

            export function args(args: GetTokenGivenPositionArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                    args.weightX,
                    args.weightY,
                    args.dx,
                    args.maxDy,
                ];
            }

        }

        // get-wstx-given-y
        export namespace GetWstxGivenY {
            export const name = "get-wstx-given-y";

            export interface GetWstxGivenYArgs {
                tokenY: PrincipalCV,
                weightY: UIntCV,
                dy: UIntCV,
            }

            export function args(args: GetWstxGivenYArgs): ClarityValue[] {
                return [
                    args.tokenY,
                    args.weightY,
                    args.dy,
                ];
            }

        }

        // get-wstx-in-given-y-out
        export namespace GetWstxInGivenYOut {
            export const name = "get-wstx-in-given-y-out";

            export interface GetWstxInGivenYOutArgs {
                tokenY: PrincipalCV,
                weightY: UIntCV,
                dy: UIntCV,
            }

            export function args(args: GetWstxInGivenYOutArgs): ClarityValue[] {
                return [
                    args.tokenY,
                    args.weightY,
                    args.dy,
                ];
            }

        }

        // get-x-given-price
        export namespace GetXGivenPrice {
            export const name = "get-x-given-price";

            export interface GetXGivenPriceArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
                weightX: UIntCV,
                weightY: UIntCV,
                price: UIntCV,
            }

            export function args(args: GetXGivenPriceArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                    args.weightX,
                    args.weightY,
                    args.price,
                ];
            }

        }

        // get-x-given-y
        export namespace GetXGivenY {
            export const name = "get-x-given-y";

            export interface GetXGivenYArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
                weightX: UIntCV,
                weightY: UIntCV,
                dy: UIntCV,
            }

            export function args(args: GetXGivenYArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                    args.weightX,
                    args.weightY,
                    args.dy,
                ];
            }

        }

        // get-x-in-given-y-out
        export namespace GetXInGivenYOut {
            export const name = "get-x-in-given-y-out";

            export interface GetXInGivenYOutArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
                weightX: UIntCV,
                weightY: UIntCV,
                dy: UIntCV,
            }

            export function args(args: GetXInGivenYOutArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                    args.weightX,
                    args.weightY,
                    args.dy,
                ];
            }

        }

        // get-y-given-price
        export namespace GetYGivenPrice {
            export const name = "get-y-given-price";

            export interface GetYGivenPriceArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
                weightX: UIntCV,
                weightY: UIntCV,
                price: UIntCV,
            }

            export function args(args: GetYGivenPriceArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                    args.weightX,
                    args.weightY,
                    args.price,
                ];
            }

        }

        // get-y-given-wstx
        export namespace GetYGivenWstx {
            export const name = "get-y-given-wstx";

            export interface GetYGivenWstxArgs {
                tokenY: PrincipalCV,
                weightY: UIntCV,
                dx: UIntCV,
            }

            export function args(args: GetYGivenWstxArgs): ClarityValue[] {
                return [
                    args.tokenY,
                    args.weightY,
                    args.dx,
                ];
            }

        }

        // get-y-given-x
        export namespace GetYGivenX {
            export const name = "get-y-given-x";

            export interface GetYGivenXArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
                weightX: UIntCV,
                weightY: UIntCV,
                dx: UIntCV,
            }

            export function args(args: GetYGivenXArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                    args.weightX,
                    args.weightY,
                    args.dx,
                ];
            }

        }

        // get-y-in-given-wstx-out
        export namespace GetYInGivenWstxOut {
            export const name = "get-y-in-given-wstx-out";

            export interface GetYInGivenWstxOutArgs {
                tokenY: PrincipalCV,
                weightY: UIntCV,
                dx: UIntCV,
            }

            export function args(args: GetYInGivenWstxOutArgs): ClarityValue[] {
                return [
                    args.tokenY,
                    args.weightY,
                    args.dx,
                ];
            }

        }

        // get-y-in-given-x-out
        export namespace GetYInGivenXOut {
            export const name = "get-y-in-given-x-out";

            export interface GetYInGivenXOutArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
                weightX: UIntCV,
                weightY: UIntCV,
                dx: UIntCV,
            }

            export function args(args: GetYInGivenXOutArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                    args.weightX,
                    args.weightY,
                    args.dx,
                ];
            }

        }

        // ln-fixed
        export namespace LnFixed {
            export const name = "ln-fixed";

            export interface LnFixedArgs {
                a: IntCV,
            }

            export function args(args: LnFixedArgs): ClarityValue[] {
                return [
                    args.a,
                ];
            }

        }

        // mul-down
        export namespace MulDown {
            export const name = "mul-down";

            export interface MulDownArgs {
                a: UIntCV,
                b: UIntCV,
            }

            export function args(args: MulDownArgs): ClarityValue[] {
                return [
                    args.a,
                    args.b,
                ];
            }

        }

        // mul-up
        export namespace MulUp {
            export const name = "mul-up";

            export interface MulUpArgs {
                a: UIntCV,
                b: UIntCV,
            }

            export function args(args: MulUpArgs): ClarityValue[] {
                return [
                    args.a,
                    args.b,
                ];
            }

        }

        // pow-down
        export namespace PowDown {
            export const name = "pow-down";

            export interface PowDownArgs {
                a: UIntCV,
                b: UIntCV,
            }

            export function args(args: PowDownArgs): ClarityValue[] {
                return [
                    args.a,
                    args.b,
                ];
            }

        }

        // pow-fixed
        export namespace PowFixed {
            export const name = "pow-fixed";

            export interface PowFixedArgs {
                x: UIntCV,
                y: UIntCV,
            }

            export function args(args: PowFixedArgs): ClarityValue[] {
                return [
                    args.x,
                    args.y,
                ];
            }

        }

        // pow-up
        export namespace PowUp {
            export const name = "pow-up";

            export interface PowUpArgs {
                a: UIntCV,
                b: UIntCV,
            }

            export function args(args: PowUpArgs): ClarityValue[] {
                return [
                    args.a,
                    args.b,
                ];
            }

        }

    }
}

export namespace WeightedEquationV101Contract {
    export const address = "SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9";
    export const name = "weighted-equation-v1-01";

    // Functions
    export namespace Functions {
        // set-contract-owner
        export namespace SetContractOwner {
            export const name = "set-contract-owner";

            export interface SetContractOwnerArgs {
                newContractOwner: PrincipalCV,
            }

            export function args(args: SetContractOwnerArgs): ClarityValue[] {
                return [
                    args.newContractOwner,
                ];
            }

        }

        // set-max-in-ratio
        export namespace SetMaxInRatio {
            export const name = "set-max-in-ratio";

            export interface SetMaxInRatioArgs {
                newMaxInRatio: UIntCV,
            }

            export function args(args: SetMaxInRatioArgs): ClarityValue[] {
                return [
                    args.newMaxInRatio,
                ];
            }

        }

        // set-max-out-ratio
        export namespace SetMaxOutRatio {
            export const name = "set-max-out-ratio";

            export interface SetMaxOutRatioArgs {
                newMaxOutRatio: UIntCV,
            }

            export function args(args: SetMaxOutRatioArgs): ClarityValue[] {
                return [
                    args.newMaxOutRatio,
                ];
            }

        }

        // div-down
        export namespace DivDown {
            export const name = "div-down";

            export interface DivDownArgs {
                a: UIntCV,
                b: UIntCV,
            }

            export function args(args: DivDownArgs): ClarityValue[] {
                return [
                    args.a,
                    args.b,
                ];
            }

        }

        // div-up
        export namespace DivUp {
            export const name = "div-up";

            export interface DivUpArgs {
                a: UIntCV,
                b: UIntCV,
            }

            export function args(args: DivUpArgs): ClarityValue[] {
                return [
                    args.a,
                    args.b,
                ];
            }

        }

        // exp-fixed
        export namespace ExpFixed {
            export const name = "exp-fixed";

            export interface ExpFixedArgs {
                x: IntCV,
            }

            export function args(args: ExpFixedArgs): ClarityValue[] {
                return [
                    args.x,
                ];
            }

        }

        // get-contract-owner
        export namespace GetContractOwner {
            export const name = "get-contract-owner";

        }

        // get-exp-bound
        export namespace GetExpBound {
            export const name = "get-exp-bound";

        }

        // get-invariant
        export namespace GetInvariant {
            export const name = "get-invariant";

            export interface GetInvariantArgs {
                balanceX: UIntCV,
                balanceY: UIntCV,
                weightX: UIntCV,
                weightY: UIntCV,
            }

            export function args(args: GetInvariantArgs): ClarityValue[] {
                return [
                    args.balanceX,
                    args.balanceY,
                    args.weightX,
                    args.weightY,
                ];
            }

        }

        // get-max-in-ratio
        export namespace GetMaxInRatio {
            export const name = "get-max-in-ratio";

        }

        // get-max-out-ratio
        export namespace GetMaxOutRatio {
            export const name = "get-max-out-ratio";

        }

        // get-position-given-burn
        export namespace GetPositionGivenBurn {
            export const name = "get-position-given-burn";

            export interface GetPositionGivenBurnArgs {
                balanceX: UIntCV,
                balanceY: UIntCV,
                weightX: UIntCV,
                weightY: UIntCV,
                totalSupply: UIntCV,
                token: UIntCV,
            }

            export function args(args: GetPositionGivenBurnArgs): ClarityValue[] {
                return [
                    args.balanceX,
                    args.balanceY,
                    args.weightX,
                    args.weightY,
                    args.totalSupply,
                    args.token,
                ];
            }

        }

        // get-position-given-mint
        export namespace GetPositionGivenMint {
            export const name = "get-position-given-mint";

            export interface GetPositionGivenMintArgs {
                balanceX: UIntCV,
                balanceY: UIntCV,
                weightX: UIntCV,
                weightY: UIntCV,
                totalSupply: UIntCV,
                token: UIntCV,
            }

            export function args(args: GetPositionGivenMintArgs): ClarityValue[] {
                return [
                    args.balanceX,
                    args.balanceY,
                    args.weightX,
                    args.weightY,
                    args.totalSupply,
                    args.token,
                ];
            }

        }

        // get-token-given-position
        export namespace GetTokenGivenPosition {
            export const name = "get-token-given-position";

            export interface GetTokenGivenPositionArgs {
                balanceX: UIntCV,
                balanceY: UIntCV,
                weightX: UIntCV,
                weightY: UIntCV,
                totalSupply: UIntCV,
                dx: UIntCV,
                dy: UIntCV,
            }

            export function args(args: GetTokenGivenPositionArgs): ClarityValue[] {
                return [
                    args.balanceX,
                    args.balanceY,
                    args.weightX,
                    args.weightY,
                    args.totalSupply,
                    args.dx,
                    args.dy,
                ];
            }

        }

        // get-x-given-price
        export namespace GetXGivenPrice {
            export const name = "get-x-given-price";

            export interface GetXGivenPriceArgs {
                balanceX: UIntCV,
                balanceY: UIntCV,
                weightX: UIntCV,
                weightY: UIntCV,
                price: UIntCV,
            }

            export function args(args: GetXGivenPriceArgs): ClarityValue[] {
                return [
                    args.balanceX,
                    args.balanceY,
                    args.weightX,
                    args.weightY,
                    args.price,
                ];
            }

        }

        // get-x-given-y
        export namespace GetXGivenY {
            export const name = "get-x-given-y";

            export interface GetXGivenYArgs {
                balanceX: UIntCV,
                balanceY: UIntCV,
                weightX: UIntCV,
                weightY: UIntCV,
                dy: UIntCV,
            }

            export function args(args: GetXGivenYArgs): ClarityValue[] {
                return [
                    args.balanceX,
                    args.balanceY,
                    args.weightX,
                    args.weightY,
                    args.dy,
                ];
            }

        }

        // get-x-in-given-y-out
        export namespace GetXInGivenYOut {
            export const name = "get-x-in-given-y-out";

            export interface GetXInGivenYOutArgs {
                balanceX: UIntCV,
                balanceY: UIntCV,
                weightX: UIntCV,
                weightY: UIntCV,
                dy: UIntCV,
            }

            export function args(args: GetXInGivenYOutArgs): ClarityValue[] {
                return [
                    args.balanceX,
                    args.balanceY,
                    args.weightX,
                    args.weightY,
                    args.dy,
                ];
            }

        }

        // get-y-given-price
        export namespace GetYGivenPrice {
            export const name = "get-y-given-price";

            export interface GetYGivenPriceArgs {
                balanceX: UIntCV,
                balanceY: UIntCV,
                weightX: UIntCV,
                weightY: UIntCV,
                price: UIntCV,
            }

            export function args(args: GetYGivenPriceArgs): ClarityValue[] {
                return [
                    args.balanceX,
                    args.balanceY,
                    args.weightX,
                    args.weightY,
                    args.price,
                ];
            }

        }

        // get-y-given-x
        export namespace GetYGivenX {
            export const name = "get-y-given-x";

            export interface GetYGivenXArgs {
                balanceX: UIntCV,
                balanceY: UIntCV,
                weightX: UIntCV,
                weightY: UIntCV,
                dx: UIntCV,
            }

            export function args(args: GetYGivenXArgs): ClarityValue[] {
                return [
                    args.balanceX,
                    args.balanceY,
                    args.weightX,
                    args.weightY,
                    args.dx,
                ];
            }

        }

        // get-y-in-given-x-out
        export namespace GetYInGivenXOut {
            export const name = "get-y-in-given-x-out";

            export interface GetYInGivenXOutArgs {
                balanceX: UIntCV,
                balanceY: UIntCV,
                weightX: UIntCV,
                weightY: UIntCV,
                dx: UIntCV,
            }

            export function args(args: GetYInGivenXOutArgs): ClarityValue[] {
                return [
                    args.balanceX,
                    args.balanceY,
                    args.weightX,
                    args.weightY,
                    args.dx,
                ];
            }

        }

        // mul-down
        export namespace MulDown {
            export const name = "mul-down";

            export interface MulDownArgs {
                a: UIntCV,
                b: UIntCV,
            }

            export function args(args: MulDownArgs): ClarityValue[] {
                return [
                    args.a,
                    args.b,
                ];
            }

        }

        // mul-up
        export namespace MulUp {
            export const name = "mul-up";

            export interface MulUpArgs {
                a: UIntCV,
                b: UIntCV,
            }

            export function args(args: MulUpArgs): ClarityValue[] {
                return [
                    args.a,
                    args.b,
                ];
            }

        }

        // pow-down
        export namespace PowDown {
            export const name = "pow-down";

            export interface PowDownArgs {
                a: UIntCV,
                b: UIntCV,
            }

            export function args(args: PowDownArgs): ClarityValue[] {
                return [
                    args.a,
                    args.b,
                ];
            }

        }

        // pow-fixed
        export namespace PowFixed {
            export const name = "pow-fixed";

            export interface PowFixedArgs {
                x: UIntCV,
                y: UIntCV,
            }

            export function args(args: PowFixedArgs): ClarityValue[] {
                return [
                    args.x,
                    args.y,
                ];
            }

        }

        // pow-up
        export namespace PowUp {
            export const name = "pow-up";

            export interface PowUpArgs {
                a: UIntCV,
                b: UIntCV,
            }

            export function args(args: PowUpArgs): ClarityValue[] {
                return [
                    args.a,
                    args.b,
                ];
            }

        }

    }
}

export namespace ExecutorDaoContract {
    export const address = "SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9";
    export const name = "executor-dao";

    // Functions
    export namespace Functions {
        // construct
        export namespace Construct {
            export const name = "construct";

            export interface ConstructArgs {
                proposal: ClarityValue,
            }

            export function args(args: ConstructArgs): ClarityValue[] {
                return [
                    args.proposal,
                ];
            }

        }

        // execute
        export namespace Execute {
            export const name = "execute";

            export interface ExecuteArgs {
                proposal: ClarityValue,
                sender: PrincipalCV,
            }

            export function args(args: ExecuteArgs): ClarityValue[] {
                return [
                    args.proposal,
                    args.sender,
                ];
            }

        }

        // request-extension-callback
        export namespace RequestExtensionCallback {
            export const name = "request-extension-callback";

            export interface RequestExtensionCallbackArgs {
                extension: ClarityValue,
                memo: BufferCV,
            }

            export function args(args: RequestExtensionCallbackArgs): ClarityValue[] {
                return [
                    args.extension,
                    args.memo,
                ];
            }

        }

        // set-extension
        export namespace SetExtension {
            export const name = "set-extension";

            export interface SetExtensionArgs {
                extension: PrincipalCV,
                enabled: BooleanCV,
            }

            export function args(args: SetExtensionArgs): ClarityValue[] {
                return [
                    args.extension,
                    args.enabled,
                ];
            }

        }

        // set-extensions
        export namespace SetExtensions {
            export const name = "set-extensions";

            export interface SetExtensionsArgs {
                extensionList: ListCV,
            }

            export function args(args: SetExtensionsArgs): ClarityValue[] {
                return [
                    args.extensionList,
                ];
            }

        }

        // executed-at
        export namespace ExecutedAt {
            export const name = "executed-at";

            export interface ExecutedAtArgs {
                proposal: ClarityValue,
            }

            export function args(args: ExecutedAtArgs): ClarityValue[] {
                return [
                    args.proposal,
                ];
            }

        }

        // is-extension
        export namespace IsExtension {
            export const name = "is-extension";

            export interface IsExtensionArgs {
                extension: PrincipalCV,
            }

            export function args(args: IsExtensionArgs): ClarityValue[] {
                return [
                    args.extension,
                ];
            }

        }

    }
}

export namespace TraitFlashLoanUserContract {
    export const address = "SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9";
    export const name = "trait-flash-loan-user";

}

export namespace AlexReservePoolContract {
    export const address = "SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9";
    export const name = "alex-reserve-pool";

    // Functions
    export namespace Functions {
        // add-approved-contract
        export namespace AddApprovedContract {
            export const name = "add-approved-contract";

            export interface AddApprovedContractArgs {
                newApprovedContract: PrincipalCV,
            }

            export function args(args: AddApprovedContractArgs): ClarityValue[] {
                return [
                    args.newApprovedContract,
                ];
            }

        }

        // add-to-balance
        export namespace AddToBalance {
            export const name = "add-to-balance";

            export interface AddToBalanceArgs {
                token: PrincipalCV,
                amount: UIntCV,
            }

            export function args(args: AddToBalanceArgs): ClarityValue[] {
                return [
                    args.token,
                    args.amount,
                ];
            }

        }

        // add-token
        export namespace AddToken {
            export const name = "add-token";

            export interface AddTokenArgs {
                token: PrincipalCV,
            }

            export function args(args: AddTokenArgs): ClarityValue[] {
                return [
                    args.token,
                ];
            }

        }

        // claim-staking-reward
        export namespace ClaimStakingReward {
            export const name = "claim-staking-reward";

            export interface ClaimStakingRewardArgs {
                tokenTrait: ClarityValue,
                targetCycle: UIntCV,
            }

            export function args(args: ClaimStakingRewardArgs): ClarityValue[] {
                return [
                    args.tokenTrait,
                    args.targetCycle,
                ];
            }

        }

        // remove-from-balance
        export namespace RemoveFromBalance {
            export const name = "remove-from-balance";

            export interface RemoveFromBalanceArgs {
                token: PrincipalCV,
                amount: UIntCV,
            }

            export function args(args: RemoveFromBalanceArgs): ClarityValue[] {
                return [
                    args.token,
                    args.amount,
                ];
            }

        }

        // set-activation-block
        export namespace SetActivationBlock {
            export const name = "set-activation-block";

            export interface SetActivationBlockArgs {
                token: PrincipalCV,
                newActivationBlock: UIntCV,
            }

            export function args(args: SetActivationBlockArgs): ClarityValue[] {
                return [
                    args.token,
                    args.newActivationBlock,
                ];
            }

        }

        // set-apower-multiplier-in-fixed
        export namespace SetApowerMultiplierInFixed {
            export const name = "set-apower-multiplier-in-fixed";

            export interface SetApowerMultiplierInFixedArgs {
                token: PrincipalCV,
                newApowerMultiplierInFixed: UIntCV,
            }

            export function args(args: SetApowerMultiplierInFixedArgs): ClarityValue[] {
                return [
                    args.token,
                    args.newApowerMultiplierInFixed,
                ];
            }

        }

        // set-coinbase-amount
        export namespace SetCoinbaseAmount {
            export const name = "set-coinbase-amount";

            export interface SetCoinbaseAmountArgs {
                token: PrincipalCV,
                coinbase1: UIntCV,
                coinbase2: UIntCV,
                coinbase3: UIntCV,
                coinbase4: UIntCV,
                coinbase5: UIntCV,
            }

            export function args(args: SetCoinbaseAmountArgs): ClarityValue[] {
                return [
                    args.token,
                    args.coinbase1,
                    args.coinbase2,
                    args.coinbase3,
                    args.coinbase4,
                    args.coinbase5,
                ];
            }

        }

        // set-contract-owner
        export namespace SetContractOwner {
            export const name = "set-contract-owner";

            export interface SetContractOwnerArgs {
                owner: PrincipalCV,
            }

            export function args(args: SetContractOwnerArgs): ClarityValue[] {
                return [
                    args.owner,
                ];
            }

        }

        // set-reward-cycle-length
        export namespace SetRewardCycleLength {
            export const name = "set-reward-cycle-length";

            export interface SetRewardCycleLengthArgs {
                newRewardCycleLength: UIntCV,
            }

            export function args(args: SetRewardCycleLengthArgs): ClarityValue[] {
                return [
                    args.newRewardCycleLength,
                ];
            }

        }

        // set-token-halving-cycle
        export namespace SetTokenHalvingCycle {
            export const name = "set-token-halving-cycle";

            export interface SetTokenHalvingCycleArgs {
                newTokenHalvingCycle: UIntCV,
            }

            export function args(args: SetTokenHalvingCycleArgs): ClarityValue[] {
                return [
                    args.newTokenHalvingCycle,
                ];
            }

        }

        // stake-tokens
        export namespace StakeTokens {
            export const name = "stake-tokens";

            export interface StakeTokensArgs {
                tokenTrait: ClarityValue,
                amountToken: UIntCV,
                lockPeriod: UIntCV,
            }

            export function args(args: StakeTokensArgs): ClarityValue[] {
                return [
                    args.tokenTrait,
                    args.amountToken,
                    args.lockPeriod,
                ];
            }

        }

        // div-down
        export namespace DivDown {
            export const name = "div-down";

            export interface DivDownArgs {
                a: UIntCV,
                b: UIntCV,
            }

            export function args(args: DivDownArgs): ClarityValue[] {
                return [
                    args.a,
                    args.b,
                ];
            }

        }

        // get-activation-block-or-default
        export namespace GetActivationBlockOrDefault {
            export const name = "get-activation-block-or-default";

            export interface GetActivationBlockOrDefaultArgs {
                token: PrincipalCV,
            }

            export function args(args: GetActivationBlockOrDefaultArgs): ClarityValue[] {
                return [
                    args.token,
                ];
            }

        }

        // get-apower-multiplier-in-fixed-or-default
        export namespace GetApowerMultiplierInFixedOrDefault {
            export const name = "get-apower-multiplier-in-fixed-or-default";

            export interface GetApowerMultiplierInFixedOrDefaultArgs {
                token: PrincipalCV,
            }

            export function args(args: GetApowerMultiplierInFixedOrDefaultArgs): ClarityValue[] {
                return [
                    args.token,
                ];
            }

        }

        // get-balance
        export namespace GetBalance {
            export const name = "get-balance";

            export interface GetBalanceArgs {
                token: PrincipalCV,
            }

            export function args(args: GetBalanceArgs): ClarityValue[] {
                return [
                    args.token,
                ];
            }

        }

        // get-coinbase-amount-or-default
        export namespace GetCoinbaseAmountOrDefault {
            export const name = "get-coinbase-amount-or-default";

            export interface GetCoinbaseAmountOrDefaultArgs {
                token: PrincipalCV,
                rewardCycle: UIntCV,
            }

            export function args(args: GetCoinbaseAmountOrDefaultArgs): ClarityValue[] {
                return [
                    args.token,
                    args.rewardCycle,
                ];
            }

        }

        // get-coinbase-thresholds
        export namespace GetCoinbaseThresholds {
            export const name = "get-coinbase-thresholds";

        }

        // get-contract-owner
        export namespace GetContractOwner {
            export const name = "get-contract-owner";

        }

        // get-first-stacks-block-in-reward-cycle
        export namespace GetFirstStacksBlockInRewardCycle {
            export const name = "get-first-stacks-block-in-reward-cycle";

            export interface GetFirstStacksBlockInRewardCycleArgs {
                token: PrincipalCV,
                rewardCycle: UIntCV,
            }

            export function args(args: GetFirstStacksBlockInRewardCycleArgs): ClarityValue[] {
                return [
                    args.token,
                    args.rewardCycle,
                ];
            }

        }

        // get-registered-users-nonce
        export namespace GetRegisteredUsersNonce {
            export const name = "get-registered-users-nonce";

            export interface GetRegisteredUsersNonceArgs {
                token: PrincipalCV,
            }

            export function args(args: GetRegisteredUsersNonceArgs): ClarityValue[] {
                return [
                    args.token,
                ];
            }

        }

        // get-registered-users-nonce-or-default
        export namespace GetRegisteredUsersNonceOrDefault {
            export const name = "get-registered-users-nonce-or-default";

            export interface GetRegisteredUsersNonceOrDefaultArgs {
                token: PrincipalCV,
            }

            export function args(args: GetRegisteredUsersNonceOrDefaultArgs): ClarityValue[] {
                return [
                    args.token,
                ];
            }

        }

        // get-reward-cycle
        export namespace GetRewardCycle {
            export const name = "get-reward-cycle";

            export interface GetRewardCycleArgs {
                token: PrincipalCV,
                stacksHeight: UIntCV,
            }

            export function args(args: GetRewardCycleArgs): ClarityValue[] {
                return [
                    args.token,
                    args.stacksHeight,
                ];
            }

        }

        // get-reward-cycle-length
        export namespace GetRewardCycleLength {
            export const name = "get-reward-cycle-length";

        }

        // get-staker-at-cycle
        export namespace GetStakerAtCycle {
            export const name = "get-staker-at-cycle";

            export interface GetStakerAtCycleArgs {
                token: PrincipalCV,
                rewardCycle: UIntCV,
                userId: UIntCV,
            }

            export function args(args: GetStakerAtCycleArgs): ClarityValue[] {
                return [
                    args.token,
                    args.rewardCycle,
                    args.userId,
                ];
            }

        }

        // get-staker-at-cycle-or-default
        export namespace GetStakerAtCycleOrDefault {
            export const name = "get-staker-at-cycle-or-default";

            export interface GetStakerAtCycleOrDefaultArgs {
                token: PrincipalCV,
                rewardCycle: UIntCV,
                userId: UIntCV,
            }

            export function args(args: GetStakerAtCycleOrDefaultArgs): ClarityValue[] {
                return [
                    args.token,
                    args.rewardCycle,
                    args.userId,
                ];
            }

        }

        // get-staking-reward
        export namespace GetStakingReward {
            export const name = "get-staking-reward";

            export interface GetStakingRewardArgs {
                token: PrincipalCV,
                userId: UIntCV,
                targetCycle: UIntCV,
            }

            export function args(args: GetStakingRewardArgs): ClarityValue[] {
                return [
                    args.token,
                    args.userId,
                    args.targetCycle,
                ];
            }

        }

        // get-staking-stats-at-cycle
        export namespace GetStakingStatsAtCycle {
            export const name = "get-staking-stats-at-cycle";

            export interface GetStakingStatsAtCycleArgs {
                token: PrincipalCV,
                rewardCycle: UIntCV,
            }

            export function args(args: GetStakingStatsAtCycleArgs): ClarityValue[] {
                return [
                    args.token,
                    args.rewardCycle,
                ];
            }

        }

        // get-staking-stats-at-cycle-or-default
        export namespace GetStakingStatsAtCycleOrDefault {
            export const name = "get-staking-stats-at-cycle-or-default";

            export interface GetStakingStatsAtCycleOrDefaultArgs {
                token: PrincipalCV,
                rewardCycle: UIntCV,
            }

            export function args(args: GetStakingStatsAtCycleOrDefaultArgs): ClarityValue[] {
                return [
                    args.token,
                    args.rewardCycle,
                ];
            }

        }

        // get-token-halving-cycle
        export namespace GetTokenHalvingCycle {
            export const name = "get-token-halving-cycle";

        }

        // get-user
        export namespace GetUser {
            export const name = "get-user";

            export interface GetUserArgs {
                token: PrincipalCV,
                userId: UIntCV,
            }

            export function args(args: GetUserArgs): ClarityValue[] {
                return [
                    args.token,
                    args.userId,
                ];
            }

        }

        // get-user-id
        export namespace GetUserId {
            export const name = "get-user-id";

            export interface GetUserIdArgs {
                token: PrincipalCV,
                user: PrincipalCV,
            }

            export function args(args: GetUserIdArgs): ClarityValue[] {
                return [
                    args.token,
                    args.user,
                ];
            }

        }

        // is-token-approved
        export namespace IsTokenApproved {
            export const name = "is-token-approved";

            export interface IsTokenApprovedArgs {
                token: PrincipalCV,
            }

            export function args(args: IsTokenApprovedArgs): ClarityValue[] {
                return [
                    args.token,
                ];
            }

        }

        // mul-down
        export namespace MulDown {
            export const name = "mul-down";

            export interface MulDownArgs {
                a: UIntCV,
                b: UIntCV,
            }

            export function args(args: MulDownArgs): ClarityValue[] {
                return [
                    args.a,
                    args.b,
                ];
            }

        }

        // staking-active-at-cycle
        export namespace StakingActiveAtCycle {
            export const name = "staking-active-at-cycle";

            export interface StakingActiveAtCycleArgs {
                token: PrincipalCV,
                rewardCycle: UIntCV,
            }

            export function args(args: StakingActiveAtCycleArgs): ClarityValue[] {
                return [
                    args.token,
                    args.rewardCycle,
                ];
            }

        }

    }
}

export namespace PoxPools1CycleContract {
    export const address = "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM";
    export const name = "pox-pools-1-cycle";

    // Functions
    export namespace Functions {
        // allow-contract-caller
        export namespace AllowContractCaller {
            export const name = "allow-contract-caller";

            export interface AllowContractCallerArgs {
                caller: PrincipalCV,
                untilBurnHt: NoneCV,
            }

            export function args(args: AllowContractCallerArgs): ClarityValue[] {
                return [
                    args.caller,
                    args.untilBurnHt,
                ];
            }

        }

        // delegate-stack-stx
        export namespace DelegateStackStx {
            export const name = "delegate-stack-stx";

            export interface DelegateStackStxArgs {
                users: ListCV,
                poxAddress: TupleCV,
                startBurnHt: UIntCV,
            }

            export function args(args: DelegateStackStxArgs): ClarityValue[] {
                return [
                    args.users,
                    args.poxAddress,
                    args.startBurnHt,
                ];
            }

        }

        // delegate-stack-stx-simple
        export namespace DelegateStackStxSimple {
            export const name = "delegate-stack-stx-simple";

            export interface DelegateStackStxSimpleArgs {
                users: ListCV,
                poxAddress: TupleCV,
                startBurnHt: UIntCV,
            }

            export function args(args: DelegateStackStxSimpleArgs): ClarityValue[] {
                return [
                    args.users,
                    args.poxAddress,
                    args.startBurnHt,
                ];
            }

        }

        // delegate-stx
        export namespace DelegateStx {
            export const name = "delegate-stx";

            export interface DelegateStxArgs {
                amountUstx: UIntCV,
                delegateTo: PrincipalCV,
                untilBurnHt: OptionalCV,
                poolPoxAddr: OptionalCV,
                userPoxAddr: TupleCV,
                userMetadata: OptionalCV,
            }

            export function args(args: DelegateStxArgs): ClarityValue[] {
                return [
                    args.amountUstx,
                    args.delegateTo,
                    args.untilBurnHt,
                    args.poolPoxAddr,
                    args.userPoxAddr,
                    args.userMetadata,
                ];
            }

        }

        // disallow-contract-caller
        export namespace DisallowContractCaller {
            export const name = "disallow-contract-caller";

            export interface DisallowContractCallerArgs {
                caller: PrincipalCV,
            }

            export function args(args: DisallowContractCallerArgs): ClarityValue[] {
                return [
                    args.caller,
                ];
            }

        }

        // set-metadata
        export namespace SetMetadata {
            export const name = "set-metadata";

            export interface SetMetadataArgs {
                key: StringAsciiCV,
                value: StringAsciiCV,
            }

            export function args(args: SetMetadataArgs): ClarityValue[] {
                return [
                    args.key,
                    args.value,
                ];
            }

        }

        // set-metadata-many
        export namespace SetMetadataMany {
            export const name = "set-metadata-many";

            export interface SetMetadataManyArgs {
                keys: ListCV,
                values: ListCV,
            }

            export function args(args: SetMetadataManyArgs): ClarityValue[] {
                return [
                    args.keys,
                    args.values,
                ];
            }

        }

        // check-caller-allowed
        export namespace CheckCallerAllowed {
            export const name = "check-caller-allowed";

        }

        // get-allowance-contract-callers
        export namespace GetAllowanceContractCallers {
            export const name = "get-allowance-contract-callers";

            export interface GetAllowanceContractCallersArgs {
                sender: PrincipalCV,
                callingContract: PrincipalCV,
            }

            export function args(args: GetAllowanceContractCallersArgs): ClarityValue[] {
                return [
                    args.sender,
                    args.callingContract,
                ];
            }

        }

        // get-delegated-amount
        export namespace GetDelegatedAmount {
            export const name = "get-delegated-amount";

            export interface GetDelegatedAmountArgs {
                user: PrincipalCV,
            }

            export function args(args: GetDelegatedAmountArgs): ClarityValue[] {
                return [
                    args.user,
                ];
            }

        }

        // get-metadata
        export namespace GetMetadata {
            export const name = "get-metadata";

            export interface GetMetadataArgs {
                key: TupleCV,
            }

            export function args(args: GetMetadataArgs): ClarityValue[] {
                return [
                    args.key,
                ];
            }

        }

        // get-metadata-many
        export namespace GetMetadataMany {
            export const name = "get-metadata-many";

            export interface GetMetadataManyArgs {
                keys: ListCV,
            }

            export function args(args: GetMetadataManyArgs): ClarityValue[] {
                return [
                    args.keys,
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
                index: UIntCV,
            }

            export function args(args: GetStatusListArgs): ClarityValue[] {
                return [
                    args.pool,
                    args.rewardCycle,
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
            }

            export function args(args: GetStatusListsLastIndexArgs): ClarityValue[] {
                return [
                    args.pool,
                    args.rewardCycle,
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
            }

            export function args(args: GetTotalArgs): ClarityValue[] {
                return [
                    args.pool,
                    args.rewardCycle,
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

        // not-locked-for-cycle
        export namespace NotLockedForCycle {
            export const name = "not-locked-for-cycle";

            export interface NotLockedForCycleArgs {
                unlockBurnHeight: UIntCV,
                cycle: UIntCV,
            }

            export function args(args: NotLockedForCycleArgs): ClarityValue[] {
                return [
                    args.unlockBurnHeight,
                    args.cycle,
                ];
            }

        }

    }
}

export namespace SimpleEquationContract {
    export const address = "SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9";
    export const name = "simple-equation";

    // Functions
    export namespace Functions {
        // set-contract-owner
        export namespace SetContractOwner {
            export const name = "set-contract-owner";

            export interface SetContractOwnerArgs {
                newContractOwner: PrincipalCV,
            }

            export function args(args: SetContractOwnerArgs): ClarityValue[] {
                return [
                    args.newContractOwner,
                ];
            }

        }

        // set-max-in-ratio
        export namespace SetMaxInRatio {
            export const name = "set-max-in-ratio";

            export interface SetMaxInRatioArgs {
                newMaxInRatio: UIntCV,
            }

            export function args(args: SetMaxInRatioArgs): ClarityValue[] {
                return [
                    args.newMaxInRatio,
                ];
            }

        }

        // set-max-out-ratio
        export namespace SetMaxOutRatio {
            export const name = "set-max-out-ratio";

            export interface SetMaxOutRatioArgs {
                newMaxOutRatio: UIntCV,
            }

            export function args(args: SetMaxOutRatioArgs): ClarityValue[] {
                return [
                    args.newMaxOutRatio,
                ];
            }

        }

        // div-down
        export namespace DivDown {
            export const name = "div-down";

            export interface DivDownArgs {
                a: UIntCV,
                b: UIntCV,
            }

            export function args(args: DivDownArgs): ClarityValue[] {
                return [
                    args.a,
                    args.b,
                ];
            }

        }

        // div-up
        export namespace DivUp {
            export const name = "div-up";

            export interface DivUpArgs {
                a: UIntCV,
                b: UIntCV,
            }

            export function args(args: DivUpArgs): ClarityValue[] {
                return [
                    args.a,
                    args.b,
                ];
            }

        }

        // exp-fixed
        export namespace ExpFixed {
            export const name = "exp-fixed";

            export interface ExpFixedArgs {
                x: IntCV,
            }

            export function args(args: ExpFixedArgs): ClarityValue[] {
                return [
                    args.x,
                ];
            }

        }

        // exp-pos
        export namespace ExpPos {
            export const name = "exp-pos";

            export interface ExpPosArgs {
                x: IntCV,
            }

            export function args(args: ExpPosArgs): ClarityValue[] {
                return [
                    args.x,
                ];
            }

        }

        // get-contract-owner
        export namespace GetContractOwner {
            export const name = "get-contract-owner";

        }

        // get-invariant
        export namespace GetInvariant {
            export const name = "get-invariant";

            export interface GetInvariantArgs {
                balanceX: UIntCV,
                balanceY: UIntCV,
            }

            export function args(args: GetInvariantArgs): ClarityValue[] {
                return [
                    args.balanceX,
                    args.balanceY,
                ];
            }

        }

        // get-max-in-ratio
        export namespace GetMaxInRatio {
            export const name = "get-max-in-ratio";

        }

        // get-max-out-ratio
        export namespace GetMaxOutRatio {
            export const name = "get-max-out-ratio";

        }

        // get-position-given-burn
        export namespace GetPositionGivenBurn {
            export const name = "get-position-given-burn";

            export interface GetPositionGivenBurnArgs {
                balanceX: UIntCV,
                balanceY: UIntCV,
                totalSupply: UIntCV,
                token: UIntCV,
            }

            export function args(args: GetPositionGivenBurnArgs): ClarityValue[] {
                return [
                    args.balanceX,
                    args.balanceY,
                    args.totalSupply,
                    args.token,
                ];
            }

        }

        // get-position-given-mint
        export namespace GetPositionGivenMint {
            export const name = "get-position-given-mint";

            export interface GetPositionGivenMintArgs {
                balanceX: UIntCV,
                balanceY: UIntCV,
                totalSupply: UIntCV,
                token: UIntCV,
            }

            export function args(args: GetPositionGivenMintArgs): ClarityValue[] {
                return [
                    args.balanceX,
                    args.balanceY,
                    args.totalSupply,
                    args.token,
                ];
            }

        }

        // get-token-given-position
        export namespace GetTokenGivenPosition {
            export const name = "get-token-given-position";

            export interface GetTokenGivenPositionArgs {
                balanceX: UIntCV,
                balanceY: UIntCV,
                totalSupply: UIntCV,
                dx: UIntCV,
                dy: UIntCV,
            }

            export function args(args: GetTokenGivenPositionArgs): ClarityValue[] {
                return [
                    args.balanceX,
                    args.balanceY,
                    args.totalSupply,
                    args.dx,
                    args.dy,
                ];
            }

        }

        // get-x-given-price
        export namespace GetXGivenPrice {
            export const name = "get-x-given-price";

            export interface GetXGivenPriceArgs {
                balanceX: UIntCV,
                balanceY: UIntCV,
                price: UIntCV,
            }

            export function args(args: GetXGivenPriceArgs): ClarityValue[] {
                return [
                    args.balanceX,
                    args.balanceY,
                    args.price,
                ];
            }

        }

        // get-x-given-y
        export namespace GetXGivenY {
            export const name = "get-x-given-y";

            export interface GetXGivenYArgs {
                balanceX: UIntCV,
                balanceY: UIntCV,
                dy: UIntCV,
            }

            export function args(args: GetXGivenYArgs): ClarityValue[] {
                return [
                    args.balanceX,
                    args.balanceY,
                    args.dy,
                ];
            }

        }

        // get-x-in-given-y-out
        export namespace GetXInGivenYOut {
            export const name = "get-x-in-given-y-out";

            export interface GetXInGivenYOutArgs {
                balanceX: UIntCV,
                balanceY: UIntCV,
                dy: UIntCV,
            }

            export function args(args: GetXInGivenYOutArgs): ClarityValue[] {
                return [
                    args.balanceX,
                    args.balanceY,
                    args.dy,
                ];
            }

        }

        // get-y-given-price
        export namespace GetYGivenPrice {
            export const name = "get-y-given-price";

            export interface GetYGivenPriceArgs {
                balanceX: UIntCV,
                balanceY: UIntCV,
                price: UIntCV,
            }

            export function args(args: GetYGivenPriceArgs): ClarityValue[] {
                return [
                    args.balanceX,
                    args.balanceY,
                    args.price,
                ];
            }

        }

        // get-y-given-x
        export namespace GetYGivenX {
            export const name = "get-y-given-x";

            export interface GetYGivenXArgs {
                balanceX: UIntCV,
                balanceY: UIntCV,
                dx: UIntCV,
            }

            export function args(args: GetYGivenXArgs): ClarityValue[] {
                return [
                    args.balanceX,
                    args.balanceY,
                    args.dx,
                ];
            }

        }

        // get-y-in-given-x-out
        export namespace GetYInGivenXOut {
            export const name = "get-y-in-given-x-out";

            export interface GetYInGivenXOutArgs {
                balanceX: UIntCV,
                balanceY: UIntCV,
                dx: UIntCV,
            }

            export function args(args: GetYInGivenXOutArgs): ClarityValue[] {
                return [
                    args.balanceX,
                    args.balanceY,
                    args.dx,
                ];
            }

        }

        // ln-fixed
        export namespace LnFixed {
            export const name = "ln-fixed";

            export interface LnFixedArgs {
                a: IntCV,
            }

            export function args(args: LnFixedArgs): ClarityValue[] {
                return [
                    args.a,
                ];
            }

        }

        // log-fixed
        export namespace LogFixed {
            export const name = "log-fixed";

            export interface LogFixedArgs {
                arg: IntCV,
                base: IntCV,
            }

            export function args(args: LogFixedArgs): ClarityValue[] {
                return [
                    args.arg,
                    args.base,
                ];
            }

        }

        // mul-down
        export namespace MulDown {
            export const name = "mul-down";

            export interface MulDownArgs {
                a: UIntCV,
                b: UIntCV,
            }

            export function args(args: MulDownArgs): ClarityValue[] {
                return [
                    args.a,
                    args.b,
                ];
            }

        }

        // mul-up
        export namespace MulUp {
            export const name = "mul-up";

            export interface MulUpArgs {
                a: UIntCV,
                b: UIntCV,
            }

            export function args(args: MulUpArgs): ClarityValue[] {
                return [
                    args.a,
                    args.b,
                ];
            }

        }

        // pow-down
        export namespace PowDown {
            export const name = "pow-down";

            export interface PowDownArgs {
                a: UIntCV,
                b: UIntCV,
            }

            export function args(args: PowDownArgs): ClarityValue[] {
                return [
                    args.a,
                    args.b,
                ];
            }

        }

        // pow-fixed
        export namespace PowFixed {
            export const name = "pow-fixed";

            export interface PowFixedArgs {
                x: UIntCV,
                y: UIntCV,
            }

            export function args(args: PowFixedArgs): ClarityValue[] {
                return [
                    args.x,
                    args.y,
                ];
            }

        }

        // pow-priv
        export namespace PowPriv {
            export const name = "pow-priv";

            export interface PowPrivArgs {
                x: UIntCV,
                y: UIntCV,
            }

            export function args(args: PowPrivArgs): ClarityValue[] {
                return [
                    args.x,
                    args.y,
                ];
            }

        }

        // pow-up
        export namespace PowUp {
            export const name = "pow-up";

            export interface PowUpArgs {
                a: UIntCV,
                b: UIntCV,
            }

            export function args(args: PowUpArgs): ClarityValue[] {
                return [
                    args.a,
                    args.b,
                ];
            }

        }

        // scale-down
        export namespace ScaleDown {
            export const name = "scale-down";

            export interface ScaleDownArgs {
                a: UIntCV,
            }

            export function args(args: ScaleDownArgs): ClarityValue[] {
                return [
                    args.a,
                ];
            }

        }

        // scale-up
        export namespace ScaleUp {
            export const name = "scale-up";

            export interface ScaleUpArgs {
                a: UIntCV,
            }

            export function args(args: ScaleUpArgs): ClarityValue[] {
                return [
                    args.a,
                ];
            }

        }

    }
}

export namespace WrappedBitcoinContract {
    export const address = "SP3DX3H4FEYZJZ586MFBS25ZW3HZDMEW92260R2PR";
    export const name = "Wrapped-Bitcoin";

    // Functions
    export namespace Functions {
        // add-principal-to-role
        export namespace AddPrincipalToRole {
            export const name = "add-principal-to-role";

            export interface AddPrincipalToRoleArgs {
                roleToAdd: UIntCV,
                principalToAdd: PrincipalCV,
            }

            export function args(args: AddPrincipalToRoleArgs): ClarityValue[] {
                return [
                    args.roleToAdd,
                    args.principalToAdd,
                ];
            }

        }

        // burn-tokens
        export namespace BurnTokens {
            export const name = "burn-tokens";

            export interface BurnTokensArgs {
                burnAmount: UIntCV,
                burnFrom: PrincipalCV,
            }

            export function args(args: BurnTokensArgs): ClarityValue[] {
                return [
                    args.burnAmount,
                    args.burnFrom,
                ];
            }

        }

        // initialize
        export namespace Initialize {
            export const name = "initialize";

            export interface InitializeArgs {
                nameToSet: StringAsciiCV,
                symbolToSet: StringAsciiCV,
                decimalsToSet: UIntCV,
                initialOwner: PrincipalCV,
            }

            export function args(args: InitializeArgs): ClarityValue[] {
                return [
                    args.nameToSet,
                    args.symbolToSet,
                    args.decimalsToSet,
                    args.initialOwner,
                ];
            }

        }

        // mint-tokens
        export namespace MintTokens {
            export const name = "mint-tokens";

            export interface MintTokensArgs {
                mintAmount: UIntCV,
                mintTo: PrincipalCV,
            }

            export function args(args: MintTokensArgs): ClarityValue[] {
                return [
                    args.mintAmount,
                    args.mintTo,
                ];
            }

        }

        // remove-principal-from-role
        export namespace RemovePrincipalFromRole {
            export const name = "remove-principal-from-role";

            export interface RemovePrincipalFromRoleArgs {
                roleToRemove: UIntCV,
                principalToRemove: PrincipalCV,
            }

            export function args(args: RemovePrincipalFromRoleArgs): ClarityValue[] {
                return [
                    args.roleToRemove,
                    args.principalToRemove,
                ];
            }

        }

        // revoke-tokens
        export namespace RevokeTokens {
            export const name = "revoke-tokens";

            export interface RevokeTokensArgs {
                revokeAmount: UIntCV,
                revokeFrom: PrincipalCV,
                revokeTo: PrincipalCV,
            }

            export function args(args: RevokeTokensArgs): ClarityValue[] {
                return [
                    args.revokeAmount,
                    args.revokeFrom,
                    args.revokeTo,
                ];
            }

        }

        // set-token-uri
        export namespace SetTokenUri {
            export const name = "set-token-uri";

            export interface SetTokenUriArgs {
                updatedUri: StringUtf8CV,
            }

            export function args(args: SetTokenUriArgs): ClarityValue[] {
                return [
                    args.updatedUri,
                ];
            }

        }

        // transfer
        export namespace Transfer {
            export const name = "transfer";

            export interface TransferArgs {
                amount: UIntCV,
                sender: PrincipalCV,
                recipient: PrincipalCV,
                memo: NoneCV,
            }

            export function args(args: TransferArgs): ClarityValue[] {
                return [
                    args.amount,
                    args.sender,
                    args.recipient,
                    args.memo,
                ];
            }

        }

        // update-blacklisted
        export namespace UpdateBlacklisted {
            export const name = "update-blacklisted";

            export interface UpdateBlacklistedArgs {
                principalToUpdate: PrincipalCV,
                setBlacklisted: BooleanCV,
            }

            export function args(args: UpdateBlacklistedArgs): ClarityValue[] {
                return [
                    args.principalToUpdate,
                    args.setBlacklisted,
                ];
            }

        }

        // detect-transfer-restriction
        export namespace DetectTransferRestriction {
            export const name = "detect-transfer-restriction";

            export interface DetectTransferRestrictionArgs {
                amount: UIntCV,
                sender: PrincipalCV,
                recipient: PrincipalCV,
            }

            export function args(args: DetectTransferRestrictionArgs): ClarityValue[] {
                return [
                    args.amount,
                    args.sender,
                    args.recipient,
                ];
            }

        }

        // get-balance
        export namespace GetBalance {
            export const name = "get-balance";

            export interface GetBalanceArgs {
                owner: PrincipalCV,
            }

            export function args(args: GetBalanceArgs): ClarityValue[] {
                return [
                    args.owner,
                ];
            }

        }

        // get-decimals
        export namespace GetDecimals {
            export const name = "get-decimals";

        }

        // get-name
        export namespace GetName {
            export const name = "get-name";

        }

        // get-symbol
        export namespace GetSymbol {
            export const name = "get-symbol";

        }

        // get-token-uri
        export namespace GetTokenUri {
            export const name = "get-token-uri";

        }

        // get-total-supply
        export namespace GetTotalSupply {
            export const name = "get-total-supply";

        }

        // has-role
        export namespace HasRole {
            export const name = "has-role";

            export interface HasRoleArgs {
                roleToCheck: UIntCV,
                principalToCheck: PrincipalCV,
            }

            export function args(args: HasRoleArgs): ClarityValue[] {
                return [
                    args.roleToCheck,
                    args.principalToCheck,
                ];
            }

        }

        // is-blacklisted
        export namespace IsBlacklisted {
            export const name = "is-blacklisted";

            export interface IsBlacklistedArgs {
                principalToCheck: PrincipalCV,
            }

            export function args(args: IsBlacklistedArgs): ClarityValue[] {
                return [
                    args.principalToCheck,
                ];
            }

        }

        // message-for-restriction
        export namespace MessageForRestriction {
            export const name = "message-for-restriction";

            export interface MessageForRestrictionArgs {
                restrictionCode: UIntCV,
            }

            export function args(args: MessageForRestrictionArgs): ClarityValue[] {
                return [
                    args.restrictionCode,
                ];
            }

        }

    }
}

export namespace TokenWbtcContract {
    export const address = "SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9";
    export const name = "token-wbtc";

    // Functions
    export namespace Functions {
        // burn
        export namespace Burn {
            export const name = "burn";

            export interface BurnArgs {
                amount: UIntCV,
                sender: PrincipalCV,
            }

            export function args(args: BurnArgs): ClarityValue[] {
                return [
                    args.amount,
                    args.sender,
                ];
            }

        }

        // burn-fixed
        export namespace BurnFixed {
            export const name = "burn-fixed";

            export interface BurnFixedArgs {
                amount: UIntCV,
                sender: PrincipalCV,
            }

            export function args(args: BurnFixedArgs): ClarityValue[] {
                return [
                    args.amount,
                    args.sender,
                ];
            }

        }

        // mint
        export namespace Mint {
            export const name = "mint";

            export interface MintArgs {
                amount: UIntCV,
                recipient: PrincipalCV,
            }

            export function args(args: MintArgs): ClarityValue[] {
                return [
                    args.amount,
                    args.recipient,
                ];
            }

        }

        // mint-fixed
        export namespace MintFixed {
            export const name = "mint-fixed";

            export interface MintFixedArgs {
                amount: UIntCV,
                recipient: PrincipalCV,
            }

            export function args(args: MintFixedArgs): ClarityValue[] {
                return [
                    args.amount,
                    args.recipient,
                ];
            }

        }

        // send-many
        export namespace SendMany {
            export const name = "send-many";

            export interface SendManyArgs {
                recipients: ListCV,
            }

            export function args(args: SendManyArgs): ClarityValue[] {
                return [
                    args.recipients,
                ];
            }

        }

        // set-contract-owner
        export namespace SetContractOwner {
            export const name = "set-contract-owner";

            export interface SetContractOwnerArgs {
                owner: PrincipalCV,
            }

            export function args(args: SetContractOwnerArgs): ClarityValue[] {
                return [
                    args.owner,
                ];
            }

        }

        // set-decimals
        export namespace SetDecimals {
            export const name = "set-decimals";

            export interface SetDecimalsArgs {
                newDecimals: UIntCV,
            }

            export function args(args: SetDecimalsArgs): ClarityValue[] {
                return [
                    args.newDecimals,
                ];
            }

        }

        // set-name
        export namespace SetName {
            export const name = "set-name";

            export interface SetNameArgs {
                newName: StringAsciiCV,
            }

            export function args(args: SetNameArgs): ClarityValue[] {
                return [
                    args.newName,
                ];
            }

        }

        // set-symbol
        export namespace SetSymbol {
            export const name = "set-symbol";

            export interface SetSymbolArgs {
                newSymbol: StringAsciiCV,
            }

            export function args(args: SetSymbolArgs): ClarityValue[] {
                return [
                    args.newSymbol,
                ];
            }

        }

        // set-token-uri
        export namespace SetTokenUri {
            export const name = "set-token-uri";

            export interface SetTokenUriArgs {
                newUri: NoneCV,
            }

            export function args(args: SetTokenUriArgs): ClarityValue[] {
                return [
                    args.newUri,
                ];
            }

        }

        // transfer
        export namespace Transfer {
            export const name = "transfer";

            export interface TransferArgs {
                amount: UIntCV,
                sender: PrincipalCV,
                recipient: PrincipalCV,
                memo: NoneCV,
            }

            export function args(args: TransferArgs): ClarityValue[] {
                return [
                    args.amount,
                    args.sender,
                    args.recipient,
                    args.memo,
                ];
            }

        }

        // transfer-fixed
        export namespace TransferFixed {
            export const name = "transfer-fixed";

            export interface TransferFixedArgs {
                amount: UIntCV,
                sender: PrincipalCV,
                recipient: PrincipalCV,
                memo: NoneCV,
            }

            export function args(args: TransferFixedArgs): ClarityValue[] {
                return [
                    args.amount,
                    args.sender,
                    args.recipient,
                    args.memo,
                ];
            }

        }

        // fixed-to-decimals
        export namespace FixedToDecimals {
            export const name = "fixed-to-decimals";

            export interface FixedToDecimalsArgs {
                amount: UIntCV,
            }

            export function args(args: FixedToDecimalsArgs): ClarityValue[] {
                return [
                    args.amount,
                ];
            }

        }

        // get-balance
        export namespace GetBalance {
            export const name = "get-balance";

            export interface GetBalanceArgs {
                account: PrincipalCV,
            }

            export function args(args: GetBalanceArgs): ClarityValue[] {
                return [
                    args.account,
                ];
            }

        }

        // get-balance-fixed
        export namespace GetBalanceFixed {
            export const name = "get-balance-fixed";

            export interface GetBalanceFixedArgs {
                account: PrincipalCV,
            }

            export function args(args: GetBalanceFixedArgs): ClarityValue[] {
                return [
                    args.account,
                ];
            }

        }

        // get-contract-owner
        export namespace GetContractOwner {
            export const name = "get-contract-owner";

        }

        // get-decimals
        export namespace GetDecimals {
            export const name = "get-decimals";

        }

        // get-name
        export namespace GetName {
            export const name = "get-name";

        }

        // get-symbol
        export namespace GetSymbol {
            export const name = "get-symbol";

        }

        // get-token-uri
        export namespace GetTokenUri {
            export const name = "get-token-uri";

        }

        // get-total-supply
        export namespace GetTotalSupply {
            export const name = "get-total-supply";

        }

        // get-total-supply-fixed
        export namespace GetTotalSupplyFixed {
            export const name = "get-total-supply-fixed";

        }

    }
}

export namespace TraitVaultContract {
    export const address = "SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9";
    export const name = "trait-vault";

}

export namespace PoxPoolSelfServiceContract {
    export const address = "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM";
    export const name = "pox-pool-self-service";

    // Functions
    export namespace Functions {
        // allow-contract-caller
        export namespace AllowContractCaller {
            export const name = "allow-contract-caller";

            export interface AllowContractCallerArgs {
                caller: PrincipalCV,
                untilBurnHt: NoneCV,
            }

            export function args(args: AllowContractCallerArgs): ClarityValue[] {
                return [
                    args.caller,
                    args.untilBurnHt,
                ];
            }

        }

        // delegate-stack-stx
        export namespace DelegateStackStx {
            export const name = "delegate-stack-stx";

            export interface DelegateStackStxArgs {
                user: PrincipalCV,
            }

            export function args(args: DelegateStackStxArgs): ClarityValue[] {
                return [
                    args.user,
                ];
            }

        }

        // delegate-stack-stx-many
        export namespace DelegateStackStxMany {
            export const name = "delegate-stack-stx-many";

            export interface DelegateStackStxManyArgs {
                users: ListCV,
            }

            export function args(args: DelegateStackStxManyArgs): ClarityValue[] {
                return [
                    args.users,
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

        // disallow-contract-caller
        export namespace DisallowContractCaller {
            export const name = "disallow-contract-caller";

            export interface DisallowContractCallerArgs {
                caller: PrincipalCV,
            }

            export function args(args: DisallowContractCallerArgs): ClarityValue[] {
                return [
                    args.caller,
                ];
            }

        }

        // set-active
        export namespace SetActive {
            export const name = "set-active";

            export interface SetActiveArgs {
                isActive: BooleanCV,
            }

            export function args(args: SetActiveArgs): ClarityValue[] {
                return [
                    args.isActive,
                ];
            }

        }

        // set-pool-pox-address
        export namespace SetPoolPoxAddress {
            export const name = "set-pool-pox-address";

            export interface SetPoolPoxAddressArgs {
                poxAddr: TupleCV,
            }

            export function args(args: SetPoolPoxAddressArgs): ClarityValue[] {
                return [
                    args.poxAddr,
                ];
            }

        }

        // set-reward-admin
        export namespace SetRewardAdmin {
            export const name = "set-reward-admin";

            export interface SetRewardAdminArgs {
                newAdmin: PrincipalCV,
                enable: BooleanCV,
            }

            export function args(args: SetRewardAdminArgs): ClarityValue[] {
                return [
                    args.newAdmin,
                    args.enable,
                ];
            }

        }

        // set-stx-buffer
        export namespace SetStxBuffer {
            export const name = "set-stx-buffer";

            export interface SetStxBufferArgs {
                amountUstx: UIntCV,
            }

            export function args(args: SetStxBufferArgs): ClarityValue[] {
                return [
                    args.amountUstx,
                ];
            }

        }

        // can-lock-now
        export namespace CanLockNow {
            export const name = "can-lock-now";

            export interface CanLockNowArgs {
                cycle: UIntCV,
            }

            export function args(args: CanLockNowArgs): ClarityValue[] {
                return [
                    args.cycle,
                ];
            }

        }

        // check-caller-allowed
        export namespace CheckCallerAllowed {
            export const name = "check-caller-allowed";

        }

        // get-allowance-contract-callers
        export namespace GetAllowanceContractCallers {
            export const name = "get-allowance-contract-callers";

            export interface GetAllowanceContractCallersArgs {
                sender: PrincipalCV,
                callingContract: PrincipalCV,
            }

            export function args(args: GetAllowanceContractCallersArgs): ClarityValue[] {
                return [
                    args.sender,
                    args.callingContract,
                ];
            }

        }

        // get-delegated-amount
        export namespace GetDelegatedAmount {
            export const name = "get-delegated-amount";

            export interface GetDelegatedAmountArgs {
                user: PrincipalCV,
            }

            export function args(args: GetDelegatedAmountArgs): ClarityValue[] {
                return [
                    args.user,
                ];
            }

        }

        // get-last-aggregation
        export namespace GetLastAggregation {
            export const name = "get-last-aggregation";

            export interface GetLastAggregationArgs {
                cycle: UIntCV,
            }

            export function args(args: GetLastAggregationArgs): ClarityValue[] {
                return [
                    args.cycle,
                ];
            }

        }

        // get-pool-pox-address
        export namespace GetPoolPoxAddress {
            export const name = "get-pool-pox-address";

        }

        // get-pox-addr-index
        export namespace GetPoxAddrIndex {
            export const name = "get-pox-addr-index";

            export interface GetPoxAddrIndexArgs {
                cycle: UIntCV,
            }

            export function args(args: GetPoxAddrIndexArgs): ClarityValue[] {
                return [
                    args.cycle,
                ];
            }

        }

        // get-reward-set
        export namespace GetRewardSet {
            export const name = "get-reward-set";

            export interface GetRewardSetArgs {
                rewardCycle: UIntCV,
            }

            export function args(args: GetRewardSetArgs): ClarityValue[] {
                return [
                    args.rewardCycle,
                ];
            }

        }

        // get-reward-set-at-block
        export namespace GetRewardSetAtBlock {
            export const name = "get-reward-set-at-block";

            export interface GetRewardSetAtBlockArgs {
                rewardCycle: UIntCV,
                stacksHeight: UIntCV,
            }

            export function args(args: GetRewardSetAtBlockArgs): ClarityValue[] {
                return [
                    args.rewardCycle,
                    args.stacksHeight,
                ];
            }

        }

        // is-admin-enabled
        export namespace IsAdminEnabled {
            export const name = "is-admin-enabled";

            export interface IsAdminEnabledArgs {
                admin: PrincipalCV,
            }

            export function args(args: IsAdminEnabledArgs): ClarityValue[] {
                return [
                    args.admin,
                ];
            }

        }

        // not-locked-for-cycle
        export namespace NotLockedForCycle {
            export const name = "not-locked-for-cycle";

            export interface NotLockedForCycleArgs {
                unlockBurnHeight: UIntCV,
                cycle: UIntCV,
            }

            export function args(args: NotLockedForCycleArgs): ClarityValue[] {
                return [
                    args.unlockBurnHeight,
                    args.cycle,
                ];
            }

        }

    }
}

export namespace PayoutSelfServiceContract {
    export const address = "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM";
    export const name = "payout-self-service";

    // Functions
    export namespace Functions {
        // allocate-funds
        export namespace AllocateFunds {
            export const name = "allocate-funds";

            export interface AllocateFundsArgs {
                amount: UIntCV,
                cycle: UIntCV,
            }

            export function args(args: AllocateFundsArgs): ClarityValue[] {
                return [
                    args.amount,
                    args.cycle,
                ];
            }

        }

        // deposit-rewards
        export namespace DepositRewards {
            export const name = "deposit-rewards";

            export interface DepositRewardsArgs {
                amount: UIntCV,
                cycle: UIntCV,
            }

            export function args(args: DepositRewardsArgs): ClarityValue[] {
                return [
                    args.amount,
                    args.cycle,
                ];
            }

        }

        // desallocate-funds
        export namespace DesallocateFunds {
            export const name = "desallocate-funds";

            export interface DesallocateFundsArgs {
                amount: UIntCV,
                cycle: UIntCV,
            }

            export function args(args: DesallocateFundsArgs): ClarityValue[] {
                return [
                    args.amount,
                    args.cycle,
                ];
            }

        }

        // distribute-rewards
        export namespace DistributeRewards {
            export const name = "distribute-rewards";

            export interface DistributeRewardsArgs {
                user: PrincipalCV,
                rewardId: UIntCV,
            }

            export function args(args: DistributeRewardsArgs): ClarityValue[] {
                return [
                    args.user,
                    args.rewardId,
                ];
            }

        }

        // distribute-rewards-many
        export namespace DistributeRewardsMany {
            export const name = "distribute-rewards-many";

            export interface DistributeRewardsManyArgs {
                users: ListCV,
                rewardId: UIntCV,
            }

            export function args(args: DistributeRewardsManyArgs): ClarityValue[] {
                return [
                    args.users,
                    args.rewardId,
                ];
            }

        }

        // set-rewards-admin
        export namespace SetRewardsAdmin {
            export const name = "set-rewards-admin";

            export interface SetRewardsAdminArgs {
                newAdmin: PrincipalCV,
            }

            export function args(args: SetRewardsAdminArgs): ClarityValue[] {
                return [
                    args.newAdmin,
                ];
            }

        }

        // swap-xbtc-to-stx
        export namespace SwapXbtcToStx {
            export const name = "swap-xbtc-to-stx";

            export interface SwapXbtcToStxArgs {
                xbtcAmount: UIntCV,
                slippeage: UIntCV,
            }

            export function args(args: SwapXbtcToStxArgs): ClarityValue[] {
                return [
                    args.xbtcAmount,
                    args.slippeage,
                ];
            }

        }

        // withdraw-rewards
        export namespace WithdrawRewards {
            export const name = "withdraw-rewards";

            export interface WithdrawRewardsArgs {
                rewardsId: UIntCV,
            }

            export function args(args: WithdrawRewardsArgs): ClarityValue[] {
                return [
                    args.rewardsId,
                ];
            }

        }

        // is-rewards-admin
        export namespace IsRewardsAdmin {
            export const name = "is-rewards-admin";

        }

    }
}

export namespace AlexVaultContract {
    export const address = "SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9";
    export const name = "alex-vault";

    // Functions
    export namespace Functions {
        // add-approved-contract
        export namespace AddApprovedContract {
            export const name = "add-approved-contract";

            export interface AddApprovedContractArgs {
                newApprovedContract: PrincipalCV,
            }

            export function args(args: AddApprovedContractArgs): ClarityValue[] {
                return [
                    args.newApprovedContract,
                ];
            }

        }

        // add-approved-flash-loan-user
        export namespace AddApprovedFlashLoanUser {
            export const name = "add-approved-flash-loan-user";

            export interface AddApprovedFlashLoanUserArgs {
                newApprovedFlashLoanUser: PrincipalCV,
            }

            export function args(args: AddApprovedFlashLoanUserArgs): ClarityValue[] {
                return [
                    args.newApprovedFlashLoanUser,
                ];
            }

        }

        // add-approved-token
        export namespace AddApprovedToken {
            export const name = "add-approved-token";

            export interface AddApprovedTokenArgs {
                newApprovedToken: PrincipalCV,
            }

            export function args(args: AddApprovedTokenArgs): ClarityValue[] {
                return [
                    args.newApprovedToken,
                ];
            }

        }

        // flash-loan
        export namespace FlashLoan {
            export const name = "flash-loan";

            export interface FlashLoanArgs {
                flashLoanUser: ClarityValue,
                token: ClarityValue,
                amount: UIntCV,
                memo: NoneCV,
            }

            export function args(args: FlashLoanArgs): ClarityValue[] {
                return [
                    args.flashLoanUser,
                    args.token,
                    args.amount,
                    args.memo,
                ];
            }

        }

        // get-balance
        export namespace GetBalance {
            export const name = "get-balance";

            export interface GetBalanceArgs {
                token: ClarityValue,
            }

            export function args(args: GetBalanceArgs): ClarityValue[] {
                return [
                    args.token,
                ];
            }

        }

        // set-contract-owner
        export namespace SetContractOwner {
            export const name = "set-contract-owner";

            export interface SetContractOwnerArgs {
                owner: PrincipalCV,
            }

            export function args(args: SetContractOwnerArgs): ClarityValue[] {
                return [
                    args.owner,
                ];
            }

        }

        // set-flash-loan-fee-rate
        export namespace SetFlashLoanFeeRate {
            export const name = "set-flash-loan-fee-rate";

            export interface SetFlashLoanFeeRateArgs {
                fee: UIntCV,
            }

            export function args(args: SetFlashLoanFeeRateArgs): ClarityValue[] {
                return [
                    args.fee,
                ];
            }

        }

        // transfer-ft
        export namespace TransferFt {
            export const name = "transfer-ft";

            export interface TransferFtArgs {
                token: ClarityValue,
                amount: UIntCV,
                recipient: PrincipalCV,
            }

            export function args(args: TransferFtArgs): ClarityValue[] {
                return [
                    args.token,
                    args.amount,
                    args.recipient,
                ];
            }

        }

        // transfer-ft-two
        export namespace TransferFtTwo {
            export const name = "transfer-ft-two";

            export interface TransferFtTwoArgs {
                tokenXTrait: ClarityValue,
                dx: UIntCV,
                tokenYTrait: ClarityValue,
                dy: UIntCV,
                recipient: PrincipalCV,
            }

            export function args(args: TransferFtTwoArgs): ClarityValue[] {
                return [
                    args.tokenXTrait,
                    args.dx,
                    args.tokenYTrait,
                    args.dy,
                    args.recipient,
                ];
            }

        }

        // transfer-sft
        export namespace TransferSft {
            export const name = "transfer-sft";

            export interface TransferSftArgs {
                token: ClarityValue,
                tokenId: UIntCV,
                amount: UIntCV,
                recipient: PrincipalCV,
            }

            export function args(args: TransferSftArgs): ClarityValue[] {
                return [
                    args.token,
                    args.tokenId,
                    args.amount,
                    args.recipient,
                ];
            }

        }

        // get-contract-owner
        export namespace GetContractOwner {
            export const name = "get-contract-owner";

        }

        // get-flash-loan-fee-rate
        export namespace GetFlashLoanFeeRate {
            export const name = "get-flash-loan-fee-rate";

        }

        // mul-down
        export namespace MulDown {
            export const name = "mul-down";

            export interface MulDownArgs {
                a: UIntCV,
                b: UIntCV,
            }

            export function args(args: MulDownArgs): ClarityValue[] {
                return [
                    args.a,
                    args.b,
                ];
            }

        }

        // mul-up
        export namespace MulUp {
            export const name = "mul-up";

            export interface MulUpArgs {
                a: UIntCV,
                b: UIntCV,
            }

            export function args(args: MulUpArgs): ClarityValue[] {
                return [
                    args.a,
                    args.b,
                ];
            }

        }

    }
}

export namespace TraitSemiFungibleContract {
    export const address = "SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9";
    export const name = "trait-semi-fungible";

}

export namespace FtTraitContract {
    export const address = "SP3DX3H4FEYZJZ586MFBS25ZW3HZDMEW92260R2PR";
    export const name = "ft-trait";

}

export namespace ExtensionTraitContract {
    export const address = "SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9";
    export const name = "extension-trait";

}

export namespace TraitOwnableContract {
    export const address = "SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9";
    export const name = "trait-ownable";

}

export namespace TraitSip010Contract {
    export const address = "SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9";
    export const name = "trait-sip-010";

}

export namespace Age000GovernanceTokenContract {
    export const address = "SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9";
    export const name = "age000-governance-token";

    // Functions
    export namespace Functions {
        // burn
        export namespace Burn {
            export const name = "burn";

            export interface BurnArgs {
                amount: UIntCV,
                sender: PrincipalCV,
            }

            export function args(args: BurnArgs): ClarityValue[] {
                return [
                    args.amount,
                    args.sender,
                ];
            }

        }

        // burn-fixed
        export namespace BurnFixed {
            export const name = "burn-fixed";

            export interface BurnFixedArgs {
                amount: UIntCV,
                sender: PrincipalCV,
            }

            export function args(args: BurnFixedArgs): ClarityValue[] {
                return [
                    args.amount,
                    args.sender,
                ];
            }

        }

        // callback
        export namespace Callback {
            export const name = "callback";

            export interface CallbackArgs {
                sender: PrincipalCV,
                memo: BufferCV,
            }

            export function args(args: CallbackArgs): ClarityValue[] {
                return [
                    args.sender,
                    args.memo,
                ];
            }

        }

        // edg-add-approved-contract
        export namespace EdgAddApprovedContract {
            export const name = "edg-add-approved-contract";

            export interface EdgAddApprovedContractArgs {
                newApprovedContract: PrincipalCV,
            }

            export function args(args: EdgAddApprovedContractArgs): ClarityValue[] {
                return [
                    args.newApprovedContract,
                ];
            }

        }

        // edg-burn
        export namespace EdgBurn {
            export const name = "edg-burn";

            export interface EdgBurnArgs {
                amount: UIntCV,
                owner: PrincipalCV,
            }

            export function args(args: EdgBurnArgs): ClarityValue[] {
                return [
                    args.amount,
                    args.owner,
                ];
            }

        }

        // edg-lock
        export namespace EdgLock {
            export const name = "edg-lock";

            export interface EdgLockArgs {
                amount: UIntCV,
                owner: PrincipalCV,
            }

            export function args(args: EdgLockArgs): ClarityValue[] {
                return [
                    args.amount,
                    args.owner,
                ];
            }

        }

        // edg-mint
        export namespace EdgMint {
            export const name = "edg-mint";

            export interface EdgMintArgs {
                amount: UIntCV,
                recipient: PrincipalCV,
            }

            export function args(args: EdgMintArgs): ClarityValue[] {
                return [
                    args.amount,
                    args.recipient,
                ];
            }

        }

        // edg-mint-many
        export namespace EdgMintMany {
            export const name = "edg-mint-many";

            export interface EdgMintManyArgs {
                recipients: ListCV,
            }

            export function args(args: EdgMintManyArgs): ClarityValue[] {
                return [
                    args.recipients,
                ];
            }

        }

        // edg-transfer
        export namespace EdgTransfer {
            export const name = "edg-transfer";

            export interface EdgTransferArgs {
                amount: UIntCV,
                sender: PrincipalCV,
                recipient: PrincipalCV,
            }

            export function args(args: EdgTransferArgs): ClarityValue[] {
                return [
                    args.amount,
                    args.sender,
                    args.recipient,
                ];
            }

        }

        // edg-unlock
        export namespace EdgUnlock {
            export const name = "edg-unlock";

            export interface EdgUnlockArgs {
                amount: UIntCV,
                owner: PrincipalCV,
            }

            export function args(args: EdgUnlockArgs): ClarityValue[] {
                return [
                    args.amount,
                    args.owner,
                ];
            }

        }

        // is-dao-or-extension
        export namespace IsDaoOrExtension {
            export const name = "is-dao-or-extension";

        }

        // mint
        export namespace Mint {
            export const name = "mint";

            export interface MintArgs {
                amount: UIntCV,
                recipient: PrincipalCV,
            }

            export function args(args: MintArgs): ClarityValue[] {
                return [
                    args.amount,
                    args.recipient,
                ];
            }

        }

        // mint-fixed
        export namespace MintFixed {
            export const name = "mint-fixed";

            export interface MintFixedArgs {
                amount: UIntCV,
                recipient: PrincipalCV,
            }

            export function args(args: MintFixedArgs): ClarityValue[] {
                return [
                    args.amount,
                    args.recipient,
                ];
            }

        }

        // set-decimals
        export namespace SetDecimals {
            export const name = "set-decimals";

            export interface SetDecimalsArgs {
                newDecimals: UIntCV,
            }

            export function args(args: SetDecimalsArgs): ClarityValue[] {
                return [
                    args.newDecimals,
                ];
            }

        }

        // set-name
        export namespace SetName {
            export const name = "set-name";

            export interface SetNameArgs {
                newName: StringAsciiCV,
            }

            export function args(args: SetNameArgs): ClarityValue[] {
                return [
                    args.newName,
                ];
            }

        }

        // set-symbol
        export namespace SetSymbol {
            export const name = "set-symbol";

            export interface SetSymbolArgs {
                newSymbol: StringAsciiCV,
            }

            export function args(args: SetSymbolArgs): ClarityValue[] {
                return [
                    args.newSymbol,
                ];
            }

        }

        // set-token-uri
        export namespace SetTokenUri {
            export const name = "set-token-uri";

            export interface SetTokenUriArgs {
                newUri: NoneCV,
            }

            export function args(args: SetTokenUriArgs): ClarityValue[] {
                return [
                    args.newUri,
                ];
            }

        }

        // transfer
        export namespace Transfer {
            export const name = "transfer";

            export interface TransferArgs {
                amount: UIntCV,
                sender: PrincipalCV,
                recipient: PrincipalCV,
                memo: NoneCV,
            }

            export function args(args: TransferArgs): ClarityValue[] {
                return [
                    args.amount,
                    args.sender,
                    args.recipient,
                    args.memo,
                ];
            }

        }

        // transfer-fixed
        export namespace TransferFixed {
            export const name = "transfer-fixed";

            export interface TransferFixedArgs {
                amount: UIntCV,
                sender: PrincipalCV,
                recipient: PrincipalCV,
                memo: NoneCV,
            }

            export function args(args: TransferFixedArgs): ClarityValue[] {
                return [
                    args.amount,
                    args.sender,
                    args.recipient,
                    args.memo,
                ];
            }

        }

        // edg-get-balance
        export namespace EdgGetBalance {
            export const name = "edg-get-balance";

            export interface EdgGetBalanceArgs {
                who: PrincipalCV,
            }

            export function args(args: EdgGetBalanceArgs): ClarityValue[] {
                return [
                    args.who,
                ];
            }

        }

        // edg-get-locked
        export namespace EdgGetLocked {
            export const name = "edg-get-locked";

            export interface EdgGetLockedArgs {
                owner: PrincipalCV,
            }

            export function args(args: EdgGetLockedArgs): ClarityValue[] {
                return [
                    args.owner,
                ];
            }

        }

        // edg-has-percentage-balance
        export namespace EdgHasPercentageBalance {
            export const name = "edg-has-percentage-balance";

            export interface EdgHasPercentageBalanceArgs {
                who: PrincipalCV,
                factor: UIntCV,
            }

            export function args(args: EdgHasPercentageBalanceArgs): ClarityValue[] {
                return [
                    args.who,
                    args.factor,
                ];
            }

        }

        // fixed-to-decimals
        export namespace FixedToDecimals {
            export const name = "fixed-to-decimals";

            export interface FixedToDecimalsArgs {
                amount: UIntCV,
            }

            export function args(args: FixedToDecimalsArgs): ClarityValue[] {
                return [
                    args.amount,
                ];
            }

        }

        // get-balance
        export namespace GetBalance {
            export const name = "get-balance";

            export interface GetBalanceArgs {
                who: PrincipalCV,
            }

            export function args(args: GetBalanceArgs): ClarityValue[] {
                return [
                    args.who,
                ];
            }

        }

        // get-balance-fixed
        export namespace GetBalanceFixed {
            export const name = "get-balance-fixed";

            export interface GetBalanceFixedArgs {
                account: PrincipalCV,
            }

            export function args(args: GetBalanceFixedArgs): ClarityValue[] {
                return [
                    args.account,
                ];
            }

        }

        // get-decimals
        export namespace GetDecimals {
            export const name = "get-decimals";

        }

        // get-name
        export namespace GetName {
            export const name = "get-name";

        }

        // get-symbol
        export namespace GetSymbol {
            export const name = "get-symbol";

        }

        // get-token-uri
        export namespace GetTokenUri {
            export const name = "get-token-uri";

        }

        // get-total-supply
        export namespace GetTotalSupply {
            export const name = "get-total-supply";

        }

        // get-total-supply-fixed
        export namespace GetTotalSupplyFixed {
            export const name = "get-total-supply-fixed";

        }

    }
}

export namespace SimpleWeightPoolAlexContract {
    export const address = "SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9";
    export const name = "simple-weight-pool-alex";

    // Functions
    export namespace Functions {
        // add-to-position
        export namespace AddToPosition {
            export const name = "add-to-position";

            export interface AddToPositionArgs {
                tokenXTrait: ClarityValue,
                tokenYTrait: ClarityValue,
                poolTokenTrait: ClarityValue,
                dx: UIntCV,
                maxDy: NoneCV,
            }

            export function args(args: AddToPositionArgs): ClarityValue[] {
                return [
                    args.tokenXTrait,
                    args.tokenYTrait,
                    args.poolTokenTrait,
                    args.dx,
                    args.maxDy,
                ];
            }

        }

        // create-pool
        export namespace CreatePool {
            export const name = "create-pool";

            export interface CreatePoolArgs {
                tokenXTrait: ClarityValue,
                tokenYTrait: ClarityValue,
                poolTokenTrait: ClarityValue,
                multisigVote: PrincipalCV,
                dx: UIntCV,
                dy: UIntCV,
            }

            export function args(args: CreatePoolArgs): ClarityValue[] {
                return [
                    args.tokenXTrait,
                    args.tokenYTrait,
                    args.poolTokenTrait,
                    args.multisigVote,
                    args.dx,
                    args.dy,
                ];
            }

        }

        // reduce-position
        export namespace ReducePosition {
            export const name = "reduce-position";

            export interface ReducePositionArgs {
                tokenXTrait: ClarityValue,
                tokenYTrait: ClarityValue,
                poolTokenTrait: ClarityValue,
                percent: UIntCV,
            }

            export function args(args: ReducePositionArgs): ClarityValue[] {
                return [
                    args.tokenXTrait,
                    args.tokenYTrait,
                    args.poolTokenTrait,
                    args.percent,
                ];
            }

        }

        // set-contract-owner
        export namespace SetContractOwner {
            export const name = "set-contract-owner";

            export interface SetContractOwnerArgs {
                owner: PrincipalCV,
            }

            export function args(args: SetContractOwnerArgs): ClarityValue[] {
                return [
                    args.owner,
                ];
            }

        }

        // set-end-block
        export namespace SetEndBlock {
            export const name = "set-end-block";

            export interface SetEndBlockArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
                newEndBlock: UIntCV,
            }

            export function args(args: SetEndBlockArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                    args.newEndBlock,
                ];
            }

        }

        // set-fee-rate-x
        export namespace SetFeeRateX {
            export const name = "set-fee-rate-x";

            export interface SetFeeRateXArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
                feeRateX: UIntCV,
            }

            export function args(args: SetFeeRateXArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                    args.feeRateX,
                ];
            }

        }

        // set-fee-rate-y
        export namespace SetFeeRateY {
            export const name = "set-fee-rate-y";

            export interface SetFeeRateYArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
                feeRateY: UIntCV,
            }

            export function args(args: SetFeeRateYArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                    args.feeRateY,
                ];
            }

        }

        // set-fee-rebate
        export namespace SetFeeRebate {
            export const name = "set-fee-rebate";

            export interface SetFeeRebateArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
                feeRebate: UIntCV,
            }

            export function args(args: SetFeeRebateArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                    args.feeRebate,
                ];
            }

        }

        // set-fee-to-address
        export namespace SetFeeToAddress {
            export const name = "set-fee-to-address";

            export interface SetFeeToAddressArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
                feeToAddress: PrincipalCV,
            }

            export function args(args: SetFeeToAddressArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                    args.feeToAddress,
                ];
            }

        }

        // set-oracle-average
        export namespace SetOracleAverage {
            export const name = "set-oracle-average";

            export interface SetOracleAverageArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
                newOracleAverage: UIntCV,
            }

            export function args(args: SetOracleAverageArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                    args.newOracleAverage,
                ];
            }

        }

        // set-oracle-enabled
        export namespace SetOracleEnabled {
            export const name = "set-oracle-enabled";

            export interface SetOracleEnabledArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
            }

            export function args(args: SetOracleEnabledArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                ];
            }

        }

        // set-start-block
        export namespace SetStartBlock {
            export const name = "set-start-block";

            export interface SetStartBlockArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
                newStartBlock: UIntCV,
            }

            export function args(args: SetStartBlockArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                    args.newStartBlock,
                ];
            }

        }

        // swap-alex-for-y
        export namespace SwapAlexForY {
            export const name = "swap-alex-for-y";

            export interface SwapAlexForYArgs {
                tokenYTrait: ClarityValue,
                dx: UIntCV,
                minDy: NoneCV,
            }

            export function args(args: SwapAlexForYArgs): ClarityValue[] {
                return [
                    args.tokenYTrait,
                    args.dx,
                    args.minDy,
                ];
            }

        }

        // swap-helper
        export namespace SwapHelper {
            export const name = "swap-helper";

            export interface SwapHelperArgs {
                tokenXTrait: ClarityValue,
                tokenYTrait: ClarityValue,
                dx: UIntCV,
                minDy: NoneCV,
            }

            export function args(args: SwapHelperArgs): ClarityValue[] {
                return [
                    args.tokenXTrait,
                    args.tokenYTrait,
                    args.dx,
                    args.minDy,
                ];
            }

        }

        // swap-x-for-y
        export namespace SwapXForY {
            export const name = "swap-x-for-y";

            export interface SwapXForYArgs {
                tokenXTrait: ClarityValue,
                tokenYTrait: ClarityValue,
                dx: UIntCV,
                minDy: NoneCV,
            }

            export function args(args: SwapXForYArgs): ClarityValue[] {
                return [
                    args.tokenXTrait,
                    args.tokenYTrait,
                    args.dx,
                    args.minDy,
                ];
            }

        }

        // swap-y-for-alex
        export namespace SwapYForAlex {
            export const name = "swap-y-for-alex";

            export interface SwapYForAlexArgs {
                tokenYTrait: ClarityValue,
                dy: UIntCV,
                minDx: NoneCV,
            }

            export function args(args: SwapYForAlexArgs): ClarityValue[] {
                return [
                    args.tokenYTrait,
                    args.dy,
                    args.minDx,
                ];
            }

        }

        // swap-y-for-x
        export namespace SwapYForX {
            export const name = "swap-y-for-x";

            export interface SwapYForXArgs {
                tokenXTrait: ClarityValue,
                tokenYTrait: ClarityValue,
                dy: UIntCV,
                minDx: NoneCV,
            }

            export function args(args: SwapYForXArgs): ClarityValue[] {
                return [
                    args.tokenXTrait,
                    args.tokenYTrait,
                    args.dy,
                    args.minDx,
                ];
            }

        }

        // div-down
        export namespace DivDown {
            export const name = "div-down";

            export interface DivDownArgs {
                a: UIntCV,
                b: UIntCV,
            }

            export function args(args: DivDownArgs): ClarityValue[] {
                return [
                    args.a,
                    args.b,
                ];
            }

        }

        // div-up
        export namespace DivUp {
            export const name = "div-up";

            export interface DivUpArgs {
                a: UIntCV,
                b: UIntCV,
            }

            export function args(args: DivUpArgs): ClarityValue[] {
                return [
                    args.a,
                    args.b,
                ];
            }

        }

        // exp-fixed
        export namespace ExpFixed {
            export const name = "exp-fixed";

            export interface ExpFixedArgs {
                x: IntCV,
            }

            export function args(args: ExpFixedArgs): ClarityValue[] {
                return [
                    args.x,
                ];
            }

        }

        // exp-pos
        export namespace ExpPos {
            export const name = "exp-pos";

            export interface ExpPosArgs {
                x: IntCV,
            }

            export function args(args: ExpPosArgs): ClarityValue[] {
                return [
                    args.x,
                ];
            }

        }

        // get-alex-given-y
        export namespace GetAlexGivenY {
            export const name = "get-alex-given-y";

            export interface GetAlexGivenYArgs {
                tokenY: PrincipalCV,
                dy: UIntCV,
            }

            export function args(args: GetAlexGivenYArgs): ClarityValue[] {
                return [
                    args.tokenY,
                    args.dy,
                ];
            }

        }

        // get-alex-in-given-y-out
        export namespace GetAlexInGivenYOut {
            export const name = "get-alex-in-given-y-out";

            export interface GetAlexInGivenYOutArgs {
                tokenY: PrincipalCV,
                dy: UIntCV,
            }

            export function args(args: GetAlexInGivenYOutArgs): ClarityValue[] {
                return [
                    args.tokenY,
                    args.dy,
                ];
            }

        }

        // get-balances
        export namespace GetBalances {
            export const name = "get-balances";

            export interface GetBalancesArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
            }

            export function args(args: GetBalancesArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                ];
            }

        }

        // get-contract-owner
        export namespace GetContractOwner {
            export const name = "get-contract-owner";

        }

        // get-end-block
        export namespace GetEndBlock {
            export const name = "get-end-block";

            export interface GetEndBlockArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
            }

            export function args(args: GetEndBlockArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                ];
            }

        }

        // get-fee-rate-x
        export namespace GetFeeRateX {
            export const name = "get-fee-rate-x";

            export interface GetFeeRateXArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
            }

            export function args(args: GetFeeRateXArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                ];
            }

        }

        // get-fee-rate-y
        export namespace GetFeeRateY {
            export const name = "get-fee-rate-y";

            export interface GetFeeRateYArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
            }

            export function args(args: GetFeeRateYArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                ];
            }

        }

        // get-fee-rebate
        export namespace GetFeeRebate {
            export const name = "get-fee-rebate";

            export interface GetFeeRebateArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
            }

            export function args(args: GetFeeRebateArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                ];
            }

        }

        // get-fee-to-address
        export namespace GetFeeToAddress {
            export const name = "get-fee-to-address";

            export interface GetFeeToAddressArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
            }

            export function args(args: GetFeeToAddressArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                ];
            }

        }

        // get-helper
        export namespace GetHelper {
            export const name = "get-helper";

            export interface GetHelperArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
                dx: UIntCV,
            }

            export function args(args: GetHelperArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                    args.dx,
                ];
            }

        }

        // get-oracle-average
        export namespace GetOracleAverage {
            export const name = "get-oracle-average";

            export interface GetOracleAverageArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
            }

            export function args(args: GetOracleAverageArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                ];
            }

        }

        // get-oracle-enabled
        export namespace GetOracleEnabled {
            export const name = "get-oracle-enabled";

            export interface GetOracleEnabledArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
            }

            export function args(args: GetOracleEnabledArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                ];
            }

        }

        // get-oracle-instant
        export namespace GetOracleInstant {
            export const name = "get-oracle-instant";

            export interface GetOracleInstantArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
            }

            export function args(args: GetOracleInstantArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                ];
            }

        }

        // get-oracle-resilient
        export namespace GetOracleResilient {
            export const name = "get-oracle-resilient";

            export interface GetOracleResilientArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
            }

            export function args(args: GetOracleResilientArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                ];
            }

        }

        // get-pool-contracts
        export namespace GetPoolContracts {
            export const name = "get-pool-contracts";

            export interface GetPoolContractsArgs {
                poolId: UIntCV,
            }

            export function args(args: GetPoolContractsArgs): ClarityValue[] {
                return [
                    args.poolId,
                ];
            }

        }

        // get-pool-count
        export namespace GetPoolCount {
            export const name = "get-pool-count";

        }

        // get-pool-details
        export namespace GetPoolDetails {
            export const name = "get-pool-details";

            export interface GetPoolDetailsArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
            }

            export function args(args: GetPoolDetailsArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                ];
            }

        }

        // get-pool-exists
        export namespace GetPoolExists {
            export const name = "get-pool-exists";

            export interface GetPoolExistsArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
            }

            export function args(args: GetPoolExistsArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                ];
            }

        }

        // get-pools
        export namespace GetPools {
            export const name = "get-pools";

        }

        // get-pools-by-ids
        export namespace GetPoolsByIds {
            export const name = "get-pools-by-ids";

            export interface GetPoolsByIdsArgs {
                poolIds: ListCV,
            }

            export function args(args: GetPoolsByIdsArgs): ClarityValue[] {
                return [
                    args.poolIds,
                ];
            }

        }

        // get-position-given-burn
        export namespace GetPositionGivenBurn {
            export const name = "get-position-given-burn";

            export interface GetPositionGivenBurnArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
                token: UIntCV,
            }

            export function args(args: GetPositionGivenBurnArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                    args.token,
                ];
            }

        }

        // get-position-given-mint
        export namespace GetPositionGivenMint {
            export const name = "get-position-given-mint";

            export interface GetPositionGivenMintArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
                token: UIntCV,
            }

            export function args(args: GetPositionGivenMintArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                    args.token,
                ];
            }

        }

        // get-start-block
        export namespace GetStartBlock {
            export const name = "get-start-block";

            export interface GetStartBlockArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
            }

            export function args(args: GetStartBlockArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                ];
            }

        }

        // get-token-given-position
        export namespace GetTokenGivenPosition {
            export const name = "get-token-given-position";

            export interface GetTokenGivenPositionArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
                dx: UIntCV,
                maxDy: NoneCV,
            }

            export function args(args: GetTokenGivenPositionArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                    args.dx,
                    args.maxDy,
                ];
            }

        }

        // get-x-given-price
        export namespace GetXGivenPrice {
            export const name = "get-x-given-price";

            export interface GetXGivenPriceArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
                price: UIntCV,
            }

            export function args(args: GetXGivenPriceArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                    args.price,
                ];
            }

        }

        // get-x-given-y
        export namespace GetXGivenY {
            export const name = "get-x-given-y";

            export interface GetXGivenYArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
                dy: UIntCV,
            }

            export function args(args: GetXGivenYArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                    args.dy,
                ];
            }

        }

        // get-x-in-given-y-out
        export namespace GetXInGivenYOut {
            export const name = "get-x-in-given-y-out";

            export interface GetXInGivenYOutArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
                dy: UIntCV,
            }

            export function args(args: GetXInGivenYOutArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                    args.dy,
                ];
            }

        }

        // get-y-given-alex
        export namespace GetYGivenAlex {
            export const name = "get-y-given-alex";

            export interface GetYGivenAlexArgs {
                tokenY: PrincipalCV,
                dx: UIntCV,
            }

            export function args(args: GetYGivenAlexArgs): ClarityValue[] {
                return [
                    args.tokenY,
                    args.dx,
                ];
            }

        }

        // get-y-given-price
        export namespace GetYGivenPrice {
            export const name = "get-y-given-price";

            export interface GetYGivenPriceArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
                price: UIntCV,
            }

            export function args(args: GetYGivenPriceArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                    args.price,
                ];
            }

        }

        // get-y-given-x
        export namespace GetYGivenX {
            export const name = "get-y-given-x";

            export interface GetYGivenXArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
                dx: UIntCV,
            }

            export function args(args: GetYGivenXArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                    args.dx,
                ];
            }

        }

        // get-y-in-given-alex-out
        export namespace GetYInGivenAlexOut {
            export const name = "get-y-in-given-alex-out";

            export interface GetYInGivenAlexOutArgs {
                tokenY: PrincipalCV,
                dx: UIntCV,
            }

            export function args(args: GetYInGivenAlexOutArgs): ClarityValue[] {
                return [
                    args.tokenY,
                    args.dx,
                ];
            }

        }

        // get-y-in-given-x-out
        export namespace GetYInGivenXOut {
            export const name = "get-y-in-given-x-out";

            export interface GetYInGivenXOutArgs {
                tokenX: PrincipalCV,
                tokenY: PrincipalCV,
                dx: UIntCV,
            }

            export function args(args: GetYInGivenXOutArgs): ClarityValue[] {
                return [
                    args.tokenX,
                    args.tokenY,
                    args.dx,
                ];
            }

        }

        // ln-fixed
        export namespace LnFixed {
            export const name = "ln-fixed";

            export interface LnFixedArgs {
                a: IntCV,
            }

            export function args(args: LnFixedArgs): ClarityValue[] {
                return [
                    args.a,
                ];
            }

        }

        // log-fixed
        export namespace LogFixed {
            export const name = "log-fixed";

            export interface LogFixedArgs {
                arg: IntCV,
                base: IntCV,
            }

            export function args(args: LogFixedArgs): ClarityValue[] {
                return [
                    args.arg,
                    args.base,
                ];
            }

        }

        // mul-down
        export namespace MulDown {
            export const name = "mul-down";

            export interface MulDownArgs {
                a: UIntCV,
                b: UIntCV,
            }

            export function args(args: MulDownArgs): ClarityValue[] {
                return [
                    args.a,
                    args.b,
                ];
            }

        }

        // mul-up
        export namespace MulUp {
            export const name = "mul-up";

            export interface MulUpArgs {
                a: UIntCV,
                b: UIntCV,
            }

            export function args(args: MulUpArgs): ClarityValue[] {
                return [
                    args.a,
                    args.b,
                ];
            }

        }

        // pow-down
        export namespace PowDown {
            export const name = "pow-down";

            export interface PowDownArgs {
                a: UIntCV,
                b: UIntCV,
            }

            export function args(args: PowDownArgs): ClarityValue[] {
                return [
                    args.a,
                    args.b,
                ];
            }

        }

        // pow-fixed
        export namespace PowFixed {
            export const name = "pow-fixed";

            export interface PowFixedArgs {
                x: UIntCV,
                y: UIntCV,
            }

            export function args(args: PowFixedArgs): ClarityValue[] {
                return [
                    args.x,
                    args.y,
                ];
            }

        }

        // pow-priv
        export namespace PowPriv {
            export const name = "pow-priv";

            export interface PowPrivArgs {
                x: UIntCV,
                y: UIntCV,
            }

            export function args(args: PowPrivArgs): ClarityValue[] {
                return [
                    args.x,
                    args.y,
                ];
            }

        }

        // pow-up
        export namespace PowUp {
            export const name = "pow-up";

            export interface PowUpArgs {
                a: UIntCV,
                b: UIntCV,
            }

            export function args(args: PowUpArgs): ClarityValue[] {
                return [
                    args.a,
                    args.b,
                ];
            }

        }

        // scale-down
        export namespace ScaleDown {
            export const name = "scale-down";

            export interface ScaleDownArgs {
                a: UIntCV,
            }

            export function args(args: ScaleDownArgs): ClarityValue[] {
                return [
                    args.a,
                ];
            }

        }

        // scale-up
        export namespace ScaleUp {
            export const name = "scale-up";

            export interface ScaleUpArgs {
                a: UIntCV,
            }

            export function args(args: ScaleUpArgs): ClarityValue[] {
                return [
                    args.a,
                ];
            }

        }

    }
}

export namespace TokenApowerContract {
    export const address = "SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9";
    export const name = "token-apower";

    // Functions
    export namespace Functions {
        // add-approved-contract
        export namespace AddApprovedContract {
            export const name = "add-approved-contract";

            export interface AddApprovedContractArgs {
                newApprovedContract: PrincipalCV,
            }

            export function args(args: AddApprovedContractArgs): ClarityValue[] {
                return [
                    args.newApprovedContract,
                ];
            }

        }

        // burn
        export namespace Burn {
            export const name = "burn";

            export interface BurnArgs {
                amount: UIntCV,
                sender: PrincipalCV,
            }

            export function args(args: BurnArgs): ClarityValue[] {
                return [
                    args.amount,
                    args.sender,
                ];
            }

        }

        // burn-fixed
        export namespace BurnFixed {
            export const name = "burn-fixed";

            export interface BurnFixedArgs {
                amount: UIntCV,
                sender: PrincipalCV,
            }

            export function args(args: BurnFixedArgs): ClarityValue[] {
                return [
                    args.amount,
                    args.sender,
                ];
            }

        }

        // mint
        export namespace Mint {
            export const name = "mint";

            export interface MintArgs {
                amount: UIntCV,
                recipient: PrincipalCV,
            }

            export function args(args: MintArgs): ClarityValue[] {
                return [
                    args.amount,
                    args.recipient,
                ];
            }

        }

        // mint-fixed
        export namespace MintFixed {
            export const name = "mint-fixed";

            export interface MintFixedArgs {
                amount: UIntCV,
                recipient: PrincipalCV,
            }

            export function args(args: MintFixedArgs): ClarityValue[] {
                return [
                    args.amount,
                    args.recipient,
                ];
            }

        }

        // mint-fixed-many
        export namespace MintFixedMany {
            export const name = "mint-fixed-many";

            export interface MintFixedManyArgs {
                recipients: ListCV,
            }

            export function args(args: MintFixedManyArgs): ClarityValue[] {
                return [
                    args.recipients,
                ];
            }

        }

        // set-contract-owner
        export namespace SetContractOwner {
            export const name = "set-contract-owner";

            export interface SetContractOwnerArgs {
                owner: PrincipalCV,
            }

            export function args(args: SetContractOwnerArgs): ClarityValue[] {
                return [
                    args.owner,
                ];
            }

        }

        // set-decimals
        export namespace SetDecimals {
            export const name = "set-decimals";

            export interface SetDecimalsArgs {
                newDecimals: UIntCV,
            }

            export function args(args: SetDecimalsArgs): ClarityValue[] {
                return [
                    args.newDecimals,
                ];
            }

        }

        // set-name
        export namespace SetName {
            export const name = "set-name";

            export interface SetNameArgs {
                newName: StringAsciiCV,
            }

            export function args(args: SetNameArgs): ClarityValue[] {
                return [
                    args.newName,
                ];
            }

        }

        // set-symbol
        export namespace SetSymbol {
            export const name = "set-symbol";

            export interface SetSymbolArgs {
                newSymbol: StringAsciiCV,
            }

            export function args(args: SetSymbolArgs): ClarityValue[] {
                return [
                    args.newSymbol,
                ];
            }

        }

        // set-token-uri
        export namespace SetTokenUri {
            export const name = "set-token-uri";

            export interface SetTokenUriArgs {
                newUri: NoneCV,
            }

            export function args(args: SetTokenUriArgs): ClarityValue[] {
                return [
                    args.newUri,
                ];
            }

        }

        // transfer
        export namespace Transfer {
            export const name = "transfer";

            export interface TransferArgs {
                amount: UIntCV,
                sender: PrincipalCV,
                recipient: PrincipalCV,
                memo: NoneCV,
            }

            export function args(args: TransferArgs): ClarityValue[] {
                return [
                    args.amount,
                    args.sender,
                    args.recipient,
                    args.memo,
                ];
            }

        }

        // transfer-fixed
        export namespace TransferFixed {
            export const name = "transfer-fixed";

            export interface TransferFixedArgs {
                amount: UIntCV,
                sender: PrincipalCV,
                recipient: PrincipalCV,
                memo: NoneCV,
            }

            export function args(args: TransferFixedArgs): ClarityValue[] {
                return [
                    args.amount,
                    args.sender,
                    args.recipient,
                    args.memo,
                ];
            }

        }

        // fixed-to-decimals
        export namespace FixedToDecimals {
            export const name = "fixed-to-decimals";

            export interface FixedToDecimalsArgs {
                amount: UIntCV,
            }

            export function args(args: FixedToDecimalsArgs): ClarityValue[] {
                return [
                    args.amount,
                ];
            }

        }

        // get-balance
        export namespace GetBalance {
            export const name = "get-balance";

            export interface GetBalanceArgs {
                who: PrincipalCV,
            }

            export function args(args: GetBalanceArgs): ClarityValue[] {
                return [
                    args.who,
                ];
            }

        }

        // get-balance-fixed
        export namespace GetBalanceFixed {
            export const name = "get-balance-fixed";

            export interface GetBalanceFixedArgs {
                account: PrincipalCV,
            }

            export function args(args: GetBalanceFixedArgs): ClarityValue[] {
                return [
                    args.account,
                ];
            }

        }

        // get-contract-owner
        export namespace GetContractOwner {
            export const name = "get-contract-owner";

        }

        // get-decimals
        export namespace GetDecimals {
            export const name = "get-decimals";

        }

        // get-name
        export namespace GetName {
            export const name = "get-name";

        }

        // get-symbol
        export namespace GetSymbol {
            export const name = "get-symbol";

        }

        // get-token-uri
        export namespace GetTokenUri {
            export const name = "get-token-uri";

        }

        // get-total-supply
        export namespace GetTotalSupply {
            export const name = "get-total-supply";

        }

        // get-total-supply-fixed
        export namespace GetTotalSupplyFixed {
            export const name = "get-total-supply-fixed";

        }

    }
}

export namespace TokenWstxContract {
    export const address = "SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9";
    export const name = "token-wstx";

    // Functions
    export namespace Functions {
        // burn
        export namespace Burn {
            export const name = "burn";

            export interface BurnArgs {
                amount: UIntCV,
                sender: PrincipalCV,
            }

            export function args(args: BurnArgs): ClarityValue[] {
                return [
                    args.amount,
                    args.sender,
                ];
            }

        }

        // burn-fixed
        export namespace BurnFixed {
            export const name = "burn-fixed";

            export interface BurnFixedArgs {
                amount: UIntCV,
                sender: PrincipalCV,
            }

            export function args(args: BurnFixedArgs): ClarityValue[] {
                return [
                    args.amount,
                    args.sender,
                ];
            }

        }

        // mint
        export namespace Mint {
            export const name = "mint";

            export interface MintArgs {
                amount: UIntCV,
                recipient: PrincipalCV,
            }

            export function args(args: MintArgs): ClarityValue[] {
                return [
                    args.amount,
                    args.recipient,
                ];
            }

        }

        // mint-fixed
        export namespace MintFixed {
            export const name = "mint-fixed";

            export interface MintFixedArgs {
                amount: UIntCV,
                recipient: PrincipalCV,
            }

            export function args(args: MintFixedArgs): ClarityValue[] {
                return [
                    args.amount,
                    args.recipient,
                ];
            }

        }

        // send-many
        export namespace SendMany {
            export const name = "send-many";

            export interface SendManyArgs {
                recipients: ListCV,
            }

            export function args(args: SendManyArgs): ClarityValue[] {
                return [
                    args.recipients,
                ];
            }

        }

        // set-contract-owner
        export namespace SetContractOwner {
            export const name = "set-contract-owner";

            export interface SetContractOwnerArgs {
                owner: PrincipalCV,
            }

            export function args(args: SetContractOwnerArgs): ClarityValue[] {
                return [
                    args.owner,
                ];
            }

        }

        // set-token-uri
        export namespace SetTokenUri {
            export const name = "set-token-uri";

            export interface SetTokenUriArgs {
                value: StringUtf8CV,
            }

            export function args(args: SetTokenUriArgs): ClarityValue[] {
                return [
                    args.value,
                ];
            }

        }

        // transfer
        export namespace Transfer {
            export const name = "transfer";

            export interface TransferArgs {
                amount: UIntCV,
                sender: PrincipalCV,
                recipient: PrincipalCV,
                memo: NoneCV,
            }

            export function args(args: TransferArgs): ClarityValue[] {
                return [
                    args.amount,
                    args.sender,
                    args.recipient,
                    args.memo,
                ];
            }

        }

        // transfer-fixed
        export namespace TransferFixed {
            export const name = "transfer-fixed";

            export interface TransferFixedArgs {
                amount: UIntCV,
                sender: PrincipalCV,
                recipient: PrincipalCV,
                memo: NoneCV,
            }

            export function args(args: TransferFixedArgs): ClarityValue[] {
                return [
                    args.amount,
                    args.sender,
                    args.recipient,
                    args.memo,
                ];
            }

        }

        // fixed-to-decimals
        export namespace FixedToDecimals {
            export const name = "fixed-to-decimals";

            export interface FixedToDecimalsArgs {
                amount: UIntCV,
            }

            export function args(args: FixedToDecimalsArgs): ClarityValue[] {
                return [
                    args.amount,
                ];
            }

        }

        // get-balance
        export namespace GetBalance {
            export const name = "get-balance";

            export interface GetBalanceArgs {
                account: PrincipalCV,
            }

            export function args(args: GetBalanceArgs): ClarityValue[] {
                return [
                    args.account,
                ];
            }

        }

        // get-balance-fixed
        export namespace GetBalanceFixed {
            export const name = "get-balance-fixed";

            export interface GetBalanceFixedArgs {
                account: PrincipalCV,
            }

            export function args(args: GetBalanceFixedArgs): ClarityValue[] {
                return [
                    args.account,
                ];
            }

        }

        // get-contract-owner
        export namespace GetContractOwner {
            export const name = "get-contract-owner";

        }

        // get-decimals
        export namespace GetDecimals {
            export const name = "get-decimals";

        }

        // get-name
        export namespace GetName {
            export const name = "get-name";

        }

        // get-symbol
        export namespace GetSymbol {
            export const name = "get-symbol";

        }

        // get-token-uri
        export namespace GetTokenUri {
            export const name = "get-token-uri";

        }

        // get-total-supply
        export namespace GetTotalSupply {
            export const name = "get-total-supply";

        }

        // get-total-supply-fixed
        export namespace GetTotalSupplyFixed {
            export const name = "get-total-supply-fixed";

        }

    }
}

export namespace HelperContract {
    export const address = "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM";
    export const name = "helper";

    // Functions
    export namespace Functions {
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

        // get-reward-set
        export namespace GetRewardSet {
            export const name = "get-reward-set";

            export interface GetRewardSetArgs {
                rewardCycle: UIntCV,
            }

            export function args(args: GetRewardSetArgs): ClarityValue[] {
                return [
                    args.rewardCycle,
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
