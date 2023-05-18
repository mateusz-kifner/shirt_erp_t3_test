import {
  useClickOutside,
  useClipboard,
  useId,
  useMediaQuery,
} from "@mantine/hooks";
import { IconCalendar, IconClock, IconCopy } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import DisplayCell from "~/components/basic/DisplayCell";
import { showNotification } from "~/lib/notifications";
import type EditableInput from "~/types/EditableInput";
import preventLeave from "~/utils/preventLeave";

// TODO: make it editable

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface EditableDateTimeProps extends EditableInput<string> {}

const EditableDateTime = (props: EditableDateTimeProps) => {
  const { label, value, initialValue, onSubmit, disabled, required } = props;
  // let new_props = { ...props }
  // delete new_label
  // delete new_value
  const uuid = useId();
  const [date, setDate] = useState<Date | null>(
    value ? new Date(value) : initialValue ? new Date(initialValue) : null
  );
  const [prevDate, setPrevDate] = useState<Date | null>(date);
  const [lock, setLock] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const clipboard = useClipboard();
  const dateRef = useRef<HTMLButtonElement>(null);
  const isMobile = useMediaQuery(
    "only screen and (hover: none) and (pointer: coarse)"
  );
  const activate = () => {
    setActive(true);
  };
  const deactivate = () => {
    !lock && setActive(false);
  };

  const ref = useClickOutside(deactivate);

  useEffect(() => {
    if (active) {
      window.addEventListener("beforeunload", preventLeave);
      // dateRef.current &&(dateRef.current.selectionStart = dateRef.current.value.length)
      // dateRef.current && dateRef.current.focus()
    } else {
      if (date !== prevDate) {
        onSubmit && onSubmit(date?.toISOString() ?? null);
        setPrevDate(date);
      }
      window.removeEventListener("beforeunload", preventLeave);
    }
    // eslint-disable-next-line
  }, [active]);

  useEffect(() => {
    return () => {
      window.removeEventListener("beforeunload", preventLeave);
    };
  }, []);

  useEffect(() => {
    const new_value = value ? new Date(value) : new Date();
    setDate(new_value);
    setPrevDate(new_value);
  }, [value]);

  const onKeyDownDate = (e: React.KeyboardEvent<any>) => {
    if (active) {
      if (e.code == "Enter") {
        deactivate();
        e.preventDefault();
      }
      if (e.code == "Escape") {
        setDate(prevDate);
        deactivate();
        e.preventDefault();
      }
    }
  };

  return (
    <div
      className="flex-grow"
      // onClick={() => !disabled && setFocus(true)}
      // onFocus={() => !disabled && setFocus(true)}
      // onBlur={handleBlurForInnerElements(() => setFocus(false))}
    >
      {label && (
        <label
          htmlFor={"textarea_" + uuid}
          className="
          text-sm
          dark:text-stone-300"
        >
          <div className="flex items-center py-1">
            {label}{" "}
            {!!date && (
              <button
                className="border-1 inline-flex animate-pop items-center justify-center
            gap-3 rounded-md  stroke-gray-200 p-1 font-semibold uppercase
          text-gray-200 no-underline transition-all  
          hover:bg-black hover:bg-opacity-30
            active:hover:scale-95 active:hover:animate-none 
            active:focus:scale-95 active:focus:animate-none"
                onClick={() => {
                  const dateString = dayjs(date).format("L LT").toString();
                  clipboard.copy(dateString);
                  showNotification({
                    title: "Skopiowano do schowka",
                    message: dateString,
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
      )}
      {active ? (
        <div className="flex flex-grow gap-2">{/* TODO */}</div>
      ) : (
        <DisplayCell>
          <IconCalendar color="#adb5bd" size={18} />
          {date ? dayjs(date).format("L").toString() : "⸺"}
          <IconClock color="#adb5bd" size={18} style={{ marginLeft: 16 }} />
          {date ? dayjs(date).format("LT").toString() : "⸺"}
        </DisplayCell>
      )}
    </div>
  );
};

export default EditableDateTime;
