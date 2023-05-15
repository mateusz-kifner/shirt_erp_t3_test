import { useClickOutside, useClipboard, useHover } from "@mantine/hooks";
import { useEffect, useState, type CSSProperties, useMemo, useId } from "react";
import preventLeave from "../../utils/preventLeave";
import { IconCopy, IconX } from "@tabler/icons-react";
import type EditableInput from "../../types/EditableInput";
import colorNames from "~/utils/color-names.json";
// import { RGBColor, SketchPicker } from "react-color";
import { showNotification } from "~/lib/notifications";
import DisplayCell from "../basic/DisplayCell";
// import { Color } from "react-color";

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

function convertTo6DigitColorCode(color: string) {
  let hex = "";
  if (color.length === 3 && color[0] !== "#") {
    hex = "#" + color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
  }
  if (color.length === 4 && color[0] === "#") {
    hex = "#" + color[1] + color[1] + color[2] + color[2] + color[3] + color[3];
  }
  if (color.length === 6 && color[0] !== "#") {
    hex = "#" + color;
  }
  if (color.length === 7 && color[0] === "#") {
    hex = color;
  }
  return hex;
}

interface EditableColorProps extends EditableInput<string> {
  style?: CSSProperties;
}

const EditableColor = (props: EditableColorProps) => {
  const { label, value, initialValue, onSubmit, disabled, required, style } =
    props;
  const uuid = useId();
  const [color, setColor] = useState<RGBColor | undefined>();
  // value ?? initialValue ?? undefined
  const [focus, setFocus] = useState<boolean>(false);
  const ref = useClickOutside(() => setFocus(false));
  const clipboard = useClipboard();
  const { hovered, ref: refHover } = useHover();

  // const colorName = useMemo(
  //   () => (color !== null ? getColorNameFromHex(color) : ""),
  //   [color]
  // );

  // useEffect(() => {
  //   if (focus) {
  //     window.addEventListener("beforeunload", preventLeave);
  //   } else {
  //     if (color !== value) {
  //       if (!color || color === null) {
  //         onSubmit?.(null);
  //         setColor(null);
  //         return;
  //       }
  //       const hex = convertTo6DigitColorCode(color);
  //       if (!isNaN(parseInt(hex.substring(1), 16))) {
  //         onSubmit?.(hex);
  //         setColor(hex);
  //       }
  //     }
  //     window.removeEventListener("beforeunload", preventLeave);
  //   }
  //   // eslint-disable-next-line
  // }, [focus]);

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
      {label && (
        <label
          htmlFor={"textarea_" + uuid}
          className="
          text-sm
          dark:text-stone-300"
        >
          <div className="flex items-center py-1">
            {label}{" "}
            {/* {color && color.length > 0 && (
              <button
                className="border-1 inline-flex animate-pop items-center justify-center
            gap-3 rounded-md  stroke-gray-200 p-1 font-semibold uppercase
          text-gray-200 no-underline transition-all  
          hover:bg-black hover:bg-opacity-30
            active:hover:scale-95 active:hover:animate-none 
            active:focus:scale-95 active:focus:animate-none"
                onClick={() => {
                  clipboard.copy(color);
                  showNotification({
                    title: "Skopiowano do schowka",
                    message: color,
                    icon: <IconCopy />,
                  });
                }}
                tabIndex={-1}
              >
                <IconCopy size={16} />
              </button>
            )} */}
          </div>
        </label>
      )}
      <div ref={ref} style={{ position: "relative" }}>
        {focus ? (
          <SketchPicker
            color={color}
            onChange={(color) => {
              setColor(color.rgb);
            }}
            styles={{ default: {} }}
          />
        ) : (
          // <ColorInput
          //   swatchesPerRow={7}
          //   format="hex"
          //   swatches={[
          //     "#000e1c",
          //     "#ce102c",
          //     "#002a3a",
          //     "#194E90",
          //     "#7E7B50",
          //     "#007398",
          //     "#AC9768",
          //     "#3B8DDF",
          //     "#DB5204",
          //     "#294634",
          //     "#845D32",
          //     "#512B3A",
          //     "#5D3225",
          //     "#A8353A",
          //     "#343E48",
          //     "#B42574",
          //     "#303030",
          //     "#D0E1D9",
          //     "#018657",
          //     "#4F4A34",
          //     "#77BC21",
          //     "#D5BA8D",
          //     "#C3A0D8",
          //     "#F0E87D",
          //     "#FF681F",
          //     "#FFA401",
          //     "#F8DBE0",
          //     "#ECED6E",
          //     "#2F1A45",
          //     "#AF0061",
          //     "#E2B87E",
          //     "#97D5EA",
          //     "#FFCD0E",
          //     "#FF8041",
          //     "#00A6B6",
          //     "#F52837",
          //     "#888A8E",
          //     "#F54D80",
          //     "#42201F",
          //     "#F6DC6D",
          //     "#FFBFA1",
          //     "#FFB1C1",
          //     "#BADCE6",
          //     "#FFB81E",
          //     "#96E3C1",
          //     "#c19473",
          //     "#426D8C",
          //     "#555555",
          //     "#ffffff",
          //     "#25262b",
          //     "#868e96",
          //     "#fa5252",
          //     "#e64980",
          //     "#be4bdb",
          //     "#7950f2",
          //     "#4c6ef5",
          //     "#228be6",
          //     "#15aabf",
          //     "#12b886",
          //     "#40c057",
          //     "#82c91e",
          //     "#fab005",
          //     "#fd7e14",
          //   ]}
          //   value={color ?? "#ffffff"}
          //   onChange={(new_hex) => {
          //     setColor(new_hex);
          //   }}
          //   disabled={disabled}
          //   required={required}
          //   styles={{ input: { minHeight: 44 } }}
          //   withinPortal={false}
          //   onKeyDown={onKeyDown}
          //   withPicker={true}
          // />
          // <Text
          //   sx={[
          //     SxBorder,
          //     (theme) => ({
          //       width: "100%",

          //       fontSize: theme.fontSizes.sm,
          //       wordBreak: "break-word",
          //       whiteSpace: "pre-line",
          //       padding: "10px 16px",
          //       paddingRight: 32,
          //       minHeight: 44,
          //       lineHeight: 1.55,
          //       paddingLeft: 36,
          //       "&:before": {
          //         content: "''",
          //         position: "absolute",
          //         height: 24,
          //         width: 24,
          //         top: 9,
          //         left: 6,
          //         backgroundColor: color ?? undefined,
          //         borderRadius: "100%",
          //         border:
          //           theme.colorScheme === "dark"
          //             ? "1px solid #2C2E33"
          //             : "1px solid #ced4da",
          //       },
          //       border:
          //         focus || hovered
          //           ? theme.colorScheme === "dark"
          //             ? "1px solid #2C2E33"
          //             : "1px solid #ced4da"
          //           : "1px solid transparent",
          //       borderColor: colorName === "Nieznany" ? "#f00" : undefined,

          //       "&:focus": {
          //         borderColor: focus
          //           ? undefined
          //           : theme.colorScheme === "dark"
          //           ? theme.colors.dark[5]
          //           : theme.colors.gray[4],
          //       },
          //     }),
          //     SxRadius,
          //   ]}
          // >
          //   {colorName || "⸺"}
          // </Text>
          <DisplayCell>test</DisplayCell>
        )}
      </div>
    </div>
  );
};

export default EditableColor;
