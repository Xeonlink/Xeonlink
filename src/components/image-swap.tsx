import { cn } from "@/lib/utils";
import { cloneElement, type ComponentProps } from "react";

type ImageSwapProps = ComponentProps<"div"> & {
  children: [React.ReactElement<ComponentProps<"img">>, React.ReactElement<ComponentProps<"img">>];
};

export function ImageSwap(props: ImageSwapProps) {
  const { children, className, ...rest } = props;

  return (
    <div className={cn("group relative flex flex-wrap items-center", className)} {...rest}>
      {cloneElement(children[0], {
        className: cn(
          "rounded-xl motion-safe:duration-700 group-hover:opacity-0 group-hover:blur-md",
          children[0].props.className,
        ),
      })}
      {cloneElement(children[1], {
        className: cn(
          "absolute rounded-xl opacity-0 blur-md motion-safe:duration-700 group-hover:opacity-100 group-hover:blur-none",
          children[1].props.className,
        ),
      })}
    </div>
  );
}
