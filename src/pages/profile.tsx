import { withIronSessionSsr } from "iron-session/next";
import { useRouter } from "next/router";

import { sessionOptions } from "@/lib/session";
import { api } from "@/utils/api";

// Make sure to check https://nextjs.org/docs/basic-features/layouts for more info on how to use layouts
export default function SgProfile() {
  const router = useRouter();

  const userQuery = api.session.user.useQuery(undefined, {
    onSuccess(data) {
      if (data.isLoggedIn === false) {
        void router.push("/login");
      }
    },
  });

  const user = userQuery.data;

  return (
    <div>
      <h1>Your profile</h1>

      {user && <pre>{JSON.stringify(user, null, 2)}</pre>}
    </div>
  );
}

export const getServerSideProps = withIronSessionSsr(function ({ req }) {
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
}, sessionOptions);
