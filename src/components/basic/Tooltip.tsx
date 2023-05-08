import React, {
  type ReactNode,
  useRef,
  cloneElement,
  type JSXElementConstructor,
  type ReactElement,
  CSSProperties,
  MutableRefObject,
} from "react";
import {
  type AriaTooltipProps,
  mergeProps,
  useTooltipTrigger,
} from "react-aria";
import { useTooltipTriggerState } from "react-stately";
import { OptionalPortal } from "../OptionalPortal";
import getAbsolutePositionStyle from "~/utils/getAbsolutePositionStyle";
import Portal from "../Portal";

function getToolTipPosition(
  rect: DOMRect | undefined,
  position: "left" | "right" | "top" | "bottom",
  spacing: number | string = 6
) {
  const style: CSSProperties = {};

  if (rect === undefined) return style;

  if (position === "left") {
    style.left = `${rect.left}px`;
    style.top = `${rect.top + rect.height / 2}px`;
    style.marginRight = spacing;
  }
  if (position === "right") {
    style.left = `${rect.left + rect.width}px`;
    style.top = `${rect.top + rect.height / 2}px`;
    style.marginLeft = spacing;
  }

  if (position === "top") {
    style.left = `${rect.left + rect.width / 2}px`;
    style.top = `${rect.top}px`;
    style.marginBottom = spacing;
  }

  if (position === "bottom") {
    style.left = `${rect.left + rect.width / 2}px`;
    style.top = `${rect.top}px`;
    style.marginTop = spacing;
  }

  return style;
}

interface TooltipProps extends AriaTooltipProps {
  children: ReactElement<any, string | JSXElementConstructor<any>>;
  tooltip: ReactNode;
  position?: "left" | "right" | "top" | "bottom";
  spacing?: number | string;
  withinPortal?: boolean;
}

function Tooltip(props: TooltipProps) {
  const {
    children,
    tooltip,
    position = "top",
    spacing = 6,
    withinPortal = false,
    ...moreProps
  } = props;
  const ref = useRef<HTMLElement | null>(null);
  const state = useTooltipTriggerState(moreProps);
  const { triggerProps, tooltipProps } = useTooltipTrigger(
    moreProps,
    state,
    ref
  );

  const boundingBox = ref.current?.getBoundingClientRect();
  console.log(boundingBox);

  // const { tooltipProps } = useTooltip(props, state);

  if (withinPortal)
    return (
      <>
        <Portal
          className="pointer-events-none absolute"
          style={{
            top: boundingBox?.top,
            left: boundingBox?.left,
            width: boundingBox?.width,
            height: boundingBox?.height,
          }}
        >
          <div
            className="
              absolute
              rounded
              border 
              border-solid
              border-gray-500
              bg-stone-200
              p-2
              px-3 
              text-stone-800 
              shadow-md 
              transition-all 
              dark:bg-stone-800
              dark:text-stone-200
              dark:after:border-t-stone-800"
            style={{
              maxWidth: 150,
              opacity: state.isOpen ? 1 : 0,
              display: state.isOpen ? "block" : "none",
              ...getAbsolutePositionStyle(position, spacing),
            }}
            {...mergeProps(moreProps, tooltipProps)}
          >
            {tooltip}
          </div>
        </Portal>

        {cloneElement(children, { ...triggerProps, ref: ref })}
      </>
    );

  return (
    <div
      className="relative"
      {...triggerProps}
      ref={ref as MutableRefObject<HTMLDivElement | null>}
    >
      <span
        className="
          absolute
          rounded 
          border
          border-solid
          border-gray-500
          bg-stone-200
          p-2 
          px-3 
          text-stone-800 
          shadow-md 
          transition-all
          dark:bg-stone-800
          dark:text-stone-200
          dark:after:border-t-stone-800"
        style={{
          maxWidth: 150,
          opacity: state.isOpen ? 1 : 0,
          display: state.isOpen ? "block" : "none",
          ...getAbsolutePositionStyle(position, spacing),
        }}
        {...mergeProps(props, tooltipProps)}
      >
        {tooltip}
      </span>

      {children}
    </div>
  );
}

// function TooltipButton(props) {
//   let ref = React.useRef(null);

//   // Get props for the trigger and its tooltip
//   let { triggerProps, tooltipProps } = useTooltipTrigger(props, state, ref);

//   return (
//     <span style={{ position: 'relative' }}>
//       <button
//         ref={ref}
//         {...triggerProps}
//         style={{ fontSize: 18 }}
//         onClick={() => alert('Pressed button')}
//       >
//         {props.children}
//       </button>
//       {state.isOpen && (
//         <Tooltip state={state} {...tooltipProps}>{props.tooltip}</Tooltip>
//       )}
//     </span>
//   );
// }

// function Tooltip({
//   children,
//   tooltip,
//   className,
//   classNameTooltip,
//   delay = "delay-1500",
//   withPortal = false,
// }: PropsWithChildren & {
//   tooltip: ReactNode;
//   className?: string;
//   classNameTooltip?: string;
//   delay?:
//     | "delay-0"
//     | "delay-75"
//     | "delay-100"
//     | "delay-150"
//     | "delay-200"
//     | "delay-300"
//     | "delay-500"
//     | "delay-700"
//     | "delay-1000"
//     | "delay-1500"
//     | "delay-2000"
//     | "delay-2500"
//     | "delay-3000";
//   withPortal?: boolean;
// }) {
//   if (withPortal) {
//     return (
//       <div className={`tooltip ${className ?? ""} tooltip-${delay}`}>
//         {children}
//         <Portal>
//           <div
//             className={`tooltip-text bg-stone-200 text-stone-800 after:border-transparent after:border-t-stone-200 dark:bg-stone-800 dark:text-stone-200 dark:after:border-t-stone-800 ${
//               classNameTooltip ?? ""
//             }`}
//           >
//             {tooltip}
//           </div>
//         </Portal>
//       </div>
//     );
//   }

//   return (
//     <div className={`tooltip ${className ?? ""} tooltip-${delay}`}>
//       {children}

//       <div
//         className={`tooltip-text bg-stone-200 text-stone-800 after:border-transparent after:border-t-stone-200 dark:bg-stone-800 dark:text-stone-200 dark:after:border-t-stone-800 ${
//           classNameTooltip ?? ""
//         }`}
//       >
//         {tooltip}
//       </div>
//     </div>
//   );
// }

export default Tooltip;
