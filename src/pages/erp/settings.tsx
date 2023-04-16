import { IconUser, IconUserCircle } from "@tabler/icons-react";
import { withIronSessionSsr } from "iron-session/next";
import React from "react";
import { sessionOptions } from "~/lib/session";
import { api } from "~/utils/api";

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

function Settings() {
  const { data } = api.session.user.useQuery();

  if (!data?.user) return null;
  const user = data.user;

  return (
    <div className="flex w-full flex-row items-start justify-center pt-28 font-sans">
      <div className="card mx-auto w-[40rem] bg-white  shadow-xl">
        {/* eslint-disable-next-line */}
        <IconUserCircle className="mx-auto -mt-20 h-32 w-32 rounded-full border-8 border-white bg-gray-200 stroke-slate-900 " />
        <div className="mt-2 text-center text-3xl font-medium">
          {user?.name}
        </div>
        <div className="mt-2 text-center text-sm font-light">
          @{user?.username}
        </div>
        <div className="mt-2 px-6 text-center text-sm font-light">
          {user?.email}
        </div>
        <hr className="mt-8" />
        <div className="flex p-4"></div>
      </div>
    </div>
  );
}

export default Settings;
