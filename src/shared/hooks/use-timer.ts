import { useEffect, useRef, useState } from "react";

export function useTimer(initialDuration: number = 2000) {
  const [isActive, setIsActive] = useState(false);
  const [duration, setDuration] = useState(initialDuration);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startTimer = () => {
    setIsActive(true);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setIsActive(false);
      timerRef.current = null;
    }, duration);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  return {
    isActive,
    start: startTimer,
    setDuration: setDuration,
  };
}
