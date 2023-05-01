import { z } from "zod";

import { authenticatedProcedure, createTRPCRouter } from "~/server/api/trpc";

export const productRouter = createTRPCRouter({
  getAll: authenticatedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.product.findMany();
  }),
  getById: authenticatedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.product.findUnique({ where: { id: input.id } });
    }),
});
