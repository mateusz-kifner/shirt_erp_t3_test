import React, {
  type ButtonHTMLAttributes,
  type PropsWithChildren,
} from "react";

function ActionButton(
  props: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>
) {
  const { children, className, ...moreProps } = props;
  return (
    <button
      className={`border-1 inline-flex animate-pop items-center justify-center
gap-3 rounded-md  stroke-gray-200 p-1 font-semibold uppercase
text-gray-200 no-underline transition-all  
hover:bg-black hover:bg-opacity-30
active:focus:scale-95 active:focus:animate-none 
active:hover:scale-95 active:hover:animate-none ${className ?? ""}`}
      {...moreProps}
    >
      {children}
    </button>
  );
}

export default ActionButton;
