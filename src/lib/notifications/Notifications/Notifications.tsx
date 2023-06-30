import Portal from "@/components/Portal";
import { useDidUpdate, useForceUpdate, useReducedMotion } from "@mantine/hooks";
import React, { useRef } from "react";
import NotificationContainer from "../NotificationContainer/NotificationContainer";
import { useNotificationsEvents, type NotificationsEvents } from "../events";
import { type NotificationsPositioning } from "../types";
import getPositionStyles from "./get-position-styles";
import useNotificationsState from "./use-notifications-state";

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
  transitionDuration?:
    | "duration-0"
    | "duration-75"
    | "duration-100"
    | "duration-150"
    | "duration-200"
    | "duration-300"
    | "duration-500"
    | "duration-700"
    | "duration-1000";

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
  transitionDuration = "duration-200",
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
  const reduceMotion = useReducedMotion();
  const duration = reduceMotion ? "duration-0" : transitionDuration;

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
    <NotificationContainer
      key={notification.id}
      innerRef={(node) => {
        // @ts-ignore
        refs.current[notification.id] = node;
      }}
      notification={notification}
      onHide={hideNotification}
      autoClose={autoClose}
    />
  ));

  return (
    <Portal>
      <div
        className="fixed flex flex-col gap-2 transition-all ease-in-out"
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
