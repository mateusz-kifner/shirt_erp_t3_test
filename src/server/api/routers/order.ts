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
import { omit } from "lodash";
import { authenticatedProcedure, createTRPCRouter } from "~/server/api/trpc";

const orderSchemaWithoutId = orderSchema.omit({ id: true });
const includeAll = {
  files: true,
  client: true,
  address: true,
  spreadsheets: true,
  designs: true,
};

export const orderRouter = createTRPCRouter({
  getAll: createProcedureGetAll("order"),
  getById: authenticatedProcedure.input(z.number()).query(async ({ input }) => {
    const data = await prisma.order.findUnique({
      where: { id: input },
      include: includeAll,
    });
    return data;
  }),
  create: authenticatedProcedure
    .input(orderSchemaWithoutId)
    .mutation(async ({ input: orderData }) => {
      console.log(orderData);
      const createData: Prisma.OrderCreateInput = omit(orderData, [
        "files",
        "client",
        "address",
        "designs",
        "spreadsheets",
      ]);
      if (orderData.files?.length && orderData.files.length > 0)
        createData.files = { create: { ...orderData.files } };
      if (orderData.spreadsheets?.length && orderData.spreadsheets.length > 0)
        createData.spreadsheets = { create: { ...orderData.spreadsheets } };
      if (orderData.designs?.length && orderData.designs.length > 0)
        createData.designs = { create: { ...orderData.designs } };
      if (orderData.client)
        createData.client = { connect: { ...orderData.client } };
      if (orderData.address)
        createData.address = { create: { ...orderData.address } };
      console.log(createData);
      const newOrder = await prisma.order.create({
        data: createData,
      });
      return newOrder;
    }),
  deleteById: createProcedureDeleteById("order"),
  update: authenticatedProcedure
    .input(orderSchema.partial())
    .mutation(async ({ input: orderData }) => {
      console.log(orderData);
      const originalOrder = await prisma.order.findUnique({
        where: { id: orderData.id },
        include: includeAll,
      });

      const inputKeys = Object.keys(orderData);
      const innerKeys = Object.keys(includeAll);

      const simpleKeys = inputKeys.filter((val) => !innerKeys.includes(val));
      const advancedKeys = inputKeys.filter((val) => !simpleKeys.includes(val));
      console.log(simpleKeys, advancedKeys);
      // const updateData: Prisma.OrderUpdateInput = {
      //   ...orderData,
      //   address: {
      //     upsert: {
      //       create: { ...orderData.address },
      //       update: { ...orderData.address },
      //     },
      //   },
      //   client: { connect: orderData.client },
      //   // designs: {
      //   //   updateMany: {

      //   //     create: orderData.designs !== undefined ? orderData.designs : [],
      //   //     update: orderData.designs !== undefined ? orderData.designs : [],
      //   //   },
      //   // },
      //   // spreadsheets: {
      //   //   upsert: {
      //   //     create: { ...orderData.spreadsheets },
      //   //     update: { ...orderData.spreadsheets },
      //   //   },
      //   // },
      //   // files: {
      //   //   upsert: {
      //   //     create: { ...orderData.files },
      //   //     update: { ...orderData.files },
      //   //   },
      //   // },
      // };

      // const updatedClient = await prisma.order.update({
      //   where: { id: orderData.id },
      //   data: omit(
      //     { ...orderData, address: { update: { ...orderData.address } } },
      //     ["id"]
      //   ),
      // });
      return originalOrder;
    }),
  search: createProcedureSearch("order"),
  searchWithPagination: createProcedureSearchWithPagination("order"),
});
