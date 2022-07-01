import { GetStaticPaths, GetStaticProps } from "next";
import { getAllPools } from "../../lib/pools";
import axios from "axios";
import PoolChart from "../../src/components/Chart"
const PoolPage = (props: any) => {
  const pool = props.jsonRes[0];
  return (
    <div className="flex justify-center">
      <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
        <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
          XYZ-DAI LBP
        </h5>
        <p className="text-gray-700 text-base mb-4">
          Starting weights are: <br />
          XYZ: {pool.firstTokenWeight / 10 ** 18}
          <br />
          DAI: {pool.secondTokenWeight / 10 ** 18}
          <br />
          XYZ's initial Balance: {pool.firstTokenBalance / 10 ** 18}
          <br />
          DAI's initial Balance: {pool.secondTokenBalance / 10 ** 18}
        </p>
        <button
          type="button"
          className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          <a href={`https://kovan.etherscan.io/address/${pool.token}`} target = "_blank">
            {" "}
            view XYZ on Etherscan{" "}
          </a>
        </button>
      </div>
      <br/>
      <hr/>
    <PoolChart />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPools();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id;
  let q =
    `
  {
  crps(where: {id:` +
    `"` +
    id +
    `"` +
    `}) {
      id
      creator {
        id
      }
      token
      firstTokenBalance
      firstTokenWeight
      secondTokenBalance
      secondTokenWeight
      swapFee
    }
  }
  `;

  let res = await axios.post(
    "https://api.thegraph.com/subgraphs/name/theledgerofjoudi/dai-lbp-subgraph",
    {
      query: q,
    }
  );

  let jsonRes = res.data.data.crps;

  return {
    props: {
      jsonRes,
    },
  };
};

export default PoolPage;
