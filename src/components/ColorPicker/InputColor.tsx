import { useState } from "react";
import tinycolor from "tinycolor2";
import AlphaSlider from "./AlphaSlider";
import ColorArea from "./ColorArea";
import HueSlider from "./HueSlider";

function InputColor() {
  const [hue, setHue] = useState(0);
  const [alpha, setAlpha] = useState(0);
  const [areaState, setAreaState] = useState<{
    saturation: number;
    brightness: number;
  }>({ saturation: 100, brightness: 100 });

  const color = tinycolor.fromRatio({
    h: hue / 360,
    s: areaState.saturation / 100,
    v: areaState.brightness / 100,
    a: alpha / 100,
  });

  return (
    <div className="m-3">
      <ColorArea
        initialValue={areaState}
        onChange={setAreaState}
        hue={hue}
        alpha={alpha}
      />
      <HueSlider initialValue={hue} onChange={setHue} />
      <AlphaSlider
        initialValue={alpha}
        onChange={setAlpha}
        hue={hue}
        saturation={areaState.saturation}
        brightness={areaState.brightness}
      />
      <span>{color.toHex8String()}</span>
    </div>
  );
}

export default InputColor;
