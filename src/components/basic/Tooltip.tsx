import React, { type ReactNode, useRef } from "react";
import {
  type AriaTooltipProps,
  mergeProps,
  useTooltipTrigger,
} from "react-aria";
import { useTooltipTriggerState } from "react-stately";
import getAbsolutePositionStyle from "~/utils/getAbsolutePositionStyle";

interface TooltipProps extends AriaTooltipProps {
  children: ReactNode;
  tooltip: ReactNode;
  position?: "left" | "right" | "top" | "bottom";
  spacing?: number | string;
}

function Tooltip(props: TooltipProps) {
  const { position = "top", spacing = 6 } = props;
  const ref = useRef(null);
  const { children, tooltip } = props;
  const state = useTooltipTriggerState(props);
  const { triggerProps, tooltipProps } = useTooltipTrigger(props, state, ref);

  // const { tooltipProps } = useTooltip(props, state);

  return (
    <div className="relative" {...triggerProps} ref={ref}>
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
        // after:absolute
        //     after:left-1/2
        //     after:top-full
        //     after:border-8
        //     after:border-transparent
        //     after:border-t-stone-200
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
