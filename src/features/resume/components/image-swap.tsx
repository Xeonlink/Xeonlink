import { cn } from "@/shared/lib/utils";
import { cloneElement, useState, type ComponentProps } from "react";

type ImageSwapProps = ComponentProps<"div"> & {
  children: [
    React.ReactElement<ComponentProps<"img">>,
    React.ReactElement<ComponentProps<"img">>,
  ];
};

export function ImageSwap(props: ImageSwapProps) {
  const { children, className, ...rest } = props;

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn("relative flex flex-wrap items-center", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...rest}
    >
      {cloneElement(children[0], {
        className: cn(
          "rounded-xl motion-safe:duration-700",
          isHovered && "opacity-0 blur-md",
          children[0].props.className,
        ),
      })}
      {cloneElement(children[1], {
        className: cn(
          "absolute rounded-xl motion-safe:duration-700",
          !isHovered && "opacity-0 blur-md",
          children[1].props.className,
        ),
      })}
    </div>
  );
}
