import {
  useClipboard,
  useDebouncedValue,
  useElementSize,
} from "@mantine/hooks";
import dayjs from "dayjs";
import Calendar from "react-calendar";
import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/router";
import useTranslation from "~/hooks/useTranslation";
import type EditableInput from "~/types/EditableInput";
import InputLabel from "../input/InputLabel";
import DisplayCell from "../basic/DisplayCell";
import Popover from "../basic/Popover";
import { handleBlurForInnerElements } from "~/utils/handleBlurForInnerElements";
import { handleFocusForInnerElements } from "~/utils/handleFocusForInnerElements";

type InputDateProps = EditableInput<string>;

const EditableDate = (props: InputDateProps) => {
  const {
    label,
    value,
    initialValue,
    onSubmit,
    disabled,
    required,
    leftSection,
    rightSection,
  } = props;
  const uuid = useId();
  const router = useRouter();
  const t = useTranslation();
  const [focus, setFocus] = useState<boolean>(false);
  const dateFormat = router.locale === "pl" ? "DD.MM.YYYY" : "YYYY-MM-DD";
  const [date, setDate] = useState<Date | null>(
    value ? new Date(value) : initialValue ? new Date(initialValue) : null
  );
  const [text, setText] = useState(dayjs(date).format("L").toString());

  const [debouncedText, cancel] = useDebouncedValue(text, 300);
  const inputDateRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<boolean>(false);

  // useEffect(() => {
  //   const newDate = dayjs(debouncedText, dateFormat, router.locale);
  //   if (newDate.toString() != "Invalid Date") {
  //     if (
  //       newDate.format("YYYY-MM-DD").toString() !=
  //       dayjs(value).format("YYYY-MM-DD").toString()
  //     ) {
  //       onSubmit?.(newDate.format("YYYY-MM-DD").toString());
  //     }
  //     setError(false);
  //   } else {
  //     setError(true);
  //   }
  // }, [debouncedText]);

  return (
    <div
      className="relative flex-grow"
      onFocus={handleFocusForInnerElements(() => setFocus(true))}
      onBlur={handleBlurForInnerElements(() => setFocus(false))}
      onClick={() => setFocus(true)}
    >
      <InputLabel
        label={label}
        copyValue={text}
        htmlFor={"inputDate_" + uuid}
      />
      <DisplayCell
        leftSection={leftSection}
        rightSection={
          <Popover trigger={rightSection}>
            <Calendar
              key={value}
              className={"z-[1000] w-96 rounded p-2"}
              onChange={(date) => {
                !!date && setDate(date as Date);
              }}
              value={date}
            />
          </Popover>
        }
        // focus={opened}
      >
        <input
          id={"inputDate_" + uuid}
          ref={inputDateRef}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          className={`
              data-disabled:text-gray-500
              dark:data-disabled:text-gray-500
              -mb-3
              -mt-2
              w-full
              resize-none
              overflow-hidden 
              whitespace-pre-line
              break-words
              bg-transparent
              pb-3
              pt-[0.625rem]
              text-sm
              outline-none
              focus-visible:border-transparent
              focus-visible:outline-none
              `}
          readOnly={disabled}
          required={required}
        />
      </DisplayCell>
    </div>
  );
};

export default EditableDate;
