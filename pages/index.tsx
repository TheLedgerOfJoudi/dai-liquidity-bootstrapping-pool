import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useGetAllPoolsQuery } from "../src/generated/graphql";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { useApolloClient } from "../lib/apolloClient";
import { ConnectWallet } from "../src/components/ConnectWallet";

const Home: NextPage = () => {
  const [pools, setPools] = useState<any>();
  const client = useApolloClient();
  const { error, loading, data } = useGetAllPoolsQuery({ client });

  useEffect(() => {
    if (data) {
      setPools(data.crps);
    }
  }, [error, loading, data]);

  console.log(pools);
  return (
    <div>
      <ConnectWallet />
      <table>
        <tbody>
      {pools?.map(
        (crp: { id: Key | null | undefined; creator: { id: Key } }) => (
          <tr key={crp.id} className = "odd:bg-white even:bg-slate-50">
            <td> {crp.id}</td>
            <td> {crp.creator.id} </td>
            {/* {crp.id} created by {crp.creator.id} */}
          </tr>
        )
      )}
      </tbody>
      </table>
    </div>
  );
};

export default Home;
