import { type AppType } from "next/app";

import { api } from "~/utils/api";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "~/styles/globals.css";
import AppLayout from "~/components/layout/AppLayout";
import { UserContextProvider } from "~/context/userContext";
import { Notifications, showNotification } from "~/lib/notifications";
import Logger from "js-logger";
import { env } from "~/env.mjs";
import ErrorBoundary from "~/components/ErrorBoundary";
import Head from "next/head";

// TODO: refactor logger

Logger.setHandler(function (messages, context) {
  const savedValue = localStorage.getItem("user-data"); // TODO: log user id here
  console.log(messages[0]?.message ?? "Nieznany błąd", messages[0]);
  if (context.level === Logger.ERROR)
    showNotification({
      title: "Błąd",
      message:
        messages[0]?.message ??
        "Nieznany błąd: sprawdź szczegóły w logu servera",
    });
  if (context.level === Logger.WARN)
    showNotification({
      title: "Ostrzeżenie",
      message:
        messages[0]?.message ??
        "Nieznany błąd: sprawdź szczegóły w logu servera",
    });
  if (typeof messages[0] === "string") {
    // axios.post("/logs", {
    //   message: messages[0],
    //   type: context.level.name,
    //   userId: savedValue && savedValue?.length > 0 ? savedValue : null,
    // });
  } else {
    // axios.post("/logs", {
    //   message: messages[0]?.message ? messages[0]?.message : "Nieznany błąd",
    //   data: messages[0],
    //   type: context.level.name,
    //   userId: savedValue && savedValue?.length > 0 ? savedValue : null,
    // });
  }
});

Logger.setLevel(
  env.NEXT_PUBLIC_NODE_ENV === "development" ? Logger.INFO : Logger.WARN
);

const App: AppType = ({ Component, pageProps }) => {
  return (
    <UserContextProvider>
      <Notifications />
      <AppLayout>
        <Head>
          <title>ShirtERP</title>
        </Head>
        <ErrorBoundary fallback={<h1>Application crashed</h1>}>
          <Component {...pageProps} />
        </ErrorBoundary>
      </AppLayout>
      <ReactQueryDevtools initialIsOpen={false} />
    </UserContextProvider>
  );
};

export default api.withTRPC(App);
