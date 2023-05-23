import { omit } from "lodash";
import { useEffect, useState } from "react";
import tinycolor2 from "tinycolor2";
import AlphaSlider from "./AlphaSlider";
import ColorArea from "./ColorArea";
import HueSlider from "./HueSlider";

function InputColor() {
  const [colorHSV, setColorHSV] = useState<{
    h: number;
    s: number;
    v: number;
    a: number;
  }>({ h: 0, s: 1, v: 1, a: 1 });

  const color = tinycolor2.fromRatio(colorHSV);
  const [RGBATextDirty, setRGBATextDirty] = useState(false);
  const [colorHSVDirty, setColorHSVDirty] = useState(false);

  const colorRGB = color.toRgb();
  const [RGBAText, setRGBAText] = useState({
    r: `${colorRGB.r}`,
    g: `${colorRGB.g}`,
    b: `${colorRGB.b}`,
    a: `${Math.floor(colorRGB.a * 100)}`,
  });

  // update color when RGBA input changes
  useEffect(() => {
    if (RGBATextDirty) {
      const newColor = tinycolor2({
        r: parseInt(RGBAText.r),
        g: parseInt(RGBAText.g),
        b: parseInt(RGBAText.b),
        a: parseInt(RGBAText.a) / 100,
      });
      const newColorHSV = newColor.toHsv();
      setColorHSV(newColorHSV);
      setRGBATextDirty(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [RGBATextDirty]);

  // update RGBA input when color changes
  useEffect(() => {
    if (colorHSVDirty) {
      setColorHSVDirty(false);
      setRGBAText({
        r: `${colorRGB.r}`,
        g: `${colorRGB.g}`,
        b: `${colorRGB.b}`,
        a: `${Math.floor(colorRGB.a * 100)}`,
      });
    }
  }, [colorHSVDirty]);

  return (
    <div className="m-3 flex w-[360px] flex-col gap-3">
      <div className="flex gap-3">
        <ColorArea
          initialValue={omit(colorHSV, ["a", "h"])}
          onChange={({ s, v }) => {
            setColorHSV((prev) => ({ h: prev.h, a: prev.a, s, v }));
            setColorHSVDirty(true);
          }}
          hue={colorHSV.h}
          alpha={colorHSV.a}
        />
        <div className="flex flex-grow flex-col gap-3">
          <div
            style={{
              flexGrow: 1,
              borderRadius: 4,
              background:
                'url("/assets/checkerboard.svg") 0px 0px/16px 16px repeat',
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 4,
                background: color.toHex8String(),
              }}
            ></div>
          </div>
          <label>
            {"R : "}
            <input
              className="w-9  border-b border-b-stone-400 bg-stone-800 text-right outline-none focus-visible:border-b-red-500"
              value={RGBAText.r}
              onChange={(e) => {
                setRGBAText((prev) => ({ ...prev, r: e.target.value }));
                setRGBATextDirty(true);
              }}
            />
          </label>
          <label>
            {"G : "}
            <input
              className="w-9  border-b border-b-stone-400 bg-stone-800 text-right outline-none focus-visible:border-b-green-500"
              value={RGBAText.g}
              onChange={(e) => {
                setRGBAText((prev) => ({ ...prev, g: e.target.value }));
                setRGBATextDirty(true);
              }}
            />
          </label>
          <label>
            {"B : "}
            <input
              className="w-9 border-b border-b-stone-400 bg-stone-800 text-right outline-none focus-visible:border-b-blue-500"
              value={RGBAText.b}
              onChange={(e) => {
                setRGBAText((prev) => ({ ...prev, b: e.target.value }));
                setRGBATextDirty(true);
              }}
            />
          </label>

          <label>
            {"A : "}
            <input
              className="w-9  border-b border-b-stone-400 bg-stone-800 text-right outline-none focus-visible:border-b-yellow-500"
              value={RGBAText.a}
              onChange={(e) => {
                setRGBAText((prev) => ({ ...prev, a: e.target.value }));
                setRGBATextDirty(true);
              }}
            />
          </label>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <HueSlider
          initialValue={colorHSV.h}
          onChange={(h) => {
            setColorHSV((prev) => ({ ...prev, h }));
            setColorHSVDirty(true);
          }}
        />
        <AlphaSlider
          initialValue={colorHSV.a}
          onChange={(a) => {
            setColorHSV((prev) => ({ ...prev, a }));
            setColorHSVDirty(true);
          }}
          hue={colorHSV.h}
          saturation={colorHSV.s}
          brightness={colorHSV.v}
        />
      </div>

      <span>{color.toHex8String()}</span>
    </div>
  );
}

export default InputColor;
