// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import type { IronSessionOptions } from "iron-session";
import { env } from "~/env.mjs";

export type User = {
  isLoggedIn: boolean;
  username: string;
  avatarUrl: string;
};

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
    user?: User;
  }
}
