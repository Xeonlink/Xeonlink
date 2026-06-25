import { useModal } from "@/shared/lib/modal";
import * as Slot from "@radix-ui/react-slot";
import type { ComponentProps, MouseEvent, ReactElement } from "react";

interface ModalTriggerProps extends ComponentProps<"button"> {
  asChild?: boolean;
  render: ReactElement;
}

export function ModalTrigger(props: ModalTriggerProps) {
  const { children, render, asChild = false, onClick, ...rest } = props;
  const modal = useModal();
  const Comp = asChild ? Slot.Root : "button";

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    modal.open(render);
  };

  return (
    <Comp onClick={handleClick} {...rest}>
      {children}
    </Comp>
  );
}
