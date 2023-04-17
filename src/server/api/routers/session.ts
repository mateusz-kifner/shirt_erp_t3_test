import {
  authenticatedProcedure,
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { prisma } from "~/server/db";
import bcrypt from "bcrypt";
import _ from "lodash";

export const sessionRouter = createTRPCRouter({
  changeTheme: authenticatedProcedure
    .input(z.number().min(0).max(1).int())
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session?.user?.username) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Session not vaild",
        });
      }
      try {
        const user = await prisma.user.update({
          where: { username: ctx.session?.user?.username },
          data: { theme: input },
        });
        console.log(user);
        ctx.session.user.theme = user.theme as number;
        await ctx.session.save();
        return true;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: (error as Error).message,
        });
      }
    }),
  user: publicProcedure.query(({ ctx }) => {
    if (ctx.session?.user && ctx.session.isLoggedIn) {
      return {
        user: ctx.session.user,
        isLoggedIn: true,
      };
    } else {
      return {
        user: null,
        isLoggedIn: false,
      };
    }
  }),
  login: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { username, password } = input;

      try {
        const user = await prisma.user.findFirst({
          where: { username: username },
        });
        if (!user || !user.password) {
          return null;
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
          return null;
        }
        const sanitized_user = _.omit(user, ["password"]);
        if (ctx.session) {
          ctx.session.user = sanitized_user;
          ctx.session.isLoggedIn = true;
          await ctx.session.save();
        }
        return {
          user: sanitized_user,
          isLoggedIn: true,
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: (error as Error).message,
        });
      }
    }),
  logout: publicProcedure.mutation(({ ctx }) => {
    if (ctx.session) ctx.session.destroy();
    return { isLoggedIn: false, user: null };
  }),
});
