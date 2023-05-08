import React, { forwardRef } from "react";
import * as RadixSelect from "@radix-ui/react-select";
import { IconCheck, IconChevronDown, IconChevronUp } from "@tabler/icons-react";

function Select() {
  return (
    <RadixSelect.Root>
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
          py-0 font-semibold 
          uppercase 
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
            <RadixSelect.Group>
              <RadixSelect.Label className="SelectLabel">
                Fruits
              </RadixSelect.Label>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </RadixSelect.Group>

            <RadixSelect.Separator className="my-2 border-b border-solid border-b-stone-400 dark:border-b-stone-600" />

            <RadixSelect.Group>
              <RadixSelect.Label className="SelectLabel">
                Vegetables
              </RadixSelect.Label>
              <SelectItem value="aubergine">Aubergine</SelectItem>
              <SelectItem value="broccoli">Broccoli</SelectItem>
              <SelectItem value="carrot" disabled>
                Carrot
              </SelectItem>
              <SelectItem value="courgette">Courgette</SelectItem>
              <SelectItem value="leek">Leek</SelectItem>
            </RadixSelect.Group>

            <RadixSelect.Separator className="SelectSeparator" />

            <RadixSelect.Group>
              <RadixSelect.Label className="SelectLabel">
                Meat
              </RadixSelect.Label>
              <SelectItem value="beef">Beef</SelectItem>
              <SelectItem value="chicken">Chicken</SelectItem>
              <SelectItem value="lamb">Lamb</SelectItem>
              <SelectItem value="pork">Pork</SelectItem>
            </RadixSelect.Group>
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
