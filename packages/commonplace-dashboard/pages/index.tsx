import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { DateTime } from "luxon";
import axios from "axios";
import { useCookies } from "react-cookie";
import useSWR, { SWRConfig } from "swr";

import BarViz from "../components/BarViz/BarViz";
import LineViz from "../components/LineViz/LineViz";
import PieViz from "../components/PieViz/PieViz";
import { GQLClient } from "../../commonplace-utilities/lib/GQLClient";
import { gql } from "graphql-request";

const getUserData = async (token: string) => {
  const gqlClient = new GQLClient(token);

  const userData = await gqlClient.client.request(gql`
    query GetDashboardData {
      getDashboardData {
        totalUsers
        dau
        dauMonthly {
          date
          value
        }
        mau
        mauYearly {
          date
          value
        }
        totalPosts
        totalPostsByInterest {
          label
          value
        }
        dailyImpressions
        dailyImpressionsByInterest {
          label
          value
        }
      }
    }
  `);

  return userData;
};

const Home: NextPage = () => {
  const [cookies] = useCookies(["coUserToken"]);
  const token = cookies.coUserToken;

  const { data } = useSWR("dashboardKey", () => getUserData(token));

  console.info("data", data?.getDashboardData);

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
            <span>{data?.getDashboardData?.totalUsers} Total Users</span>
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
              <span>{data?.getDashboardData?.dau}</span>
            </div>
          </section>
          <section className="kpi dau">
            <div className="kpiTitle">
              <span>DAU Monthly (Daily Active Users by Day)</span>
            </div>
            <div className="kpiViz">
              {data?.getDashboardData?.dauMonthly ? (
                <LineViz analysisData={data?.getDashboardData?.dauMonthly} />
              ) : (
                <></>
              )}
            </div>
          </section>

          <section className="kpi">
            <div className="kpiTitle">
              <span>Daily Impressions (Last 24 Hours)</span>
            </div>
            <div className="kpiStat">
              <span>{data?.getDashboardData?.dailyImpressions}</span>
            </div>
          </section>
          <section className="kpi">
            <div className="kpiTitle">
              <span>Daily Impressions (Last 24 Hours) (by Interest)</span>
            </div>
            <div className="kpiViz">
              {data?.getDashboardData?.dailyImpressionsByInterest.length > 0 ? (
                <BarViz
                  analysisData={
                    data?.getDashboardData?.dailyImpressionsByInterest
                  }
                />
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
              <span>{data?.getDashboardData?.mau}</span>
            </div>
          </section>
          <section className="kpi mauYearly">
            <div className="kpiTitle">
              <span>MAU Yearly (Monthly Active Users by Month)</span>
            </div>
            <div className="kpiViz">
              {data?.getDashboardData?.mauYearly ? (
                <LineViz analysisData={data?.getDashboardData?.mauYearly} />
              ) : (
                <></>
              )}
            </div>
          </section>

          <section className="kpi">
            <div className="kpiTitle">
              <span>Total Posts</span>
            </div>
            <div className="kpiStat">
              <span>{data?.getDashboardData?.totalPosts}</span>
            </div>
          </section>
          <section className="kpi">
            <div className="kpiTitle">
              <span>Total Posts (by Interest)</span>
            </div>
            <div className="kpiViz">
              {data?.getDashboardData?.totalPostsByInterest ? (
                <PieViz
                  analysisData={data?.getDashboardData?.totalPostsByInterest}
                />
              ) : (
                <></>
              )}
            </div>
          </section>
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
