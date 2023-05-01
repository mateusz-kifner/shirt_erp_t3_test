import { Portal } from "@headlessui/react";
import React, { type ReactNode, type PropsWithChildren } from "react";

function Tooltip({
  children,
  tooltip,
  className,
  classNameTooltip,
  delay = "delay-1500",
  withPortal = false,
}: PropsWithChildren & {
  tooltip: ReactNode;
  className?: string;
  classNameTooltip?: string;
  delay?:
    | "delay-0"
    | "delay-75"
    | "delay-100"
    | "delay-150"
    | "delay-200"
    | "delay-300"
    | "delay-500"
    | "delay-700"
    | "delay-1000"
    | "delay-1500"
    | "delay-2000"
    | "delay-2500"
    | "delay-3000";
  withPortal?: boolean;
}) {
  return (
    <div className={`tooltip ${className ?? ""} tooltip-${delay}`}>
      {children}
      {withPortal ? (
        <Portal>
          <div
            className={`tooltip-text bg-stone-200 text-stone-800 after:border-transparent after:border-t-stone-200 dark:bg-stone-800 dark:text-stone-200 dark:after:border-t-stone-800 ${
              classNameTooltip ?? ""
            }`}
          >
            {tooltip}
          </div>
        </Portal>
      ) : (
        <div
          className={`tooltip-text bg-stone-200 text-stone-800 after:border-transparent after:border-t-stone-200 dark:bg-stone-800 dark:text-stone-200 dark:after:border-t-stone-800 ${
            classNameTooltip ?? ""
          }`}
        >
          {tooltip}
        </div>
      )}
    </div>
  );
}

export default Tooltip;
