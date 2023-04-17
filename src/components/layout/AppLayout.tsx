import React, { type PropsWithChildren } from "react";
import Header from "./Header";
import dynamic from "next/dynamic";

// HACK: This is required because Next.js hates Svg in Svg
const Navigation = dynamic(() => import("./Navigation"), {
  ssr: false,
});

function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <Header />
      <Navigation />
      <main className="ml-64 mt-14 min-h-[calc(100vh-3.5rem)]  ">
        {children}
      </main>
    </div>
  );
}

export default Layout;
