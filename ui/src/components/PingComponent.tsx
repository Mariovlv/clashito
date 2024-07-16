import React, { useEffect, useState } from "react";
import { ping } from "../api/ping";

const PingComponent: React.FC = () => {
  const [msg, setMsg] = useState<string>("");

  useEffect(() => {
    const fetchPing = async () => {
      try {
        const response = await ping();
        setMsg(response.data); // Adjusted to access `data.message`
      } catch (error) {
        console.error("Error fetching ping:", error);
      }
    };

    fetchPing();
  }, []);

  return <span>What {msg}</span>;
};

export default PingComponent;
