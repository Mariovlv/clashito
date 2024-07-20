export interface CombinedRoot extends DonationData {
  historicalData: {
    playerTag: string;
    usernames: string[];
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

export interface DonationData {
  "#": Column;
  column1: UserColumn;
  column2: Column;
  column3: Column;
  column4: Column;
  Role: Column;
  "Last Seen": Column;
  Trophies: Column;
  Level: Column;
  Donated: Column;
  Received: Column;
  column11: Column;
}

export interface HistoricalDonation {
  playerTag: string;
  playerName: string;
  weeklyData: {
    week1: number;
    week2: number;
    week3: number;
    week4: number;
    week5: number;
  };
  total: number;
}

export interface Column {
  text: string;
}

export interface UserColumn extends Column {
  text: string;
  username: string;
  playerTag: string;
  joinStatus: string;
  role: string;
}

export const clanList = [
  { clanName: "Frios Z 🥶", clanID: "Q20GLQ8R" },
  { clanName: "Dioses Aztecas 🏳️‍🌈", clanID: "QQGUUQ20" },
  { clanName: "Las vaqueritas🤠", clanID: "QCOOOJ9L" },
];

export interface CombinedRoot extends DonationData {
  historicalData: {
    playerTag: string;
    usernames: string[];
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
