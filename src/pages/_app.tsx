import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import AppLayout from "~/components/layout/AppLayout";
import { UserContextProvider } from "~/context/userContext";
import NotificationsProvider from "~/context/NotificationsContext";

const App: AppType = ({ Component, pageProps }) => {
  return (
    <UserContextProvider>
      <NotificationsProvider>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </NotificationsProvider>
    </UserContextProvider>
  );
};

export default api.withTRPC(App);
