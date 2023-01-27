import CountdownTimer from "@/components/fomo3d/Countdown";

import Davatar from "@davatar/react";

import { IGameState } from "./index";
import { useProvider } from "wagmi";
import { blockExplorer } from "./config";

interface IGameStateProps {
  state: IGameState;
  currentBalance: string;
}

function formatEther(str: string, maxDecimalDigits: number) {
  if (str.includes(".")) {
    const parts = str.split(".");
    return parts[0] + "." + parts[1].slice(0, maxDecimalDigits);
  }
  return parseFloat(str);
}

const shortenEthereumAddress = (address: string) =>
  `${address.slice(0, 4)}...${address.slice(-3)}`;

export default function GameState({
  state: { currentBid, expiry, currentBidder, timeHasExpired },
  currentBalance,
}: IGameStateProps) {
  const provider = useProvider();
  const User = (
    <div className="flex justify-center">
      <a
        className="flex space-x-1 transition duration-200 ease-in-out hover:scale-105 hover:cursor-pointer hover:text-blue-600"
        href={`${blockExplorer}/address/${currentBidder}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="mt-1 inline-block">
          <Davatar
            size={24}
            address={currentBidder}
            provider={provider}
            generatedAvatarType="jazzicon"
          />
        </div>
        <span>{shortenEthereumAddress(currentBidder)}</span>
      </a>
    </div>
  );

  return (
    <div className="relative mb-4 w-full rounded border border-gray-200 bg-white p-8 shadow-md">
      <CountdownTimer expiry={expiry} />
      {timeHasExpired ? (
        <div className="mx-auto w-full">
          <div className="mx-auto flex justify-center space-x-2 font-serif text-2xl font-bold">
            {User} <span>is the winner.</span>
          </div>
        </div>
      ) : (
        <div>
          <div className="mt-8 grid grid-cols-2 grid-rows-2 gap-y-4 md:grid-cols-6 md:grid-rows-1 md:space-y-0 md:divide-x">
            <div className="col-span-1 flex flex-col text-center">
              <span className="mr-2 text-gray-500">Current pot</span>
              <span className="text-2xl font-bold">
                Ξ{formatEther(currentBalance, 3)}
              </span>
            </div>

            <div className="col-span-1 flex flex-col text-center">
              <span className="mr-2 text-gray-500">Latest bid </span>
              <span className="text-2xl font-bold">
                Ξ{formatEther(currentBid, 3)}
              </span>
            </div>

            <div className="flex flex-col text-center md:col-span-2">
              <span className="mr-2 text-gray-500">Currently winning</span>
              <span className="text-2xl font-bold">{User}</span>
            </div>

            <div className="flex flex-col text-center md:col-span-2">
              <span className="mr-2 text-gray-500">
                Ends {expiry.format("MMM Do")} at
              </span>
              <span className="text-2xl font-bold">
                {expiry.format("h:mm a")}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
