import React from "react";
import navigationData from "../../navigationData";
import {
  IconChevronRight,
  IconChevronLeft,
  IconCategory,
  IconChartTreemap,
} from "@tabler/icons-react";
import useLocalStorageBool from "~/hooks/useLocalStorageBool";
import NavButton from "./NavButton";
import { useRouter } from "next/router";

function Navigation() {
  const router = useRouter();
  const [debug] = useLocalStorageBool("debug");
  const [navigationCollapsed, setNavigationCollapsed] = useLocalStorageBool(
    "navigationCollapsed"
  );
  const toggleNavigationCollapsed = () => {
    setNavigationCollapsed((val) => !val);
  };

  return (
    <div className="fixed left-0 top-14 flex w-64 flex-col">
      <div className="scrollbar-thumb-blue scrollbar-thumb-rounded-full scrollbar-track-transparent scrollbar-w-2 overflow-y-auto">
        <div className="min-h-[calc(100vh-3.5rem)] bg-white dark:bg-stone-900">
          <div className="flex flex-col">
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

          <div className="flex">
            <button
              onClick={() => {
                toggleNavigationCollapsed();
              }}
            >
              {navigationCollapsed ? <IconChevronRight /> : <IconChevronLeft />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
