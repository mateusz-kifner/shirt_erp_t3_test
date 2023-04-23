import React, { useRef } from "react";
import { useReducedMotion, useForceUpdate, useDidUpdate } from "@mantine/hooks";
import { type NotificationsPositioning } from "../types";
import {
  notifications as GlobalNotifications,
  NotificationsEvents,
  useNotificationsEvents,
} from "../events";
import getPositionStyles from "./get-position-styles";
import useNotificationsState from "./use-notifications-state";
import NotificationContainer from "../NotificationContainer/NotificationContainer";
import { Transition } from "@headlessui/react";
import Portal from "~/components/Portal";
import getNotificationStateStyles from "./get-notification-state-styles";

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
  containerWidth = 1616,
  notificationMaxHeight = 800,
  limit = 5,
  zIndex = 10000,
  style,
  children,
  ...others
}) => {
  const forceUpdate = useForceUpdate();
  const refs = useRef<Record<string, HTMLDivElement>>({});
  const previousLength = useRef<number>(0);
  const {
    notifications,
    showNotification,
    updateNotification,
    hideNotification,
    clean,
    cleanQueue,
  } = useNotificationsState({ limit });

  const duration = transitionDuration;

  const positioning = (
    POSITIONS.includes(position) ? position : "bottom-right"
  ).split("-") as NotificationsPositioning;

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
      <NotificationContainer
        innerRef={(node) => {
          // @ts-ignore
          refs.current[notification.id] = node;
        }}
        notification={notification}
        onHide={hideNotification}
        // className={""}
        // style={{
        //   ...getNotificationStateStyles({
        //     positioning,
        //     transitionDuration: duration,
        //     maxHeight: notificationMaxHeight,
        //   }),
        // }}
        autoClose={autoClose}
      />
    </Transition>
  ));
  console.log(getPositionStyles(positioning, "0.5rem"));
  return (
    <Portal>
      <div
        className="fixed"
        style={{
          maxWidth: containerWidth,
          ...getPositionStyles(positioning, "0.5rem"),
        }}
      >
        {items}
      </div>
    </Portal>
  );
};
