import { shortenEthereumAddress } from "@/lib/utils";
import { IPathProps, ISiteProps } from "@/pages/_sites/[site]";
import { GetServerSideProps } from "next";
import Davatar from "@davatar/react";
import { ethers } from "ethers";
import { useProvider } from "wagmi";

import SiteLayout from "@/components/aave/[site]/layout";
import NonSSRWrapper from "@/components/shared/no-ssr-wrapper";
import { DomainRegistryABIContract } from "@/components/aave/config";
import AboutSite from "@/components/aave/[site]/about";

export default function About({ site, owner, isRegistered }: ISiteProps) {
  return (
    <SiteLayout
      meta={{
        title: site,
        description: owner,
      }}
      data={{ site, owner, isRegistered }}
    >
      <NonSSRWrapper>
        <AboutSite data={{ site, owner, isRegistered }} />
      </NonSSRWrapper>
    </SiteLayout>
  );
}

export const getServerSideProps: GetServerSideProps<
  ISiteProps,
  IPathProps
> = async ({ params }) => {
  if (!params) throw new Error("No path parameters found");
  const { site } = params;
  if (!site || typeof site !== "string")
    return { notFound: true, revalidate: 10 };

  const provider = new ethers.providers.JsonRpcProvider(
    "https://eth-goerli.g.alchemy.com/v2/LVkhYxkmpSAIi8xPEj2xDkDifCkGMg_z",
    5,
  );

  const DomainRegistryContract = new ethers.Contract(
    DomainRegistryABIContract.address,
    DomainRegistryABIContract.abi,
    provider,
  );
  const owner = await DomainRegistryContract.domainToOwner(site);
  const isRegistered = owner !== ethers.constants.AddressZero;

  return {
    props: {
      owner,
      site,
      isRegistered,
    },
  };
};
