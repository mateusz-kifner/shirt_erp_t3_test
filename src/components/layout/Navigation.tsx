import React, { useState } from "react";
import navigationData from "../../navigationData";
import {
  IconChevronRight,
  IconChevronLeft,
  IconCategory,
  IconChartTreemap,
} from "@tabler/icons-react";
import { useRouter } from "next/router";
import NavButton from "./NavButton";
import { useLocalStorage } from "@mantine/hooks";

function Navigation() {
  const router = useRouter();
  const [debug, setDebug] = useLocalStorage({
    key: "debug",
    defaultValue: false,
  });
  const [navigationCollapsed, setNavigationCollapsed] = useLocalStorage({
    key: "navigationCollapsed",
    defaultValue: false,
  });
  const toggleNavigationCollapsed = () => {
    setNavigationCollapsed((val) => !val);
  };

  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  return (
    <div
      className={`fixed left-0 top-14 flex h-[calc(100vh-3.5rem)] max-h-[calc(100vh-3.5rem)]  flex-col justify-between  bg-white px-3 py-1 transition-all dark:bg-stone-900 ${
        navigationCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="overflow-y-auto overflow-x-hidden transition-all scrollbar  scrollbar-track-transparent scrollbar-thumb-blue-500 scrollbar-corner-transparent scrollbar-thumb-rounded-full scrollbar-w-2 ">
        <div className="flex flex-col gap-2 py-3">
          {navigationData.map(
            (val) =>
              (!val?.debug || debug) && (
                <NavButton
                  {...val}
                  key={"navbar_" + val.label}
                  // onClick={(e: any) => {
                  //   !biggerThanSM && toggleNavigationCollapsed()
                  // }}
                  small={navigationCollapsed}
                  active={val.entryName === router.pathname.split("/")[2]}
                />
              )
          )}
        </div>
      </div>
      <div className=" flex w-full  flex-col items-center justify-center gap-2  p-2">
        <div className="w-full border-t-[1px] border-stone-600"></div>
        <button
          className="flex h-12 w-12 items-center justify-center rounded-full transition-all hover:bg-black hover:bg-opacity-25"
          onClick={() => {
            toggleNavigationCollapsed();
          }}
        >
          {navigationCollapsed ? (
            <IconChevronRight className="dark:stroke-gray-200" />
          ) : (
            <IconChevronLeft className="dark:stroke-gray-200" />
          )}
        </button>
      </div>
    </div>
  );
}



export default Navigation;
