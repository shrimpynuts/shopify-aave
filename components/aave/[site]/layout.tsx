import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";
import useScroll from "@/lib/hooks/use-scroll";
import Meta from "./meta";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ISiteProps } from "@/pages/_sites/[site]";
import { shortenEthereumAddress } from "@/lib/utils";

export default function SiteLayout({
  meta,
  children,
  data: { owner, site },
}: {
  meta?: {
    title?: string;
    description?: string;
    image?: string;
  };
  data: ISiteProps;
  children: ReactNode;
}) {
  const scrolled = useScroll(50);

  return (
    <>
      <Meta {...meta} />
      <div className="fixed h-screen w-screen bg-[#2B2D3C]" />
      <div className="fixed my-72 h-screen w-screen bg-[#F1F1F3]" />
      <div
        className={`fixed top-0 w-full border-b border-gray-500 bg-[#2B2D3C] ${
          scrolled ? " backdrop-blur-xl" : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="flex h-16 max-w-screen-2xl items-center justify-between px-4 xl:mx-auto">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center font-display text-2xl">
              <p className="text-gradient-to-r ml-2 bg-gradient-to-r from-blue-300 to-pink-600 bg-clip-text font-mono text-xl font-extrabold text-transparent">
                {site} - {shortenEthereumAddress(owner)}&apos;s lending pool
              </p>
            </Link>
            <Link
              href="/about"
              className="flex items-center font-display text-2xl"
            >
              <p className="ml-2 font-mono text-sm text-gray-200">About</p>
            </Link>
            <Link
              href="/about"
              className="flex items-center font-display text-2xl"
            >
              <p className="ml-2 font-mono text-sm text-gray-200">Markets</p>
            </Link>
            <Link
              href="/about"
              className="flex items-center font-display text-2xl"
            >
              <p className="ml-2 font-mono text-sm text-gray-200">Stake</p>
            </Link>
            <Link
              href="/about"
              className="flex items-center font-display text-2xl"
            >
              <p className="ml-2 font-mono text-sm text-gray-200">More</p>
            </Link>
          </div>
          <div>
            <AnimatePresence>
              <ConnectButton />
            </AnimatePresence>
          </div>
        </div>
      </div>
      <main className="flex w-screen flex-col items-center justify-center py-24">
        {children}
      </main>
    </>
  );
}
