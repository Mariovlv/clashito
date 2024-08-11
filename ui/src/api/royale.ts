import axios from "axios";
import { CombinedRoot, DonationData, HistoricalDonation } from "../types";

const BASE_URL = "/api/v1";

const getDonationsCurrent = (id: string) => {
  return axios.get(BASE_URL + `/donations/current/${id}`);
};

const getDonationsHistorical = (id: string) => {
  return axios.get(BASE_URL + `/donations/historical/${id}`);
};

const getDonationsHistoricalAndCurrent = async (id: string) => {
  try {
    const [currentResponse, historicalResponse] = await Promise.all([
      getDonationsCurrent(id),
      getDonationsHistorical(id),
    ]);

    const donationsCurrent = currentResponse.data;
    const donationsHistorical = historicalResponse.data;

    const combinedData: CombinedRoot[] = donationsCurrent.map(
      (current: DonationData) => {
        const historical = donationsHistorical.find(
          (h: HistoricalDonation) => h.playerTag === current.column1.playerTag
        );

        if (!historical) {
          console.warn(
            `No historical data found for player ${current.column1.playerTag}`
          );
          return {
            ...current,
            historicalData: null,
          };
        }

        return {
          ...current,
          historicalData: {
            playerTag: historical.playerTag,
            usernames: [current.column1.username, historical.playerName],
            playerName: historical.playerName,
            weeklyData: historical.weeklyData,
            total: historical.total,
          },
        };
      }
    );

    console.log(combinedData);

    return combinedData;
  } catch (error) {
    console.error("Error fetching or combining data:", error);
    throw error;
  }
};

export {
  getDonationsCurrent,
  getDonationsHistorical,
  getDonationsHistoricalAndCurrent,
};
