import React from "react";
import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import { IconChevronRight, IconMenu2 } from "@tabler/icons-react";

const Menu = () => {
  return (
    <RadixDropdownMenu.Root>
      <RadixDropdownMenu.Trigger asChild>
        <button
          className="text-violet11 inline-flex h-[35px] w-[35px] items-center justify-center rounded-full bg-stone-800 shadow-[0_2px_10px] shadow-stone-800 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
          aria-label="Customise options"
        >
          <IconMenu2 />
        </button>
      </RadixDropdownMenu.Trigger>

      <RadixDropdownMenu.Portal>
        <RadixDropdownMenu.Content
          className="data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform]"
          sideOffset={5}
        >
          <RadixDropdownMenu.Item className="text-violet11 data-[disabled]:text-mauve8 data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 group relative flex h-[25px] select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] leading-none outline-none data-[disabled]:pointer-events-none">
            New Tab{" "}
            <div className="text-mauve11 group-data-[disabled]:text-mauve8 ml-auto pl-[20px] group-data-[highlighted]:text-white">
              ⌘+T
            </div>
          </RadixDropdownMenu.Item>
          <RadixDropdownMenu.Item className="text-violet11 data-[disabled]:text-mauve8 data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 group relative flex h-[25px] select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] leading-none outline-none data-[disabled]:pointer-events-none">
            New Window{" "}
            <div className="text-mauve11 group-data-[disabled]:text-mauve8 ml-auto pl-[20px] group-data-[highlighted]:text-white">
              ⌘+N
            </div>
          </RadixDropdownMenu.Item>
          <RadixDropdownMenu.Item
            className="text-violet11 data-[disabled]:text-mauve8 data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 group relative flex h-[25px] select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] leading-none outline-none data-[disabled]:pointer-events-none"
            disabled
          >
            New Private Window{" "}
            <div className="text-mauve11 group-data-[disabled]:text-mauve8 ml-auto pl-[20px] group-data-[highlighted]:text-white">
              ⇧+⌘+N
            </div>
          </RadixDropdownMenu.Item>
          <RadixDropdownMenu.Sub>
            <RadixDropdownMenu.SubTrigger className="text-violet11 data-[state=open]:bg-violet4 data-[state=open]:text-violet11 data-[disabled]:text-mauve8 data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 data-[highlighted]:data-[state=open]:bg-violet9 data-[highlighted]:data-[state=open]:text-violet1 group relative flex h-[25px] select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] leading-none outline-none data-[disabled]:pointer-events-none">
              More Tools
              <div className="text-mauve11 group-data-[disabled]:text-mauve8 ml-auto pl-[20px] group-data-[highlighted]:text-white">
                <IconChevronRight />
              </div>
            </RadixDropdownMenu.SubTrigger>
            <RadixDropdownMenu.Portal>
              <RadixDropdownMenu.SubContent
                className="data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform]"
                sideOffset={2}
                alignOffset={-5}
              >
                <RadixDropdownMenu.Item className="text-violet11 data-[disabled]:text-mauve8 data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 group relative flex h-[25px] select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] leading-none outline-none data-[disabled]:pointer-events-none">
                  Save Page As…{" "}
                  <div className="text-mauve11 group-data-[disabled]:text-mauve8 ml-auto pl-[20px] group-data-[highlighted]:text-white">
                    ⌘+S
                  </div>
                </RadixDropdownMenu.Item>
                <RadixDropdownMenu.Item className="text-violet11 data-[disabled]:text-mauve8 data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 relative flex h-[25px] select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] leading-none outline-none data-[disabled]:pointer-events-none">
                  Create Shortcut…
                </RadixDropdownMenu.Item>
                <RadixDropdownMenu.Item className="text-violet11 data-[disabled]:text-mauve8 data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 relative flex h-[25px] select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] leading-none outline-none data-[disabled]:pointer-events-none">
                  Name Window…
                </RadixDropdownMenu.Item>
                <RadixDropdownMenu.Separator className="bg-violet6 m-[5px] h-[1px]" />
                <RadixDropdownMenu.Item className="text-violet11 data-[disabled]:text-mauve8 data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 relative flex h-[25px] select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] leading-none outline-none data-[disabled]:pointer-events-none">
                  Developer Tools
                </RadixDropdownMenu.Item>
              </RadixDropdownMenu.SubContent>
            </RadixDropdownMenu.Portal>
          </RadixDropdownMenu.Sub>

          <RadixDropdownMenu.Separator className="bg-violet6 m-[5px] h-[1px]" />

          <RadixDropdownMenu.Separator className="bg-violet6 m-[5px] h-[1px]" />

          <RadixDropdownMenu.Label className="text-mauve11 pl-[25px] text-xs leading-[25px]">
            People
          </RadixDropdownMenu.Label>

          <RadixDropdownMenu.Arrow className="fill-white" />
        </RadixDropdownMenu.Content>
      </RadixDropdownMenu.Portal>
    </RadixDropdownMenu.Root>
  );
};

export default Menu;
