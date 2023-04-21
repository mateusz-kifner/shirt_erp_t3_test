// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import type { User } from "@prisma/client";
import type { IronSessionOptions } from "iron-session";
import { env } from "~/env.mjs";

export const sessionOptions: IronSessionOptions = {
  password: env.SECRET_COOKIE_PASSWORD,
  cookieName: "session_cookie",
  cookieOptions: {
    secure: env.NODE_ENV === "production",
  },
};

export type SanitizedUser = Omit<User, "password">;

// This is where we specify the typings of req.session.*
declare module "iron-session" {
  interface IronSessionData {
    user?: SanitizedUser;
    isLoggedIn: boolean;
  }
}
