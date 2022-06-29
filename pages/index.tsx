import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useGetAllPoolsQuery } from "../src/generated/graphql";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [pools, setPools] = useState<any>();

  const {error, loading, data} = useGetAllPoolsQuery()
  
  useEffect(() => {
    console.log(data)
    if (data) {
      setPools(data);
    }
  }, [error, loading, data]);

  return (
    <div className={styles.container}>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </div>
  );
};

export default Home;
