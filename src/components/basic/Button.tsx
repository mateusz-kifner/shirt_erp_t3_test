import React, { type ReactNode } from "react";
import { type AriaButtonProps, useButton } from "react-aria";
import { useRef } from "react";

interface ButtonProps extends AriaButtonProps {
  className?: string;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
}

function Button(props: ButtonProps) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const { buttonProps } = useButton(props, ref);
  const { children, leftSection, rightSection, className } = props;

  return (
    <button
      {...buttonProps}
      className={`
          border-1 
          inline-flex
          h-10
          animate-pop 
          select-none 
          items-center 
          justify-center 
          gap-3
          rounded-md
          bg-blue-600
          stroke-gray-200 
          px-4 py-0 
          font-semibold 
          uppercase 
          text-gray-200
          no-underline 
          outline-offset-4
          transition-all  
          hover:bg-blue-700 
          focus-visible:outline-sky-600 
          active:hover:scale-95 
          active:hover:animate-none 
          active:focus:scale-95 
          active:focus:animate-none 
          disabled:pointer-events-none 
          disabled:bg-stone-700	
          ${className ?? ""}
            `}
      ref={ref}
    >
      {!!leftSection && leftSection}
      {children}
      {!!rightSection && rightSection}
    </button>
  );
}

export default Button;
