import { getStaticBadgeUrl, type StaticBadgeOptions } from "@/lib/shields.io";
import { cn } from "@/lib/utils";
import { LinkIcon } from "lucide-react";
import { createElement, type ComponentProps, type PropsWithChildren } from "react";
import { InView } from "react-intersection-observer";

type ArticleProps = ComponentProps<"article">;

export function Article(props: ArticleProps) {
  const { children, className, ...rest } = props;
  return (
    <InView>
      {({ ref, inView }) => (
        <article
          ref={ref}
          className={cn("motion-safe:duration-500 relative", className)}
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

  return <img className={cn("size-32 rounded-3xl object-contain", className)} {...rest} />;
}

type ArticleHeaderProps = ComponentProps<"div"> & {
  image?: React.ReactNode;
};

export function ArticleHeader(props: ArticleHeaderProps) {
  const { children, className, image, ...rest } = props;
  return (
    <div className={cn("flex flex-wrap-reverse gap-1 items-end justify-between", className)} {...rest}>
      <div className="space-y-1">{children}</div>
      {image}
    </div>
  );
}

type ArticleTitleProps = PropsWithChildren<{
  as?: React.HTMLElementType;
  label?: string;
  href?: string;
}>;

export function ArticleTitle(props: ArticleTitleProps) {
  const { children, label, href, as } = props;

  if (href) {
    return (
      <div>
        {label ? <div>{label}</div> : null}
        <a target="_blank" rel="noopener noreferrer" href={href}>
          {createElement(
            as ?? "h3",
            {
              className: "border-underline inline-block text-3xl",
            },
            children,
          )}{" "}
          <LinkIcon className="inline-block size-5 align-baseline" />
        </a>
      </div>
    );
  }

  return (
    <div>
      {label ? <div>{label}</div> : null}
      <h3 className="border-underline text-3xl">{children}</h3>
    </div>
  );
}

type ArticleBadgeListProps = ComponentProps<"ul">;

export function ArticleBadgeList(props: ArticleBadgeListProps) {
  const { children, className, ...rest } = props;
  return (
    <ul className={cn("flex flex-wrap", className)} {...rest}>
      {children}
    </ul>
  );
}

type ArticleBadgeProps = StaticBadgeOptions & {
  message: string;
  href?: string;
  className?: string;
};

export function ArticleBadge(props: ArticleBadgeProps) {
  const { href, className, message, ...rest } = props;

  if (href) {
    return (
      <li>
        <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
          <img className="h-8" src={getStaticBadgeUrl(message, rest)} alt={`${message} badge`} />
        </a>
      </li>
    );
  }

  return (
    <li>
      <img className="h-8" src={getStaticBadgeUrl(message, rest)} alt={`${message} badge`} />
    </li>
  );
}

type ArticleMainProps = ComponentProps<"div">;

export function ArticleMain(props: ArticleMainProps) {
  const { children, className, ...rest } = props;
  return (
    <div className={cn("mt-4 space-y-4", className)} {...rest}>
      {children}
    </div>
  );
}

type ArticleContentProps = ComponentProps<"div">;

export function ArticleContent(props: ArticleContentProps) {
  const { children, className, ...rest } = props;
  return (
    <div className={cn("space-y-1", className)} {...rest}>
      {children}
    </div>
  );
}

type ArticleContentTitleProps = ComponentProps<"h4"> & {
  href?: string;
};

export function ArticleContentTitle(props: ArticleContentTitleProps) {
  const { children, className, href, ...rest } = props;

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        <h4 className="border-underline inline text-xl font-bold">{children}</h4> <LinkIcon className="inline size-4" />
      </a>
    );
  }

  return (
    <h4 className={cn("text-xl font-bold", className)} {...rest}>
      {children}
    </h4>
  );
}
