import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "layout";
import { PluginProvider } from "hooks";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PluginProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </PluginProvider>
  );
}

export default MyApp;
