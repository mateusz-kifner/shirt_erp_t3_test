import type { CSSProperties } from "react";
import type { NotificationsPositioning } from "../types";

interface NotificationStateStylesProps {
  maxHeight: number | string;
  positioning: NotificationsPositioning;
  transitionDuration: number;
}

const transforms = {
  left: "translateX(-100%)",
  right: "translateX(100%)",
  "top-center": "translateY(-100%)",
  "bottom-center": "translateY(100%)",
};

const noTransform = {
  left: "translateX(0)",
  right: "translateX(0)",
  "top-center": "translateY(0)",
  "bottom-center": "translateY(0)",
};

export default function getNotificationStateStyles({
  maxHeight,
  positioning,
  transitionDuration,
}: NotificationStateStylesProps): CSSProperties {
  const [vertical, horizontal] = positioning;
  const property = horizontal === "center" ? `${vertical}-center` : horizontal;

  const commonStyles: CSSProperties = {
    opacity: 0,
    maxHeight,
    //@ts-ignore
    transform: transforms[property] as string,
    transitionDuration: `${transitionDuration}ms, ${transitionDuration}ms, ${transitionDuration}ms`,
    transitionTimingFunction:
      "cubic-bezier(.51,.3,0,1.21), cubic-bezier(.51,.3,0,1.21), linear",
    transitionProperty: "opacity, transform, max-height",
  };

  const inState: CSSProperties = {
    opacity: 1,
    //@ts-ignore

    transform: noTransform[property],
  };

  const outState: CSSProperties = {
    opacity: 0,
    maxHeight: 0,
    //@ts-ignore

    transform: transforms[property],
  };

  // const transitionStyles = {
  //   entering: inState,
  //   entered: inState,
  //   exiting: outState,
  //   exited: outState,
  // };
  //@ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return commonStyles;
}
