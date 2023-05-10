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
// import Editable from "~/components/editable/Editable";
import EditableAddress from "~/components/editable/EditableAddress";
import EditableEnum from "~/components/editable/EditableEnum";
import EditableText from "~/components/editable/EditableText";
import { useUserContext } from "~/context/userContext";
import useTranslation from "~/hooks/useTranslation";
import { sessionOptions } from "~/lib/session";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import { api } from "~/utils/api";
import template from "~/templates/test.template";
import Tooltip from "~/components/basic/Tooltip";
import DisplayCell from "~/components/basic/DisplayCell";
// import EditableColor from "~/components/editable/EditableColor";
import InputColor from "~/components/input/InputColor";
import Modal from "~/components/basic/Modal";
import Select from "~/components/input/Select";
import Switch from "~/components/input/Switch";
import ScrollArea from "~/components/input/ScrollArea";
import Menu from "~/components/input/Menu";
import Alert from "~/components/basic/Alert";

const testData = {
  name: "string",
  bool: true,
  switch: false,
  category: "option 1",
  color: "#ff0000",
  date: "2021-11-05T12:24:05.097Z",
  datetime: "2021-11-05T12:24:05.097Z",
  product: null,
  client: null,
  productComponent: null,
  productComponents: [],
  image: null,
  file: null,
  files: null,
  workstations: null,
  employee: null,
  employees: null,
  submit: null,

  group: { name: "test", color: "#ff0000" },
  group2: { name: "test", color: "#ff0000" },
  group3: { name: {}, color: "#ff0000" },
  group_of_arrays: { arrayText: [], arrayText2: [] },
};

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
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [testValue, setTestValue] = useState<string | null>("");
  const { mutate } = api.client.create.useMutation();

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
                transition-all hover:bg-stone-600
                active:hover:scale-95 active:hover:animate-none
                active:focus:scale-95 active:focus:animate-none
                disabled:pointer-events-none disabled:bg-stone-700"
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
            <>
              <Button
                onClick={() => {
                  setTestFormOpen(true);
                }}
                leftSection={<IconBug />}
              >
                Open Test Form
              </Button>
              {/* <Button
                onClick={() => {
                  for (let i = 0; i < 10; i++) {
                    mutate({ username: "client" + i });
                  }
                }}
                leftSection={<IconBug />}
              >
                Add 10 clients
              </Button> */}
              <Tooltip tooltip="test" position="left" withinPortal>
                <Button>test</Button>
              </Tooltip>
              <Tooltip tooltip="test" position="right" withinPortal>
                <Button>test</Button>
              </Tooltip>
              <Tooltip tooltip="test" position="top" withinPortal>
                <Button>test</Button>
              </Tooltip>
              <Tooltip tooltip="test" position="bottom" withinPortal>
                <Button>test</Button>
              </Tooltip>
              <Menu></Menu>
            </>
          )}
          {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
          <Modal
            open={testFormOpen}
            onClose={() => setTestFormOpen(false)}
            title={"test test"}
            description={"test2 test2"}
          >
            {/* <DisplayCell rightSection={<IconBug />} leftSection={<IconBug />}>
              test display cell
            </DisplayCell>
            <DisplayCell
              rightSection={<IconBug />}
              leftSection={<IconBug />}
              disabled
            >
              test display cell
            </DisplayCell>
            <EditableText
              label="test"
              value={testValue ?? undefined}
              onSubmit={setTestValue}
              rightSection={<IconBug />}
              leftSection={<IconBug />}
            /> */}
            {/* <EditableColor label="test color" value="#fff" /> */}
            {/* <InputColor /> */}
            <Select data={["test", "test2", "test3"]} />
            <Select
              defaultValue="pizza"
              onValueChange={(value) => console.log(value)}
              data={{
                food: ["apple", "pizza", "sandwich"],
                drinks: ["tee", "cola", "water"],
              }}
            />
            <Switch />
            <Alert
              trigger={<Button>Alert</Button>}
              title="TestTitle"
              description="test desc"
            >
              Content
            </Alert>
            <ScrollArea className="h-96 w-32">
              <div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
              </div>
            </ScrollArea>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Settings;
