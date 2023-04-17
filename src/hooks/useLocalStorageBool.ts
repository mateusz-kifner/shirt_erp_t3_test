import { type Dispatch, type SetStateAction, useEffect, useState } from "react";

function useLocalStorageBool(
  key: string,
  initialValue = false
): [boolean, Dispatch<SetStateAction<boolean>>] {
  const [value, setValue] = useState<boolean>(() => {
    const storedValue =
      typeof window !== "undefined" ? localStorage.getItem(key) : null;
    return storedValue !== null ? storedValue === "0" : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, value ? "1" : "0");
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorageBool;
