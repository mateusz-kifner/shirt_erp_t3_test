import { useRef } from "react";

import { useColorSlider, type AriaColorSliderOptions } from "@react-aria/color";
import { useFocusRing } from "@react-aria/focus";
import { useLocale } from "@react-aria/i18n";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { useColorSliderState } from "@react-stately/color";

const TRACK_THICKNESS = 28;
const THUMB_SIZE = 20;

function ColorSlider(
  props: Omit<AriaColorSliderOptions, "trackRef" | "inputRef">
) {
  const { locale } = useLocale();

  const state = useColorSliderState({ ...props, locale });

  const trackRef = useRef(null);
  const inputRef = useRef(null);

  const label = "IDK";

  const { trackProps, thumbProps, inputProps, labelProps, outputProps } =
    useColorSlider(
      {
        ...props,
        label,
        trackRef,
        inputRef,
      },
      state
    );

  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 300,
      }}
    >
      {/* Create a flex container for the label and output element. */}
      <div style={{ display: "flex", alignSelf: "stretch" }}>
        <label {...labelProps}>{label}</label>
        <output {...outputProps} style={{ flex: "1 0 auto", textAlign: "end" }}>
          {state.value.formatChannelValue(props.channel, locale)}
        </output>
      </div>
      {/* The track element holds the visible track line and the thumb. */}
      <div
        {...trackProps}
        ref={trackRef}
        style={{
          ...trackProps.style,
          height: TRACK_THICKNESS,
          width: "100%",
          borderRadius: 4,
        }}
      >
        <div
          {...thumbProps}
          style={{
            ...thumbProps.style,
            top: TRACK_THICKNESS / 2,
            border: "2px solid white",
            boxShadow: "0 0 0 1px black, inset 0 0 0 1px black",
            width: isFocusVisible ? TRACK_THICKNESS + 4 : THUMB_SIZE,
            height: isFocusVisible ? TRACK_THICKNESS + 4 : THUMB_SIZE,
            borderRadius: "50%",
            boxSizing: "border-box",
            background: state.getDisplayColor().toString("css"),
          }}
        >
          <VisuallyHidden>
            <input ref={inputRef} {...inputProps} {...focusProps} />
          </VisuallyHidden>
        </div>
      </div>
    </div>
  );
}

export default ColorSlider;
