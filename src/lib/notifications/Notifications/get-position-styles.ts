import { CSSProperties } from "react";
import { NotificationsPositioning } from "../types";

export default function getPositionStyle(
  [vertical, horizontal]: NotificationsPositioning,
  spacing: number | string
) {
  const style: CSSProperties = {};

  vertical === "top" && (style.top = spacing);
  vertical === "bottom" && (style.bottom = spacing);

  horizontal === "left" && (style.left = spacing);
  horizontal === "right" && (style.right = spacing);
  horizontal === "center" &&
    ((style.left = "50%"), (style.transform = "translateX(-50%)"));

  return style;
}
