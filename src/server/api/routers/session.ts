import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { User } from "~/lib/session";
import { TRPCError } from "@trpc/server";
import { prisma } from "~/server/db";

export const sessionRouter = createTRPCRouter({
  user: publicProcedure.query(async ({ ctx }) => {
    if (ctx.session.user) {
      return {
        ...ctx.session.user,
        isLoggedIn: true,
      };
    } else {
      return {
        isLoggedIn: false,
        login: "",
        avatarUrl: "",
      };
    }
  }),
  event: publicProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user;

    if (!user || user.isLoggedIn === false) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
      });
    }

    try {
      // const { data: events } =
      //   await octokit.rest.activity.listPublicEventsForUser({
      //     username: user.login,
      //   });
      // return events;
    } catch (error) {
      return [];
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
        if (!user) {
          return null;
        }

        // const {
        //   data: { login, avatar_url },
        // } = await octokit.rest.users.getByUsername({ username });

        // const user = { isLoggedIn: true, login, avatarUrl: avatar_url } as User;
        // ctx.session.user = user;
        await ctx.session.save();
        // return user;
        return { username: "testuser_!!!!" };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: (error as Error).message,
        });
      }
    }),
  logout: publicProcedure.mutation(async ({ ctx }) => {
    ctx.session.destroy();
    return { isLoggedIn: false, login: "", avatarUrl: "" };
  }),
});
