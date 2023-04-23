import { ComponentType, CSSProperties } from "react";
import NotImplemented from "../NotImplemented";
import { useId } from "@mantine/hooks";

// Editable imports
import EditableText from "./EditableText";
import EditableRichText from "./EditableRichText";
import EditableDateTime from "./EditableDateTime";
import EditableDate from "./EditableDate";
import EditableBool from "./EditableBool";
import EditableColor from "./EditableColor";
import EditableEnum from "./EditableEnum";
import EditableJSON from "./EditableJSON";
import EditableApiIconId from "./EditableApiIconId";
import EditableAddress from "./EditableAddress";
import EditableFiles from "./EditableFiles";
import EditableArray from "./EditableArray";
import EditableApiEntry from "./EditableApiEntry";
import EditableApiEntryId from "./EditableApiEntryId";
import EditableTable from "./EditableTable";
import EditableDesign from "./EditableDesign";
import EditableTableView from "./EditableTableView";

import {
  IconBuildingCommunity,
  IconCalendar,
  IconCash,
  IconNumbers,
} from "@tabler/icons-react";
import { useUserContext } from "~/context/userContext";
import apiListItems from "./apiListItems";
// import { makeDefaultListItem } from "../DefaultListItem"

export type editableFields = {
  [key: string]: {
    component: ComponentType<any>;
    props: { [index: string]: any };
    propsTransform?: (props: { [index: string]: any }) => {
      [index: string]: any;
    };
  };
};

const editableFields: editableFields = {
  title: {
    component: EditableText,
    props: { style: { fontSize: "1.4em" } },
  },
  text: { component: EditableText, props: {} },
  richtext: { component: EditableRichText, props: {} },
  number: {
    component: EditableText,
    props: { leftSection: <IconNumbers size={18} /> },
  },
  money: {
    component: EditableText,
    props: {
      rightSection: <span>PLN</span>,
      leftSection: <IconCash size={18} />,
    },
  },
  datetime: { component: EditableDateTime, props: {} },
  date: {
    component: EditableDate,
    props: { leftSection: <IconCalendar size={18} /> },
  },
  boolean: { component: EditableBool, props: {} },
  color: { component: EditableColor, props: {} },
  enum: { component: EditableEnum, props: {} },
  json: { component: EditableJSON, props: {} },
  iconId: { component: EditableApiIconId, props: {} },
  address: {
    component: EditableAddress,
    props: { leftSection: <IconBuildingCommunity size={18} /> },
  },
  file: { component: EditableFiles, props: { maxCount: 1 } },
  image: { component: EditableFiles, props: { maxCount: 1 } },
  files: { component: EditableFiles, props: {} },
  table: { component: EditableTable, props: {} },
  tableView: { component: EditableTableView, props: {} },
  design: { component: EditableDesign, props: {} },
  designView: { component: EditableDesign, props: {} },
  apiEntry: {
    component: EditableApiEntry,
    props: {},
    propsTransform: (props) => {
      const newProps = { ...props };
      if (props.entryName in apiListItems) {
        // newProps["Element"] = apiListItems[props.entryName]?.ListItem
        // newProps["copyProvider"] = apiListItems[props.entryName].copyProvider
      } else {
        // newProps["Element"] = makeDefaultListItem("name")
      }
      return newProps;
    },
  },
  apiEntryId: {
    component: EditableApiEntryId,
    props: {},
    propsTransform: (props) => {
      const newProps = { ...props };
      if (props.entryName in apiListItems) {
        // newProps["Element"] = apiListItems[props.entryName].ListItem
        // newProps["copyProvider"] = apiListItems[props.entryName].copyProvider
      } else {
        // newProps["Element"] = makeDefaultListItem("name")
      }
      return newProps;
    },
  },
  group: {
    component: EditableWrapper,
    props: {
      // sx: [
      //   SxBorder,
      //   SxRadius,
      //   (theme: MantineTheme) => ({
      //     padding: theme.spacing.xs,
      //     display: "flex",
      //     gap: theme.spacing.xs,
      //     "&>*": { flex: "1" },
      //   }),
      // ],
    },
    propsTransform: (props) => {
      const newProps = {
        ...props,
        data: (props.value as object) ?? {},
        // onSubmit: (key: string, value: any, data: any) => {
        //   console.log("group submit", key, value, data);
        //   props.onSubmit({ ...data, [key]: value });
        // },
      };

      return newProps;
    },
  },
  array: {
    component: EditableArray,
    props: {},
    propsTransform: (props) => {
      const newProps = {
        ...props,
        Element: Field,
        elementProps: {
          ...props,
          type: props.arrayType as string,
        },
      };
      return newProps;
    },
  },
};

function Field(props: any) {
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  let newProps = { ...editableFields[props.type].props, ...props };
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (editableFields[props.type].propsTransform) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    newProps = editableFields[props.type]?.propsTransform?.(newProps);
  }
  //@ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const Component = editableFields[props.type].component;
  return <Component {...newProps} />;
}

function EditableWrapper(
  props: EditableProps & { style?: CSSProperties; className: string }
) {
  return (
    <div style={props.style} className={props.className}>
      <Editable {...props} />
    </div>
  );
}

interface EditableProps {
  template: { [key: string]: any };
  data: { [key: string]: any };
  onSubmit?: (key: string, value: any, data: any) => void;
  disabled?: boolean;
}

function Editable({ template, data, onSubmit, disabled }: EditableProps) {
  const { debug } = useUserContext();
  const uuid = useId();
  return (
    <>
      {Object.keys(template).map((key) => {
        if (debug && key === "id")
          return <span key={uuid + key}>ID: {data[key]}</span>;

        const onSubmitEntry = (value: any) => {
          onSubmit?.(key, value, data);
          onSubmit &&
            template[key]?.onSubmitTrigger &&
            template[key].onSubmitTrigger(
              key,
              value,
              data,
              (key: string, value: any, data: any) => {
                onSubmit(key, value, data);
              }
            );
        };

        if (debug && !(key in template))
          return (
            <NotImplemented
              message={"Key doesn't have template"}
              object_key={key}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              value={data[key]}
              key={uuid + key}
            />
          );

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const component_type = template[key].type;
        if (component_type in editableFields) {
          return (
            <Field
              disabled={disabled}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              value={data[key]}
              object_key={key}
              {...template[key]}
              onSubmit={onSubmitEntry}
              key={uuid + key}
            />
          );
        }
        if (debug) {
          return (
            <NotImplemented
              message={"Key has unknown type"}
              object_key={key}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              value={data[key]}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              template={template[key]}
              key={uuid + key}
            />
          );
        }
        return null;
      })}
    </>
  );
}

export default Editable;
