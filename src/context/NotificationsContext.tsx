import { useQueue, randomId } from "@mantine/hooks";
import Portal from "../components/Portal";

import React, { useRef } from "react";
import { useForceUpdate, useDidUpdate } from "@mantine/hooks";
import { createUseExternalEvents } from "~/utils/createUseExtarnalEvents";
import { Transition } from "@headlessui/react";
import { IconBug, IconX } from "@tabler/icons-react";
import Button from "~/components/basic/Button";

export interface NotificationProps {
  id?: string;
  title?: string;
  message: React.ReactNode;
  autoClose?: boolean | number;
  onClose?(props: NotificationProps): void;
  onOpen?(props: NotificationProps): void;
}

export interface NotificationsContextProps {
  notifications: NotificationProps[];
  queue: NotificationProps[];
}

export type NotificationsPositioning = [
  "top" | "bottom",
  "left" | "right" | "center"
];

export function useNotificationsState({ limit }: { limit: number }) {
  const { state, queue, update, cleanQueue } = useQueue<NotificationProps>({
    initialValues: [],
    limit,
  });

  const showNotification = (notification: NotificationProps) => {
    const id = notification.id || randomId();

    update((notifications) => {
      if (
        notification.id &&
        notifications.some((n) => n.id === notification.id)
      ) {
        return notifications;
      }

      return [...notifications, { ...notification, id }];
    });

    return id;
  };

  const updateNotification = (notification: NotificationProps) =>
    update((notifications) => {
      const index = notifications.findIndex((n) => n.id === notification.id);

      if (index === -1) {
        return notifications;
      }

      const newNotifications = [...notifications];
      newNotifications[index] = notification;

      return newNotifications;
    });

  const hideNotification = (id: string) =>
    update((notifications) =>
      notifications.filter((notification) => {
        if (notification.id === id) {
          typeof notification.onClose === "function" &&
            notification.onClose(notification);
          return false;
        }

        return true;
      })
    );

  const clean = () => update(() => []);

  return {
    notifications: state,
    queue,
    showNotification,
    updateNotification,
    hideNotification,
    cleanQueue,
    clean,
  };
}

export type NotificationsEvents = {
  show(notification: NotificationProps): void;
  hide(id: string): void;
  update(notification: NotificationProps & { id: string }): void;
  clean(): void;
  cleanQueue(): void;
};

export const [useNotificationsEvents, createEvent] =
  createUseExternalEvents<NotificationsEvents>("mantine-notifications");

export const showNotification = createEvent("show");
export const hideNotification = createEvent("hide");
export const cleanNotifications = createEvent("clean");
export const cleanNotificationsQueue = createEvent("cleanQueue");
export const updateNotification = createEvent("update");

export const notifications: NotificationsEvents = {
  show: showNotification,
  hide: hideNotification,
  clean: cleanNotifications,
  cleanQueue: cleanNotificationsQueue,
  update: updateNotification,
};

const POSITIONS = [
  "top-left",
  "top-right",
  "top-center",
  "bottom-left",
  "bottom-right",
  "bottom-center",
] as const;

type NotificationsStaticMethods = NotificationsEvents;

export interface NotificationsProps
  extends React.ComponentPropsWithoutRef<"div"> {
  /** Notifications position */
  position?:
    | "top-left"
    | "top-right"
    | "top-center"
    | "bottom-left"
    | "bottom-right"
    | "bottom-center";

  /** Auto close timeout for all notifications, false to disable auto close, can be overwritten for individual notifications by notifications.show function */
  autoClose?: number | false;

  /** Notification transitions duration, 0 to turn transitions off */
  transitionDuration?: number;

  /** Notification width, cannot exceed 100% */
  containerWidth?: number | string;

  /** Notification max-height, used for transitions */
  notificationMaxHeight?: number | string;

  /** Maximum amount of notifications displayed at a time, other new notifications will be added to queue */
  limit?: number;

  /** Notifications container z-index */
  zIndex?: React.CSSProperties["zIndex"];
}

export const Notifications: React.FC<NotificationsProps> = ({
  className,
  position = "bottom-right",
  autoClose = 4000,
  transitionDuration = 250,
  containerWidth = 1200,
  notificationMaxHeight = 800,
  limit = 5,
  zIndex = 10000,
  style,
  children,
  ...others
}) => {
  const forceUpdate = useForceUpdate();
  const previousLength = useRef<number>(0);
  const {
    notifications,
    showNotification,
    updateNotification,
    hideNotification,
    clean,
    cleanQueue,
  } = useNotificationsState({ limit });

  useDidUpdate(() => {
    if (notifications.length > previousLength.current) {
      setTimeout(() => forceUpdate(), 0);
    }
    previousLength.current = notifications.length;
  }, [notifications]);

  useNotificationsEvents({
    show: showNotification,
    hide: hideNotification,
    update: updateNotification,
    clean,
    cleanQueue,
  });

  const positioning = (
    POSITIONS.includes(position) ? position : "bottom-right"
  ).split("-") as NotificationsPositioning;

  const items = notifications.map((notification) => (
    <Transition
      key={notification.id}
      show={true}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className="flex w-64 max-w-xs items-center rounded-lg bg-white p-4 text-gray-500 shadow dark:bg-gray-800 dark:text-gray-400"
        role="alert"
      >
        <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-500 dark:bg-blue-800 dark:text-blue-200">
          <IconBug />
          <span className="sr-only">Fire icon</span>
        </div>
        <div className="ml-3 text-sm font-normal">Set yourself free.</div>
        <Button onClick={() => hideNotification(notification.id as string)}>
          <span className="sr-only">Close</span>
          <IconX />
        </Button>
      </div>
    </Transition>
  ));

  return <Portal className="fixed left-0 top-0 h-0 w-0">{items}</Portal>;
};
