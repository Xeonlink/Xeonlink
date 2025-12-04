import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import { InView } from "react-intersection-observer";

type SectionProps = ComponentProps<"section"> & {
  id: string;
};

export function Section(props: SectionProps) {
  const { children, className, id, title, ...rest } = props;

  return (
    <InView>
      {({ inView, ref }) => (
        <section
          ref={ref}
          className={cn(
            "space-y-8 border-dotted p-8 motion-safe:duration-1000 not-last:border-b-2 md:p-14 md:space-y-14",
            className,
            inView ? "opacity-100" : "opacity-0",
          )}
          {...rest}
          id={id.toLowerCase()}
        >
          {title ? <h1 className="text-5xl font-bold">{title}</h1> : null}
          {children}
        </section>
      )}
    </InView>
  );
}
