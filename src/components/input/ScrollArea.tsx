import React, { type HTMLAttributes, type ReactNode } from "react";
import * as RadixScrollArea from "@radix-ui/react-scroll-area";

interface ScrollAreaProps
  extends RadixScrollArea.ScrollAreaProps,
    Omit<HTMLAttributes<HTMLDivElement>, "dir"> {
  children: ReactNode;
}

const ScrollArea = (props: ScrollAreaProps) => {
  const { children, className, ...moreProps } = props;
  return (
    <RadixScrollArea.Root
      className={`overflow-hidden rounded ${className}`}
      {...moreProps}
    >
      <RadixScrollArea.Viewport className="h-full w-full rounded">
        {children}
      </RadixScrollArea.Viewport>
      <RadixScrollArea.Scrollbar
        className="flex touch-none select-none bg-stone-950 p-0.5 transition-colors duration-[160ms] ease-out hover:bg-stone-600 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
        orientation="vertical"
      >
        <RadixScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-stone-600 before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
      </RadixScrollArea.Scrollbar>
      <RadixScrollArea.Scrollbar
        className="flex touch-none select-none bg-stone-950 p-0.5 transition-colors duration-[160ms] ease-out hover:bg-stone-600 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
        orientation="horizontal"
      >
        <RadixScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-stone-600 before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
      </RadixScrollArea.Scrollbar>
      <RadixScrollArea.Corner className="bg-stone-600" />
    </RadixScrollArea.Root>
  );
};

export default ScrollArea;
