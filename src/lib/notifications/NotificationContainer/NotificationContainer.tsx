import React, { type CSSProperties, useEffect, useRef, useState } from "react";
import getAutoClose from "./get-auto-close";
import { type NotificationProps } from "../types";
import Button from "~/components/basic/Button";
import { IconBug, IconInfoCircle, IconX } from "@tabler/icons-react";
import { Transition } from "@headlessui/react";

export interface NotificationContainerProps {
  notification: NotificationProps;
  onHide(id: string): void;
  autoClose: false | number;
  innerRef: React.ForwardedRef<HTMLDivElement>;
  style?: CSSProperties;
}

export default function NotificationContainer({
  notification,
  autoClose,
  onHide,
  innerRef,
  style,
  ...others
}: NotificationContainerProps) {
  const {
    autoClose: notificationAutoClose,
    title,
    message,
    icon,
    ...notificationProps
  } = notification;
  const [show, setShow] = useState<boolean>(true);
  const autoCloseTimeout = getAutoClose(
    autoClose,
    notificationAutoClose ?? true
  );
  const hideTimeout = useRef<number>();

  console.log(autoCloseTimeout);

  const handleHide = () => {
    onHide(notification.id as string);
    window.clearTimeout(hideTimeout.current);
  };

  const cancelDelayedHide = () => {
    clearTimeout(hideTimeout.current);
  };

  const handleDelayedHide = () => {
    if (typeof autoCloseTimeout === "number") {
      console.log(autoCloseTimeout);
      hideTimeout.current = window.setTimeout(
        () => setShow(false),
        autoCloseTimeout
      );
    }
  };

  useEffect(() => {
    if (typeof notification.onOpen === "function") {
      notification.onOpen(notification);
    }
  }, []);

  useEffect(() => {
    handleDelayedHide();
    return cancelDelayedHide;
  }, [autoClose, notification.autoClose]);

  return (
    <Transition
      key={notification.id}
      show={show}
      appear={true}
      enter="transition-opacity duration-150"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      afterLeave={handleHide}
      afterEnter={handleDelayedHide}
    >
      <div
        // onClose={handleHide}
        onMouseEnter={cancelDelayedHide}
        onMouseLeave={handleDelayedHide}
        ref={innerRef}
        className="flex w-96 items-center rounded-lg bg-white p-4 text-gray-500 shadow dark:bg-gray-800 dark:text-gray-400"
        role="alert"
        style={style}
      >
        <div className="flex w-80 flex-nowrap items-center justify-between gap-2 overflow-hidden">
          <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-500 dark:bg-blue-800 dark:text-blue-200">
            {icon ?? <IconInfoCircle />}
          </div>
          <div className="flex-shrink flex-grow">
            <div className="whitespace-pre-wrap break-words text-left text-sm font-normal text-black dark:text-white">
              {title}
            </div>
            <div className="whitespace-pre-wrap break-words text-left text-sm font-normal text-stone-700 dark:text-gray-300">
              {message}
            </div>
          </div>
        </div>
        <button
          className={`border-1 inline-flex h-8 w-8 animate-pop items-center justify-center
           rounded-md bg-transparent stroke-gray-200 p-0 font-semibold uppercase
         text-stone-700 no-underline  transition-all 
          disabled:pointer-events-none  disabled:bg-stone-700 
          hover:bg-black hover:bg-opacity-20 active:focus:scale-95 
          active:focus:animate-none active:hover:scale-95 active:hover:animate-none dark:text-gray-200`}
          onClick={() => setShow(false)}
        >
          <span className="sr-only">Close</span>
          <IconX />
        </button>
      </div>
    </Transition>
  );
}
