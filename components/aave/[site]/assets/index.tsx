import {
  ComputedReserveData,
  useAppDataContext,
} from "hooks/app-data-provider/useAppDataProvider";
import { USD_DECIMALS, valueToBigNumber } from "@aave/math-utils";
import BigNumber from "bignumber.js";
import { API_ETH_MOCK_ADDRESS } from "@aave/contract-helpers";
import { fetchIconSymbolAndName } from "ui-config/reservePatches";
import { useProtocolDataContext } from "hooks/useProtocolDataContext";
import {
  DashboardReserve,
  handleSortDashboardReserves,
} from "utils/dashboardSortUtils";
import { useState } from "react";
import { useWalletBalances } from "hooks/app-data-provider/useWalletBalances";

export default function Assets() {
  const {
    user,
    reserves,
    marketReferencePriceInUsd,
    loading: loadingReserves,
    userReserves,
  } = useAppDataContext();
  const [sortName, setSortName] = useState("");
  const [sortDesc, setSortDesc] = useState(false);

  const { currentNetworkConfig, currentChainId } = useProtocolDataContext();
  const {
    bridge,
    isTestnet,
    baseAssetSymbol,
    name: networkName,
  } = currentNetworkConfig;
  const { walletBalances, loading } = useWalletBalances();

  const tokensToSupply = reserves
    .filter((reserve: ComputedReserveData) => !reserve.isFrozen)
    .map((reserve: ComputedReserveData) => {
      const walletBalance = walletBalances[reserve.underlyingAsset]?.amount;
      const walletBalanceUSD =
        walletBalances[reserve.underlyingAsset]?.amountUSD;
      let availableToDeposit = valueToBigNumber(walletBalance);
      if (reserve.supplyCap !== "0") {
        availableToDeposit = BigNumber.min(
          availableToDeposit,
          new BigNumber(reserve.supplyCap)
            .minus(reserve.totalLiquidity)
            .multipliedBy("0.995"),
        );
      }
      const availableToDepositUSD = valueToBigNumber(availableToDeposit)
        .multipliedBy(reserve.priceInMarketReferenceCurrency)
        .multipliedBy(marketReferencePriceInUsd)
        .shiftedBy(-USD_DECIMALS)
        .toString();

      const isIsolated = reserve.isIsolated;
      const hasDifferentCollateral = user?.userReservesData.find(
        (userRes) =>
          userRes.usageAsCollateralEnabledOnUser &&
          userRes.reserve.id !== reserve.id,
      );

      const usageAsCollateralEnabledOnUser = !user?.isInIsolationMode
        ? reserve.usageAsCollateralEnabled &&
          (!isIsolated || (isIsolated && !hasDifferentCollateral))
        : !isIsolated
        ? false
        : !hasDifferentCollateral;

      if (reserve.isWrappedBaseAsset) {
        let baseAvailableToDeposit = valueToBigNumber(
          walletBalances[API_ETH_MOCK_ADDRESS.toLowerCase()]?.amount,
        );
        if (reserve.supplyCap !== "0") {
          baseAvailableToDeposit = BigNumber.min(
            baseAvailableToDeposit,
            new BigNumber(reserve.supplyCap)
              .minus(reserve.totalLiquidity)
              .multipliedBy("0.995"),
          );
        }
        const baseAvailableToDepositUSD = valueToBigNumber(
          baseAvailableToDeposit,
        )
          .multipliedBy(reserve.priceInMarketReferenceCurrency)
          .multipliedBy(marketReferencePriceInUsd)
          .shiftedBy(-USD_DECIMALS)
          .toString();
        return [
          {
            ...reserve,
            reserve,
            underlyingAsset: API_ETH_MOCK_ADDRESS.toLowerCase(),
            ...fetchIconSymbolAndName({
              symbol: baseAssetSymbol,
              underlyingAsset: API_ETH_MOCK_ADDRESS.toLowerCase(),
            }),
            walletBalance:
              walletBalances[API_ETH_MOCK_ADDRESS.toLowerCase()]?.amount,
            walletBalanceUSD:
              walletBalances[API_ETH_MOCK_ADDRESS.toLowerCase()]?.amountUSD,
            availableToDeposit: baseAvailableToDeposit.toString(),
            availableToDepositUSD: baseAvailableToDepositUSD,
            usageAsCollateralEnabledOnUser,
            detailsAddress: reserve.underlyingAsset,
            id: reserve.id + "base",
          },
          {
            ...reserve,
            reserve,
            walletBalance,
            walletBalanceUSD,
            availableToDeposit:
              availableToDeposit.toNumber() <= 0
                ? "0"
                : availableToDeposit.toString(),
            availableToDepositUSD:
              Number(availableToDepositUSD) <= 0
                ? "0"
                : availableToDepositUSD.toString(),
            usageAsCollateralEnabledOnUser,
            detailsAddress: reserve.underlyingAsset,
          },
        ];
      }

      return {
        ...reserve,
        reserve,
        walletBalance,
        walletBalanceUSD,
        availableToDeposit:
          availableToDeposit.toNumber() <= 0
            ? "0"
            : availableToDeposit.toString(),
        availableToDepositUSD:
          Number(availableToDepositUSD) <= 0
            ? "0"
            : availableToDepositUSD.toString(),
        usageAsCollateralEnabledOnUser,
        detailsAddress: reserve.underlyingAsset,
      };
    })
    .flat();

  const sortedSupplyReserves = tokensToSupply.sort((a, b) =>
    +a.walletBalanceUSD > +b.walletBalanceUSD ? -1 : 1,
  );
  const filteredSupplyReserves = sortedSupplyReserves.filter(
    (reserve) => reserve.availableToDepositUSD !== "0",
  );

  const isShowZeroAssets = true;

  // Filter out reserves
  const supplyReserves: unknown = isShowZeroAssets
    ? sortedSupplyReserves
    : filteredSupplyReserves.length >= 1
    ? filteredSupplyReserves
    : sortedSupplyReserves;

  // Transform to the DashboardReserve schema so the sort utils can work with it
  const preSortedReserves = supplyReserves as DashboardReserve[];
  const sortedReserves = handleSortDashboardReserves(
    sortDesc,
    sortName,
    "assets",
    preSortedReserves,
  );

  console.log({ sortedReserves });

  return <div className="relative w-full px-32"></div>;
}
