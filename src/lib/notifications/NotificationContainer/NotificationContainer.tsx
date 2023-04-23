import React, { useEffect, useRef } from "react";
import getAutoClose from "./get-auto-close";
import { type NotificationProps } from "../types";
import Button from "~/components/basic/Button";
import { IconBug, IconX } from "@tabler/icons-react";

export interface NotificationContainerProps {
  notification: NotificationProps;
  onHide(id: string): void;
  autoClose: false | number;
  innerRef: React.ForwardedRef<HTMLDivElement>;
}

export default function NotificationContainer({
  notification,
  autoClose,
  onHide,
  innerRef,
  ...others
}: NotificationContainerProps) {
  const {
    autoClose: notificationAutoClose,
    message,
    ...notificationProps
  } = notification;
  const autoCloseTimeout = getAutoClose(autoClose, !!notificationAutoClose);
  const hideTimeout = useRef<number>();

  const handleHide = () => {
    onHide(notification.id as string);
    window.clearTimeout(hideTimeout.current);
  };

  const cancelDelayedHide = () => {
    clearTimeout(hideTimeout.current);
  };

  const handleDelayedHide = () => {
    if (typeof autoCloseTimeout === "number") {
      hideTimeout.current = window.setTimeout(handleHide, autoCloseTimeout);
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
    <div
      className="flex w-64 max-w-xs items-center rounded-lg bg-white p-4 text-gray-500 shadow dark:bg-gray-800 dark:text-gray-400"
      role="alert"
    >
      <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-500 dark:bg-blue-800 dark:text-blue-200">
        <IconBug />
        <span className="sr-only">Fire icon</span>
      </div>
      <div className="ml-3 text-sm font-normal">Set yourself free.</div>
      <Button
      // onClick={() => hideNotification(notification.id as string)}
      >
        <span className="sr-only">Close</span>
        <IconX />
      </Button>
    </div>
    // <Notification
    //   {...notificationProps}
    //   {...others}
    //   onClose={handleHide}
    //   onMouseEnter={cancelDelayedHide}
    //   onMouseLeave={handleDelayedHide}
    //   ref={innerRef}
    // >
    //   {message}
    // </Notification>
  );
}
