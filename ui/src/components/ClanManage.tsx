import React from "react";
import ButtonComponent from "./ButtonClanSetter";

interface ClanInputProps {
  clanId: string;
  setClanId: (id: string) => void;
  handleFetchData: () => void;
  clanList: { clanID: string; clanName: string }[];
}

const ClanManage: React.FC<ClanInputProps> = ({
  clanId,
  setClanId,
  handleFetchData,
  clanList,
}) => {
  return (
    <div className="flex flex-col bg-white shadow-md rounded-lg mx-auto max-w-lg p-4">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
        <input
          type="text"
          value={clanId}
          onChange={(e) => setClanId(e.target.value)}
          placeholder="Enter Clan ID"
          className="border border-gray-300 rounded-lg px-2 py-1 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleFetchData}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Obtener Datos
        </button>
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {clanList.map((clan) => (
          <ButtonComponent
            key={clan.clanID}
            className="px-4 py-2 border border-blue-500 rounded-lg bg-white text-blue-500 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setClanId(clan.clanID)}
          >
            {clan.clanName}
          </ButtonComponent>
        ))}
      </div>
    </div>
  );
};

export default ClanManage;
