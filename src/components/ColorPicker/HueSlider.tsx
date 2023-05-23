import { useMove } from "@mantine/hooks";
import { useState } from "react";
import tinycolor2 from "tinycolor2";

const TRACK_THICKNESS = 28;
const THUMB_SIZE = 20;

interface ColorSliderProps {
  initialValue: number;
  isDisabled?: boolean;
  onChange: (value: number) => void;
}

function HueSlider(props: ColorSliderProps) {
  const { initialValue, onChange } = props;
  const [hue, setHue] = useState(initialValue);
  const { ref, active } = useMove(({ x }) => {
    setHue(x * 360);
    onChange?.(x * 360);
  });

  const thumbColor = tinycolor2.fromRatio({
    h: hue / 360.0,
    s: 1,
    v: 1,
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 360,
        minWidth: 360,
        touchAction: "none",
        forcedColorAdjust: "none",
        position: "relative",
      }}
      ref={ref}
    >
      <div
        style={{
          height: TRACK_THICKNESS,
          width: "100%",
          borderRadius: 4,
          touchAction: "none",
          forcedColorAdjust: "none",
          background:
            "linear-gradient(to right, rgb(255, 0, 0) 0%, rgb(255, 255, 0) 17%, rgb(0, 255, 0) 33%, rgb(0, 255, 255) 50%, rgb(0, 0, 255) 67%, rgb(255, 0, 255) 83%, rgb(255, 0, 0) 100%)",
        }}
      >
        <div
          className="absolute box-border -translate-x-1/2 -translate-y-1/2 rounded-full transition-[width,height] duration-[50ms] ease-in-out"
          style={{
            top: TRACK_THICKNESS / 2,
            border: "2px solid white",
            boxShadow: "0 0 0 1px black, inset 0 0 0 1px black",
            width: false ? TRACK_THICKNESS + 4 : THUMB_SIZE,
            height: false ? TRACK_THICKNESS + 4 : THUMB_SIZE,
            background: thumbColor.toHexString(),
            left: hue,
          }}
        ></div>
      </div>
    </div>
  );
}

export default HueSlider;
