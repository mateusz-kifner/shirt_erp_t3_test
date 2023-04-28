import { useClipboard } from "@mantine/hooks";
import { useEffect, useState, type CSSProperties, useRef, useId } from "react";
import preventLeave from "../../utils/preventLeave";
import { IconCopy } from "@tabler/icons-react";
import type EditableInput from "~/types/EditableInput";
import { handleBlurForInnerElements } from "../../utils/handleBlurForInnerElements";
import { showNotification } from "~/lib/notifications";
import DisplayCell from "../basic/DisplayCell";

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
          dark:text-stone-300"
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
      <DisplayCell
        leftSection={leftSection}
        rightSection={rightSection}
        focus={focus}
      >
        <textarea
          id={"textarea_" + uuid}
          required={required}
          readOnly={disabled}
          ref={textAreaRef}
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
          ${className ?? ""}`}
          style={{
            // paddingBottom:
            //   (textAreaRef.current?.scrollHeight ?? 0) <= 44
            //     ? undefined
            //     : "0.5rem",
            ...style,
          }}
          value={text}
          onFocus={() => !disabled && setFocus(true)}
          onClick={() => !disabled && setFocus(true)}
          onChange={onChangeTextarea}
          onKeyDown={onKeyDownTextarea}
          onInput={(e) => setTextAreaHeight(e.target as HTMLTextAreaElement)}
          {...moreProps}
        />
      </DisplayCell>
    </div>
  );
};

export default EditableText;
