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
    <button className={`button ${className ?? ""}`} {...moreProps} ref={ref}>
      {!!leftSection && leftSection}
      {children}
      {!!rightSection && rightSection}
    </button>
  );
});

Button.displayName = "Button";
export default Button;
