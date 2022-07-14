import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { DateTime } from "luxon";
import axios from "axios";

import BarViz from "../components/BarViz/BarViz";
import LineViz from "../components/LineViz/LineViz";
import styles from "../styles/Home.module.css";
import PieViz from "../components/PieViz/PieViz";
import { useEffect, useState } from "react";

const instance = axios.create({
  baseURL: "http://localhost:3001/dashboard",
  // TODO: auth
  // headers: {
  //   Authorization:
  //     "Basic ",
  // },
});

const Home: NextPage = () => {
  const [dauMonthlyData, setDauMonthlyData] = useState();

  useEffect(() => {
    instance.get("/dau/monthly").then((response) => {
      console.info("/dau/monthly", response);
      setDauMonthlyData(response.data);
    });
  }, []);

  return (
    <>
      <h1>CommonPlace Dashboard</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <BarViz
          analysisData={[
            {
              title: "Title 1",
              value: 2,
            },
            {
              title: "Title 2",
              value: 5,
            },
          ]}
        />
        <LineViz title="DAU Monthly" analysisData={dauMonthlyData} />
        <PieViz
          analysisData={[
            {
              letter: "Test",
              value: 1,
            },
            {
              letter: "Test 2",
              value: 2,
            },
            {
              letter: "Test 3",
              value: 3,
            },
            {
              letter: "Test 4",
              value: 5,
            },
          ]}
        />
      </div>
    </>
  );
};

export async function getServerSideProps() {
  return {
    props: {
      fallback: {
        updatesKey: null,
      },
    },
  };
}

export default Home;
