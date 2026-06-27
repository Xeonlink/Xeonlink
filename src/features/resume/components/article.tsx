import { cn } from "@/shared/lib/utils";
import { type ComponentProps } from "react";
import { InView } from "react-intersection-observer";

type ArticleProps = ComponentProps<"article">;

export function Article(props: ArticleProps) {
  const { children, className, ...rest } = props;
  return (
    <InView>
      {({ ref, inView }) => (
        <article
          className={cn(
            "relative flex flex-wrap gap-2 motion-safe:duration-500",
            className,
          )}
          ref={ref}
          {...rest}
          style={{ opacity: inView ? 1 : 0 }}
        >
          {children}
        </article>
      )}
    </InView>
  );
}

type ArticleImageProps = ComponentProps<"img">;

export function ArticleImage(props: ArticleImageProps) {
  const { className, ...rest } = props;

  return (
    <img
      className={cn("mr-10 h-32 w-32 rounded-3xl object-contain", className)}
      {...rest}
    />
  );
}

type ArticleHeaderProps = ComponentProps<"div"> & {
  image?: React.ReactNode;
};

export function ArticleHeader(props: ArticleHeaderProps) {
  const { children, className, image, ...rest } = props;
  return (
    <div
      className={cn(
        "flex flex-wrap-reverse items-end justify-between gap-1",
        className,
      )}
      {...rest}
    >
      <div className="space-y-1">{children}</div>
      {image}
    </div>
  );
}
