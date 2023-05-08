import React, { type ButtonHTMLAttributes, useRef } from "react";
import { type AriaButtonProps, useButton } from "react-aria";

interface ActionButtonProps
  extends AriaButtonProps,
    Omit<
      ButtonHTMLAttributes<HTMLButtonElement>,
      "onBlur" | "onFocus" | "onKeyDown" | "onKeyUp"
    > {
  className: string;
}

function ActionButton(props: ActionButtonProps) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const { buttonProps } = useButton(props, ref);
  const { children, className, ...moreProps } = props;
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
      {...moreProps}
    >
      {children}
    </button>
  );
}

export default ActionButton;
