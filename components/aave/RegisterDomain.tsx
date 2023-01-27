import { ethers } from "ethers";
import { useEffect, useState } from "react";
import {
  useAccount,
  useContract,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import {
  ShopifyAaveABIContract,
  blockExplorer,
} from "@/components/aave/config";
import toast, { Toaster } from "react-hot-toast";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import Account from "../shared/account";

interface IRegisterDomainInterface {}

export default function RegisterDomain({}: IRegisterDomainInterface) {
  const [domain, setDomain] = useState("");
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  const { refetch, data, isFetched, isError } = useContractRead({
    ...ShopifyAaveABIContract,
    functionName: "domainToOwner",
    args: [domain],
    enabled: false,
  });
  const owner = data && (data as unknown as string);
  const isRegistered =
    isFetched && !isError && owner && owner !== ethers.constants.AddressZero;

  console.log({ isRegistered, owner });

  const { config } = usePrepareContractWrite({
    ...ShopifyAaveABIContract,
    functionName: "register",
    args: [domain],
  });
  const { writeAsync } = useContractWrite(config);

  const onClick = () => {
    // if (parseFloat(bidAmount) < parseFloat(minimumBid))
    //   return toast.error(`You must bid at least Ξ${minimumBid}`);

    if (!isConnected) return openConnectModal?.();

    writeAsync?.()
      .then(({ hash, wait }: any) => {
        const transactionLink = `${blockExplorer}/tx/${hash}`;
        toast.promise(wait(), {
          loading: (
            <div className="flex flex-row space-x-2">
              <span>Registering {domain}... </span>
              <a
                href={transactionLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 font-bold"
              >
                <span className="after:content-['_↗']">View transaction</span>
              </a>
            </div>
          ),
          success: "Domain registered!",
          error: "Error occured while registerring domain",
        });
      })
      .catch((err) => {
        console.log({ err });
        if (err.toString().includes("UserRejectedRequestError"))
          return toast.error("Rejected transaction in MetaMask");
      })
      .then(() => refetch());
  };

  const onChange = (e: any) => {
    setDomain(e.currentTarget.value);
    refetch();
  };

  const origin =
    typeof window !== "undefined" && window.location.host
      ? window.location.host
      : "";
  const isLocalhost = process.env.NODE_ENV === "development";

  return (
    <div className="relative mb-4 h-40 w-full rounded border border-gray-200 bg-white p-8 shadow-md">
      <div className="flex justify-between">
        <div>
          <input
            className="w-32 rounded-md border-gray-300"
            type="text"
            onChange={onChange}
          />
          <span className="ml-2 inline-block self-center">.{origin}</span>
        </div>
        <div className="space-x-2">
          {!isRegistered ? (
            <button
              className="rounded-md bg-[#EB7104] py-2 px-4 text-yellow-100"
              onClick={onClick}
            >
              Register
            </button>
          ) : (
            <a
              href={
                isLocalhost
                  ? `http://${domain}.${origin}`
                  : `https://${domain}.${origin}`
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="rounded-md bg-blue-600 py-2 px-4 text-yellow-100">
                View
              </button>
            </a>
          )}
        </div>
      </div>
      {isRegistered && (
        <div className="mt-2 flex space-x-1 text-red-600">
          <p className="">This domain has been registered by</p>
          <Account address={owner} />
        </div>
      )}
      <Toaster />
    </div>
  );
}
