// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import type { Prisma, User } from "@prisma/client";
import type { IronSessionOptions } from "iron-session";
import { env } from "~/env.mjs";

export const sessionOptions: IronSessionOptions = {
  password: env.SECRET_COOKIE_PASSWORD,
  cookieName: "session_cookie",
  cookieOptions: {
    secure: env.NODE_ENV === "production",
  },
};

// This is where we specify the typings of req.session.*
declare module "iron-session" {
  interface IronSessionData {
    user?: Omit<User, "password">;
    isLoggedIn: boolean;
  }
}
