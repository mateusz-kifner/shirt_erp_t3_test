import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import { IconMenu2 } from "@tabler/icons-react";
import { type ReactNode } from "react";
import ActionButton from "./ActionButton";

interface MenuProps {
  children: ReactNode;
}

const Menu = (props: MenuProps) => {
  const { children } = props;
  return (
    <RadixDropdownMenu.Root>
      <RadixDropdownMenu.Trigger asChild>
        <ActionButton>
          <IconMenu2 />
        </ActionButton>
      </RadixDropdownMenu.Trigger>

      <RadixDropdownMenu.Portal>
        <RadixDropdownMenu.Content
          className="data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform]"
          sideOffset={5}
        >
          {children}
          {/* <RadixDropdownMenu.Sub>
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
               
              </RadixDropdownMenu.SubContent>
            </RadixDropdownMenu.Portal>
          </RadixDropdownMenu.Sub> */}

          <RadixDropdownMenu.Arrow className="fill-white" />
        </RadixDropdownMenu.Content>
      </RadixDropdownMenu.Portal>
    </RadixDropdownMenu.Root>
  );
};

interface MenuItemProps {
  children: ReactNode;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
}

const MenuItem = (props: MenuItemProps) => {
  const { children, leftSection, rightSection } = props;
  return (
    <RadixDropdownMenu.Item className="text-violet11 data-[disabled]:text-mauve8 data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 group relative flex h-[25px] select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] leading-none outline-none data-[disabled]:pointer-events-none">
      {!!leftSection && (
        <div className="text-mauve11 group-data-[disabled]:text-mauve8 ml-auto pl-[20px] group-data-[highlighted]:text-white">
          {leftSection}
        </div>
      )}
      {children}
      {!!rightSection && (
        <div className="text-mauve11 group-data-[disabled]:text-mauve8 ml-auto pl-[20px] group-data-[highlighted]:text-white">
          {rightSection}
        </div>
      )}
    </RadixDropdownMenu.Item>
  );
};

const MenuSeparator = () => (
  <RadixDropdownMenu.Separator className="bg-violet6 m-[5px] h-[1px]" />
);

const MenuLabel = ({ children }: { children: ReactNode }) => (
  <RadixDropdownMenu.Label className="text-mauve11 pl-[25px] text-xs leading-[25px]">
    {children}
  </RadixDropdownMenu.Label>
);

Menu.Item = MenuItem;
Menu.Separator = MenuSeparator;
Menu.Label = MenuLabel;

export default Menu;
