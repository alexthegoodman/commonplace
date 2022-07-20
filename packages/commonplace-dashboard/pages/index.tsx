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
  const [totalUsersData, setTotalUsersData] = useState();

  const [dauData, setDauData] = useState();
  const [dauMonthlyData, setDauMonthlyData] = useState();

  const [mauData, setMauData] = useState();
  const [mauYearlyData, setMauYearlyData] = useState();

  const [totalPostsData, setTotalPostsData] = useState();
  const [totalPostsByInterestData, setTotalPostsByInterestData] = useState();

  useEffect(() => {
    instance.get("/total-users").then((response) => {
      console.info("/total-users", response);
      setTotalUsersData(response.data);
    });

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
      <header className="header">
        <div className="headerInner">
          <div className="headerBrand">
            <img className="logo" src="/logo.png" />
            <h1>
              <strong>CommonPlace</strong> Dashboard
            </h1>
          </div>
          <div className="headerKpi">
            <span>{totalUsersData?.totalUsers} Total Users</span>
          </div>
        </div>
      </header>

      <div className="container">
        <div className="containerInner">
          <section className="kpi dau">
            <div className="kpiTitle">
              <span>DAU (Daily Active Users - last 24 hours)</span>
            </div>
            <div className="kpiStat">
              <span>{dauData?.dau}</span>
            </div>
          </section>
          <section className="kpi dau">
            <div className="kpiTitle">
              <span>DAU Monthly (Daily Active Users by Day)</span>
            </div>
            <div className="kpiViz">
              {dauMonthlyData ? (
                <LineViz analysisData={dauMonthlyData} />
              ) : (
                <></>
              )}
            </div>
          </section>

          <section className="kpi mau">
            <div className="kpiTitle">
              <span>MAU (Monthly Active Users - last 30 days)</span>
            </div>
            <div className="kpiStat">
              <span>{mauData?.mau}</span>
            </div>
          </section>
          <section className="kpi mauYearly">
            <div className="kpiTitle">
              <span>MAU Yearly (Monthly Active Users by Month)</span>
            </div>
            <div className="kpiViz">
              {mauYearlyData ? <LineViz analysisData={mauYearlyData} /> : <></>}
            </div>
          </section>

          <section className="kpi">
            <div className="kpiTitle">
              <span>Total Posts</span>
            </div>
            <div className="kpiStat">
              <span>{totalPostsData?.totalPosts}</span>
            </div>
          </section>
          <section className="kpi">
            <div className="kpiTitle">
              <span>Total Posts (by Interest)</span>
            </div>
            <div className="kpiViz">
              {totalPostsByInterestData ? (
                <PieViz
                  analysisData={totalPostsByInterestData?.postsByInterest}
                />
              ) : (
                <></>
              )}
            </div>
          </section>

          {/* <section className="kpi">
            <div className="kpiStat">
              <span></span>Daily Impressions
            </div>
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
          </section> */}
        </div>
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
