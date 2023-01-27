import Account from "@/components/shared/account";
import { ISiteProps } from "@/pages/_sites/[site]";
import RegisterDomain from "../RegisterDomain";

export default function AboutSite({ data: { owner } }: { data: ISiteProps }) {
  return (
    <div className="relative w-full px-32">
      <div className="mx-auto max-w-2xl rounded border border-gray-200 bg-white p-8 shadow-md">
        <p className="mb-4">
          This demonstrates that the data is dynamic, even on routes like
          /about.
        </p>
        <Account address={owner} />
        <p className="my-4">
          This demonstrates that you can interact with smart contracts on
          subdomains.
        </p>
        <RegisterDomain />
      </div>
    </div>
  );
}
