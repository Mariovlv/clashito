export const parseDate = (date: string): string | null => {
  const regex = /(\d+)\s*(days?|hrs?|mins?)/gi;

  const unitMap: { [key: string]: string } = {
    // JIC weeks and plural
    weeks: "w",
    week: "w",
    days: "d",
    day: "d",
    hrs: "h",
    hr: "h",
    mins: "m",
    min: "m",
  };

  let formattedDate = "";

  let match;
  while ((match = regex.exec(date)) !== null) {
    const [, value, unit] = match;
    const abbreviatedUnit = unitMap[unit];

    if (abbreviatedUnit) {
      formattedDate += `${value}${abbreviatedUnit} `;
    }
  }

  return formattedDate.trim() || null;
};
