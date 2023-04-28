export default {};

// import {
//   createContext,
//   type ReactNode,
//   useContext,
//   type Dispatch,
//   type SetStateAction,
// } from "react";

// interface WorkspaceContextType {
//   debug: boolean;
//   navigationCollapsed: boolean;
//   theme: number;
//   toggleTheme: () => void;
//   toggleNavigationCollapsed: () => void;
//   setNavigationCollapsed: Dispatch<SetStateAction<boolean>>;
//   toggleDebug: () => void;
// }

// export const WorkspaceContext = createContext<WorkspaceContextType | null>(null);

// export const WorkspaceContextProvider = ({ children }: { children: ReactNode }) => {

//   return (
//     <WorkspaceContext.Provider
//       value={{

//       }}
//     >
//       {children}
//     </WorkspaceContext.Provider>
//   );
// };

// export function useWorkspaceContext(): WorkspaceContextType {
//   const state = useContext(WorkspaceContext);
//   if (!state) {
//     throw new Error(
//       `ERROR: Workspace reached logged-in-only component with null 'Workspace' in context`
//     );
//   }
//   return state;
// }
