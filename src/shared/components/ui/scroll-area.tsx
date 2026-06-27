import { cn } from "@/shared/lib/utils";
import { Corner, Root, ScrollAreaThumb, Scrollbar, Viewport } from "@radix-ui/react-scroll-area";

type ScrollAreaProps = React.ComponentProps<typeof Root>;

function ScrollArea(props: ScrollAreaProps) {
  const { className, children, ...rest } = props;
  return (
    <Root data-slot="scroll-area" className={cn("relative", className)} {...rest}>
      <Viewport
        data-slot="scroll-area-viewport"
        className="size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1"
      >
        {children}
      </Viewport>
      <ScrollBar />
      <Corner />
    </Root>
  );
}

type ScrollBarProps = React.ComponentProps<typeof Scrollbar>;

function ScrollBar(props: ScrollBarProps) {
  const { className, orientation = "vertical", ...rest } = props;
  return (
    <Scrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        "flex touch-none p-px transition-colors select-none",
        orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent",
        className,
      )}
      {...rest}
    >
      <ScrollAreaThumb data-slot="scroll-area-thumb" className="relative flex-1 rounded-full bg-border" />
    </Scrollbar>
  );
}

export { ScrollArea, ScrollBar };
