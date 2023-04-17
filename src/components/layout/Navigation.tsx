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
    <div className="fixed left-0 top-14 flex h-[calc(100vh-3.5rem)] max-h-[calc(100vh-3.5rem)] w-64 flex-col bg-white  py-1 dark:bg-stone-900">
      <div className="overflow-y-auto transition-all scrollbar  scrollbar-track-transparent scrollbar-thumb-blue-500 scrollbar-corner-transparent scrollbar-thumb-rounded-full scrollbar-w-2 ">
        <div className="flex flex-col gap-2 p-3">
          {navigationData.map(
            (val) =>
              (!val?.debug || debug) && (
                <NavButton
                  {...val}
                  key={"navbar_" + val.label}
                  // onClick={(e: any) => {
                  //   !biggerThanSM && toggleNavigationCollapsed()
                  // }}
                  // small={navigationCollapsed && biggerThanSM}
                  active={val.entryName === router.pathname.split("/")[2]}
                />
              )
          )}
        </div>
        <div id="SpecialMenu" className="flex flex-col"></div>
        {/* 
          <div className="flex">
            <button
              onClick={() => {
                toggleNavigationCollapsed();
              }}
            >
              {navigationCollapsed ? <IconChevronRight /> : <IconChevronLeft />}
            </button>
          </div> */}
      </div>
    </div>
  );
}

export default Navigation;
