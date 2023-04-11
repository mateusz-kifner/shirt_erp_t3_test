// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { Prisma } from "@prisma/client";
import type { IronSessionOptions } from "iron-session";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";

export const sessionOptions: IronSessionOptions = {
  password: env.SECRET_COOKIE_PASSWORD as string,
  cookieName: "session_cookie",
  cookieOptions: {
    secure: env.NODE_ENV === "production",
  },
};

// This is where we specify the typings of req.session.*
declare module "iron-session" {
  interface IronSessionData {
    user?: Prisma.UserGetPayload<{
      select: { [K in keyof Prisma.UserSelect]: true };
    }>;
    isLoggedIn: boolean;
  }
}
