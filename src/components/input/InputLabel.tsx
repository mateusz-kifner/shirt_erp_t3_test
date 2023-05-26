import { type LabelHTMLAttributes, type ReactNode } from "react";

import { useClipboard } from "@mantine/hooks";
import { IconCopy } from "@tabler/icons-react";

import { showNotification } from "~/lib/notifications";
import ActionButton from "../basic/ActionButton";

//  LabelHTMLAttributes {
//   form?: string | undefined;
//   htmlFor?: string | undefined;
// }

interface InputLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  label?: ReactNode;
  copyValue?: string;
}

function InputLabel(props: InputLabelProps) {
  const { label, copyValue, ...moreProps } = props;
  const clipboard = useClipboard();
  return label ? (
    <label
      className="
        text-sm
        dark:text-stone-300"
      {...moreProps}
    >
      <div className="flex h-8 items-center py-1">
        {label}{" "}
        {copyValue && copyValue.length > 0 && (
          <ActionButton
            className="h-fit w-fit p-0.5"
            onClick={() => {
              clipboard.copy(copyValue);
              showNotification({
                title: "Skopiowano do schowka",
                message: copyValue,
                icon: <IconCopy />,
              });
            }}
            tabIndex={-1}
          >
            <IconCopy size={16} />
          </ActionButton>
        )}
      </div>
    </label>
  ) : null;
}

export default InputLabel;
