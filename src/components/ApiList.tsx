import { type ReactNode, useEffect, useState } from "react";
import {
  IconPlus,
  IconRefresh,
  IconSearch,
  IconSortAscending,
  IconSortDescending,
} from "@tabler/icons-react";

// import { useGesture } from "@use-gesture/react"
import { useDebouncedValue, useToggle } from "@mantine/hooks";
import ActionButton from "./basic/ActionButton";
import List from "./List";
import { api } from "~/utils/api";

// import List from "../List"

interface ApiListProps<T = any> {
  entryName: string;
  ListItem: React.ElementType;
  label?: string | ReactNode;
  onChange?: (val: T) => void;
  onRefresh?: () => void;
  listItemProps?: { linkTo: (val: T) => string } | any;
  selectedId?: number | null;
  filterKeys?: string[];
  exclude?: { [key: string]: string };
  onAddElement?: () => void;
  defaultSearch?: string;
  showAddButton?: boolean;
  buttonSection?: ReactNode;
}

const ApiList = <T,>(props: ApiListProps<T>) => {
  const {
    entryName,
    ListItem,
    label = "",
    onChange = (val: T) => {
      /* no-op */
    },
    onRefresh = () => {
      /* no-op */
    },
    listItemProps = {},
    selectedId,
    filterKeys,
    exclude,
    onAddElement,
    defaultSearch,
    showAddButton,
    buttonSection,
  } = props;
  // const [{ x }, api] = useSpring(() => ({ x: 0 }))
  const [sortOrder, toggleSortOrder] = useToggle<"asc" | "desc">([
    "desc",
    "asc",
  ]);
  const [query, setQuery] = useState<string | undefined>(defaultSearch);
  const [debouncedQuery] = useDebouncedValue(query, 200);
  const [page, setPage] = useState<number>(1);
  const { data } = api[entryName as "client"].getAll.useQuery({
    sort: sortOrder,
  });

  console.log(data);
  // const { data, meta, refetch, status } = useStrapiList<T[]>(
  //   entryName,
  //   page,
  //   filterKeys,
  //   debouncedQuery,
  //   sortOrder,
  //   { exclude }
  // )

  // const theme = useMantineTheme()
  // const [y, setY] = useState(0)
  // const bind = useGesture({
  //   onDrag: (state) => {
  //     setY(state.movement[1])
  //   },
  //   onDragEnd: (state) => {
  //     if (state.movement[1] > 50) {
  //       refetch()
  //     }

  //     setTimeout(() => {
  //       setY(0)
  //     })
  //   },
  // })
  // const cont = useInRouterContext()
  // const params = router.query
  // const location = useLocation()
  // console.log(params, location, cont)

  // useEffect(() => {
  //   console.log(id, location, cont)
  //   // if (typeof params?.id === "string" && parseInt(params.id) > 0) setId(parseInt(params.id))
  // }, [id, location])

  useEffect(() => {
    // refetch()
  }, [selectedId]);

  const onChangeWithBlocking = (val: T) => {
    // if (y < 10) {
    onChange(val);
    // }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <div className="flex ">
          <h2>{label}</h2>
          <div className="flex ">
            {!!buttonSection && buttonSection}
            <ActionButton
              onClick={() => {
                // refetch()
                onRefresh?.();
              }}
            >
              <IconRefresh />
            </ActionButton>
            {showAddButton && (
              <ActionButton onClick={onAddElement}>
                <IconPlus />
              </ActionButton>
            )}
          </div>
        </div>
        <div className="flex ">
          <div className="flex ">
            <ActionButton onClick={() => toggleSortOrder()}>
              {sortOrder === "asc" ? (
                <IconSortAscending />
              ) : (
                <IconSortDescending />
              )}
            </ActionButton>
          </div>
          <input
            type="text"
            defaultValue={defaultSearch}
            onChange={(value) => setQuery(value.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <div
        // style={{
        //   height: y > 100 ? 100 : y,
        //   overflow: "hidden",
        //   position: "relative",
        // }}
        >
          {/* <Loader
            style={{
              position: "absolute",
              left: "50%",
              transform: "translate(-50%,0)",
            }}
          /> */}
        </div>
        <List<T>
          data={data as T[]}
          ListItem={ListItem}
          onChange={onChangeWithBlocking}
          selectedId={selectedId}
          listItemProps={listItemProps}
        />
      </div>
      <nav className="flex items-center justify-center space-x-2">
        <a
          className="inline-flex items-center gap-2 rounded-md p-4 text-gray-500 hover:text-blue-600"
          href="#"
        >
          <span aria-hidden="true">«</span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="inline-flex h-10 w-10 items-center rounded-full bg-blue-500 p-4 text-sm font-medium text-white"
          href="#"
          aria-current="page"
        >
          1
        </a>
        <a
          className="inline-flex h-10 w-10 items-center rounded-full p-4 text-sm font-medium text-gray-500 hover:text-blue-600"
          href="#"
        >
          2
        </a>
        <a
          className="inline-flex h-10 w-10 items-center rounded-full p-4 text-sm font-medium text-gray-500 hover:text-blue-600"
          href="#"
        >
          3
        </a>
        <a
          className="inline-flex items-center gap-2 rounded-md p-4 text-gray-500 hover:text-blue-600"
          href="#"
        >
          <span className="sr-only">Next</span>
          <span aria-hidden="true">»</span>
        </a>
      </nav>
    </div>
  );
};

export default ApiList;
