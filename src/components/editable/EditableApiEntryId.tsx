import { CSSProperties } from "react";
import EditableInput from "../../types/EditableInput";
import EditableApiEntry from "./EditableApiEntry";
import { api } from "~/utils/api";

interface EditableApiEntryIdProps extends EditableInput<number> {
  entryName: string;
  Element: React.ElementType;
  copyProvider?: (value: any | null) => string | undefined;
  style?: CSSProperties;
  withErase?: boolean;
}

const EditableApiEntryId = (props: EditableApiEntryIdProps) => {
  const {
    label,
    value,
    initialValue,
    onSubmit,
    disabled,
    required,
    Element,
    entryName,
    copyProvider = () => "",
    style,
    withErase = false,
  } = props;
  const { data } = api[entryName as "client"].getById.useQuery(
    value as number,
    { enabled: !!value }
  );
  // const { data } = useStrapi(entryName, value ? value : null)
  return (
    <EditableApiEntry
      {...props}
      onSubmit={(value) => onSubmit && onSubmit(value.id)}
      value={value ? data : null}
    />
  );
};

export default EditableApiEntryId;
