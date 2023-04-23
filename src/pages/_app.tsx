import { type AppType } from "next/app";

import { api } from "~/utils/api";

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
    </UserContextProvider>
  );
};

export default api.withTRPC(App);
