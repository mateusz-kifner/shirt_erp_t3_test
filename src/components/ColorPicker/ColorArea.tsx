import { useMove } from "@mantine/hooks";
import { useEffect, useReducer, type Reducer } from "react";
import tinycolor2 from "tinycolor2";

const SIZE = 200;
const FOCUSED_THUMB_SIZE = 28;
const THUMB_SIZE = 20;
const BORDER_RADIUS = 4;

interface ColorAreaProps {
  initialValue: { saturation: number; brightness: number };
  hue?: number;
  isDisabled?: boolean;
  onChange?: (value: { saturation: number; brightness: number }) => void;
  alpha?: number;
}

function ColorArea(props: ColorAreaProps) {
  const { initialValue, isDisabled, hue = 0, onChange, alpha = 1 } = props;

  const [areaState, setAreaState] = useReducer<
    Reducer<
      { saturation: number; brightness: number },
      { saturation: number; brightness: number }
    >
  >((prev, next) => {
    if (
      next.saturation >= 0 &&
      next.saturation <= 100 &&
      next.brightness >= 0 &&
      next.brightness <= 100
    ) {
      return next;
    }
    return prev;
  }, initialValue);

  useEffect(() => {
    onChange?.(areaState);
  }, [areaState]);

  const { ref, active } = useMove(
    ({ x, y }) =>
      !isDisabled &&
      setAreaState({ saturation: x * 100, brightness: 100 - y * 100 })
  );
  const areaColor = tinycolor2.fromRatio({
    h: hue / 360.0,
    s: 1,
    v: 1,
    a: alpha,
  });
  const thumbColor = tinycolor2.fromRatio({
    h: hue / 360.0,
    s: areaState.saturation / 100.0,
    v: areaState.brightness / 100.0,
    a: alpha,
  });

  return (
    <div
      style={{
        position: "relative",
        width: SIZE,
        height: SIZE,
        borderRadius: BORDER_RADIUS,
        opacity: isDisabled ? 0.3 : undefined,
        touchAction: "none",
        forcedColorAdjust: "none",
      }}
      ref={ref}
    >
      <div
        role="presentation"
        style={{
          backgroundColor: isDisabled ? "rgb(142, 142, 142)" : undefined,
          borderRadius: BORDER_RADIUS,
          height: SIZE,
          width: SIZE,
          background: `linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%),linear-gradient( 90deg, #fff 0%, ${areaColor.toHexString()} 100%)`,
          touchAction: "none",
          forcedColorAdjust: "none",
          willChange: "background",
        }}
      />
      <div
        role="presentation"
        className="absolute box-border -translate-x-1/2 -translate-y-1/2 rounded-full transition-[width,height] duration-[50ms] ease-in-out"
        style={{
          background: isDisabled
            ? "rgb(142, 142, 142)"
            : thumbColor.toHexString(),
          border: `2px solid ${isDisabled ? "rgb(142, 142, 142)" : "white"}`,
          boxShadow: "0 0 0 1px black, inset 0 0 0 1px black",
          height: false ? FOCUSED_THUMB_SIZE + 4 : THUMB_SIZE,
          width: false ? FOCUSED_THUMB_SIZE + 4 : THUMB_SIZE,
          left: areaState.saturation * 2,
          top: 200 - areaState.brightness * 2,
        }}
      ></div>
    </div>
  );
}

export default ColorArea;
