export interface CurrentDonation {
  "#": { text: string };
  column1: {
    text: string;
    username: string;
    playerTag: string;
    role: string;
  };
  column2: { text: string };
  column3: { text: string };
  column4: { text: string };
  Role: { text: string };
  "Last Seen": { text: string };
  Trophies: { text: string };
  Level: { text: string };
  Donated: { text: string };
  Received: { text: string };
  column11: { text: string };
}

export interface HistoricalDonation {
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
  username?: string;
  playerTag?: string;
  role?: string;
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
