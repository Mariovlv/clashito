import axios from "axios";

const BASE_URL = "/api/v1";

const getDonationsCurrent = () => {
  return axios.get(BASE_URL + "/donations/current");
};

const getDonationsHistorical = () => {
  return axios.get(BASE_URL + "/donations/historical");
};

import { CurrentDonation, HistoricalDonation } from "../types";

interface UltraJSON extends CurrentDonation {
  historicalData: HistoricalDonation;
}

const getUltraJSON = async (): Promise<UltraJSON[]> => {
  try {
    const donationsCurrent = await getDonationsCurrent();
    const donationsHistorical = await getDonationsHistorical();

    // Improved function to normalize strings
    const normalizeString = (str: string) =>
      str
        .replace(/<c\d+>|<\/c>/g, "") // Remove <c6> and similar tags
        .replace(/[^a-zA-Z0-9]/g, "") // Remove any remaining non-alphanumeric characters
        .toLowerCase();

    // Function to calculate similarity between two strings
    const stringSimilarity = (str1: string, str2: string) => {
      const norm1 = normalizeString(str1);
      const norm2 = normalizeString(str2);
      let matches = 0;
      for (let i = 0; i < Math.min(norm1.length, norm2.length); i++) {
        if (norm1[i] === norm2[i]) matches++;
      }
      return matches / Math.max(norm1.length, norm2.length);
    };

    const ultraJSON: UltraJSON[] = donationsCurrent.data.map(
      (current: CurrentDonation) => {
        // Find the best match in historical data
        let bestMatch: HistoricalDonation | null = null;
        let bestSimilarity = 0;

        donationsHistorical.data.forEach((historical: HistoricalDonation) => {
          const similarity = stringSimilarity(
            current.column1.username,
            historical.playerName
          );
          if (similarity > bestSimilarity) {
            bestSimilarity = similarity;
            bestMatch = historical;
          }
        });

        // Use a threshold to determine if the match is good enough
        const matchThreshold = 0.7; // Adjust this value as needed

        return {
          ...current,
          historicalData:
            bestSimilarity > matchThreshold && bestMatch
              ? bestMatch
              : {
                  playerName: current.column1.username,
                  weeklyData: {
                    week1: 0,
                    week2: 0,
                    week3: 0,
                    week4: 0,
                    week5: 0,
                  },
                  total: 0,
                },
        };
      }
    );

    return ultraJSON;
  } catch (error) {
    console.error("Error fetching or combining data:", error);
    throw error;
  }
};

export { getDonationsCurrent, getDonationsHistorical, getUltraJSON };
