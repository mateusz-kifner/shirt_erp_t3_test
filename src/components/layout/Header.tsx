import { useElementSize, useLocalStorage } from "@mantine/hooks";
import {
  IconBell,
  IconMessage,
  IconSearch,
  IconSettings,
} from "@tabler/icons-react";
import Link from "next/link";

const Header = () => {
  const { ref, width: actionButtonsWidth } = useElementSize();

  const [navigationCollapsed, setNavigationCollapsed] =
    useLocalStorage<boolean>({
      key: "user-navigation-collapsed",
      defaultValue: false,
    });

  return (
    <div className="fixed left-0 top-0 flex h-14 w-full items-center justify-between border-b-[1px] border-stone-700 bg-stone-900 px-4">
      <div className="flex h-full flex-nowrap items-center justify-between">
        {navigationCollapsed ? (
          // eslint-disable-next-line
          <img
            src="/assets/logo_micro.png"
            alt="Shirt Dip ERP"
            className="h-10"
          />
        ) : (
          // eslint-disable-next-line
          <img
            src="/assets/logo_small.png"
            alt="Shirt Dip ERP"
            className="h-10"
          />
        )}
      </div>
      <div
        id="HeaderTabs"
        className={`absolute left-0 top-0 h-14 w-full transition-all ${
          navigationCollapsed ? "pl-20" : "pl-64"
        }`}
        style={{ paddingRight: `calc(${actionButtonsWidth}px + 1rem)` }}
      ></div>
      <div className="flex justify-end gap-3" ref={ref}>
        <button
          className="border-1 inline-flex h-9 w-9
            animate-pop items-center justify-center 
            rounded-full bg-stone-800 p-0 font-semibold uppercase no-underline transition-all
            disabled:pointer-events-none
            disabled:bg-stone-700 hover:bg-stone-950 
            active:focus:scale-95 active:focus:animate-none
            active:hover:scale-95 active:hover:animate-none"
        >
          <IconSearch className="stroke-gray-200" />
        </button>
        <button
          className="border-1 inline-flex h-9 w-9
            animate-pop items-center justify-center 
            rounded-full bg-stone-800 p-0 font-semibold uppercase no-underline transition-all
            disabled:pointer-events-none
            disabled:bg-stone-700 hover:bg-stone-950 
            active:focus:scale-95 active:focus:animate-none
            active:hover:scale-95 active:hover:animate-none"
          disabled
        >
          <IconMessage className="stroke-gray-200" />
        </button>
        <button
          className="border-1 inline-flex h-9 w-9
            animate-pop items-center justify-center 
            rounded-full bg-stone-800 p-0 font-semibold uppercase no-underline transition-all
            disabled:pointer-events-none
            disabled:bg-stone-700 hover:bg-stone-950 
            active:focus:scale-95 active:focus:animate-none
            active:hover:scale-95 active:hover:animate-none"
          disabled
        >
          <IconBell className="stroke-gray-200" />
        </button>

        <Link
          href={"/erp/settings"}
          className="border-1 inline-flex h-9 w-9
            animate-pop items-center justify-center 
            rounded-full bg-stone-800 p-0 font-semibold uppercase no-underline transition-all
            disabled:pointer-events-none
            disabled:bg-stone-700 hover:bg-stone-950 
            active:focus:scale-95 active:focus:animate-none
            active:hover:scale-95 active:hover:animate-none"
        >
          <IconSettings className="stroke-gray-200" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
