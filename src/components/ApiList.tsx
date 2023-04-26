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
          {/* <Autocomplete
            placeholder="Icon"
            radius="xl"
            // size="md"
            icon={<Search />}
            data={[]}
            style={{ flexGrow: 1 }}
            value={query}
            onChange={(value) => {
              setQuery(value)
              console.log(value)
            }}
          /> */}
          {/* <TextInput
            defaultValue={defaultSearch}
            onChange={(value) => setQuery(value.target.value)}
            radius="xl"
            icon={<IconSearch />}
            style={{ flexGrow: 1 }}
          /> */}
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
      <div
      // total={meta?.pagination?.pageCount ? meta.pagination.pageCount : 1}
      // defaultValue={meta?.pagination?.page ? meta.pagination.page : 1}
      // size="lg"
      // radius="xl"
      // position="center"
      // onChange={setPage}
      ></div>
    </div>
  );
};

export default ApiList;
