import { useCallback, useEffect, useState } from "react";

type BreakPoint<V extends string> = Record<number, V>;

export function useViewPort<V extends string>(breakpoint: BreakPoint<V>) {
  const sortedBreakPoint = Object.entries(breakpoint).sort((a, b) => parseInt(a[0]) - parseInt(b[0]));

  const evaluateViewpot = useCallback(
    (width: number) => {
      for (const [key, value] of sortedBreakPoint) {
        if (width < parseInt(key)) {
          return value;
        }
      }
      return null;
    },
    [sortedBreakPoint],
  );

  const [viewport, setViewport] = useState<V | null>(evaluateViewpot(window.innerWidth));

  useEffect(() => {
    const handleResize = () => {
      setViewport(evaluateViewpot(window.innerWidth));
    };
    const ctrl = new AbortController();

    window.addEventListener("resize", handleResize, { signal: ctrl.signal });

    return () => {
      ctrl.abort();
    };
  }, [evaluateViewpot]);

  return viewport;
}
