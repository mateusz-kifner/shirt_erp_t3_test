import React, { type ButtonHTMLAttributes, forwardRef } from "react";

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  (props, ref) => {
    const { children, className, ...moreProps } = props;
    return (
      <button
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
);

ActionButton.displayName = "ActionButton";

export default ActionButton;
