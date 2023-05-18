import { clientSchema } from "~/schema/clientSchema";

import { omit } from "lodash";
import {
  createProcedureDeleteById,
  createProcedureGetAll,
  createProcedureGetById,
  createProcedureSearch,
  createProcedureSearchWithPagination,
} from "~/server/api/procedures";
import { authenticatedProcedure, createTRPCRouter } from "~/server/api/trpc";
import { prisma } from "~/server/db";

const clientSchemaWithoutId = clientSchema.omit({ id: true });

export const clientRouter = createTRPCRouter({
  getAll: createProcedureGetAll("client"),
  getById: createProcedureGetById("client"),
  create: authenticatedProcedure
    .input(clientSchemaWithoutId)
    .mutation(async ({ input: clientData }) => {
      const newClient = await prisma.client.create({
        data: { ...clientData, address: { create: { ...clientData.address } } },
      });
      return newClient;
    }),
  deleteById: createProcedureDeleteById("client"),
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
  search: createProcedureSearch("client"),
  searchWithPagination: createProcedureSearchWithPagination("client"),
});
