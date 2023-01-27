import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";
import useScroll from "@/lib/hooks/use-scroll";
import Meta from "./meta";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Layout({
  meta,
  children,
}: {
  meta?: {
    title?: string;
    description?: string;
    image?: string;
  };
  children: ReactNode;
}) {
  const scrolled = useScroll(50);

  return (
    <>
      <Meta {...meta} />
      {/* bg-[#FDF1E4] */}
      {/* bg-background-jpeg */}
      <div className="fixed h-screen w-screen bg-[#FDF1E4]" />
      <div className="fixed h-screen w-screen bg-background-jpeg bg-auto opacity-40" />
      <div
        className={`fixed top-0 w-full ${
          scrolled
            ? // ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl" THIS DOES BLURRED HEADER
              "border-b bg-white"
            : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto">
          <Link href="/" className="flex items-center font-display text-2xl">
            <p className="ml-2 font-serif text-4xl font-extrabold text-gray-700">
              Fomo3D
            </p>
          </Link>
          <div>
            <AnimatePresence>
              <ConnectButton />
            </AnimatePresence>
          </div>
        </div>
      </div>
      <main className="flex w-screen flex-col items-center justify-center py-32">
        {children}
      </main>
    </>
  );
}
