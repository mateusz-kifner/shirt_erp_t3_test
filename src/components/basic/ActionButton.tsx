import React, { useRef } from "react";
import { type AriaButtonProps, useButton } from "react-aria";

interface ActionButtonProps extends AriaButtonProps {
  className: string;
}

function ActionButton(props: ActionButtonProps) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const { buttonProps } = useButton(props, ref);
  const { children, className } = props;
  return (
    <button
      {...buttonProps}
      className={`
        inline-flex 
        animate-pop
        items-center 
        justify-center 
        gap-3 
        border 
        stroke-gray-200
        font-semibold  
        uppercase 
        text-gray-200 
        no-underline  
        outline-offset-4 
        transition-all
        hover:bg-black 
        hover:bg-opacity-30 focus-visible:outline-sky-600  
        active:hover:scale-95 
        active:hover:animate-none
        active:focus:scale-95 
        active:focus:animate-none 
        ${className ?? ""}`}
      ref={ref}
    >
      {children}
    </button>
  );
}

export default ActionButton;
