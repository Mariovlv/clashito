import { scrapeRoyaleAPI } from "../util/scraperActual";
import { scrapeRoyaleAPIHistory } from "../util/scraperHistory";
import { scrapeRoyaleAPIWarAnalytics } from "../util/scraperWar";

async function getAllCurrently() {
  try {
    const data = await scrapeRoyaleAPI();
    return data;
  } catch (error) {
    console.error("Error in getAllCurrently:", error);
    throw error;
  }
}

async function getAllHistory() {
  try {
    const data = await scrapeRoyaleAPIHistory();
    return data;
  } catch (error) {
    console.error("Error in getAllHistorical:", error);
    throw error;
  }
}

async function getWarAnalytics() {
  try {
    const data = await scrapeRoyaleAPIWarAnalytics();
    return data;
  } catch (error) {
    console.error("Error in getWarAnalytics:", error);
    throw error;
  }
}

export { getAllCurrently, getAllHistory, getWarAnalytics };
