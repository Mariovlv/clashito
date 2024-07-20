import React, { useState, useEffect } from "react";
import { clanList, CombinedRoot } from "../../types";
import TableFilterUsers from "./TableFilterUsers";
import { getDonationsHistoricalAndCurrent } from "../../api/royale";
import Slider from "../Slider";
import ClanManage from "../ClanManage";

const SuperTable: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [clanId, setClanId] = useState("");
  const [tableData, setTableData] = useState<CombinedRoot[]>([]);
  const [sliderValue, setSliderValue] = useState<number>(250); // Slider value state

  const handleFetchData = async () => {
    if (!clanId) {
      setTableData([]);
      return;
    }
    setLoading(true);

    try {
      const fetchedData = await getDonationsHistoricalAndCurrent(clanId);
      setTableData(fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {}, [sliderValue]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <ClanManage
          clanId={clanId}
          clanList={clanList}
          setClanId={setClanId}
          handleFetchData={handleFetchData}
        />
        <Slider value={sliderValue} onChange={setSliderValue} />
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        tableData.length > 0 && (
          <TableFilterUsers data={tableData} minDonated={sliderValue} />
        )
      )}
    </div>
  );
};

export default SuperTable;
