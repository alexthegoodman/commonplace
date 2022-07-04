import axios from "axios";
import { DateTime } from "luxon";

export const dashboardRoutes = (app) => {
  const instance = axios.create({
    baseURL: "https://mixpanel.com/api/2.0",
    headers: {
      Authorization:
        "Basic CommonPlaceDashboard.86c542.mp-service-account:Ob1MJqsQRKJBLxDll1HKkZcREfU0lE7S",
    },
  });

  app.get("/dashboard/events", (req, res) => {
    const fromDate = DateTime.now().minus({ days: 6 }).toFormat("yyyy-MM-dd");
    const toDate = DateTime.now().toFormat("yyyy-MM-dd");

    instance
      .get("/events", {
        params: {
          project_id: "2747435",
          event: `["Sign In - Attempt"]`,
          type: "general",
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

  app.get("/dashboard/dau", (req, res) => {});

  app.get("/dashboard/mau", (req, res) => {});

  app.get("/dashboard/total-posts", (req, res) => {});

  app.get("/dashboard/daily-impressions", (req, res) => {});

  app.get("/dashboard/total-users", (req, res) => {});

  app.get("/dashboard/new-users", (req, res) => {});

  app.get("/dashboard/share-rate", (req, res) => {});

  app.get("/dashboard/invite-attempts", (req, res) => {});

  app.get("/dashboard/posts-per-user", (req, res) => {});

  app.get("/dashboard/daily-messages", (req, res) => {});

  app.get("/dashboard/login-attempts", (req, res) => {});

  app.get("/dashboard/signup-attempts", (req, res) => {});
};
