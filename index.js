import express from "express";
import { getTwitterCount, getInstagramCount } from "./lib/scraper";
import db from "./lib/db";
import "./lib/cron";

const app = express();

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

app.listen(2093, () => console.log(`Example App running on port 2093`));
