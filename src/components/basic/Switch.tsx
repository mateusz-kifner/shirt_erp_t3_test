import React from "react";
import * as RadixSwitch from "@radix-ui/react-switch";

type SwitchProps = RadixSwitch.SwitchProps;

function Switch(props: SwitchProps) {
  return (
    <RadixSwitch.Root
      className="relative h-[25px] w-[42px] cursor-default rounded-full bg-stone-800 shadow-[0_2px_10px] shadow-stone-950 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-black"
      {...props}
    >
      <RadixSwitch.Thumb className="block h-[21px] w-[21px] translate-x-0.5 rounded-full bg-white shadow-[0_2px_2px] shadow-stone-950 transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]" />
    </RadixSwitch.Root>
  );
}

export default Switch;
