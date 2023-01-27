import { useContractReads, useBalance, useAccount } from "wagmi";
import { ethers } from "ethers";
import moment from "moment";

import { Fomo3dABIContract } from "@/components/fomo3d/config";
import CreateBid from "@/components/fomo3d/CreateBid";
import Claim from "./Claim";

import Info from "./Info";
import GameState from "./GameState";
import { mockUnfinishedData } from "./mockData";

export interface IGameState {
  currentBid: string;
  expiry: moment.Moment;
  currentBidder: string;
  nextBidMinimum: string;
  timeHasExpired: boolean;
  winnerHasClaimed: boolean;
}

export default function Fomo3D() {
  // const data = mockUnfinishedData;
  const { data } = useContractReads({
    contracts: [
      {
        ...Fomo3dABIContract,
        functionName: "currentBid",
      },
      {
        ...Fomo3dABIContract,
        functionName: "expiry",
      },
      {
        ...Fomo3dABIContract,
        functionName: "bidder",
      },
      {
        ...Fomo3dABIContract,
        functionName: "getNextBidMinimum",
      },
      {
        ...Fomo3dABIContract,
        functionName: "winnerHasClaimed",
      },
    ],
    select: (data: any) => {
      const timestamp = data[1].toNumber();
      const expiry = moment.unix(timestamp);
      const timeHasExpired = moment().diff(expiry) > 0;
      return {
        currentBid: ethers.utils.formatEther(data[0]),
        expiry,
        currentBidder: data[2],
        nextBidMinimum: ethers.utils.formatEther(data[3]),
        timeHasExpired,
        winnerHasClaimed: data[4],
      };
    },
    // Caching and waiting for new blocks
    watch: true,
    // cacheOnBlock: true,
    // cacheTime: 2_000,
    // staleTime: 2_000,
  });

  const { address, isConnected } = useAccount();

  const { data: currentBalance } = useBalance({
    address: Fomo3dABIContract.address,
  });

  return (
    <div className="w-full max-w-3xl text-gray-700">
      {/* Game state */}
      {data && currentBalance && (
        <GameState currentBalance={currentBalance?.formatted} state={data} />
      )}

      {/* User action */}
      {data && (
        <>
          {!data.timeHasExpired && (
            <div className="relative mt-8 w-full rounded border border-gray-200 bg-white p-8 shadow-md">
              <CreateBid minimumBid={data.nextBidMinimum} state={data} />
            </div>
          )}
          {data.timeHasExpired &&
            isConnected &&
            address === data.currentBidder &&
            !data.winnerHasClaimed && (
              <div className="relative mt-8 w-full rounded border border-gray-200 bg-white p-8 shadow-md">
                <Claim />
              </div>
            )}
        </>
      )}

      {/* General information */}
      <Info />
    </div>
  );
}
