import { type ReactNode } from "react";

import * as RadixTooltip from "@radix-ui/react-tooltip";

interface TooltipProps {
  children: ReactNode;
  tooltip: ReactNode;
  position?: "left" | "right" | "top" | "bottom";
  spacing?: number | string;
  withinPortal?: boolean;
  delayDuration?: number;
  disabled?: boolean;
}

function Tooltip(props: TooltipProps) {
  const { tooltip, children, delayDuration = 700, disabled = false } = props;

  if (!tooltip || disabled) return <>{children}</>;

  return (
    <RadixTooltip.Root delayDuration={delayDuration}>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <RadixTooltip.Content
          // className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 select-none rounded-[4px] bg-white px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"

          className="z-10
            rounded-md
            bg-stone-200
            px-3
            py-2
            shadow-lg
            shadow-[rgba(0,0,0,0.3)]
            transition-all
            will-change-[opacity]
            data-[state=delayed-open]:animate-show
            data-[state=instant-open]:animate-show
            dark:bg-stone-800
            "
          sideOffset={5}
        >
          {tooltip}
          <RadixTooltip.Arrow className="fill-stone-200 dark:fill-stone-800" />
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  );
}

export default Tooltip;
