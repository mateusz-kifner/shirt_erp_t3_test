import React, { useEffect, type PropsWithChildren } from "react";
import Header from "./Header";
import NavigationWithoutSSR from "./NavigationWithoutSSR";
import { useUserContext } from "~/context/userContext";

function Layout({ children }: PropsWithChildren) {
  const { theme } = useUserContext();

  useEffect(() => {
    const htmlElement = document.querySelector("html") as HTMLHtmlElement;
    htmlElement.classList.remove("light", "dark");
    htmlElement.classList.add(theme === 0 ? "light" : "dark");
  }, [theme]);

  return (
    <div>
      <Header />
      <NavigationWithoutSSR />
      <main className="ml-64 mt-14 min-h-[calc(100vh-3.5rem)]">{children}</main>
    </div>
  );
}

export default Layout;
