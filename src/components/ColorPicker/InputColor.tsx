import { useState } from "react";

import { parseColor } from "@react-stately/color";
import ColorArea from "./ColorArea";
import ColorSlider from "./ColorSlider";

function InputColor() {
  const [color, setColor] = useState(parseColor("hsb(219, 58%, 93%)"));
  const [hChannel, sChannel, bChannel] = color.getColorChannels();
  return (
    <>
      <div style={{ display: "inline-flex", flexWrap: "wrap" }}>
        <div style={{ marginRight: "2rem", marginBottom: "2rem" }}>
          <label id="sbh-label-id-1">
            x: {color.getChannelName(sChannel, "en-US")}, y:{" "}
            {color.getChannelName(bChannel, "en-US")}
          </label>
          <ColorArea
            aria-labelledby="sbh-label-id-1"
            value={color}
            onChange={setColor}
            xChannel={sChannel}
            yChannel={bChannel}
          />
          <ColorSlider channel={hChannel} value={color} onChange={setColor} />
        </div>
      </div>
      <p>
        Current HSB color value:{" "}
        {/* <ColorSwatch
          value={color}
          aria-hidden="true"
          style={{
            width: "16px",
            height: "16px",
            verticalAlign: "text-bottom",
          }}
        />{" "} */}
        {color.toString("hsb")}
      </p>
    </>
  );
}

export default InputColor;
