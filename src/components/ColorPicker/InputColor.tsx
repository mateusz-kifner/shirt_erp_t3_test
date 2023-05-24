import { useEyeDropper } from "@mantine/hooks";
import { IconColorPicker } from "@tabler/icons-react";
import { useState } from "react";
import tinycolor2, { ColorFormats } from "tinycolor2";
import ActionButton from "../basic/ActionButton";
import AlphaSlider from "./AlphaSlider";
import ColorArea from "./ColorArea";
import HueSlider from "./HueSlider";
import useColor from "./useColor";

function InputColor() {
  const { supported, open } = useEyeDropper();
  const [isActiveArea, setIsActiveArea] = useState<boolean>(false);
  const [isActiveHue, setIsActiveHue] = useState<boolean>();
  const [isActiveAlpha, setIsActiveAlpha] = useState<boolean>(false);

  const isActive = isActiveArea || isActiveHue || isActiveAlpha;

  const { color, getRGBA, setHSV, getHSV, setHex, getHex8 } = useColor();

  const colorRGBA = getRGBA();

  const [RGBAText, setRGBAText] = useState<{
    r: string;
    g: string;
    b: string;
    a: string;
  }>({
    r: colorRGBA.r.toFixed(0),
    g: colorRGBA.g.toFixed(0),
    b: colorRGBA.b.toFixed(0),
    a: Math.floor(colorRGBA.a * 100).toFixed(0),
  });

  const [HSVText, setHSVText] = useState<{
    h: string;
    s: string;
    v: string;
    a: string;
  }>({
    h: color.h.toFixed(0),
    s: color.s.toString(),
    v: color.v.toString(),
    a: Math.floor(color.a * 100).toFixed(0),
  });

  const updateHSVandHSVText = (RGBAText: {
    r: string;
    g: string;
    b: string;
    a: string;
  }) => {
    const newColor = tinycolor2.fromRatio({
      r: parseInt(RGBAText.r),
      g: parseInt(RGBAText.g),
      b: parseInt(RGBAText.b),
      a: parseInt(RGBAText.a) / 100,
    });

    if (newColor.isValid() && !isActive) {
      const newColorHSV = newColor.toHsv();
      setHSV(newColorHSV);
      setHSVText({
        h: newColorHSV.h.toFixed(0),
        s: newColorHSV.s.toFixed(3),
        v: newColorHSV.v.toFixed(3),
        a: (newColorHSV.a * 100).toFixed(0),
      });
    }
  };

  const updateHSVandRGBAText = (HSVText: {
    h: string;
    s: string;
    v: string;
    a: string;
  }) => {
    const newColor = tinycolor2.fromRatio({
      h: parseFloat(HSVText.h),
      s: parseFloat(HSVText.s),
      v: parseFloat(HSVText.v),
      a: parseFloat(HSVText.a) / 100,
    });
    if (newColor.isValid() && !isActive) {
      const newColorRGB = newColor.toRgb();
      setHSV(newColor.toHsv());
      setRGBAText({
        r: newColorRGB.r.toFixed(0),
        g: newColorRGB.g.toFixed(0),
        b: newColorRGB.b.toFixed(0),
        a: Math.floor(newColorRGB.a * 100).toFixed(0),
      });
    }
  };

  const updateRGBATextandHSVText = (color: ColorFormats.HSVA) => {
    const newColor = tinycolor2.fromRatio(color);
    const newColorRGBA = newColor.toRgb();
    const newColorHSV = newColor.toHsv();
    setRGBAText({
      r: newColorRGBA.r.toFixed(0),
      g: newColorRGBA.g.toFixed(0),
      b: newColorRGBA.b.toFixed(0),
      a: Math.floor(newColorRGBA.a * 100).toFixed(0),
    });
    setHSVText({
      h: newColorHSV.h.toFixed(0),
      s: newColorHSV.s.toFixed(3),
      v: newColorHSV.v.toFixed(3),
      a: Math.floor(newColorHSV.a * 100).toFixed(0),
    });
  };

  const pickColor = async () => {
    try {
      const { sRGBHex } = await open();
      setHex(sRGBHex);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="m-3 flex w-[360px] flex-col gap-3">
      <div className="flex gap-3">
        <ColorArea
          value={getHSV()}
          onChange={(color) => {
            setHSV(color);
            updateRGBATextandHSVText(color);
          }}
          onActive={setIsActiveArea}
        />
        <div className="flex flex-grow flex-col gap-3">
          <div
            style={{
              flexGrow: 1,
              borderRadius: 4,
              overflow: "hidden",
              background:
                'url("/assets/checkerboard.svg") 0px 0px/16px 16px repeat',
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                background: getHex8(),
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
                    const newColor = { ...RGBAText, r: e.target.value };
                    setRGBAText(newColor);
                    updateHSVandHSVText(newColor);
                  }}
                />
              </label>
              <label>
                {"G : "}
                <input
                  className="w-9  border-b border-b-stone-400 bg-stone-800 text-right outline-none focus-visible:border-b-green-500"
                  value={RGBAText.g}
                  onChange={(e) => {
                    const newColor = { ...RGBAText, g: e.target.value };
                    setRGBAText(newColor);
                    updateHSVandHSVText(newColor);
                  }}
                />
              </label>
              <label>
                {"B : "}
                <input
                  className="w-9 border-b border-b-stone-400 bg-stone-800 text-right outline-none focus-visible:border-b-blue-500"
                  value={RGBAText.b}
                  onChange={(e) => {
                    const newColor = { ...RGBAText, b: e.target.value };
                    setRGBAText(newColor);
                    updateHSVandHSVText(newColor);
                  }}
                />
              </label>
              <label>
                {"A : "}
                <input
                  className="w-9 border-b border-b-stone-400 bg-stone-800 text-right outline-none focus-visible:border-b-yellow-500"
                  value={RGBAText.a}
                  onChange={(e) => {
                    const newColor = { ...RGBAText, a: e.target.value };
                    setRGBAText(newColor);
                    updateHSVandHSVText(newColor);
                  }}
                />
              </label>
            </div>
            <div className="flex flex-col gap-3">
              <label>
                {"H : "}
                <input
                  className="w-12  border-b border-b-stone-400 bg-stone-800 text-right outline-none focus-visible:border-b-red-500"
                  value={HSVText.h}
                  onChange={(e) => {
                    const newColor = { ...HSVText, h: e.target.value };
                    setHSVText(newColor);
                    updateHSVandRGBAText(newColor);
                  }}
                />
              </label>
              <label>
                {"S : "}
                <input
                  className="w-12  border-b border-b-stone-400 bg-stone-800 text-right outline-none focus-visible:border-b-green-500"
                  value={HSVText.s}
                  onChange={(e) => {
                    const newColor = { ...HSVText, s: e.target.value };
                    setHSVText(newColor);
                    updateHSVandRGBAText(newColor);
                  }}
                />
              </label>
              <label>
                {"V : "}
                <input
                  className="w-12 border-b border-b-stone-400 bg-stone-800 text-right outline-none focus-visible:border-b-blue-500"
                  value={HSVText.v}
                  onChange={(e) => {
                    const newColor = { ...HSVText, v: e.target.value };
                    setHSVText(newColor);
                    updateHSVandRGBAText(newColor);
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
          value={getHSV()}
          onChange={(color) => {
            setHSV(color);
            updateRGBATextandHSVText(color);
          }}
          onActive={setIsActiveHue}
        />
        <AlphaSlider
          value={getHSV()}
          onChange={(color) => {
            setHSV(color);
            updateRGBATextandHSVText(color);
          }}
          onActive={setIsActiveAlpha}
        />
      </div>

      <span>{getHex8()}</span>
    </div>
  );
}

export default InputColor;
