import React, { useEffect, type PropsWithChildren } from "react";
import Header from "./Header";
import Navigation from "./Navigation";

function Layout({ children }: PropsWithChildren) {
  useEffect(() => {
    // initialize theme (bypasses userContext, 10x faster)
    const theme = localStorage.getItem("user-theme");
    const htmlElement = document.querySelector("html") as HTMLHtmlElement;
    htmlElement.classList.add(theme === "0" ? "light" : "dark");

    // enable transitions after page load
    const timeout = setTimeout(() => {
      const bodyElement = document.querySelector("body") as HTMLBodyElement;
      bodyElement.classList.remove("preload");
    }, 200);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      <Header />
      <Navigation />
      <main className="ml-64 mt-14 min-h-[calc(100vh-3.5rem)]">{children}</main>
    </div>
  );
}

export default Layout;
