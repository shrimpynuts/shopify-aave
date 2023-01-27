import { GetServerSideProps } from "next";
import type { ParsedUrlQuery } from "querystring";
import { ShopifyAaveABIContract } from "@/components/aave/config";
import { ethers } from "ethers";

interface ISiteProps {
  site: string;
  owner: string;
}

interface IPathProps extends ParsedUrlQuery {}

export default function Site({ site, owner }: ISiteProps) {
  const isRegistered = owner !== ethers.constants.AddressZero;
  return (
    <div>
      {isRegistered ? (
        <p>
          Domain {site} is owned by {owner}
        </p>
      ) : (
        <p>This domain is not registered yet.</p>
      )}
    </div>
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

  return {
    props: {
      owner,
      site,
    },
  };
};
