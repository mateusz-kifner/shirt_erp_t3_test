import React from "react";
import * as RadixSwitch from "@radix-ui/react-switch";

function Switch() {
  return (
    <RadixSwitch.Root className="SwitchRoot">
      <RadixSwitch.Thumb className="SwitchThumb" />
    </RadixSwitch.Root>
  );
}

export default Switch;
