import { useState } from "react";

export function useToggle<V extends string>(
  initialValue: boolean = false,
  varName: V = "value" as V,
) {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue((prev) => !prev);

  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);

  return {
    [varName]: value,
    setTrue,
    setFalse,
    toggle,
  } as {
    [K in V]: boolean;
  } & {
    setTrue: () => void;
    setFalse: () => void;
    toggle: () => void;
  };
}
