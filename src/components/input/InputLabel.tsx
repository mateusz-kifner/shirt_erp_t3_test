import { useClipboard } from "@mantine/hooks";
import { IconCopy } from "@tabler/icons-react";
import React, { type ReactNode } from "react";
import { showNotification } from "~/lib/notifications";

interface InputLabelProps {
  label?: ReactNode;
  copyValue?: string;
}

function InputLabel(props: InputLabelProps) {
  const { label, copyValue } = props;
  const clipboard = useClipboard();
  return label ? (
    <label
      className="
        text-sm
        dark:text-stone-300"
    >
      <div className="flex items-center py-1">
        {label}{" "}
        {copyValue && copyValue.length > 0 && (
          <button
            className="border-1 inline-flex animate-pop items-center justify-center
          gap-3 rounded-md  stroke-gray-200 p-1 font-semibold uppercase
        text-gray-200 no-underline transition-all  
        hover:bg-black hover:bg-opacity-30
          active:hover:scale-95 active:hover:animate-none 
          active:focus:scale-95 active:focus:animate-none"
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
          </button>
        )}
      </div>
    </label>
  ) : null;
}

export default InputLabel;
