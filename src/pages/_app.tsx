import { type AppType } from "next/app";

import { api } from "~/utils/api";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "~/styles/globals.css";
import AppLayout from "~/components/layout/AppLayout";
import { UserContextProvider } from "~/context/userContext";
import { Notifications, showNotification } from "~/lib/notifications";
import Logger from "js-logger";
import { env } from "~/env.mjs";

Logger.setHandler(function (messages, context) {
  const savedValue = localStorage.getItem("user-data");
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

Logger.setLevel(env.NODE_ENV === "development" ? Logger.INFO : Logger.WARN);

const App: AppType = ({ Component, pageProps }) => {
  return (
    <UserContextProvider>
      <Notifications />
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
      <ReactQueryDevtools initialIsOpen={false} />
    </UserContextProvider>
  );
};

export default api.withTRPC(App);
