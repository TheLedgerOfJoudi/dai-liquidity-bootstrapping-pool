import { GetStaticPaths, GetStaticProps } from "next";
import { getAllPools } from "../../lib/pools";
import { useFactoryContract } from "../../lib/factoryContract";
import { SetStateAction, useState } from "react";
import { ethers } from "ethers";

const PoolPage = (props: any) => {
  
  return <div>pool page</div>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPools();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      params,
    },
  };
};

export default PoolPage;
