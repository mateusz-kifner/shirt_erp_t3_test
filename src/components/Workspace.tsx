import { Children, useId, useState, type ReactNode } from "react";

import { useElementSize } from "@mantine/hooks";
import { type Icon as TablerIcon } from "@tabler/icons-react";
import { useRouter } from "next/router";

import ErrorBoundary from "~/components/ErrorBoundary";
import MultiTabs from "~/components/MultiTabs";
import { useUserContext } from "~/context/userContext";
import useRQCache from "~/hooks/useRQCache";
import useTranslation from "~/hooks/useTranslation";

// import MultiTabs from "./MultiTabs"

interface WorkspaceProps {
  cacheKey: string;
  childrenWrapperProps?: any[];
  childrenLabels?: string[];
  childrenIcons?: TablerIcon[];
  children?: ReactNode;
  defaultActive?: number;
  defaultPinned?: number[];
  leftMenuSection?: ReactNode;
  rightMenuSection?: ReactNode;
}

const Workspace = ({
  cacheKey,
  children,
  childrenLabels = [],
  childrenIcons = [],
  childrenWrapperProps = [null],
  defaultActive = 1,
  defaultPinned = [0],
  leftMenuSection,
  rightMenuSection,
}: WorkspaceProps) => {
  // const { isSmall, hasTouch } = useAuthContext()
  // const isMobile = hasTouch || isSmall
  // const [menuPosition, setMenuPosition] = useState<[number, number]>([0, 0])
  // const [menuOpened, setMenuOpen] = useState<boolean>(false)
  const [pinned, setPinned] = useState<number[]>([]);
  const [active, setActive] = useState<number | undefined>();
  const uuid = useId();
  const router = useRouter();
  const idStr = Array.isArray(router.query.id)
    ? router.query.id[0]
    : router.query.id;
  const id = idStr ? parseInt(idStr) : -1;

  const t = useTranslation();
  const { navigationCollapsed, toggleNavigationCollapsed, debug } =
    useUserContext();
  const { ref, width } = useElementSize();

  const [tabStateArray, setTabStateArray] = useRQCache<
    { id: number; active?: number; pinned: number[]; lastUpdate: number }[]
  >("pinned" + cacheKey, []);

  // const tabState = tabStateArray.filter((value) => value.id === id)[0];

  // if (tabState === undefined) {
  //   if (tabStateArray.length > 9) {
  //     let oldestId = -1;
  //     let oldestTime = Number.MAX_SAFE_INTEGER;
  //     for (const tabState of tabStateArray) {
  //       if (tabState.lastUpdate < oldestTime) {
  //         oldestTime = tabState.lastUpdate;
  //         oldestId = tabState.id;
  //       }
  //     }
  //     setTabStateArray([
  //       ...tabStateArray.filter((val) => val.id !== oldestId),
  //       { id, active: 1, pinned: [0], lastUpdate: Date.now() },
  //     ]);
  //   } else {
  //     setTabStateArray([
  //       ...tabStateArray,
  //       { id, active: 1, pinned: [0], lastUpdate: Date.now() },
  //     ]);
  //   }
  // }

  // if (tabState !== undefined) {
  //   const index = tabStateArray.indexOf(tabState);
  //   if (index !== -1) {
  //     const newTabStateArray = [...tabStateArray];
  //     if (newTabStateArray[index]!.pinned.includes(pinned)) {
  //       newTabStateArray[index]!.pinned.filter((val) => val !== pinned);
  //     } else {
  //       newTabStateArray[index]!.pinned.push(pinned);
  //     }
  //     newTabStateArray[index]!.lastUpdate = Date.now();
  //   }
  // }

  const togglePin = (pinned: number) =>
    setPinned((pinnedArray) => {
      if (pinnedArray.includes(pinned)) {
        return pinnedArray.filter((val) => val !== pinned);
      } else {
        return [...pinnedArray, pinned];
      }
    });

  const child_array = Children.toArray(children);

  const activeTabs = [...pinned];
  if (active !== undefined && !activeTabs.includes(active))
    activeTabs.push(active);

  // useEffect(() => {
  //   if (!childrenLabels) return
  //   let new_arr = [...pinned]
  //   if (active && !pinned.includes(active)) new_arr.push(active)
  //   let index_arr = new_arr.map((val) => childrenLabels?.indexOf(val))
  //   setQuery(router, {
  //     show_views: index_arr.map((val) => val.toString()),
  //   })
  // }, [pinned, active])

  // const openMenu = (e: MouseEvent<any, any>) => {
  //   setMenuPosition(isMobile ? [width / 2, 60] : [e.pageX, e.pageY])
  //   setMenuOpen(true)
  // }

  return (
    <div
      className="flex flex-grow flex-nowrap items-start gap-4 overflow-hidden p-1 sm:p-4"
      ref={ref}
    >
      <MultiTabs
        active={active}
        onActive={setActive}
        pinned={pinned}
        onPin={togglePin}
        childrenLabels={childrenLabels}
        childrenIcons={childrenIcons}
        availableSpace={width}
        rightSection={rightMenuSection}
        leftSection={leftMenuSection}
      />
      {children &&
        activeTabs.map((childIndex, index) => (
          <div
            key={uuid + index}
            className="relative flex w-[420px] min-w-[420px] flex-col rounded bg-white p-4 shadow-lg dark:bg-stone-800"
            {...(childrenWrapperProps &&
            childrenWrapperProps[childIndex] !== undefined
              ? childrenWrapperProps[childIndex]
              : { style: { flexGrow: 1 } })}
          >
            <ErrorBoundary
              fallback={
                <h1>
                  Tab {childrenLabels[childIndex] ?? "[unknown]"} rendered as
                  {childIndex} element crashed
                </h1>
              }
            >
              {child_array[childIndex]}
            </ErrorBoundary>
          </div>
        ))}
    </div>
  );
};

export default Workspace;
