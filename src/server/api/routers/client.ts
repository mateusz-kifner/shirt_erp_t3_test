import { z } from "zod";
import { clientSchema } from "~/schema/clientSchema";

import { createTRPCRouter, authenticatedProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";

const clientSchemaWithoutId = clientSchema.omit({ id: true });

export const clientRouter = createTRPCRouter({
  getAll: authenticatedProcedure
    .input(z.object({ sort: z.enum(["desc", "asc"]) }))
    .query(async ({ input }) => {
      const sortParam:
        | {
            orderBy: {
              username: "desc" | "asc";
            };
          }
        | undefined = input.sort
        ? { orderBy: { username: input.sort } }
        : undefined;
      const clients = await prisma.client.findMany({
        ...sortParam,
      });
      return clients;
    }),
  getById: authenticatedProcedure.input(z.number()).query(async ({ input }) => {
    const client = await prisma.client.findUnique({
      where: { id: input },
    });
    return client;
  }),

  create: authenticatedProcedure
    .input(clientSchemaWithoutId)
    .mutation(async ({ input: clientData }) => {
      const newClient = await prisma.client.create({
        data: clientData,
      });
      return newClient;
    }),
  deleteById: authenticatedProcedure
    .input(z.number())
    .mutation(async ({ input: clientId }) => {
      const deletedClient = await prisma.client.delete({
        where: { id: clientId },
      });
      return deletedClient;
    }),

  update: authenticatedProcedure
    .input(clientSchema)
    .mutation(async ({ input: clientData }) => {
      const updatedClient = await prisma.client.update({
        where: { id: clientData.id },
        data: clientData,
      });
      return updatedClient;
    }),
  search: authenticatedProcedure
    .input(z.object({ keys: z.array(z.string()), query: z.string() }))
    .query(async ({ input }) => {
      const results = await prisma.product.findMany({
        where: {
          OR: input.keys.map((key) => ({ [key]: { search: input.query } })),
        },
      });
      return results;
    }),
});
