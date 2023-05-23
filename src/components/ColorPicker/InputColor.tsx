import { useEyeDropper } from "@mantine/hooks";
import { IconColorPicker } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import tinycolor2 from "tinycolor2";
import ActionButton from "../basic/ActionButton";
import AlphaSlider from "./AlphaSlider";
import ColorArea from "./ColorArea";
import HueSlider from "./HueSlider";

function InputColor() {
  const { supported, open } = useEyeDropper();

  const [colorHSV, setColorHSV] = useState<{
    h: number;
    s: number;
    v: number;
    a: number;
    dirty: boolean;
  }>({ h: 0, s: 1, v: 1, a: 1, dirty: false });

  console.log(colorHSV);

  const color = tinycolor2.fromRatio(colorHSV);

  const colorRGB = color.toRgb();
  const [RGBAText, setRGBAText] = useState<{
    r: string;
    g: string;
    b: string;
    a: string;
    dirty: boolean;
  }>({
    r: colorRGB.r.toString(),
    g: colorRGB.g.toString(),
    b: colorRGB.b.toString(),
    a: Math.floor(colorRGB.a * 100).toString(),
    dirty: false,
  });

  const [HSVText, setHSVText] = useState<{
    h: string;
    s: string;
    v: string;
    dirty: boolean;
  }>({
    h: colorHSV.h.toString(),
    s: colorHSV.s.toString(),
    v: colorHSV.v.toString(),
    dirty: false,
  });

  // update color when RGBA input changes
  useEffect(() => {
    const newColor = tinycolor2.fromRatio({
      r: parseInt(RGBAText.r),
      g: parseInt(RGBAText.g),
      b: parseInt(RGBAText.b),
      a: parseInt(RGBAText.a) / 100,
    });

    if (RGBAText.dirty && newColor.isValid()) {
      const newColorHSV = newColor.toHsv();
      setColorHSV({ ...newColorHSV, dirty: false });
      setRGBAText((prev) => ({ ...prev, dirty: false }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [RGBAText.dirty, RGBAText.r, RGBAText.g, RGBAText.b, RGBAText.a]);

  // update color when RGBA input changes
  useEffect(() => {
    const newColor = tinycolor2.fromRatio({
      h: parseFloat(HSVText.h),
      s: parseFloat(HSVText.s),
      v: parseFloat(HSVText.v),
      a: colorRGB.a,
    });
    if (HSVText.dirty && newColor.isValid()) {
      const newColorHSV = newColor.toHsv();
      setColorHSV({ ...newColorHSV, dirty: false });
      setHSVText((prev) => ({ ...prev, dirty: false }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [HSVText.dirty, HSVText.h, HSVText.s, HSVText.v, colorRGB.a]);

  // update RGBA input when color changes
  useEffect(() => {
    if (colorHSV.dirty) {
      setRGBAText({
        r: colorRGB.r.toString(),
        g: colorRGB.g.toString(),
        b: colorRGB.b.toString(),
        a: Math.floor(colorRGB.a * 100).toString(),
        dirty: false,
      });
      setHSVText({
        h: colorHSV.h.toString(),
        s: colorHSV.s.toFixed(2),
        v: colorHSV.v.toFixed(2),
        dirty: false,
      });
      setColorHSV((prev) => ({ ...prev, dirty: false }));
    }
  }, [colorHSV.dirty, colorHSV.h, colorHSV.s, colorHSV.v, colorHSV.a]);

  const pickColor = async () => {
    try {
      const { sRGBHex } = await open();
      setColorHSV({ ...tinycolor2(sRGBHex).toHsv(), dirty: true });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="m-3 flex w-[360px] flex-col gap-3">
      <div className="flex gap-3">
        <ColorArea
          value={{ s: colorHSV.s, v: colorHSV.v }}
          onChange={({ s, v }) => {
            setColorHSV((prev) => ({
              h: prev.h,
              a: prev.a,
              s,
              v,
              dirty: true,
            }));
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
          <div className="flex justify-between gap-3">
            <div className="flex flex-col gap-3">
              <label>
                {"R : "}
                <input
                  className="w-9  border-b border-b-stone-400 bg-stone-800 text-right outline-none focus-visible:border-b-red-500"
                  value={RGBAText.r}
                  onChange={(e) => {
                    setRGBAText((prev) => ({
                      ...prev,
                      r: e.target.value,
                      dirty: true,
                    }));
                  }}
                />
              </label>
              <label>
                {"G : "}
                <input
                  className="w-9  border-b border-b-stone-400 bg-stone-800 text-right outline-none focus-visible:border-b-green-500"
                  value={RGBAText.g}
                  onChange={(e) => {
                    setRGBAText((prev) => ({
                      ...prev,
                      g: e.target.value,
                      dirty: true,
                    }));
                  }}
                />
              </label>
              <label>
                {"B : "}
                <input
                  className="w-9 border-b border-b-stone-400 bg-stone-800 text-right outline-none focus-visible:border-b-blue-500"
                  value={RGBAText.b}
                  onChange={(e) => {
                    setRGBAText((prev) => ({
                      ...prev,
                      b: e.target.value,
                      dirty: true,
                    }));
                  }}
                />
              </label>
              <label>
                {"A : "}
                <input
                  className="w-9 border-b border-b-stone-400 bg-stone-800 text-right outline-none focus-visible:border-b-yellow-500"
                  value={RGBAText.a}
                  onChange={(e) => {
                    setRGBAText((prev) => ({
                      ...prev,
                      a: e.target.value,
                      dirty: true,
                    }));
                  }}
                />
              </label>
            </div>
            <div className="flex flex-col gap-3">
              <label>
                {"H : "}
                <input
                  className="w-9  border-b border-b-stone-400 bg-stone-800 text-right outline-none focus-visible:border-b-red-500"
                  value={HSVText.h}
                  onChange={(e) => {
                    setHSVText((prev) => ({
                      ...prev,
                      h: e.target.value,
                      dirty: true,
                    }));
                  }}
                />
              </label>
              <label>
                {"S : "}
                <input
                  className="w-9  border-b border-b-stone-400 bg-stone-800 text-right outline-none focus-visible:border-b-green-500"
                  value={HSVText.s}
                  onChange={(e) => {
                    setHSVText((prev) => ({
                      ...prev,
                      s: e.target.value,
                      dirty: true,
                    }));
                  }}
                />
              </label>
              <label>
                {"V : "}
                <input
                  className="w-9 border-b border-b-stone-400 bg-stone-800 text-right outline-none focus-visible:border-b-blue-500"
                  value={HSVText.v}
                  onChange={(e) => {
                    setHSVText((prev) => ({
                      ...prev,
                      v: e.target.value,
                      dirty: true,
                    }));
                  }}
                />
              </label>
              <ActionButton
                className="self-end"
                onClick={() => {
                  pickColor().catch((e) => console.log(e));
                }}
              >
                <IconColorPicker />
              </ActionButton>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <HueSlider
          value={colorHSV.h}
          onChange={(h) => {
            setColorHSV((prev) => ({ ...prev, h, dirty: true }));
          }}
        />
        <AlphaSlider
          value={colorHSV.a}
          onChange={(a) => {
            setColorHSV((prev) => ({ ...prev, a, dirty: true }));
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
