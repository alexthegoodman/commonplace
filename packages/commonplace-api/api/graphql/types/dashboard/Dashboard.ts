import { objectType } from "nexus";
import { DateTime } from "luxon";

import { Context } from "../../../context";

const getUniquePropertyOfArray = (items, property) => {
  let set = new Set();

  for (let item of items) {
    set.add(item[property]);
  }

  return set;
};

export const DashboardType = objectType({
  name: "Dashboard",
  definition(t) {
    t.field("totalUsers", {
      type: "Int",
      resolve: async (_, __, context: Context) => {
        const totalUsers = await context.prisma.user.count({
          where: {
            id: {
              not: "",
            },
          },
        });

        console.info("totalUsers", totalUsers);

        return totalUsers;
      },
    });

    t.field("dau", {
      type: "Int",
      resolve: async (_, __, context: Context) => {
        // get impressions over last 24 hours
        // find total unique users
        const today = DateTime.now().toISO();
        const yesterday = DateTime.now().minus({ hours: 24 }).toISO();

        const totalImpressions = await context.prisma.message.findMany({
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

        return dau;
      },
    });

    t.list.field("dauMonthly", {
      type: "DateValuePair",
      resolve: async (_, __, context: Context) => {
        // get impressions over last 30 days
        // count total unique users per day

        // object with each day as key
        // then dau for each day

        const today = DateTime.now().toISO();
        const lastMonth = DateTime.now().minus({ months: 1 }).toISO();

        const totalImpressions = await context.prisma.message.findMany({
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
          const impressionDate =
            DateTime.fromJSDate(jsDate).toFormat("yyyy-MM-dd");

          if (typeof impressionsByDate[impressionDate] === "undefined") {
            impressionsByDate[impressionDate] = [];
          }

          impressionsByDate[impressionDate].push(impression);
        });

        let dauByDate = [];
        Object.keys(impressionsByDate).forEach((key, i) => {
          console.info("key", key);
          const set = getUniquePropertyOfArray(
            impressionsByDate[key],
            "userId"
          );
          const dau = set.size;
          const dauDate = { date: key, value: dau };
          dauByDate.push(dauDate);
        });

        return dauByDate;
      },
    });

    t.field("mau", {
      type: "Int",
      resolve: async (_, __, context: Context) => {
        // get all unique impression user records over last 30 days
        const today = DateTime.now().toISO();
        const lastMonth = DateTime.now().minus({ months: 1 }).toISO();

        const totalImpressions = await context.prisma.message.findMany({
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

        return mau;
      },
    });

    t.list.field("mauYearly", {
      type: "DateValuePair",
      resolve: async (_, __, context: Context) => {
        // get all unique sign in records over last 12 months
        // count total records per month

        const today = DateTime.now().toISO();
        const lastYear = DateTime.now().minus({ years: 1 }).toISO();

        const totalImpressions = await context.prisma.message.findMany({
          where: {
            type: "impression",
            createdAt: {
              lte: today,
              gt: lastYear,
            },
          },
        });

        let impressionsByDate = {};
        totalImpressions.forEach((impression, i) => {
          const jsDate = new Date(impression.createdAt);
          const impressionDate =
            DateTime.fromJSDate(jsDate).toFormat("yyyy-MM");

          console.info("impression", impression, impressionDate);

          if (typeof impressionsByDate[impressionDate] === "undefined") {
            impressionsByDate[impressionDate] = [];
          }

          impressionsByDate[impressionDate].push(impression);
        });

        let dauByDate = [];
        Object.keys(impressionsByDate).forEach((key, i) => {
          console.info("key", key);
          const set = getUniquePropertyOfArray(
            impressionsByDate[key],
            "userId"
          );
          const mau = set.size;
          const mauDate = { date: key, value: mau };
          dauByDate.push(mauDate);
        });

        return dauByDate;
      },
    });

    t.field("totalPosts", {
      type: "Int",
      resolve: async (_, __, context: Context) => {
        // count all posts from database
        const totalPosts = await context.prisma.post.count({
          where: {
            id: {
              not: "",
            },
          },
        });

        return totalPosts;
      },
    });

    t.list.field("totalPostsByInterest", {
      type: "LabelValuePair",
      resolve: async (_, __, context: Context) => {
        // get all posts from database
        // categorize by unique interest

        const allPosts = await context.prisma.post.findMany({
          where: {
            id: {
              not: "",
            },
          },
          include: {
            interest: true,
          },
        });

        console.info("allPosts", allPosts);

        const postsByInterest = []; // { label: "", count: 0 }
        allPosts.forEach((post) => {
          const itemExists = postsByInterest.findIndex((item) => {
            return item.label === post.interest.name;
          });

          if (itemExists < 0) {
            postsByInterest.push({ label: post.interest.name, value: 1 });
          } else {
            const deletedItem = postsByInterest.splice(itemExists, 1);

            postsByInterest.push({
              label: post.interest.name,
              value: deletedItem[0].value + 1,
            });
          }
        });

        return postsByInterest;
      },
    });

    t.field("dailyImpressions", {
      type: "Int",
      resolve: async (_, __, context: Context) => {
        // count all impressions over last 24 hours
        const today = DateTime.now().toISO();
        const yesterday = DateTime.now().minus({ hours: 24 }).toISO();

        const dailyImpressions = await context.prisma.message.count({
          where: {
            type: "impression",
            createdAt: {
              lte: today,
              gt: yesterday,
            },
          },
        });

        return dailyImpressions;
      },
    });

    t.list.field("dailyImpressionsByInterest", {
      type: "LabelValuePair",
      resolve: async (_, __, context: Context) => {
        // count all impressions over last 24 hours

        // categorize by unique interest
        const today = DateTime.now().toISO();
        const yesterday = DateTime.now().minus({ hours: 24 }).toISO();

        const dailyImpressions = await context.prisma.message.findMany({
          where: {
            type: "impression",
            createdAt: {
              lte: today,
              gt: yesterday,
            },
          },
          include: {
            post: {
              include: {
                interest: true,
              },
            },
          },
        });

        const impressionsByInterest = []; // { label: "", count: 0 }
        dailyImpressions.forEach((impression) => {
          const interestName = impression.post?.interest.name;
          const itemExists = impressionsByInterest.findIndex((item) => {
            return item.label === interestName;
          });

          if (itemExists < 0) {
            impressionsByInterest.push({ label: interestName, value: 1 });
          } else {
            const deletedItem = impressionsByInterest.splice(itemExists, 1);

            impressionsByInterest.push({
              label: interestName,
              value: deletedItem[0].value + 1,
            });
          }
        });

        return impressionsByInterest;
      },
    });
  },
});
