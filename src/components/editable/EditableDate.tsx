import { useId, useRef, useState } from "react";

import { useDebouncedValue } from "@mantine/hooks";
import { IconCalendar } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import Calendar from "react-calendar";

import ActionButton from "~/components/basic/ActionButton";
import DisplayCell from "~/components/basic/DisplayCell";
import Popover from "~/components/basic/Popover";
import InputLabel from "~/components/input/InputLabel";
import useTranslation from "~/hooks/useTranslation";
import { handleBlurForInnerElements } from "~/utils/handleBlurForInnerElements";
import { handleFocusForInnerElements } from "~/utils/handleFocusForInnerElements";

import type EditableInput from "~/types/EditableInput";

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
        copyValue={dayjs(date).format("L").toString()}
        htmlFor={"inputDate_" + uuid}
      />
      <DisplayCell
        className="px-2"
        leftSection={leftSection}
        rightSection={
          <Popover
            trigger={
              !!rightSection ? (
                rightSection
              ) : (
                <div className="-my-2 flex h-10 items-center justify-center">
                  <ActionButton className="border-none">
                    <IconCalendar />
                  </ActionButton>
                </div>
              )
            }
            contentProps={{ align: "end", sideOffset: 13 }}
          >
            <Calendar
              key={value}
              className={"z-[1000] w-96 rounded p-2"}
              onChange={(date) => {
                setText(
                  dayjs(date as Date)
                    .format("L")
                    .toString()
                );
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
          autoComplete="off"
        />
      </DisplayCell>
    </div>
  );
};

export default EditableDate;
