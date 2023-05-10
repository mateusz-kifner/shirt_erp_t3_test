import React from "react";

import * as RadixSeparator from "@radix-ui/react-separator";

// RadixSeparator.SeparatorProps extends PrimitiveDivProps {
//   /**
//    * Either `vertical` or `horizontal`. Defaults to `horizontal`.
//    */
//   orientation?: Orientation;
//   /**
//    * Whether or not the component is purely decorative. When true, accessibility-related attributes
//    * are updated so that that the rendered element is removed from the accessibility tree.
//    */
//   decorative?: boolean;
// }

function Separator(props: RadixSeparator.SeparatorProps) {
  return (
    <RadixSeparator.Root
      className="my-[15px] bg-gray-500 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px"
      {...props}
    />
  );
}

export default Separator;
