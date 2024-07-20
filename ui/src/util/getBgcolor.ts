import { parseDate } from "./parseDates";

export const getBgColor = (
  date: string,
  total: number,
  minDonation: number
) => {
  // Extract days from the date string
  const daysInClanMatch = parseDate(date)?.match(/^(\d+)d/);
  const daysInClan = daysInClanMatch ? parseInt(daysInClanMatch[1]) : 0;
  const averageDonation = minDonation / daysInClan; // Calculate average donation

  if (daysInClan < 3) {
    return "bg-cyan-100"; // New user (less than 2 days)
  } else if (daysInClan >= 2 && daysInClan < 6 && averageDonation < total) {
    return "bg-red-200"; // Low average donation for users between 2 and 6 days
  } else {
    return "bg-red-800 text-white"; // Other cases
  }
};
