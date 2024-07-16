// scraper.ts
import puppeteer from "puppeteer";

interface CellData {
  text: string;
  username?: string;
  playerTag?: string;
  role?: string;
}

interface RowData {
  [key: string]: CellData;
}

export async function scrapeRoyaleAPI(): Promise<RowData[]> {
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
    await page.goto("https://royaleapi.com/clan/QQGUUQ20", {
      waitUntil: "networkidle0",
    });
    await page.setViewport({ width: 1080, height: 1024 });

    await page.waitForSelector("#roster", { timeout: 10000 });

    const tableData = await page.evaluate(() => {
      const table = document.getElementById("roster");
      if (!table) return null;

      const rows = Array.from(table.querySelectorAll("tr"));

      return rows.map((row) => {
        const cells = Array.from(row.querySelectorAll("td, th"));
        return cells.map((cell, index) => {
          if (index === 1) {
            const linkElement = cell.querySelector("a.member_link");
            const username = linkElement?.firstChild?.textContent?.trim() || "";
            const playerTag =
              linkElement?.querySelector(".muted")?.textContent?.trim() || "";
            const role = cell.querySelector(".meta")?.textContent?.trim() || "";
            return { text: "", username, playerTag, role };
          }
          return { text: cell.textContent?.trim() || "" };
        });
      });
    });

    if (tableData) {
      const headers = tableData[0].map((cell) => cell.text);

      return tableData.slice(1).map((row) => {
        const rowData: RowData = {};
        row.forEach((cell, index) => {
          const key = headers[index] || `column${index}`;
          if (index === 1) {
            rowData[key] = {
              text: cell.text,
              username: cell.username,
              playerTag: cell.playerTag,
              role: cell.role,
            };
          } else {
            rowData[key] = { text: cell.text };
          }
        });
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
