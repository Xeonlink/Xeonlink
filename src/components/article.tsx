import { cn } from "@/lib/utils";
import { LinkIcon } from "lucide-react";
import type { ComponentProps, PropsWithChildren } from "react";
import { InView } from "react-intersection-observer";

type ArticleProps = ComponentProps<"article">;

export function Article(props: ArticleProps) {
  const { children, className, ...rest } = props;
  return (
    <InView>
      {({ ref, inView }) => (
        <article
          ref={ref}
          className={cn("transition-all duration-500 relative", className)}
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
      <div>{children}</div>
      {image}
    </div>
  );
}

type ArticleTitleProps = PropsWithChildren<{
  href?: string;
}>;

export function ArticleTitle(props: ArticleTitleProps) {
  const { children, href } = props;

  if (href) {
    return (
      <a target="_blank" rel="noopener noreferrer" href={href}>
        <h3 className="border-underline inline text-3xl">{children}</h3>{" "}
        <LinkIcon className="inline size-5 align-baseline" />
      </a>
    );
  }

  return <h3 className="border-underline text-3xl">{children}</h3>;
}

type ArticleBadgeListProps = ComponentProps<"ul">;

export function ArticleBadgeList(props: ArticleBadgeListProps) {
  const { children, className, ...rest } = props;
  return (
    <ul className={cn("my-1 flex flex-wrap", className)} {...rest}>
      {children}
    </ul>
  );
}

type ArticleBadgeProps = {
  src: string;
  alt: string;
  href?: string;
  className?: string;
};

export function ArticleBadge(props: ArticleBadgeProps) {
  const { src, alt, href, className, ...rest } = props;

  if (href) {
    return (
      <li>
        <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
          <img className="h-8" src={src} alt={alt} {...rest} />
        </a>
      </li>
    );
  }

  return (
    <li>
      <img className="h-8" src={src} alt={alt} {...rest} />
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
