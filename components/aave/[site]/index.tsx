import { shortenEthereumAddress } from "@/lib/utils";
import { ISiteProps } from "@/pages/_sites/[site]";
import Davatar from "@davatar/react";
import { ethers } from "ethers";
import { useProvider } from "wagmi";

export default function AaveSite({ site, owner }: ISiteProps) {
  const isRegistered = owner && owner !== ethers.constants.AddressZero;
  const provider = useProvider();
  return (
    <div className="relative w-full max-w-xl">
      <div className="relative mb-4 w-full rounded border border-gray-200 bg-white p-8 shadow-md">
        {isRegistered ? (
          <div>
            <div className="flex items-center space-x-2">
              <div className="inline-block">
                <Davatar
                  size={80}
                  address={owner}
                  provider={provider}
                  generatedAvatarType="jazzicon"
                />
              </div>
              <span className="text-3xl">{shortenEthereumAddress(owner)}</span>
            </div>
            <p className="mt-4">Owner of the domain: {site}.</p>
          </div>
        ) : (
          <p>This domain is not registered yet.</p>
        )}
      </div>
    </div>
  );
}
