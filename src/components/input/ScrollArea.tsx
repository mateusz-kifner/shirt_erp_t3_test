import React, { type ReactNode } from "react";
import * as RadixScrollArea from "@radix-ui/react-scroll-area";

interface ScrollAreaProps extends RadixScrollArea.ScrollAreaProps {
  children: ReactNode;
}

const ScrollArea = (props: ScrollAreaProps) => {
  const { children } = props;
  return (
    <RadixScrollArea.Root className="ScrollAreaRoot">
      <RadixScrollArea.Viewport className="ScrollAreaViewport">
        {children}
      </RadixScrollArea.Viewport>
      <RadixScrollArea.Scrollbar
        className="ScrollAreaScrollbar"
        orientation="vertical"
      >
        <RadixScrollArea.Thumb className="ScrollAreaThumb" />
      </RadixScrollArea.Scrollbar>
      <RadixScrollArea.Scrollbar
        className="ScrollAreaScrollbar"
        orientation="horizontal"
      >
        <RadixScrollArea.Thumb className="ScrollAreaThumb" />
      </RadixScrollArea.Scrollbar>
      <RadixScrollArea.Corner className="ScrollAreaCorner" />
    </RadixScrollArea.Root>
  );
};

export default ScrollArea;
