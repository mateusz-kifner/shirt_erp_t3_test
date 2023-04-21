import { useLocalStorage } from "@mantine/hooks";
import {
  IconBug,
  IconLogout,
  IconMoonStars,
  IconSun,
  IconUserCircle,
} from "@tabler/icons-react";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { withIronSessionSsr } from "iron-session/next";
import { useRouter } from "next/router";
import React, { type ChangeEvent } from "react";
import SuperJSON from "superjson";
import Button from "~/components/basic/Button";
import { useUserContext } from "~/context/userContext";
import useTranslation from "~/hooks/useTranslation";
import { sessionOptions } from "~/lib/session";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import { api } from "~/utils/api";

export const getServerSideProps = withIronSessionSsr(async function ({ req }) {
  const user = req.session.user;

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: { prisma, session: req.session },
    transformer: SuperJSON,
  });

  await ssg.session.user.prefetch();

  return {
    props: { trpcState: ssg.dehydrate() },
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
  const t = useTranslation();
  const { debug, toggleDebug, toggleTheme, theme } = useUserContext();

  if (!data?.user) return null;
  const user = data.user;

  const changeLocale = (e: ChangeEvent<HTMLSelectElement>) => {
    router.push("", "", { locale: e.target.value }).catch((e) => {
      throw e;
    });
  };

  return (
    <div className="flex w-full flex-row items-start justify-center pt-28 font-sans dark:text-gray-200">
      <div className="card mx-auto w-[36rem] bg-white shadow-xl dark:bg-stone-800">
        <IconUserCircle className="mx-auto -mt-20 h-32 w-32 rounded-full border-8 border-white bg-gray-200 stroke-slate-900 dark:border-stone-800  dark:bg-stone-800  dark:stroke-gray-200 " />
        <div className="mt-2 text-center text-3xl font-medium">
          {user?.name}
        </div>
        <hr className="mt-8 dark:border-stone-600 " />
        <div className="flex flex-col gap-3 p-4 ">
          <Button onClick={() => logout.mutate()} leftSection={<IconLogout />}>
            {t.sign_out}
          </Button>
          <div className="flex items-center justify-stretch">
            <span className="w-1/2">{t.language}</span>
            <select
              defaultValue={locale ?? "pl"}
              onChange={changeLocale}
              className="border-1 inline-flex h-9 flex-grow animate-pop items-center
                justify-center rounded-md bg-stone-700 
                p-0 px-4 text-center font-semibold uppercase text-gray-200 no-underline
                transition-all disabled:pointer-events-none
                disabled:bg-stone-700 hover:bg-stone-600
                active:focus:scale-95 active:focus:animate-none
                active:hover:scale-95 active:hover:animate-none"
            >
              <option value="pl">Polski</option>
              <option value="en">English</option>
            </select>
          </div>
          <Button
            onClick={toggleTheme}
            leftSection={theme === 1 ? <IconSun /> : <IconMoonStars />}
          >
            {theme === 1 ? t.light_theme : t.dark_theme}
          </Button>
          <Button
            onClick={() => {
              toggleDebug();
            }}
            leftSection={<IconBug />}
          >
            Debug {debug ? "ON" : "OFF"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
