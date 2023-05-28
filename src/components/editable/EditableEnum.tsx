import InputLabel from "~/components/input/InputLabel";

import { type SelectProps as RadixSelectProps } from "@radix-ui/react-select";
import type EditableInput from "~/types/EditableInput";
import Select from "../basic/Select";

// EditableInput<T> {
//   label?: string;
//   value?: T;
//   initialValue?: T;
//   onSubmit?: (value: T | null) => void | boolean;
//   disabled?: boolean;
//   required?: boolean;
//   leftSection?: ReactNode;
//   rightSection?: ReactNode;
//   className?: string;
// }

//  RadixSelectProps {
//   children?: React.ReactNode;
//   value?: string;
//   defaultValue?: string;
//   onValueChange?(value: string): void;
//   open?: boolean;
//   defaultOpen?: boolean;
//   onOpenChange?(open: boolean): void;
//   dir?: Direction;
//   name?: string;
//   autoComplete?: string;
//   disabled?: boolean;
//   required?: boolean;
// }

interface EditableEnumProps extends EditableInput<string>, RadixSelectProps {
  enum_data: string[];
}

const EditableEnum = ({
  enum_data,
  label,
  value,
  initialValue,
  onSubmit,
  disabled,
  required,
  ...moreProps
}: EditableEnumProps) => (
  <div className="flex flex-grow gap-3">
    <InputLabel label={label} copyValue={value} required={required} />

    <Select
      data={enum_data}
      value={value}
      onValueChange={onSubmit}
      defaultValue={initialValue}
      disabled={disabled}
      {...moreProps}
    />
  </div>
);

export default EditableEnum;
