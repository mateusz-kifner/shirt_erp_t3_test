import { useQueue, randomId } from "@mantine/hooks";
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
} from "react";
import Portal from "../components/Portal";

export interface NotificationProps {
  id?: string;
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

interface NotificationsProviderProps {
  limit?: number;
  positioning?: NotificationsPositioning;
}

interface NotificationsContextValue {
  notifications: NotificationProps[];
  showNotification: (notification: NotificationProps) => void;
  hideNotification: (id: string) => void;
}

const NotificationsContext = createContext<
  NotificationsContextValue | undefined
>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationsContext);

  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationsProvider"
    );
  }

  return context;
};

const NotificationsProvider = ({
  limit = 50,
  positioning = ["top", "right"],
  children,
}: PropsWithChildren<NotificationsProviderProps>) => {
  const { notifications, showNotification, hideNotification } =
    useNotificationsState({ limit });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        hideNotification(notifications[notifications.length - 1]?.id || "");
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [hideNotification, notifications]);

  const portalTarget = document.body;
  const [positionY, positionX] = positioning;

  return (
    <NotificationsContext.Provider
      value={{ notifications, showNotification, hideNotification }}
    >
      {children}
      <Portal target={portalTarget}>
        <div
          style={{
            position: "fixed",
            zIndex: 10000,
            [positionY]: 20,
            [positionX]: 20,
          }}
        >
          {notifications.map((notification) => (
            <div key={notification.id}>{notification.message}</div>
          ))}
        </div>
      </Portal>
    </NotificationsContext.Provider>
  );
};

export default NotificationsProvider;
