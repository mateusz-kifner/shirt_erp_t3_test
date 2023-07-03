import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
  variant?: "outline" | "primary";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    children,
    leftSection,
    rightSection,
    className,
    variant = "primary",
    ...moreProps
  } = props;

  return (
    <button
      className={`button ${variant === "outline" ? "button-outline" : ""} 
      ${variant === "primary" ? "button-primary" : ""}
      ${className ?? ""}`}
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
