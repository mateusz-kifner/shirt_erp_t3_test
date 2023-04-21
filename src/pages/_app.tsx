import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import AppLayout from "~/components/layout/AppLayout";
import { UserContextProvider } from "~/context/userContext";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <UserContextProvider>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </UserContextProvider>
  );
};

export default api.withTRPC(MyApp);
