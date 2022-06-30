import type { NextPage } from "next";
import { useGetAllPoolsQuery } from "../src/generated/graphql";
import {
  Key,
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
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-white border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Pool address
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Created by
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Chain
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pools?.map(
                    (
                      crp: {
                        id: Key | null | undefined;
                        creator: { id: Key };
                      },
                      index: number
                    ) => (
                      <tr
                        key={crp.id}
                        className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {crp.id}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {crp.creator.id}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          Kovan
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
