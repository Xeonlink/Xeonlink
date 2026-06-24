import { cn } from "@/shared/lib/utils";
import { LinkIcon as LucideLinkIcon } from "lucide-react";
import type { ComponentProps } from "react";

export function ExternalLink(props: ComponentProps<"a">) {
  const { children, ...rest } = props;

  return (
    <a target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}

export function LinkIcon(props: ComponentProps<typeof LucideLinkIcon>) {
  const { className, ...rest } = props;
  return <LucideLinkIcon className={cn("inline-block size-5 align-baseline", className)} {...rest} />;
}
