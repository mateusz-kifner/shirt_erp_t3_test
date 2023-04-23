import { useClipboard, useHover } from "@mantine/hooks";
import { useEffect, useState, CSSProperties, useRef } from "react";
import preventLeave from "../../utils/preventLeave";
import { IconCopy } from "@tabler/icons-react";
import type EditableInput from "~/types/EditableInput";
import { handleBlurForInnerElements } from "../../utils/handleBlurForInnerElements";
import useTranslation from "~/hooks/useTranslation";
import Button from "../basic/Button";

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
    leftSection,
    rightSection,
  } = props;
  const [text, setText] = useState<string>(value ?? initialValue ?? "");
  const [focus, setFocus] = useState<boolean>(false);
  const clipboard = useClipboard();
  const textRef = useRef<HTMLTextAreaElement>(null);
  const { hovered, ref } = useHover();
  const t = useTranslation();
  useEffect(() => {
    if (focus) {
      window.addEventListener("beforeunload", preventLeave);
      textRef.current &&
        (textRef.current.selectionStart = textRef.current.value.length);
      textRef.current && textRef.current.focus();
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

  const onChangeTextarea = (e: React.ChangeEvent<any>) => {
    setText(e.target.value as string);
  };

  const onKeyDownTextarea = (e: React.KeyboardEvent<any>) => {
    if (focus) {
      if (e.code === "Enter" && !e.shiftKey) {
        e.preventDefault();
        setFocus(false);
      }
    }
  };

  return (
    <div
      style={style}
      ref={ref}
      onClick={() => !disabled && setFocus(true)}
      onFocus={() => !disabled && setFocus(true)}
      onBlur={handleBlurForInnerElements(() => setFocus(false))}
    >
      <span>
        {label && label.length > 0 ? (
          <>
            {label}
            {text.length > 0 && (
              <Button
                onClick={() => {
                  clipboard.copy(text);
                  // showNotification({
                  //   title: "Skopiowano do schowka",
                  //   message: text,
                  // });
                }}
                tabIndex={-1}
              >
                <IconCopy size={16} />
              </Button>
            )}
          </>
        ) : undefined}
      </span>

      <div style={{ position: "relative" }}>
        <textarea
          ref={textRef}
          value={text}
          onChange={onChangeTextarea}
          onKeyDown={onKeyDownTextarea}
          readOnly={!focus}
          maxLength={maxLength ?? 255}
        />
      </div>
    </div>
  );
};

export default EditableText;
