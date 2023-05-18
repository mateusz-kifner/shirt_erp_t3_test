import React, { type ReactNode } from "react";
import * as RadixPopover from "@radix-ui/react-popover";
// import { IconX } from "@tabler/icons-react";
// import ActionButton from "./ActionButton";

interface PopoverProps extends RadixPopover.PopoverProps {
  children?: ReactNode;
  trigger?: ReactNode;
  anchor?: ReactNode;
  contentProps?: RadixPopover.PopoverContentProps;
}

const Popover = (props: PopoverProps) => {
  const { children, trigger, anchor, contentProps, ...moreProps } = props;
  return (
    <RadixPopover.Root {...moreProps}>
      {!!trigger && (
        <RadixPopover.Trigger asChild>{trigger}</RadixPopover.Trigger>
      )}
      {!!anchor && <RadixPopover.Anchor asChild>{anchor}</RadixPopover.Anchor>}
      <RadixPopover.Portal>
        <RadixPopover.Content
          className=" rounded bg-stone-200 shadow data-[state=open]:animate-show dark:bg-stone-950"
          sideOffset={5}
          {...contentProps}
        >
          {children}
          {/* <RadixPopover.Close asChild className="absolute right-1 top-1 ">
            <ActionButton
              aria-label="Close"
              className="h-6 w-6 rounded-full border-none"
            >
              <IconX />
            </ActionButton>
          </RadixPopover.Close> */}
          <RadixPopover.Arrow className="fill-stone-200 dark:fill-stone-950" />
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
};

export default Popover;
