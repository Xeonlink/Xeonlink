import { CheckCircleIcon, CopyIcon, OctagonXIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { useState } from "react";
import { useTimer } from "../hooks/use-timer";
import { Button } from "./ui/button";

export function CopyButton(props: ComponentProps<typeof Button> & { textToCopy: string }) {
  const { textToCopy, ...rest } = props;
  const [canCopy, setCanCopy] = useState(true);
  const timer = useTimer();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      timer.start();
    } catch {
      setCanCopy(false);
    }
  };

  return (
    <Button size="icon" onClick={handleCopy} variant="ghost" {...rest}>
      {!timer.isActive && canCopy ? (
        <>
          <CopyIcon className="size-4" />
          <span className="sr-only">Copy to clipboard</span>
        </>
      ) : null}
      {timer.isActive && canCopy ? (
        <>
          <CheckCircleIcon className="size-4" />
          <span className="sr-only">Copied!</span>
        </>
      ) : null}
      {!canCopy ? (
        <>
          <OctagonXIcon className="size-4 text-red-500" />
          <span className="sr-only">Clipboard unavailable</span>
        </>
      ) : null}
    </Button>
  );
}
