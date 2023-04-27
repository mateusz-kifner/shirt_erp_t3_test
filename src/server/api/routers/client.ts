import { z } from "zod";
import { clientSchema } from "~/schema/clientSchema";

import { createTRPCRouter, authenticatedProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";
import { omit } from "lodash";

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
        data: { ...clientData, address: { create: { ...clientData.address } } },
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
        data: omit(
          { ...clientData, address: { update: { ...clientData.address } } },
          ["id"]
        ),
      });
      return updatedClient;
    }),
  search: authenticatedProcedure
    .input(
      z.object({
        keys: z.array(z.string()),
        query: z.string().default(""),
        sort: z.enum(["desc", "asc"]).default("desc"),
        sortColumn: z.string().default("username"),
        excludeKey: z.string().optional(),
        excludeValue: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const results = await prisma.client.findMany({
        orderBy: {
          [input.sortColumn]: input.sort,
        },
        where: {
          OR: input.keys.map((key) => ({ [key]: { contains: input.query } })),
          NOT:
            input.excludeKey && input.excludeValue
              ? { [input.excludeKey]: input.excludeValue }
              : {},
        },
      });
      return results;
    }),
  searchWithPagination: authenticatedProcedure
    .input(
      z.object({
        keys: z.array(z.string()),
        query: z.string().optional(),
        sort: z.enum(["desc", "asc"]).default("desc"),
        sortColumn: z.string().default("username"),
        excludeKey: z.string().optional(),
        excludeValue: z.string().optional(),
        currentPage: z.number(),
        itemsPerPage: z.number().default(10),
      })
    )
    .query(async ({ input }) => {
      const search = [];
      if (input.query && input.query.length > 0) {
        const splitQuery = input.query.split(" ");
        for (const queryPart of splitQuery) {
          if (queryPart.length > 0) {
            for (const key of input.keys) {
              search.push({
                [key]: { contains: queryPart, mode: "insensitive" },
              });
            }
          }
        }
      }
      const query = {
        orderBy: {
          [input.sortColumn]: input.sort,
        },
        where:
          search.length > 0
            ? {
                OR: search,
                NOT:
                  input.excludeKey && input.excludeValue
                    ? {
                        [input.excludeKey]: {
                          contains: input.excludeValue,
                        },
                      }
                    : undefined,
              }
            : {
                NOT:
                  input.excludeKey && input.excludeValue
                    ? {
                        [input.excludeKey]: {
                          contains: input.excludeValue,
                        },
                      }
                    : undefined,
              },
      };

      const results = await prisma.client.findMany({
        ...query,
        take: input.itemsPerPage,
        skip: (input.currentPage - 1) * input.itemsPerPage,
      });
      const totalItems = await prisma.client.count(query);
      return {
        results,
        totalItems: totalItems,
      };
    }),
});
