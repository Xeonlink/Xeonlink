import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type UlProps = ComponentProps<"ul">;

export function Ul(props: UlProps) {
  const { children, className, ...rest } = props;
  return (
    <ul className={cn("ml-8", className)} {...rest}>
      {children}
    </ul>
  );
}

type LiProps = ComponentProps<"li">;

export function Li(props: LiProps) {
  const { children, className, ...rest } = props;
  return (
    <li className={cn("list-disc", className)} {...rest}>
      {children}
    </li>
  );
}
