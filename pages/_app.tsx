import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { WagmiConfig } from "wagmi";
import { useApolloClient } from "../lib/apolloClient";
import { useWagmiClient } from "../lib/wagmiClient";


function MyApp({ Component, pageProps }: AppProps) {
  const wagmiClient = useWagmiClient();

  return (
    <WagmiConfig client={wagmiClient}>
    <Component {...pageProps} />
  </WagmiConfig>
  );
}

export default MyApp;
