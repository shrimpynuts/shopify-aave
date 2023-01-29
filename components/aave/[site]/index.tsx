import Davatar from "@davatar/react";
import { ethers } from "ethers";
import { useProvider } from "wagmi";

import { shortenEthereumAddress } from "@/lib/utils";
import { ISiteProps } from "@/pages/_sites/[site]";
import Assets from "@/components/aave/[site]/assets";

const Skeleton = ({ numRows }: { numRows: number }) => (
  <div
    role="status"
    className="my-4 max-w-2xl animate-pulse space-y-4 divide-y divide-gray-200 rounded dark:divide-gray-700 "
  >
    {Array.from(Array(numRows).keys()).map((_, idx) => (
      <div className="flex items-center justify-between pt-4" key={idx}>
        <div>
          <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-200 dark:bg-gray-600"></div>
          <div className="h-2 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        </div>
        <div className="h-2.5 w-12 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      </div>
    ))}

    <span className="sr-only">Loading...</span>
  </div>
);

export default function AaveSite({
  data: { isRegistered },
}: {
  data: ISiteProps;
}) {
  return (
    <div className="relative my-4 w-full px-32">
      {isRegistered ? (
        <div>
          <h1 className="mb-24 text-4xl text-white">Ethereum Market</h1>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-32 w-full rounded border border-gray-200 bg-white p-8 shadow-md">
              <h2 className="text-xl">Your supplies</h2>
            </div>
            <div className="h-32 w-full rounded border border-gray-200 bg-white p-8 shadow-md">
              <h2 className="text-xl">Your borrows</h2>
            </div>
            <div className="w-full rounded border border-gray-200 bg-white p-8 shadow-md">
              <h2 className="text-xl">Assets to supply</h2>
              <Assets />
            </div>
            <div className="w-full rounded border border-gray-200 bg-white p-8 shadow-md">
              <h2 className="text-xl">Assets to borrow</h2>
              <Skeleton numRows={8} />
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto mb-4 w-full max-w-sm rounded border border-gray-200 bg-white p-8 shadow-md">
          <p className="text-center italic">
            This domain is not registered yet.
          </p>
        </div>
      )}
    </div>
  );
}
