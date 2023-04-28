import { useHover } from "@mantine/hooks";
import { useEffect, useState } from "react";
import type EditableInput from "../../types/EditableInput";
import { Switch } from "@headlessui/react";

// FIXME: respect disabled state

interface EditableBoolProps extends EditableInput<boolean> {
  checkLabels: { checked: string; unchecked: string };
  stateLabels: { checked: string; unchecked: string };
  stateColors: { checked: string; unchecked: string };
}

const EditableBool = (props: EditableBoolProps) => {
  const {
    label,
    value,
    initialValue,
    onSubmit,
    disabled,
    required,
    checkLabels = { checked: undefined, unchecked: undefined },
    stateLabels = { checked: "Tak", unchecked: "Nie" },
    stateColors = { checked: "#2f9e44", unchecked: "#e03131" },
    rightSection,
    leftSection,
  } = props;
  const [bool, setBool] = useState<boolean>(value ?? initialValue ?? false);
  const [dirty, setDirty] = useState<boolean>(false);
  const { hovered, ref } = useHover();

  const active = hovered && !disabled;

  useEffect(() => {
    value !== undefined && setBool(value);
  }, [value]);

  useEffect(() => {
    if (dirty) {
      onSubmit?.(bool);
    }
    // eslint-disable-next-line
  }, [bool]);

  return (
    <div
      className="flex items-center"
      ref={ref}
      style={{ minHeight: "2em", marginBottom: "1em" }}
    >
      {!!leftSection && leftSection}
      <div>{label}</div>
      {active ? (
        <Switch
          onChange={(newBool) => {
            setDirty(true);
            setBool(newBool);
          }}
          checked={bool}
        />
      ) : (
        <div
          className={`relative rounded-md px-px py-[0.5em] font-bold after:absolute after:bottom-0 after:left-[10%] after:w-[80%] after:shadow ${
            bool ? "after:shadow-green-700" : "after:shadow-red-700"
          }`}
        >
          {bool ? stateLabels.checked : stateLabels.unchecked}
        </div>
      )}
      {!!rightSection && rightSection}
    </div>
  );
};

export default EditableBool;
