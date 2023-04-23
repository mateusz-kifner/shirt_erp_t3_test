import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import AppLayout from "~/components/layout/AppLayout";
import { UserContextProvider } from "~/context/userContext";
import { Notifications } from "~/lib/notifications";

const App: AppType = ({ Component, pageProps }) => {
  return (
    <UserContextProvider>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
      <Notifications />
    </UserContextProvider>
  );
};

export default api.withTRPC(App);
