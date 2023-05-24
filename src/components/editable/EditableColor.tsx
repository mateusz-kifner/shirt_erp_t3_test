import { useEffect, useId, useMemo, useState, type CSSProperties } from "react";

import { useClickOutside } from "@mantine/hooks";

import colorNames from "~/utils/color-names.json";
import preventLeave from "~/utils/preventLeave";

import { IconColorPicker } from "@tabler/icons-react";
import tinycolor2 from "tinycolor2";
import type EditableInput from "~/types/EditableInput";
import InputColor from "../ColorPicker/InputColor";
import ActionButton from "../basic/ActionButton";
import DisplayCell from "../basic/DisplayCell";
import Popover from "../basic/Popover";
import InputLabel from "../input/InputLabel";

const colorNameKeys = Object.keys(colorNames);
const colorNamesRGB: [number, number, number][] = colorNameKeys.map((val) => [
  parseInt(val.substring(1, 3), 16),
  parseInt(val.substring(3, 5), 16),
  parseInt(val.substring(5, 7), 16),
]);

export const getColorNameFromHex = (hex: string) => {
  let name = "Nieznany";
  if (colorNames[hex as keyof typeof colorNames] !== undefined) {
    name = colorNames[hex as keyof typeof colorNames];
  } else {
    let min = 100000.0;
    let min_index = -1;

    const hex_r = parseInt(hex.substring(1, 3), 16);
    const hex_g = parseInt(hex.substring(3, 5), 16);
    const hex_b = parseInt(hex.substring(5, 7), 16);

    colorNamesRGB.forEach(([val_r, val_g, val_b], index) => {
      const weight = Math.sqrt(
        (val_r - hex_r) * (val_r - hex_r) +
          (val_g - hex_g) * (val_g - hex_g) +
          (val_b - hex_b) * (val_b - hex_b)
      );
      if (min > weight) {
        min = weight;
        min_index = index;
      }
    });

    if (min_index !== -1) {
      name =
        colorNames[colorNameKeys[min_index] as keyof typeof colorNames] + "*";
    }
  }
  return name;
};

interface EditableColorProps extends EditableInput<string> {
  style?: CSSProperties;
}

const EditableColor = (props: EditableColorProps) => {
  const {
    label,
    value,
    initialValue,
    onSubmit,
    disabled,
    required,
    style,
    leftSection,
    rightSection,
  } = props;
  const uuid = useId();
  const [color, setColor] = useState<string | null>(
    value !== undefined && value.length > 3
      ? value
      : initialValue !== undefined && initialValue.length > 3
      ? initialValue
      : ""
  );

  const [focus, setFocus] = useState<boolean>(false);
  const ref = useClickOutside(() => setFocus(false));

  const colorName = useMemo(
    () => (color !== null ? getColorNameFromHex(color) : ""),
    [color]
  );

  useEffect(() => {
    if (focus) {
      window.addEventListener("beforeunload", preventLeave);
    } else {
      if (color !== value) {
        if (!color || color === null) {
          onSubmit?.(null);
          setColor(null);
          return;
        }
        const colorObj = tinycolor2(color);
        if (colorObj.isValid()) {
          let hex = colorObj.toHex8String();
          if (hex.substring(7) === "ff") {
            hex = hex.substring(0, 7);
          }
          onSubmit?.(hex);
          setColor(hex);
        }
      }
      window.removeEventListener("beforeunload", preventLeave);
    }
    // eslint-disable-next-line
  }, [focus]);

  useEffect(() => {
    return () => {
      window.removeEventListener("beforeunload", preventLeave);
    };
  }, []);

  // useEffect(() => {
  //   if (value) {
  //     setColor(value);
  //   } else {
  //     setColor("");
  //   }
  // }, [value]);

  const onKeyDown = (e: React.KeyboardEvent<any>) => {
    if (focus) {
      if (e.code == "Enter" || e.code == "Escape") {
        setFocus(false);
        e.preventDefault();
      }
    }
  };

  return (
    <div
      className="flex-grow"
      onClick={() => !disabled && setFocus(true)}
      onFocus={() => !disabled && setFocus(true)}
    >
      <InputLabel
        label={label}
        copyValue={color ?? ""}
        htmlFor={"inputColor_" + uuid}
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
                    <IconColorPicker />
                  </ActionButton>
                </div>
              )
            }
            contentProps={{
              align: "end",
              sideOffset: 13,
              className:
                "pb-3  overflow-hidden rounded bg-stone-200 shadow data-[state=open]:animate-show dark:bg-stone-950",
            }}
          >
            <InputColor
              value={color ?? "#ff0000"}
              onChange={(color) => {
                setColor(color);
                console.log(color);
              }}
            />
          </Popover>
        }
        // focus={opened}
      >
        <input
          type="text"
          autoCorrect="false"
          spellCheck="false"
          id={"inputColor_" + uuid}
          ref={ref}
          value={color ?? ""}
          onChange={(e) => {
            setColor(e.target.value);
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

export default EditableColor;
