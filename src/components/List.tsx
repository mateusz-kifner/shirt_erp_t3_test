import { useId } from "react";

interface ListProps<T = any> {
  ListItem: React.ElementType;
  onChange?: (val: T) => void;
  listItemProps?: { linkTo: (val: T) => string } | any;
  selectedId?: number | null;
  data?: T[];
}

function List<T>(props: ListProps<T>) {
  const {
    ListItem,
    onChange = (val: T) => {
      /* no-op */
    },
    listItemProps = {},
    selectedId,
    data = [],
  } = props;
  const uuid = useId();

  return (
    <div className="flex flex-col">
      {data &&
        data.map((val: any, index: number) => (
          <div key={uuid + "_" + index}>
            <ListItem
              value={val}
              onChange={onChange}
              {...listItemProps}
              active={val.id === selectedId}
            />
          </div>
        ))}
    </div>
  );
}

export default List;
