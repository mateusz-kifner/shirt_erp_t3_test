import {
  IconBug,
  IconLogout,
  IconMoonStars,
  IconSun,
  IconUserCircle,
} from "@tabler/icons-react";
import { withIronSessionSsr } from "iron-session/next";
import { useRouter } from "next/router";
import React from "react";
import Button from "~/components/basic/Button";
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
  const logout = api.session.logout.useMutation({
    onSuccess() {
      void router.push("/profile");
    },
    onError(err) {
      console.log(err.message);
    },
  });
  const changeTheme = api.session.changeTheme.useMutation({
    onSuccess() {
      void router.reload();
    },
    onError(err) {
      console.log(err.message);
    },
  });
  const t = useTranslation();

  if (!data?.user) return null;
  const user = data.user;
  const toggleTheme = () => {
    changeTheme.mutate(user.theme === 0 ? 1 : 0);
  };

  return (
    <div className="flex w-full flex-row items-start justify-center pt-28 font-sans dark:text-gray-200">
      <div className="card mx-auto w-[36rem] bg-white shadow-xl dark:bg-stone-800">
        {/* eslint-disable-next-line */}
        <IconUserCircle className="mx-auto -mt-20 h-32 w-32 rounded-full border-8 border-white bg-gray-200 stroke-slate-900 dark:border-stone-800  dark:bg-stone-800  dark:stroke-gray-200 " />
        <div className="mt-2 text-center text-3xl font-medium">
          {user?.name}
        </div>
        <hr className="mt-8 dark:border-stone-600 " />
        <div className="flex flex-col gap-3 p-4 ">
          <Button
            onClick={() => logout.mutate()}
            leftSection={<IconLogout />}
          >
            {t.singout}
          </Button>
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
          <Button onClick={toggleTheme}>
            {user?.theme === 1 ? (
              <>
                <IconSun size={18} />
                {t.light_skin}
              </>
            ) : (
              <>
                <IconMoonStars size={18} />
                {t.dark_skin}
              </>
            )}
          </Button>
          <Button
            onClick={() => logout.mutate()}
            leftSection={<IconBug size={18} />}
          >
            Debug
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
