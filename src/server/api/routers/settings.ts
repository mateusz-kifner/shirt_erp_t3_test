import { z } from "zod";

import { privilegedProcedure, createTRPCRouter } from "~/server/api/trpc";

export const settingsRouter = createTRPCRouter({
  getAll: privilegedProcedure.query(({ ctx }) => {
    return { message: "privilegedProcedure" };
  }),
});
