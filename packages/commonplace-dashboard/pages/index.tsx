import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import BarViz from "../components/BarViz/BarViz";
import LineViz from "../components/LineViz/LineViz";
import styles from "../styles/Home.module.css";
import { DateTime } from "luxon";
import PieViz from "../components/PieViz/PieViz";

const Home: NextPage = () => {
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
        <LineViz
          analysisData={[
            {
              date: DateTime.now().toISO(),
              value: 3,
            },
            {
              date: DateTime.now().plus({ days: 1 }).toISO(),
              value: 7,
            },
            {
              date: DateTime.now().plus({ days: 2 }).toISO(),
              value: 5,
            },
            {
              date: DateTime.now().plus({ days: 3 }).toISO(),
              value: 9,
            },
          ]}
        />
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