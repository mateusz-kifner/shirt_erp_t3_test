import { useMove } from "@mantine/hooks";
import { useEffect, useReducer, type Reducer } from "react";
import tinycolor2 from "tinycolor2";

const SIZE = 200;
const FOCUSED_THUMB_SIZE = 28;
const THUMB_SIZE = 20;
const BORDER_RADIUS = 4;

interface ColorAreaProps {
  // initialValue: { s: number; v: number };
  value: { s: number; v: number };
  hue?: number;
  isDisabled?: boolean;
  onChange?: (value: { s: number; v: number }) => void;
  alpha?: number;
}

function ColorArea(props: ColorAreaProps) {
  const { value, isDisabled, hue = 0, onChange, alpha = 1 } = props;

  const [areaState, setAreaState] = useReducer<
    Reducer<{ s: number; v: number }, { s: number; v: number }>
  >((prev, next) => {
    if (next.s >= 0 && next.s <= 1 && next.v >= 0 && next.v <= 1) {
      return next;
    }
    return prev;
  }, value);

  useEffect(() => {
    if (value.s !== areaState.s || value.v !== areaState.v) {
      setAreaState(value);
    }
  }, [value]);

  useEffect(() => {
    onChange?.(areaState);
  }, [areaState]);

  const { ref, active } = useMove(
    ({ x, y }) => !isDisabled && setAreaState({ s: x, v: 1.0 - y })
  );
  const areaColor = tinycolor2.fromRatio({
    h: hue,
    s: 1,
    v: 1,
    a: alpha,
  });
  const thumbColor = tinycolor2.fromRatio({
    h: hue,
    s: areaState.s,
    v: areaState.v,
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
          left: areaState.s * 200,
          top: 200 - areaState.v * 200,
        }}
      ></div>
    </div>
  );
}

export default ColorArea;
