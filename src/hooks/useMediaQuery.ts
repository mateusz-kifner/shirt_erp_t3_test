import { useState, useEffect, useRef } from "react";

export interface UseMediaQueryOptions {
  getInitialValueInEffect: boolean;
}

type MediaQueryCallback = (event: { matches: boolean; media: string }) => void;

/**
 * Older versions of Safari (shipped withCatalina and before) do not support addEventListener on matchMedia
 * https://stackoverflow.com/questions/56466261/matchmedia-addlistener-marked-as-deprecated-addeventlistener-equivalent
 * */
function attachMediaListener(
  query: MediaQueryList,
  callback: MediaQueryCallback
) {
  try {
    query.addEventListener("change", callback);
    return () => query.removeEventListener("change", callback);
  } catch (e) {
    query.addListener(callback);
    return () => query.removeListener(callback);
  }
}

function getInitialValue(query: string, initialValue?: boolean) {
  if (typeof initialValue === "boolean") {
    return initialValue;
  }

  if (typeof window !== "undefined" && "matchMedia" in window) {
    return window.matchMedia(query).matches;
  }

  return false;
}

export function useMediaQuery(
  query: string,
  initialValue?: boolean,
  { getInitialValueInEffect }: UseMediaQueryOptions = {
    getInitialValueInEffect: true,
  }
) {
  const [matches, setMatches] = useState(
    getInitialValueInEffect
      ? initialValue
      : getInitialValue(query, initialValue)
  );
  const queryRef = useRef<MediaQueryList>();

  useEffect(() => {
    if ("matchMedia" in window) {
      queryRef.current = window.matchMedia(query);
      setMatches(queryRef.current.matches);
      return attachMediaListener(queryRef.current, (event) =>
        setMatches(event.matches)
      );
    }

    return undefined;
  }, [query]);

  return matches;
}

/**

from package @mantine/hooks

MIT License

Copyright (c) 2021 Vitaly Rtishchev

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
