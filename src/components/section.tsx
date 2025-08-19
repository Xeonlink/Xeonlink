import { cn } from "@/lib/utils";
import { LinkIcon } from "lucide-react";
import type { ComponentProps, PropsWithChildren } from "react";
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
            "space-y-6 border-b-2 p-8 transition-all duration-1000 not-last:border-dotted md:p-14",
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

type SubSectionTitleProps = PropsWithChildren<{
  href?: string;
}>;

export function SubSectionTitle(props: SubSectionTitleProps) {
  const { children, href } = props;

  if (href) {
    return (
      <div>
        <a href={href} className="text-4xl" target="_blank" rel="noopener noreferrer">
          <h2 className="inline border-b border-transparent font-bold hover:border-white">{children}</h2>
          &nbsp;
          <LinkIcon className="inline size-5" />
        </a>
        &nbsp;&nbsp;
        <span className="text-xl">2022.12 - 2023.04</span>
      </div>
    );
  }

  return (
    <div>
      <span className="text-4xl">
        <h2 className="inline border-b border-transparent font-bold hover:border-white">{children}</h2>
        &nbsp;
        <LinkIcon className="inline size-5" />
      </span>
      &nbsp;&nbsp;
      <span className="text-xl">2022.12 - 2023.04</span>
    </div>
  );
}
