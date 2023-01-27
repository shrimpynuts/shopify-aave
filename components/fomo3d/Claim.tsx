import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { Fomo3dABIContract } from "./config";

export default function Claim() {
  const { config } = usePrepareContractWrite({
    ...Fomo3dABIContract,
    functionName: "claim",
  });
  const { write } = useContractWrite(config);
  const onClick = () => {
    write?.();
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="font-serif">
        <p>Congratulations, you have won!</p>
        <p>Click the button below to claim the pot and register your win.</p>
      </div>
      <div>
        <button
          className="rounded-lg  bg-[#EB7104] py-2 px-4 text-yellow-100"
          onClick={onClick}
        >
          Claim
        </button>
      </div>
    </div>
  );
}
