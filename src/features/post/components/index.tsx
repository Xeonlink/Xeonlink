import { cva, VariantProps } from "class-variance-authority";
import type { ComponentProps, JSX } from "react";
import { createElement } from "react";

function toComponent<T extends keyof JSX.IntrinsicElements>(
  element: T,
  variantsFn: ReturnType<typeof cva>,
) {
  return (props: ComponentProps<T> & VariantProps<typeof variantsFn>) => {
    const { className, ...rest } = props;
    return createElement(element, {
      className: variantsFn({ className }),
      ...rest,
    });
  };
}

export const post = {
  main: toComponent("main", cva("mx-auto max-w-4xl space-y-12 px-6 py-20")),
  header: toComponent("header", cva("space-y-4")),
  writedate: toComponent("p", cva("text-muted-foreground text-sm")),
  h1: toComponent("h1", cva("text-4xl leading-tight font-bold md:text-5xl")),
  subtitle: toComponent(
    "p",
    cva("text-muted-foreground text-xl leading-relaxed"),
  ),
  section: toComponent("section", cva("space-y-4")),
  h2: toComponent("h2", cva("text-2xl font-semibold")),
  p: toComponent("p", cva("text-muted-foreground leading-relaxed")),
};
