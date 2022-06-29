import { ApolloClient, InMemoryCache } from "@apollo/client"
import { useMemo } from "react"

export const useClient = () => {
    const client = useMemo(() => new ApolloClient({
        uri: "https://api.thegraph.com/subgraphs/name/theledgerofjoudi/dai-lbp-subgraph",
        cache: new InMemoryCache(),
    }),
        []
    );
    return client;
}
