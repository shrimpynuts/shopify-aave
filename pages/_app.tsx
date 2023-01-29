import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import { Provider as RWBProvider } from "react-wrap-balancer";
import cx from "classnames";
import localFont from "@next/font/local";
import { Inter } from "@next/font/google";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
// import { alchemyProvider } from "wagmi/providers/alchemy";
import { WagmiConfig, createClient, configureChains, Chain } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { lightTheme } from "@rainbow-me/rainbowkit";
import { goerli } from "wagmi";

import "@rainbow-me/rainbowkit/styles.css";
import { AppDataProvider } from "hooks/app-data-provider/useAppDataProvider";
import { BackgroundDataProvider } from "hooks/app-data-provider/BackgroundDataProvider";

const sfPro = localFont({
  src: "../styles/SF-Pro-Display-Medium.otf",
  variable: "--font-sf",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// if (!process.env.NEXT_PUBLIC_ALCHEMY_API)
//   throw `🚫 Environment variable NEXT_PUBLIC_ALCHEMY_API missing!`;

export const scroll: Chain = {
  id: 534_354,
  name: "Scroll",
  network: "scroll",
  nativeCurrency: {
    decimals: 18,
    name: "Scroll",
    symbol: "TSETH",
  },
  rpcUrls: {
    default: { http: ["https://prealpha-rpc.scroll.io/l2"] },
  },
  blockExplorers: {
    default: { name: "L2Scan", url: "https://l2scan.scroll.io" },
  },
};

// First in array is "default"
const configuredChains = [goerli];

const { chains, provider } = configureChains(configuredChains, [
  // alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API }),
  publicProvider(),
]);
const { connectors } = getDefaultWallets({
  appName: "Fomo3D",
  chains,
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function MyApp({
  Component,
  pageProps: { ...pageProps },
}: AppProps<{}>) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        theme={lightTheme({
          accentColor: "#374151",
          accentColorForeground: "white",
          fontStack: "system",
          borderRadius: "medium",
          overlayBlur: "small",
        })}
        chains={chains}
        initialChain={configuredChains[0]}
      >
        <BackgroundDataProvider>
          <AppDataProvider>
            <RWBProvider>
              <main className={cx(sfPro.variable, inter.variable)}>
                <Component {...pageProps} />
              </main>
              <Analytics />
            </RWBProvider>
          </AppDataProvider>
        </BackgroundDataProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
