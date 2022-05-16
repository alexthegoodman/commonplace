import express from "express";
import { startApolloServer } from "./api";

const app = express();
const port = 3001;

console.info("Setup Express Routes...");

app.get("/", (req, res) => {
  res.send("API Functioning");
});

console.info("Start Server...");

app.listen(port, () => {
  console.info(`Express Server ready on port ${port}`);
});

startApolloServer();
