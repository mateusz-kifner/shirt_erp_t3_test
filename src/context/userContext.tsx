import { useLocalStorage } from "@mantine/hooks";
import {
  createContext,
  type ReactNode,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";

interface UserContextType {
  debug: boolean;
  navigationCollapsed: boolean;
  toggleNavigationCollapsed: () => void;
  setNavigationCollapsed: Dispatch<SetStateAction<boolean>>;
  toggleDebug: () => void;
}

export const UserContext = createContext<UserContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [debug, setDebug] = useLocalStorage<boolean>({
    key: "user-debug",
    defaultValue: false,
  });
  const [navigationCollapsed, setNavigationCollapsed] =
    useLocalStorage<boolean>({
      key: "user-navigation-collapsed",
      defaultValue: false,
    });
  // const [secondNavigation, setSecondNavigation] = useLocalStorage<boolean>({
  //   key: "user-navigation-second",
  //   defaultValue: false,
  // });

  // const smallerThanSM = useMediaQuery(
  //   `(max-width: ${theme.breakpoints.md}px)`,
  //   true
  // );
  // const hasTouch = useMediaQuery(
  //   "only screen and (hover: none) and (pointer: coarse)"
  // );

  return (
    <UserContext.Provider
      value={{
        debug,
        navigationCollapsed,
        toggleNavigationCollapsed: () => setNavigationCollapsed((val) => !val),
        setNavigationCollapsed,
        toggleDebug: () => setDebug((val) => !val),
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export function useUserContext(): UserContextType {
  const state = useContext(UserContext);
  if (!state) {
    throw new Error(
      `ERROR: Auth reached logged-in-only component with null 'user' in context`
    );
  }
  return state;
}
