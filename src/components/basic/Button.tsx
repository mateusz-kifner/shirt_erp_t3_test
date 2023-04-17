import React, { type ButtonHTMLAttributes, type ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
}

function Button(props: ButtonProps) {
  const { children, leftSection, rightSection, className, ...moreProps } =
    props;
  return (
    <button
      className={`border-1 inline-flex h-10 animate-pop items-center justify-center
          gap-3 rounded-md bg-blue-600 stroke-gray-200 p-0 px-4 font-semibold uppercase
        text-gray-200 no-underline transition-all  hover:bg-blue-700 
          active:hover:scale-95  active:hover:animate-none 
          active:focus:scale-95 active:focus:animate-none 
          disabled:pointer-events-none disabled:bg-stone-700 
          ${className ?? ""}
            `}
      {...moreProps}
    >
      {!!leftSection && leftSection}
      {children}
      {!!rightSection && rightSection}
    </button>
  );
}

export default Button;
