import puppeteer from "puppeteer";

interface WarAnalyticsData {
  player_name: string;
  [key: string]: string | number;
}

export async function scrapeRoyaleAPIWarAnalytics(
  id: string
): Promise<WarAnalyticsData[]> {
  const website = `https://royaleapi.com/clan/${id}/war/analytics`;
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
    await page.setDefaultNavigationTimeout(40000);
    await page.goto(website, {
      waitUntil: "networkidle0",
    });
    await page.setViewport({ width: 1080, height: 1024 });

    await page.waitForSelector("#roster", { timeout: 45000 });

    const tableData = await page.evaluate(() => {
      const table = document.getElementById("roster");
      if (!table) return null;

      const headers = Array.from(table.querySelectorAll("thead th")).map(
        (th) => th.textContent?.trim() || ""
      );
      const rows = Array.from(table.querySelectorAll("tbody tr"));

      return {
        headers,
        rows: rows.map((row) => {
          const cells = Array.from(row.querySelectorAll("td"));
          return cells.map((cell, index) => {
            if (index === 0) {
              // Extract player name from the first column
              const nameElement = cell.querySelector("a");
              return nameElement ? nameElement.textContent?.trim() || "" : "";
            }
            return cell.textContent?.trim() || "";
          });
        }),
      };
    });

    if (tableData) {
      return tableData.rows.map((row) => {
        const rowData: WarAnalyticsData = {
          player_name: row[0] || "",
        };
        tableData.headers.forEach((header, index) => {
          if (index > 0) {
            const value = row[index];
            rowData[header] = isNaN(Number(value)) ? value : Number(value);
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
