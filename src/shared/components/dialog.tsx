import { cva, VariantProps } from "class-variance-authority";
import type { ComponentProps, MouseEvent } from "react";
import { Portal } from "./portal";

const DialogVariants = cva(
  "size-full max-h-full max-w-full bg-transparent backdrop:backdrop-blur-xs open:flex",
);

type DialogProps = ComponentProps<"dialog"> &
  VariantProps<typeof DialogVariants>;

export function Dialog(props: DialogProps) {
  const { className, onClick, ...rest } = props;

  const handleClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.currentTarget.nodeName === "DIALOG") {
      e.currentTarget.close();
    }
    onClick?.(e);
  };

  return (
    <Portal>
      <dialog
        {...rest}
        className={DialogVariants({ className })}
        onClick={handleClick}
      />
    </Portal>
  );
}

const DialogContentVariants = cva(
  "bg-background border-border m-auto rounded-xl border p-4",
);

type DialogContentProps = ComponentProps<"div"> &
  VariantProps<typeof DialogContentVariants>;

export function DialogContent(props: DialogContentProps) {
  const { className, onClick, ...rest } = props;

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClick?.(e);
  };

  return (
    <div
      {...rest}
      className={DialogContentVariants({ className })}
      onClick={handleClick}
    />
  );
}
