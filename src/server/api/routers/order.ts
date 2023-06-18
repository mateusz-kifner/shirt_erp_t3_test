import { orderSchema } from "~/schema/orderSchema";
import {
  createProcedureDeleteById,
  createProcedureGetAll,
  createProcedureGetById,
  createProcedureSearch,
  createProcedureSearchWithPagination,
} from "~/server/api/procedures";
import { createTRPCRouter } from "~/server/api/trpc";

const orderSchemaWithoutId = orderSchema.omit({ id: true });

export const orderRouter = createTRPCRouter({
  getAll: createProcedureGetAll("order"),
  getById: createProcedureGetById("order"),
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
