import { shortenEthereumAddress } from "@/lib/utils";
import Davatar from "@davatar/react";
import { useProvider } from "wagmi";

interface IAccountProps {
  address: string;
  link: string;
}

export default function Account({ address, link }: IAccountProps) {
  const provider = useProvider();

  return (
    <div className="inline-block justify-center">
      <a
        className="flex space-x-1 transition duration-200 ease-in-out hover:scale-105 hover:cursor-pointer hover:text-blue-600"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="inline-block">
          <Davatar
            size={24}
            address={address}
            provider={provider}
            generatedAvatarType="jazzicon"
          />
        </div>
        <span>{shortenEthereumAddress(address)}</span>
      </a>
    </div>
  );
}
