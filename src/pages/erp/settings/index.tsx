import { Dialog } from "@headlessui/react";
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
import React, { useState, type ChangeEvent } from "react";
import SuperJSON from "superjson";
import Button from "~/components/basic/Button";
import EditableText from "~/components/editable/EditableText";
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
  const [testFormOpen, setTestFormOpen] = useState<boolean>(false);
  const [testValue, setTestValue] = useState<string | null>("");

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
          {debug && (
            <Button
              onClick={() => {
                setTestFormOpen(true);
              }}
              leftSection={<IconBug />}
            >
              Open Test Form
            </Button>
          )}
          {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
          <Dialog open={testFormOpen} onClose={() => {}}>
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            <Dialog.Panel className="absolute left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform overflow-hidden rounded-sm bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-stone-800">
              <Button onClick={() => setTestFormOpen(false)}>Close</Button>
              <EditableText
                leftSection={<IconBug />}
                rightSection={<IconBug />}
                label={"Test text"}
                value={testValue ?? undefined}
                onSubmit={(value) => setTestValue(value)}
              />
            </Dialog.Panel>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default Settings;
