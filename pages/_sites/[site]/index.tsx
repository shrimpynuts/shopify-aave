import { GetServerSideProps } from "next";
import type { ParsedUrlQuery } from "querystring";

interface ISiteProps {
  site: string;
}

interface IPathProps extends ParsedUrlQuery {}

export default function Site({ site }: ISiteProps) {
  return <p>Hello{site}</p>;
}

export const getServerSideProps: GetServerSideProps<
  ISiteProps,
  IPathProps
> = async ({ params }) => {
  if (!params) throw new Error("No path parameters found");
  const { site } = params;
  if (!site || typeof site !== "string")
    return { notFound: true, revalidate: 10 };
  return {
    props: {
      site,
    },
  };
};
