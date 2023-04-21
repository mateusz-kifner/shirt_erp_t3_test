import React, { type PropsWithChildren } from "react";
import Header from "./Header";
import NavigationWithoutSSR from "./NavigationWithoutSSR";

function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <Header />
      <NavigationWithoutSSR />
      <main className="ml-64 mt-14 min-h-[calc(100vh-3.5rem)]  ">
        {children}
      </main>
    </div>
  );
}

export default Layout;
