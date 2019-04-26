import { useContext } from "react";
import { ScrapeContext } from "./ScrapeContext";
import { distanceInWords } from "date-fns";

export default function Data() {
  const { scrapes } = useContext(ScrapeContext);
  return (
    <div>
      <h2>Your Data: </h2>
      <ul>
        {scrapes.twitter.map(scrape => (
          <li key={scrape.date}>
            {scrape.count}-{distanceInWords(new Date(scrape.date), new Date())}
          </li>
        ))}
      </ul>
    </div>
  );
}
