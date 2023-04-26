import { useClipboard, useElementSize } from "@mantine/hooks";
import { useEffect, useState, type CSSProperties, useRef, useId } from "react";
import preventLeave from "../../utils/preventLeave";
import { IconCopy } from "@tabler/icons-react";
import type EditableInput from "~/types/EditableInput";
import { handleBlurForInnerElements } from "../../utils/handleBlurForInnerElements";
import { showNotification } from "~/lib/notifications";

interface EditableTextProps extends EditableInput<string> {
  maxLength?: number;
  style?: CSSProperties;
}

const EditableText = (props: EditableTextProps) => {
  const {
    label,
    value,
    initialValue,
    onSubmit,
    disabled,
    required,
    maxLength,
    style,
    className,
    leftSection,
    rightSection,
    ...moreProps
  } = props;
  const uuid = useId();
  const [text, setText] = useState<string>(value ?? initialValue ?? "");
  const [focus, setFocus] = useState<boolean>(false);
  const clipboard = useClipboard();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { ref: leftSectionRef, width: leftSectionWidth } = useElementSize();
  const { ref: rightSectionRef, width: rightSectionWidth } = useElementSize();
  // const t = useTranslation();
  useEffect(() => {
    if (focus) {
      window.addEventListener("beforeunload", preventLeave);
      textAreaRef.current &&
        (textAreaRef.current.selectionStart = textAreaRef.current.value.length);
      textAreaRef.current && textAreaRef.current.focus();
    } else {
      if (text !== (value ?? "")) {
        onSubmit?.(text);
      }
      window.removeEventListener("beforeunload", preventLeave);
    }
    // eslint-disable-next-line
  }, [focus]);

  useEffect(() => {
    return () => {
      if (text !== (value ?? "")) {
        onSubmit?.(text);
      }
      window.removeEventListener("beforeunload", preventLeave);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const new_value = value ?? "";
    setText(new_value);
  }, [value]);

  const onChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!(maxLength && e.target.value.length > maxLength)) {
      setText(e.target.value);
    }
  };

  const onKeyDownTextarea = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (focus) {
      if (e.code === "Enter" && !e.shiftKey) {
        e.preventDefault();
        (e.target as HTMLTextAreaElement).blur();
        setFocus(false);
      }
    }
  };

  const setTextAreaHeight = (target: HTMLTextAreaElement) => {
    target.style.height = "0";
    console.log(target.scrollHeight);
    target.style.height = `${Math.max(target.scrollHeight, 44)}px`;
  };

  return (
    <div
      className="flex-grow"
      onClick={() => !disabled && setFocus(true)}
      onFocus={() => !disabled && setFocus(true)}
      onBlur={handleBlurForInnerElements(() => setFocus(false))}
    >
      {label && (
        <label
          htmlFor={"textarea_" + uuid}
          className="
          text-sm
          dark:text-gray-400"
        >
          <div className="flex items-center py-1">
            {label}{" "}
            {text.length > 0 && (
              <button
                className="border-1 inline-flex animate-pop items-center justify-center
            gap-3 rounded-md  stroke-gray-200 p-1 font-semibold uppercase
          text-gray-200 no-underline transition-all  
          hover:bg-black hover:bg-opacity-30
            active:focus:scale-95 active:focus:animate-none 
            active:hover:scale-95 active:hover:animate-none"
                onClick={() => {
                  clipboard.copy(text);
                  showNotification({
                    title: "Skopiowano do schowka",
                    message: text,
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
      <div className="relative flex">
        <div
          className="absolute
          left-1
          top-1/2
          -translate-y-1/2
          [&>*]:stroke-gray-400
          [&>*]:dark:stroke-stone-600"
          ref={leftSectionRef}
        >
          {!!leftSection && leftSection}
        </div>
        <textarea
          id={"textarea_" + uuid}
          required={required}
          readOnly={disabled}
          ref={textAreaRef}
          className={`
          data-disabled:text-gray-500
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
          dark:focus:border-sky-600 
          ${className ?? ""}`}
          style={{
            paddingLeft: `calc(${leftSectionWidth}px + 0.5rem)`,
            paddingRight: `calc(${rightSectionWidth}px + 0.5rem)`,
            paddingTop:
              (textAreaRef.current?.scrollHeight ?? 0) < 44
                ? "0.625rem"
                : "0.5rem",
            ...style,
          }}
          {...moreProps}
          value={text}
          onFocus={() => window.addEventListener("beforeunload", preventLeave)}
          onBlur={() =>
            window.removeEventListener("beforeunload", preventLeave)
          }
          onChange={onChangeTextarea}
          onKeyDown={onKeyDownTextarea}
          onInput={(e) => setTextAreaHeight(e.target as HTMLTextAreaElement)}
        />
        <div
          className="absolute
          right-1
          top-1/2
          -translate-y-1/2
          [&>*]:stroke-gray-400
          [&>*]:dark:stroke-stone-600"
          ref={rightSectionRef}
        >
          {!!rightSection && rightSection}
        </div>
      </div>
    </div>
  );
};

export default EditableText;
