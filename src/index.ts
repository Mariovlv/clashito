import { Elysia } from "elysia";
import { ping } from "./controller/ping";
import {
  getAllCurrently,
  getAllHistory,
  getWarAnalytics,
} from "./controller/scraper";

const PORT = process.env.PORT || 3000;

function main() {
  const app = new Elysia()
    .group("/api/v1", (app) =>
      app
        .get("/ping", ping)
        .get("/donations/current", getAllCurrently)
        .get("/donations/historical", getAllHistory)
        .get("/war/historical", getWarAnalytics)
    )
    .onError(({ code, error }) => {
      console.error(`Error ${code}: ${error.message}`);
      return { error: "An error occurred" };
    })
    .listen(PORT);

  console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
  );
}

main();
