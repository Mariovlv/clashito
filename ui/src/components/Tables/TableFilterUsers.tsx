import React from "react";
import { CombinedRoot } from "../../types";
import { parseDate } from "../../util/parseDates";
import { getBgColor } from "../../util/getBgcolor";

interface TableFilterUsersProps {
  data: CombinedRoot[];
  minDonated: number;
}

const TableFilterUsers: React.FC<TableFilterUsersProps> = ({
  data,
  minDonated,
}) => {
  return (
    <table className="min-w-full bg-white border border-gray-200">
      <thead>
        <tr>
          <th className="px-4 py-2 border-b">Rank</th>
          <th className="px-4 py-2 border-b">Posibles Users</th>
          <th className="px-4 py-2 border-b">Tag</th>
          <th className="px-4 py-2 border-b">Miembre desde</th>
          <th className="px-4 py-2 border-b">Donadas</th>
          <th className="px-4 py-2 border-b">Recibidas</th>
          <th className="px-4 py-2 border-b">Total</th>
        </tr>
      </thead>
      <tbody>
        {data
          .filter((item) => {
            if (!item.historicalData) return true; // Include users without historical data

            const daysInClanMatch = parseDate(item.column1.joinStatus)?.match(
              /^(\d+)d/
            );
            const daysInClan = daysInClanMatch
              ? parseInt(daysInClanMatch[1])
              : 0;
            const weeksInClan = Math.max(1, Math.ceil(daysInClan / 7));
            const weeklyAverageDonation =
              item.historicalData.total / weeksInClan;
            return weeklyAverageDonation < minDonated;
          })
          .map((item, index) => (
            <tr
              key={index}
              className={`px-4 py-2 border-b ${
                item.historicalData
                  ? getBgColor(
                      item.column1.joinStatus,
                      item.historicalData.total,
                      minDonated
                    )
                  : ""
              }`}
            >
              <td className="px-4 py-2 border-b">{item["#"].text}</td>
              <td className="px-4 py-2 border-b">
                {item.historicalData
                  ? item.historicalData.usernames[0] ===
                    item.historicalData.usernames[1]
                    ? item.column1.username
                    : item.historicalData.usernames.join(", ")
                  : item.column1.username}
              </td>
              <td className="px-4 py-2 border-b">{item.column1.playerTag}</td>
              <td className="px-4 py-2 border-b">
                {parseDate(item.column1.joinStatus)}
              </td>
              <td className="px-4 py-2 border-b">{item.Donated.text}</td>
              <td className="px-4 py-2 border-b">{item.Received.text}</td>
              <td className="px-4 py-2 border-b">
                {item.historicalData ? item.historicalData.total : "N/A"}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default TableFilterUsers;
