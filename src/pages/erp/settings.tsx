import { IconLogout, IconUserCircle } from "@tabler/icons-react";
import { withIronSessionSsr } from "iron-session/next";
import { useRouter } from "next/router";
import React from "react";
import useTranslation from "~/hooks/useTranslation";
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
  const router = useRouter();
  const { locale } = router;
  const { data } = api.session.user.useQuery();
  const t = useTranslation();

  if (!data?.user) return null;
  const user = data.user;

  return (
    <div className="flex w-full flex-row items-start justify-center pt-28 font-sans">
      <div className="card mx-auto w-[36rem] bg-white  shadow-xl">
        {/* eslint-disable-next-line */}
        <IconUserCircle className="mx-auto -mt-20 h-32 w-32 rounded-full border-8 border-white bg-gray-200 stroke-slate-900 " />
        <div className="mt-2 text-center text-3xl font-medium">
          {user?.name}
        </div>
        <hr className="mt-8" />
        <div className="flex flex-col gap-3 p-4 ">
          <button
            className="border-1 inline-flex h-9 animate-pop items-center
                justify-center gap-3 rounded-md 
                bg-blue-600 stroke-gray-200 p-0 px-4 font-semibold uppercase text-gray-200
                no-underline transition-all 
                hover:bg-blue-700 active:hover:scale-95 
                active:hover:animate-none active:focus:scale-95
                active:focus:animate-none disabled:pointer-events-none disabled:bg-stone-700"
          >
            <IconLogout />
            {t.singout}
          </button>
          <div className="flex items-center justify-stretch">
            <span className="w-1/2">{t.language}</span>
            <select
              defaultValue={locale ?? "pl"}
              // onChange={() => {}}
              disabled
              className="border-1 inline-flex h-9 flex-grow animate-pop items-center
                justify-center rounded-md bg-stone-800 
                p-0 px-4 text-center font-semibold uppercase text-gray-200 no-underline
                transition-all hover:bg-stone-950
                active:hover:scale-95 active:hover:animate-none 
                active:focus:scale-95 active:focus:animate-none
                disabled:pointer-events-none disabled:bg-stone-700"
            >
              <option value="pl">Polski</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
