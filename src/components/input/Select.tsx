import React, { forwardRef, useId } from "react";
import * as RadixSelect from "@radix-ui/react-select";
import { IconCheck, IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import useTranslation from "~/hooks/useTranslation";

interface SelectProps extends RadixSelect.SelectProps {
  data: string[] | { [key: string]: string[] };
}

function Select(props: SelectProps) {
  const { data, ...moreProps } = props;
  const t = useTranslation();
  const uuid = useId();
  let items;
  if (Array.isArray(data)) {
    items = data.map((val, index) => (
      <SelectItem value={val} key={`${uuid}_${index}`}>
        {(t[val as keyof typeof t] as string | undefined) ?? val}
      </SelectItem>
    ));
  } else {
    items = Object.keys(data).map((key, keyIndex) => (
      <>
        {keyIndex !== 0 && (
          <RadixSelect.Separator className="my-2 border-b border-solid border-b-stone-400 dark:border-b-stone-600" />
        )}
        <RadixSelect.Group key={`${uuid}_${keyIndex}`}>
          <RadixSelect.Label>{key}</RadixSelect.Label>
          {data[key]!.map((val, valIndex) => (
            <SelectItem value={val} key={`${uuid}_${key}_${valIndex}`}>
              {(t[val as keyof typeof t] as string | undefined) ?? val}
            </SelectItem>
          ))}
        </RadixSelect.Group>
      </>
    ));
  }

  return (
    <RadixSelect.Root {...moreProps}>
      <RadixSelect.Trigger
        className=" border-1 
          inline-flex
          h-10
          animate-pop 
          select-none 
          items-center 
          justify-center 
          gap-3
          rounded-md
          bg-stone-200
        stroke-gray-200
          px-4 
          py-0
          font-semibold 
          text-gray-200 
          no-underline
          outline-offset-4 
          transition-all
          hover:bg-stone-400  
          focus-visible:outline-sky-600  
          active:hover:scale-95 
          active:hover:animate-none 
          active:focus:scale-95 
          active:focus:animate-none 
          disabled:pointer-events-none 
          disabled:bg-stone-700 
          dark:bg-stone-800 
          dark:hover:bg-stone-600	"
      >
        <RadixSelect.Value placeholder="Select ..." />
        <RadixSelect.Icon className="">
          <IconChevronDown />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content className="rounded-xl bg-stone-200 p-3 shadow-xl dark:bg-stone-800">
          <RadixSelect.ScrollUpButton className="">
            <IconChevronUp />
          </RadixSelect.ScrollUpButton>
          <RadixSelect.Viewport className="SelectViewport">
            {items}
          </RadixSelect.Viewport>
          <RadixSelect.ScrollDownButton className="SelectScrollButton">
            <IconChevronDown />
          </RadixSelect.ScrollDownButton>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
}
type SelectItem = RadixSelect.SelectItemProps;

const SelectItem = forwardRef<HTMLDivElement, SelectItem>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <RadixSelect.Item
        className={`
          flex
          select-none
          gap-2
          rounded-sm
          px-2
          py-1
          data-[highlighted]:bg-black
          data-[highlighted]:bg-opacity-20
          data-[highlighted]:outline-none
          ${className}`}
        {...props}
        ref={forwardedRef}
      >
        <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
        <RadixSelect.ItemIndicator>
          <IconCheck />
        </RadixSelect.ItemIndicator>
      </RadixSelect.Item>
    );
  }
);
SelectItem.displayName = "SelectItem";

export default Select;
