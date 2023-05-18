import { clientRouter } from "~/server/api/routers/client";
import { exampleRouter } from "~/server/api/routers/example";
import { productRouter } from "~/server/api/routers/products";
import { sessionRouter } from "~/server/api/routers/session";
import { settingsRouter } from "~/server/api/routers/settings";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  session: sessionRouter,
  product: productRouter,
  settings: settingsRouter,
  client: clientRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
