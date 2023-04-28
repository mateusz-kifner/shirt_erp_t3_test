import { type AppType } from "next/app";

import { api } from "~/utils/api";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "~/styles/globals.css";
import AppLayout from "~/components/layout/AppLayout";
import { UserContextProvider } from "~/context/userContext";
import { Notifications } from "~/lib/notifications";

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
