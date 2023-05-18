import React, { forwardRef, type HTMLAttributes, type ReactNode } from "react";

interface DisplayCellProps extends HTMLAttributes<HTMLDivElement> {
  leftSection?: ReactNode;
  rightSection?: ReactNode;
  children: React.ReactNode;
  focus?: boolean;
  disabled?: boolean;
}

const DisplayCell = forwardRef<HTMLDivElement, DisplayCellProps>(
  (props, ref) => {
    const {
      leftSection,
      rightSection,
      children,
      disabled = false,
      focus = false,
      className,
      ...moreProps
    } = props;
    return (
      <div
        className={`
        relative
        flex
        min-h-[2.75rem]
        w-full
        resize-none
        items-center
        gap-2 
        overflow-hidden
        whitespace-pre-line 
        break-words
        rounded
        border
        border-solid
        bg-white
        text-sm
        leading-normal
        text-gray-400
        outline-none
        read-only:bg-transparent 
        read-only:outline-none 
        focus:border-sky-600 
        dark:bg-stone-800
        dark:text-stone-600
        dark:outline-none
        dark:read-only:bg-transparent 
        dark:read-only:outline-none 
      dark:focus:border-sky-600 
      ${className ?? ""} ${disabled ? " bg-transparent text-gray-500" : ""} 
      ${
        focus
          ? "border-sky-600 dark:border-sky-600"
          : "border-gray-400 dark:border-stone-600"
      }
      `}
        {...moreProps}
        ref={ref}
      >
        {!!leftSection && leftSection}
        <div className="flex flex-grow items-center text-stone-800 dark:text-stone-200">
          {children}
        </div>
        {!!rightSection && rightSection}
      </div>
    );
  }
);

DisplayCell.displayName = "DisplayCell";

export default DisplayCell;
