// scraper.ts
import puppeteer from "puppeteer";

interface CellData {
  text: string;
  username?: string;
  playerTag?: string;
  role?: string;
  joinStatus?: string;
}

interface RowData {
  [key: string]: CellData;
}

export async function scrapeRoyaleAPI(id: string): Promise<RowData[]> {
  const website = `https://royaleapi.com/clan/${id}`;
  const browser = await puppeteer.launch({
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
    // the frontend never parses the ids 123456 to #123456 (putting inmediatly to / crashes)
    await page.goto(website, {
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
              linkElement
                ?.querySelector(".muted")
                ?.textContent?.trim()
                .slice(1) || "";
            const role = cell.querySelector(".meta")?.textContent?.trim() || "";
            const joinStatus =
              cell.querySelector(".join_status")?.textContent?.trim() ||
              "Joined +10 days ago";
            return { text: "", username, playerTag, role, joinStatus };
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
              joinStatus: cell.joinStatus,
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
