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
        gap-2
        overflow-hidden 
        whitespace-pre-line
        break-words 
        rounded
        border
        border-solid
        bg-white
        p-2
        text-sm
        leading-normal
        text-stone-800
        outline-none
        read-only:bg-transparent
        read-only:outline-none 
        focus:border-sky-600 
        
        dark:bg-stone-800
        dark:text-stone-200
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
        <div className="flex flex-grow gap-2">
          <div
            className="
          text-gray-400 
          dark:text-stone-600"
          >
            {!!leftSection && leftSection}
          </div>
          <div className="flex flex-grow items-center">{children}</div>
        </div>
        <div
          className="
        text-gray-400 
        dark:text-stone-600"
        >
          {!!rightSection && rightSection}
        </div>
      </div>
    );
  }
);

DisplayCell.displayName = "DisplayCell";

export default DisplayCell;
