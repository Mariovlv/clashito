import React, { useEffect, useState } from "react";
import { getDonationsHistorical } from "../api/royale";

export interface HistoryData {
  playerName: string;
  weeklyData: {
    [key: string]: number;
  };
  total: number;
}

const TableDonationsHistorical: React.FC = () => {
  const [data, setData] = useState<HistoryData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching historical donations");
        const response = await getDonationsHistorical();
        const data = response.data;
        setData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="overflow-x-auto font-mono">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Usuario</th>
            <th className="px-4 py-2 border-b">Week1</th>
            <th className="px-4 py-2 border-b">Week2</th>
            <th className="px-4 py-2 border-b">Week3</th>
            <th className="px-4 py-2 border-b">Week4</th>
            <th className="px-4 py-2 border-b">Week5</th>
            <th className="px-4 py-2 border-b">Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border-b">{item.playerName}</td>
              <td className="px-4 py-2 border-b">
                {item.weeklyData.week1 || 0}
              </td>
              <td className="px-4 py-2 border-b">
                {item.weeklyData.week2 || 0}
              </td>
              <td className="px-4 py-2 border-b">
                {item.weeklyData.week3 || 0}
              </td>
              <td className="px-4 py-2 border-b">
                {item.weeklyData.week4 || 0}
              </td>
              <td className="px-4 py-2 border-b">
                {item.weeklyData.week5 || 0}
              </td>
              <td className="px-4 py-2 border-b">{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableDonationsHistorical;
