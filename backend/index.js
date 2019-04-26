import express from "express";
import { getTwitterCount, getInstagramCount } from "./lib/scraper";
import db from "./lib/db";
import "./lib/cron";
import cors from "cors";

const app = express();
app.use(cors());

console.log(db);

app.get("/scrape", async (req, res, next) => {
  console.log("Scraping!!!");

  const [iCount, tCount] = await Promise.all([
    getInstagramCount(),
    getTwitterCount()
  ]);

  db.get("twitter")
    .push({
      date: Date.now(),
      count: tCount
    })
    .write();

  db.get("instagram")
    .push({
      date: Date.now(),
      count: iCount
    })
    .write();

  res.json({ iCount, tCount });
});

app.get("/data", async (req, res, next) => {
  // 1. get the scrape data
  const twitter = db.value();
  // 2. respond with json
  res.json(twitter);
});

app.listen(2093, () =>
  console.log(`Example App running on port http://localhost:2093`)
);
