import React from "react";
import { api } from "~/utils/api";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "~/lib/session";
import { useRouter } from "next/router";

// Make sure to check https://nextjs.org/docs/basic-features/layouts for more info on how to use layouts
export default function SgProfile() {
  const router = useRouter();

  const userQuery = api.session.user.useQuery(undefined, {
    onSuccess(data) {
      if (data.isLoggedIn === false) {
        router.push("/login");
      }
    },
  });
  const eventQuery = api.session.event.useQuery(undefined, {
    enabled: userQuery.data?.isLoggedIn,
  });

  const user = userQuery.data;
  const events = eventQuery.data;

  return (
    <div>
      <h1>Your GitHub profile</h1>
      <h2>
        This page uses{" "}
        <a href="https://nextjs.org/docs/basic-features/pages#static-generation-recommended">
          Static Generation (SG)
        </a>{" "}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        and the <a href="/api/user">/api/user</a> route (using{" "}
        <a href="https://github.com/vercel/swr">vercel/SWR</a>)
      </h2>
      {user && (
        <>
          <p style={{ fontStyle: "italic" }}>
            Public data, from{" "}
            <a href={`https://github.com/${user.login}`}>
              https://github.com/{user.login}
            </a>
            , reduced to `login` and `avatar_url`.
          </p>

          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      )}

      {events !== undefined && (
        <p>
          Number of GitHub events for user: <b>{events.length}</b>.{" "}
          {events.length > 0 && (
            <>{/* Last event type: <b>{events[0].type}</b> */}</>
          )}
        </p>
      )}
    </div>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {
  const user = req.session.user;

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
},
sessionOptions);
