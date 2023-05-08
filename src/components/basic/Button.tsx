import React, {
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { children, leftSection, rightSection, className, ...moreProps } =
    props;

  return (
    <button
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
      {...moreProps}
      ref={ref}
    >
      {!!leftSection && leftSection}
      {children}
      {!!rightSection && rightSection}
    </button>
  );
});

Button.displayName = "Button";
export default Button;
