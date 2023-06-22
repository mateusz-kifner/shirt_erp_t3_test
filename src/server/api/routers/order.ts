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
      if (orderData?.client?.id) {
        createData.client = { connect: { id: orderData.client.id } };
      }
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
      const {
        id: orderId,
        spreadsheets,
        designs,
        files,
        client,
        address,
        ...simpleOrderData
      } = orderData;
      // const originalOrder = await prisma.order.findUnique({
      //   where: { id: orderId },
      //   include: includeAll,
      // });
      const updateData: Prisma.OrderUpdateInput = { ...simpleOrderData };
      if (client?.id) {
        updateData.client = { connect: { id: client?.id } };
      }

      const updatedOrder = await prisma.order.update({
        where: { id: orderId },
        data: updateData,
      });

      // Update spreadsheets -- BAD EXAMPLE
      // if (spreadsheets) {
      //   await prisma.typeSpreadsheet.deleteMany({ where: { orderId } });
      //   const spreadsheetData = spreadsheets.map((spreadsheet) => ({
      //     ...spreadsheet,
      //     orderId,
      //   }));
      //   await prisma.typeSpreadsheet.createMany({ data: spreadsheetData });
      // }

      // TODO: Make this work
      // delete lost
      // add new
      // update existing
      // if (spreadsheets) {
      //   const originalSpreadsheetIds =
      //     originalOrder?.spreadsheets.map((file) => file.id) ?? [];
      //   const newSpreadsheetIds = spreadsheets.map((file) => file.id);

      //   console.log(originalSpreadsheetIds, newSpreadsheetIds);
      // }

      // Update address
      if (address) {
        await prisma.typeAddress.update({
          where: { id: address.id },
          data: address,
        });
      }

      // Update files
      if (files) {
        const fileData = files.map((file) =>
          prisma.file.update({
            where: { id: file.id },
            data: { ...file, Order: { connect: { id: orderId } } },
          })
        );
        await Promise.all(fileData);
      }

      return { ...updatedOrder, files, spreadsheets, designs, client, address };
    }),
  search: createProcedureSearch("order"),
  searchWithPagination: createProcedureSearchWithPagination("order"),
});
