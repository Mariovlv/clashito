import React, { useEffect, useState } from "react";
import { getUltraJSON } from "../api/royale";

interface UltraJSON {
  "#": { text: string };
  column1: {
    text: string;
    username: string;
    playerTag: string;
    role: string;
  };
  Role: { text: string };
  "Last Seen": { text: string };
  Trophies: { text: string };
  Level: { text: string };
  Donated: { text: string };
  Received: { text: string };
  historicalData: {
    playerName: string;
    weeklyData: {
      week1: number;
      week2: number;
      week3: number;
      week4: number;
      week5: number;
    };
    total: number;
  };
}

const SuperTable: React.FC = () => {
  const [data, setData] = useState<UltraJSON[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching general");
        const response = await getUltraJSON();
        setData(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto font-mono">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Rank</th>
            <th className="px-4 py-2 border-b">Username</th>
            <th className="px-4 py-2 border-b">Player Tag</th>
            <th className="px-4 py-2 border-b">Role</th>
            <th className="px-4 py-2 border-b">Last Seen</th>
            <th className="px-4 py-2 border-b">Trophies</th>
            <th className="px-4 py-2 border-b">Level</th>
            <th className="px-4 py-2 border-b">Donated</th>
            <th className="px-4 py-2 border-b">Received</th>
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
              <td className="px-4 py-2 border-b">{item["#"].text}</td>
              <td className="px-4 py-2 border-b">{item.column1.username}</td>
              <td className="px-4 py-2 border-b">{item.column1.playerTag}</td>
              <td className="px-4 py-2 border-b">{item.Role.text}</td>
              <td className="px-4 py-2 border-b">{item["Last Seen"].text}</td>
              <td className="px-4 py-2 border-b">{item.Trophies.text}</td>
              <td className="px-4 py-2 border-b">{item.Level.text}</td>
              <td className="px-4 py-2 border-b">{item.Donated.text}</td>
              <td className="px-4 py-2 border-b">{item.Received.text}</td>
              <td className="px-4 py-2 border-b">
                {item.historicalData.weeklyData.week1}
              </td>
              <td className="px-4 py-2 border-b">
                {item.historicalData.weeklyData.week2}
              </td>
              <td className="px-4 py-2 border-b">
                {item.historicalData.weeklyData.week3}
              </td>
              <td className="px-4 py-2 border-b">
                {item.historicalData.weeklyData.week4}
              </td>
              <td className="px-4 py-2 border-b">
                {item.historicalData.weeklyData.week5}
              </td>
              <td className="px-4 py-2 border-b">
                {item.historicalData.total}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SuperTable;
