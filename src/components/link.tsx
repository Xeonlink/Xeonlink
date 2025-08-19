import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export function Link(props: ComponentProps<"a">) {
  const { children, href, className, ...rest } = props;

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cn("border-underline", className)} {...rest}>
      {children}
    </a>
  );
}
