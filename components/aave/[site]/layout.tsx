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
        className={`fixed top-0 w-full border-b border-gray-500 ${
          scrolled
            ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
            : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-2xl items-center justify-between xl:mx-auto">
          <Link href="/" className="flex items-center font-display text-2xl">
            <p className="ml-2 font-mono text-2xl font-extrabold text-gray-200">
              {site} - {shortenEthereumAddress(owner)}&apos;s lending pool
            </p>
          </Link>
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
