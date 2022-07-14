import express from "express";
import { startApolloServer } from "./api";
import { setupMixpanel } from "./mixpanel";
import { dashboardRoutes } from "./rest/dashboard";
import cors from "cors";

const app = express();
const port = 3001;

// NOTE: fixes aws-sdk type error
declare global {
  export interface ReadableStream {}
}

console.info("Setup Express Routes...");

app.use(cors());

app.get("/", (req, res) => {
  res.send("API Functioning");
});

dashboardRoutes(app);

console.info("Start Server...");

app.listen(port, "0.0.0.0", () => {
  console.info(`Express Server ready on port ${port}`);
});

startApolloServer();
