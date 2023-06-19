import { z } from "zod";
import { orderSchema } from "~/schema/orderSchema";
import {
  createProcedureDeleteById,
  createProcedureGetAll,
  createProcedureSearch,
  createProcedureSearchWithPagination,
} from "~/server/api/procedures";

import { prisma } from "~/server/db";

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
  // create: authenticatedProcedure
  //   .input(orderSchemaWithoutId)
  //   .mutation(async ({ input: orderData }) => {
  //     const newOrder = await prisma.order.create({
  //       data: { ...orderData, address: { create: { ...orderData.address } } },
  //     });
  //     return newOrder;
  //   }),
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
