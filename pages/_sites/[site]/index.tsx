import { GetServerSideProps } from "next";
import type { ParsedUrlQuery } from "querystring";
import { ShopifyAaveABIContract } from "@/components/aave/config";
import { ethers } from "ethers";

import SiteLayout from "@/components/aave/[site]/layout";
import NonSSRWrapper from "@/components/shared/no-ssr-wrapper";
import AaveSite from "@/components/aave/[site]";

export interface ISiteProps {
  site: string;
  owner: string;
  isRegistered: boolean;
}

interface IPathProps extends ParsedUrlQuery {}

export default function Site({ site, owner, isRegistered }: ISiteProps) {
  return (
    <SiteLayout
      meta={{
        title: site,
        description: owner,
      }}
      data={{ site, owner, isRegistered }}
    >
      <NonSSRWrapper>
        <AaveSite data={{ site, owner, isRegistered }} />
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
    ShopifyAaveABIContract.address,
    ShopifyAaveABIContract.abi,
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
