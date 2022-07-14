import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { DateTime } from "luxon";
import axios from "axios";

import BarViz from "../components/BarViz/BarViz";
import LineViz from "../components/LineViz/LineViz";
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
  const [dauData, setDauData] = useState();
  const [dauMonthlyData, setDauMonthlyData] = useState();

  const [mauData, setMauData] = useState();
  const [mauYearlyData, setMauYearlyData] = useState();

  const [totalPostsData, setTotalPostsData] = useState();
  const [totalPostsByInterestData, setTotalPostsByInterestData] = useState();

  useEffect(() => {
    instance.get("/dau").then((response) => {
      console.info("/dau", response);
      setDauData(response.data);
    });
    instance.get("/dau/monthly").then((response) => {
      console.info("/dau/monthly", response);
      setDauMonthlyData(response.data);
    });

    instance.get("/mau").then((response) => {
      console.info("/mau", response);
      setMauData(response.data);
    });
    instance.get("/mau/yearly").then((response) => {
      console.info("/mau/yearly", response);
      setMauYearlyData(response.data);
    });

    instance.get("/total-posts").then((response) => {
      console.info("/total-posts", response);
      setTotalPostsData(response.data);
    });
    instance.get("/total-posts/interest").then((response) => {
      console.info("/total-posts/interest", response);
      setTotalPostsByInterestData(response.data);
    });
  }, []);

  return (
    <>
      <h1>CommonPlace Dashboard</h1>
      <div className="container">
        <section className="leftColumn">
          <section className="kpi dau">
            <div className="dauDaily">{dauData?.dau} DAU</div>
            {dauMonthlyData ? (
              <LineViz title="DAU Monthly" analysisData={dauMonthlyData} />
            ) : (
              <></>
            )}
          </section>

          <section className="kpi mau">
            <div className="mauDaily">{mauData?.mau} MAU</div>
            {mauYearlyData ? (
              <LineViz title="MAU Yearly" analysisData={mauYearlyData} />
            ) : (
              <></>
            )}
          </section>
        </section>

        <section className="rightColumn">
          <section className="kpi">
            <div className="">{totalPostsData?.totalPosts} Total Posts</div>
            {totalPostsByInterestData ? (
              <PieViz
                analysisData={totalPostsByInterestData?.postsByInterest}
              />
            ) : (
              <></>
            )}
          </section>

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
        </section>
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
