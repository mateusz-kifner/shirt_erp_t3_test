import { type Dispatch, type SetStateAction, useEffect, useState } from "react";

export function useSimpleLocalStorage(
  key: string,
  initialValue = ""
): [string, Dispatch<SetStateAction<string>>] {
  // Retrieve the value from localStorage, or use the initial value
  const [value, setValue] = useState<string>(() => {
    const storedValue =
      typeof window !== "undefined" ? localStorage.getItem(key) : null;
    return storedValue !== null ? storedValue : initialValue;
  });

  // Update localStorage whenever the value changes
  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
}
