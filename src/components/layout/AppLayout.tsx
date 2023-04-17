import React, { type PropsWithChildren } from "react";
import Header from "./Header";
import Navigation from "./Navigation";

function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <Header />
      <Navigation />
      <main className="min-h-[calc(100vh-3.5rem)] bg-gray-200 dark:bg-stone-950">
        {children}
      </main>
    </div>
  );
}

export default Layout;
