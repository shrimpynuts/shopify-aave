import { Github } from "@/components/shared/icons";
import Image from "next/image";

export default function Info() {
  return (
    <div className="relative mt-8 w-full rounded border border-gray-200 bg-white p-8 shadow-md ">
      <h2 className="font-serif text-2xl font-bold">What is this?</h2>
      <p className="text-md mt-2">
        This is a lottery game on the Scroll testnet. It is based on{" "}
        <a
          className="font-semibold after:content-['_↗'] hover:text-blue-600"
          href="https://medium.com/coinmonks/fomo3d-ponzi-or-gambling-cc70faf6ba35"
          target="_blank"
          rel="noopener noreferrer"
        >
          the original Fomo3D
        </a>{" "}
        from 2018.
      </p>
      <h2 className="mt-4 font-serif text-2xl font-bold">How do you play?</h2>
      <p className="text-md mt-2">
        When the game starts, the timer starts counting down 24 hours. <br />
        Players make progressively larger bids, each time resetting the timer,
        and increasing the pot. <br /> Once the timer finally runs out, the
        final player to bid is the winner.
      </p>
      <h2 className="mt-4 font-serif text-2xl font-bold">
        What are the requirements to play?
      </h2>
      <ol className="mt-2 ml-6 list-decimal">
        <li>
          Since this is on the Scroll testnet, you will have to add the Scroll
          network(s) to MetaMask. Follow the instructions{" "}
          <a
            className="font-semibold after:content-['_↗'] hover:text-blue-600"
            href="https://scroll.io/prealpha"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          .
        </li>
        <li>
          In order to bid, you also need to have Scroll testnet tokens. You can
          receive these for free at the{" "}
          <a
            className="font-semibold after:content-['_↗'] hover:text-blue-600"
            href="https://scroll.io/prealpha/faucet"
            target="_blank"
            rel="noopener noreferrer"
          >
            faucet
          </a>
          .
        </li>
        <li>
          Finally, bridge your Scroll L1 testnet tokens from to the Scroll L2
          Testnet, using this{" "}
          <a
            className="font-semibold after:content-['_↗'] hover:text-blue-600"
            href="https://scroll.io/prealpha/bridge"
            target="_blank"
            rel="noopener noreferrer"
          >
            bridge
          </a>
          .
        </li>
      </ol>

      <h2 className="mt-4 font-serif text-2xl font-bold">
        What is the prize for winning?
      </h2>
      <p className="text-md mt-2">
        The winner will receive the entire pot, and a [ENTER_PRIZE_HERE] with
        the team at Scroll!
      </p>

      <div className="mt-4 flex justify-between">
        <a
          className="mt-4 flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-400"
          href="https://github.com/shrimpynuts/fomo3d-contracts"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
          <p>View GitHub</p>
        </a>
        <a
          className="mt-4 flex items-center justify-end space-x-1 rounded-full text-sm text-gray-600 transition-colors "
          href="https://scroll.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>Powered by</p>
          <Image
            src="/scroll-logo.png"
            className=""
            alt="Scroll logo"
            width={80}
            height={20}
          />
        </a>
      </div>
    </div>
  );
}
