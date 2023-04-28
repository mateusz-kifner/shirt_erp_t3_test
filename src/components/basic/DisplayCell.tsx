import React, { type ButtonHTMLAttributes, type ReactNode } from "react";

interface DisplayCellProps extends ButtonHTMLAttributes<HTMLDivElement> {
  leftSection?: ReactNode;
  rightSection?: ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
}

const DisplayCell = (props: DisplayCellProps) => {
  const {
    leftSection,
    rightSection,
    children,
    disabled = false,
    className,
    ...moreProps
  } = props;
  return (
    <div
      className={`
        relative
        flex
        h-11 
        max-h-screen
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
        border-gray-400
        bg-white
        p-2
        text-sm
        leading-normal
        outline-none
        read-only:bg-transparent
        read-only:outline-none
        focus:border-sky-600 
        dark:border-stone-600 
        dark:bg-stone-800
        dark:outline-none
        dark:read-only:bg-transparent
        dark:read-only:outline-none
        dark:focus:border-sky-600 
        [&>*]:stroke-gray-400 
        [&>*]:dark:stroke-stone-600 
      ${className ?? ""} ${disabled ? " bg-transparent text-gray-500" : ""}`}
      {...moreProps}
    >
      {!!leftSection && leftSection}
      <div className="flex-grow">{children}</div>
      {!!rightSection && rightSection}
    </div>
  );
};

export default DisplayCell;
