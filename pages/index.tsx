import Layout from "@/components/layout";
import NonSSRWrapper from "@/components/shared/no-ssr-wrapper";

import Fomo3D from "@/components/fomo3d/";

export default function Home() {
  return (
    <Layout>
      <NonSSRWrapper>
        <Fomo3D />
      </NonSSRWrapper>
    </Layout>
  );
}
