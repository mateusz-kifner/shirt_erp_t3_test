import { z } from "zod";

import { authenticatedProcedure, createTRPCRouter } from "~/server/api/trpc";

export const productRouter = createTRPCRouter({
  getAll: authenticatedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.products.findMany();
  }),
  get: authenticatedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.products.findUnique({ where: { id: input.id } });
    }),
});
