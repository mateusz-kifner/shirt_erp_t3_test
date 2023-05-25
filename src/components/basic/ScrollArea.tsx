import { type HTMLAttributes, type ReactNode } from "react";

import * as RadixScrollArea from "@radix-ui/react-scroll-area";
import { omit } from "lodash";

interface ScrollAreaProps extends Omit<HTMLAttributes<HTMLDivElement>, "dir"> {
  children: ReactNode;
  rootProps?: RadixScrollArea.ScrollAreaProps;
  viewportProps?: RadixScrollArea.ScrollAreaViewportProps;
  orientation?: "horizontal" | "vertical" | "both";
}

const ScrollArea = (props: ScrollAreaProps) => {
  const {
    children,
    className,
    rootProps,
    viewportProps,
    orientation = "vertical",
    ...moreProps
  } = props;
  return (
    <RadixScrollArea.Root
      className={`overflow-hidden rounded ${className}`}
      {...rootProps}
      {...moreProps}
    >
      <RadixScrollArea.Viewport
        className={`h-full w-full rounded ${viewportProps?.className ?? ""}`}
        {...omit(viewportProps, ["className"])}
      >
        {children}
      </RadixScrollArea.Viewport>
      {(orientation === "vertical" || orientation === "both") && (
        <RadixScrollArea.Scrollbar
          className="flex touch-none select-none rounded bg-white p-0.5 transition-colors duration-[160ms] ease-out data-[orientation=horizontal]:h-2.5  data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col dark:bg-stone-950"
          orientation="vertical"
        >
          <RadixScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-stone-600 before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
        </RadixScrollArea.Scrollbar>
      )}
      {(orientation === "horizontal" || orientation === "both") && (
        <RadixScrollArea.Scrollbar
          className="flex touch-none select-none p-0.5 transition-colors duration-[160ms] ease-out hover:bg-stone-600 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col dark:bg-stone-950"
          orientation="horizontal"
        >
          <RadixScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-stone-600 before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
        </RadixScrollArea.Scrollbar>
      )}
      {orientation === "both" && (
        <RadixScrollArea.Corner className="bg-stone-950" />
      )}
    </RadixScrollArea.Root>
  );
};

export default ScrollArea;
