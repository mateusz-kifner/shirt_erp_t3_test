import { type Dispatch, type SetStateAction, useEffect, useState } from "react";

function useLocalStorageString(
  key: string,
  initialValue = ""
): [string, Dispatch<SetStateAction<string>>] {
  const [value, setValue] = useState<string>(() => {
    const storedValue =
      typeof window !== "undefined" ? localStorage.getItem(key) : null;
    return storedValue !== null ? storedValue : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorageString;
