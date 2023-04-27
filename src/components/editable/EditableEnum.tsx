import { useClipboard } from "@mantine/hooks";
import { Fragment, useEffect, useId, useState } from "react";
import {
  IconArrowsMoveVertical,
  IconCheck,
  IconCopy,
} from "@tabler/icons-react";
import type EditableInput from "../../types/EditableInput";
import useTranslation from "~/hooks/useTranslation";
import { showNotification } from "~/lib/notifications";
import { Listbox, Transition } from "@headlessui/react";

interface EditableEnumProps extends EditableInput<string> {
  enum_data: string[];
}

const EditableEnum = ({
  label,
  value,
  initialValue,
  onSubmit,
  disabled,
  required,
  enum_data,
}: EditableEnumProps) => {
  const uuid = useId();
  const [data, setData] = useState(value ?? initialValue ?? "");
  const clipboard = useClipboard();
  const t = useTranslation();

  useEffect(() => {
    if (value) {
      setData(value);
      // setPrevData(value)
    }
  }, [value]);

  const onChangeData = (value: string) => {
    setData(value);
    onSubmit && onSubmit(value);
  };

  return (
    <div>
      <label
        htmlFor={"textarea_" + uuid}
        className="
    text-sm
    dark:text-gray-400"
      >
        {label && label.length > 0 ? (
          <>
            {label}
            <button
              className="border-1 inline-flex animate-pop items-center justify-center
            gap-3 rounded-md  stroke-gray-200 p-1 font-semibold uppercase
          text-gray-200 no-underline transition-all  
          hover:bg-black hover:bg-opacity-30
            active:focus:scale-95 active:focus:animate-none 
            active:hover:scale-95 active:hover:animate-none"
              onClick={() => {
                clipboard.copy(value);
                showNotification({
                  title: "Skopiowano do schowka",
                  message: value,
                  icon: <IconCopy />,
                });
              }}
              tabIndex={-1}
            >
              <IconCopy size={16} />
            </button>
          </>
        ) : undefined}
      </label>
      {/* <div style={{ position: "relative" }}> */}
      <div className="flex-grow">
        <Listbox value={data} onChange={onChangeData}>
          <div className="relative">
            <Listbox.Button
              className="data-disabled:text-gray-500
          dark:data-disabled:text-gray-500
          data-disabled:bg-transparent 
          dark:data-disabled:bg-transparent
          h-11
          max-h-screen
          w-full
          resize-none
          gap-2
          overflow-hidden 
          whitespace-pre-line
          break-words 
          rounded
          border
          border-solid
          border-gray-400
          bg-white 
          p-2
          text-left
          text-sm
          leading-normal
          outline-none
          read-only:bg-transparent 
          read-only:outline-none 
          focus:border-sky-600
          dark:border-stone-600
          dark:bg-stone-800
          dark:outline-none
          dark:read-only:bg-transparent 
          dark:read-only:outline-none 
          dark:focus:border-sky-600 "
            >
              <span className="block truncate">{data}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <IconArrowsMoveVertical
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-stone-300 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-stone-700 sm:text-sm">
                {enum_data.map((val, index) => (
                  <Listbox.Option
                    key={uuid + index}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active
                          ? "bg-stone-500 text-stone-900 dark:bg-stone-500 dark:text-stone-200"
                          : "bg-stone-300 text-stone-900 dark:bg-stone-700 dark:text-stone-200"
                      }`
                    }
                    value={val}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {val}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 ">
                            <IconCheck className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    </div>
  );
};

export default EditableEnum;
