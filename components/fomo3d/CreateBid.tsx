import { ethers } from "ethers";
import { useState } from "react";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { blockExplorer, Fomo3dABIContract } from "./config";
import toast, { Toaster } from "react-hot-toast";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { Link } from "../shared/icons";
import { IGameState } from ".";
import ShareTweetButton from "../shared/shareTweetButton";

interface ICreateBidInterface {
  state: IGameState;
  minimumBid: string;
}

export default function CreateBid({
  minimumBid,
  state: { currentBidder },
}: ICreateBidInterface) {
  const [bidAmount, setBidAmount] = useState(minimumBid);
  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  const { config } = usePrepareContractWrite({
    ...Fomo3dABIContract,
    functionName: "bid",
    overrides: {
      value: ethers.utils.parseEther(bidAmount),
    },
  });
  const { writeAsync } = useContractWrite(config);
  const onClick = () => {
    if (parseFloat(bidAmount) < parseFloat(minimumBid))
      return toast.error(`You must bid at least Ξ${minimumBid}`);

    if (!isConnected) return openConnectModal?.();

    writeAsync?.()
      .then(({ hash, wait }: any) => {
        const transactionLink = `${blockExplorer}/tx/${hash}`;
        toast.promise(wait(), {
          loading: (
            <div className="flex flex-row space-x-2">
              <span>Submitting bid... </span>
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
          success: "Bid submitted!",
          error: "Error occured while submitting bid",
        });
      })
      .catch((err) => {
        console.log({ err });
        if (err.toString().includes("UserRejectedRequestError"))
          return toast.error("Rejected transaction in MetaMask");
      });
  };

  const onChange = (e: any) => {
    setBidAmount(e.currentTarget.value);
  };

  const twitterShareText = `im fomoOOoooOoOing\nhttps://fomo3d-frontend.vercel.app/`;

  const twitterShareLink = `https://twitter.com/intent/tweet?ref_src=twsrc%5Etfw&text=${encodeURIComponent(
    twitterShareText,
  )}&tw_p=tweetbutton`;

  return (
    <div>
      {currentBidder == address && (
        <p className="mb-4 text-gray-500">
          You are currently the highest bidder. Let &apos;em know
          <div className="ml-2 inline-block">
            <ShareTweetButton link={twitterShareLink} />
          </div>
        </p>
      )}
      <div className="flex space-x-2">
        <input
          className="rounded-md border-gray-300"
          type="number"
          min={minimumBid}
          value={bidAmount}
          step="0.01"
          onChange={onChange}
        />
        <button
          className="rounded-md  bg-[#EB7104] py-2 px-4 text-yellow-100"
          onClick={onClick}
        >
          Bid
        </button>
      </div>
      <p className="mt-2 text-gray-500">
        Next bid must be at least Ξ{minimumBid}
      </p>
      <Toaster />
    </div>
  );
}
