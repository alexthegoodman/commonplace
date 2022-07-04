import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { DateTime } from "luxon";

export const dashboardRoutes = (app) => {
  const prisma = new PrismaClient();

  const instance = axios.create({
    baseURL: "https://mixpanel.com/api/2.0",
    headers: {
      Authorization:
        "Basic CommonPlaceDashboard.86c542.mp-service-account:Ob1MJqsQRKJBLxDll1HKkZcREfU0lE7S",
    },
  });

  app.set("json spaces", 2);

  app.get("/dashboard/events", (req, res) => {
    const fromDate = DateTime.now().minus({ days: 6 }).toFormat("yyyy-MM-dd");
    const toDate = DateTime.now().toFormat("yyyy-MM-dd");

    instance
      .get("/segmentation", {
        params: {
          project_id: "2747435",
          event: `["Sign In - Attempt"]`,
          //   type: "general",
          unit: "day",
          from_date: fromDate,
          to_date: toDate,
        },
      })
      .then(function (response) {
        const responseData = response.data;

        console.info(responseData.data.values);

        res.send(responseData.data.values);
      })
      .catch(function (error) {
        console.error(error);
      });
  });

  const getUniquePropertyOfArray = (items, property) => {
    let set = new Set();

    for (let item of items) {
      set.add(item[property]);
    }

    return set;
  };

  app.get("/dashboard/dau", async (req, res) => {
    // get impressions over last 24 hours
    // find total unique users
    const today = DateTime.now().toISO();
    const yesterday = DateTime.now().minus({ days: 1 }).toISO();

    const totalImpressions = await prisma.message.findMany({
      where: {
        type: "impression",
        createdAt: {
          lte: today,
          gt: yesterday,
        },
      },
    });

    const set = getUniquePropertyOfArray(totalImpressions, "userId");
    const dau = set.size;

    res.send({ dau });
  });

  app.get("/dashboard/dau/monthly", async (req, res) => {
    // get impressions over last 30 days
    // count total unique users per day

    // object with each day as key
    // then dau for each day

    const today = DateTime.now().toISO();
    const lastMonth = DateTime.now().minus({ months: 1 }).toISO();

    const totalImpressions = await prisma.message.findMany({
      where: {
        type: "impression",
        createdAt: {
          lte: today,
          gt: lastMonth,
        },
      },
    });

    let impressionsByDate = {};
    totalImpressions.forEach((impression, i) => {
      const jsDate = new Date(impression.createdAt);
      const impressionDate = DateTime.fromJSDate(jsDate).toFormat("yyyy-MM-dd");

      if (typeof impressionsByDate[impressionDate] === "undefined") {
        impressionsByDate[impressionDate] = [];
      }

      impressionsByDate[impressionDate].push(impression);
    });

    let dauByDate = [];
    Object.keys(impressionsByDate).forEach((key, i) => {
      console.info("key", key);
      const set = getUniquePropertyOfArray(impressionsByDate[key], "userId");
      const dau = set.size;
      const dauDate = { date: key, dau };
      dauByDate.push(dauDate);
    });

    res.send(dauByDate);
  });

  app.get("/dashboard/mau", async (req, res) => {
    // get all unique impression user records over last 30 days
    const today = DateTime.now().toISO();
    const lastMonth = DateTime.now().minus({ months: 1 }).toISO();

    const totalImpressions = await prisma.message.findMany({
      where: {
        type: "impression",
        createdAt: {
          lte: today,
          gt: lastMonth,
        },
      },
    });

    const set = getUniquePropertyOfArray(totalImpressions, "userId");
    const mau = set.size;

    res.send({ mau });
  });

  app.get("/dashboard/mau/yearly", async (req, res) => {
    // get all unique sign in records over last 12 months
    // count total records per month

    const today = DateTime.now().toISO();
    const lastMonth = DateTime.now().minus({ months: 1 }).toISO();

    const totalImpressions = await prisma.message.findMany({
      where: {
        type: "impression",
        createdAt: {
          lte: today,
          gt: lastMonth,
        },
      },
    });

    let impressionsByDate = {};
    totalImpressions.forEach((impression, i) => {
      const jsDate = new Date(impression.createdAt);
      const impressionDate = DateTime.fromJSDate(jsDate).toFormat("yyyy-MM");

      if (typeof impressionsByDate[impressionDate] === "undefined") {
        impressionsByDate[impressionDate] = [];
      }

      impressionsByDate[impressionDate].push(impression);
    });

    let dauByDate = [];
    Object.keys(impressionsByDate).forEach((key, i) => {
      console.info("key", key);
      const set = getUniquePropertyOfArray(impressionsByDate[key], "userId");
      const mau = set.size;
      const mauDate = { date: key, mau };
      dauByDate.push(mauDate);
    });

    res.send(dauByDate);
  });

  app.get("/dashboard/total-posts", (req, res) => {
    // count all posts from database
  });

  app.get("/dashboard/total-posts/interest", (req, res) => {
    // count all posts from database
    // categorize by unique interest
  });

  app.get("/dashboard/daily-impressions", (req, res) => {
    // count all impressions over last 24 hours
  });

  app.get("/dashboard/daily-impressions/interest", (req, res) => {
    // count all impressions over last 24 hours
    // categorize by unique interest
  });

  app.get("/dashboard/total-users", (req, res) => {});

  app.get("/dashboard/new-users", (req, res) => {});

  app.get("/dashboard/share-rate", (req, res) => {});

  app.get("/dashboard/invite-attempts", (req, res) => {});

  app.get("/dashboard/posts-per-user", (req, res) => {});

  app.get("/dashboard/daily-messages", (req, res) => {});

  app.get("/dashboard/login-attempts", (req, res) => {});

  app.get("/dashboard/signup-attempts", (req, res) => {});
};
