import { z } from "zod";

import { authenticatedProcedure, createTRPCRouter } from "~/server/api/trpc";

export const productRouter = createTRPCRouter({
  getAll: authenticatedProcedure.query(({ ctx }) => {
    return ctx.prisma.products.findMany();
  }),
  get: authenticatedProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.products.findUnique({ where: { id: input.id } });
    }),
});
