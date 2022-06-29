import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";

import { useClient } from "../lib/client";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useClient();

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} /> 
    </ApolloProvider>
  );
}

export default MyApp;
