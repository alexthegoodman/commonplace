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

const categoryByDate = (impressions, format) => {
  let impressionsByDate = {};
  impressions.forEach((impression, i) => {
    const jsDate = new Date(impression.createdAt);
    const impressionDate = DateTime.fromJSDate(jsDate).toFormat(format);

    if (typeof impressionsByDate[impressionDate] === "undefined") {
      impressionsByDate[impressionDate] = [];
    }

    impressionsByDate[impressionDate].push(impression);
  });

  return impressionsByDate;
};

type Item = {
  interest?: any;
  post?: any;
  label: string;
  value: string;
};

const categoryByInterest = (type, items) => {
  const itemsByInterest: Item[] = []; // { label: "", count: 0 }
  items.forEach((entity) => {
    const interestName =
      type === "post" ? entity.interest.name : entity.post?.interest.name;
    const itemExists = itemsByInterest.findIndex((item: Item) => {
      return item.label === interestName;
    });

    if (itemExists < 0) {
      itemsByInterest.push({
        label: interestName,
        value: 1 as unknown as string,
      });
    } else {
      const deletedItem = itemsByInterest.splice(itemExists, 1);

      itemsByInterest.push({
        label: interestName,
        value: deletedItem[0].value + 1,
      });
    }
  });

  return itemsByInterest;
};

type DatePair = {
  date: string;
  value: string;
};

const dateToPair = (items) => {
  let byDate: DatePair[] = [];
  Object.keys(items).forEach((key, i) => {
    const set = getUniquePropertyOfArray(items[key], "userId");
    const value = set.size as unknown as string;
    const datePair = { date: key, value };
    byDate.push(datePair);
  });

  return byDate;
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

        let impressionsByDate = categoryByDate(totalImpressions, "yyyy-MM-dd");

        let dauByDate = dateToPair(impressionsByDate);

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

        let impressionsByDate = categoryByDate(totalImpressions, "yyyy-MM");

        let mauByDate = dateToPair(impressionsByDate);

        return mauByDate;
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

        const postsByInterest = categoryByInterest("post", allPosts);

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

        const impressionsByInterest = categoryByInterest(
          "impression",
          dailyImpressions
        );

        return impressionsByInterest;
      },
    });
  },
});
