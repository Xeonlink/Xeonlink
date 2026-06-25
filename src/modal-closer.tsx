"use client";

import type { ComponentProps } from "react";
import { useModal } from "./modal";
import * as Slot from "@radix-ui/react-slot";

interface ModalCloserProps extends ComponentProps<"button"> {
  asChild?: boolean;
}

export function ModalCloser(props: ModalCloserProps) {
  const { asChild, ...rest } = props;
  const modal = useModal();
  const Comp = asChild ? Slot.Root : "button";

  return <Comp onClick={modal.closeSelf} {...rest} />;
}
