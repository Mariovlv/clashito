import { Elysia } from "elysia";
import { ping } from "./controller/ping";
import { staticPlugin } from "@elysiajs/static";
import {
  getAllCurrently,
  getAllHistory,
  getWarAnalytics,
} from "./controller/scraper";

import { postClanId } from "./controller/clanId";

const PORT = process.env.PORT || 3000;

function main() {
  const app = new Elysia();

  app
    .group("/api/v1", (app) =>
      app
        .get("/ping", ping)
        .get("/donations/current/:id", getAllCurrently)
        .get("/donations/historical/:id", getAllHistory)
        .get("/war/historical/:id", getWarAnalytics)
        .get("/clan/:id", postClanId)
    )
    .get("/", () => Bun.file("./public/index.html"))
    .use(staticPlugin({ prefix: "/" }))
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
