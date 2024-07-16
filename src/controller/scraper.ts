import { scrapeRoyaleAPI } from "../util/scraperActual";
import { scrapeRoyaleAPIHistory } from "../util/scraperHistory";
import { scrapeRoyaleAPIWarAnalytics } from "../util/scraperWar";
import { ClanIdParams } from "../types";

async function getAllCurrently({ params }: { params: ClanIdParams }) {
  try {
    const data = await scrapeRoyaleAPI(params.id);
    return data;
  } catch (error) {
    console.error("Error in getAllCurrently:", error);
    throw error;
  }
}

async function getAllHistory({ params }: { params: ClanIdParams }) {
  try {
    const data = await scrapeRoyaleAPIHistory(params.id);
    return data;
  } catch (error) {
    console.error("Error in getAllHistorical:", error);
    throw error;
  }
}

async function getWarAnalytics({ params }: { params: ClanIdParams }) {
  try {
    const data = await scrapeRoyaleAPIWarAnalytics(params.id);
    return data;
  } catch (error) {
    console.error("Error in getWarAnalytics:", error);
    throw error;
  }
}

export { getAllCurrently, getAllHistory, getWarAnalytics };
