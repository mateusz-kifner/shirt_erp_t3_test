import { z } from "zod";
import { orderSchema } from "~/schema/orderSchema";
import {
  createProcedureDeleteById,
  createProcedureGetAll,
  createProcedureSearch,
  createProcedureSearchWithPagination,
} from "~/server/api/procedures";

import { prisma } from "~/server/db";

import { type Prisma } from "@prisma/client";
import { authenticatedProcedure, createTRPCRouter } from "~/server/api/trpc";

const orderSchemaWithoutId = orderSchema.omit({ id: true });

export const orderRouter = createTRPCRouter({
  getAll: createProcedureGetAll("order"),
  getById: authenticatedProcedure.input(z.number()).query(async ({ input }) => {
    const data = await prisma.order.findUnique({
      where: { id: input },
      include: { files: true, client: true, address: true },
    });
    return data;
  }),
  create: authenticatedProcedure
    .input(orderSchemaWithoutId)
    .mutation(async ({ input: orderData }) => {
      const createData: Prisma.OrderCreateInput = {
        ...orderData,
        address: { create: { ...orderData.address } },
        client: { connect: orderData.client },
        designs: { create: { ...orderData.designs } },
        spreadsheets: { create: { ...orderData.spreadsheets } },
        files: { create: { ...orderData.files } },
      };
      const newOrder = await prisma.order.create({
        data: createData,
      });
      return newOrder;
    }),
  deleteById: createProcedureDeleteById("order"),
  // update: authenticatedProcedure
  //   .input(orderSchema)
  //   .mutation(async ({ input: orderData }) => {
  //     const updatedClient = await prisma.order.update({
  //       where: { id: orderData.id },
  //       data: omit(
  //         { ...orderData, address: { update: { ...orderData.address } } },
  //         ["id"]
  //       ),
  //     });
  //     return updatedClient;
  //   }),
  search: createProcedureSearch("order"),
  searchWithPagination: createProcedureSearchWithPagination("order"),
});
