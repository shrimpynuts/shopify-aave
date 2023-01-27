import Layout from "@/components/layout";
import NonSSRWrapper from "@/components/shared/no-ssr-wrapper";

import Aave from "@/components/aave/";

export default function Home() {
  return (
    <Layout>
      <NonSSRWrapper>
        <Aave />
      </NonSSRWrapper>
    </Layout>
  );
}
