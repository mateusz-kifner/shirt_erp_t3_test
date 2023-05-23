import { useState } from "react";
import ColorArea from "./ColorArea";
import HueSlider from "./HueSlider";

function InputColor() {
  const [hue, setHue] = useState(0);
  const [areaState, setAreaState] = useState<{
    saturation: number;
    brightness: number;
  }>({ saturation: 100, brightness: 100 });
  return (
    <div className="m-3">
      <ColorArea initialValue={areaState} onChange={setAreaState} hue={hue} />
      <HueSlider initialValue={hue} onChange={setHue} />
    </div>
  );
}

export default InputColor;
