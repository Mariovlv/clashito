import puppeteer from "puppeteer";

interface HistoryData {
  playerName: string;
  weeklyData: {
    [key: string]: number;
  };
  total: number;
}

export async function scrapeRoyaleAPIHistory(
  id: string
): Promise<HistoryData[]> {
  const website = `https://royaleapi.com/clan/${id}/history`;
  console.log("fetching to: ", website);
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/google-chrome",
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--disable-gpu",
    ],
  });

  try {
    const page = await browser.newPage();
    await page.goto(website, {
      waitUntil: "networkidle0",
    });
    await page.setViewport({ width: 1080, height: 1024 });
    await page.waitForSelector("#roster", { timeout: 15000 });

    const tableData = await page.evaluate(() => {
      const table = document.getElementById("roster");
      if (!table) return null;

      const headers = Array.from(table.querySelectorAll("thead th")).map(
        (th) => th.textContent?.trim() || ""
      );
      const rows = Array.from(table.querySelectorAll("tbody tr"));

      return {
        headers,
        rows: rows.map((row) =>
          Array.from(row.querySelectorAll("td")).map((cell) =>
            cell.innerText.trim()
          )
        ),
      };
    });

    if (tableData) {
      return tableData.rows.map((row) => {
        const rowData: HistoryData = {
          playerName: row[0] || "",
          weeklyData: {},
          total: 0,
        };

        // Sort the dates and assign to weeklyData
        const dateFields = tableData.headers.slice(2, -1); // Skip playerName, playerTag, and Total
        dateFields
          .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
          .forEach((header, index) => {
            if (index < 5) {
              const value = Number(row[index + 2]);
              rowData.weeklyData[`week${index + 1}`] = isNaN(value) ? 0 : value;
            }
          });

        const totalValue = Number(row[row.length - 1]);
        rowData.total = isNaN(totalValue) ? 0 : totalValue;

        return rowData;
      });
    } else {
      throw new Error('Table with id "roster" not found');
    }
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  } finally {
    await browser.close();
  }
}
