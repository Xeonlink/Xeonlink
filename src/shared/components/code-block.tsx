import { PropsWithChildren, Suspense, use } from "react";
import { codeToHtml, type BundledLanguage } from "shiki";
import { cn } from "../lib/utils";

const htmlCache = new Map<string, Promise<string>>();

function getHighlightedHtml(code: string, lang: BundledLanguage) {
  const key = `${lang}\0${code}`;
  if (!htmlCache.has(key)) {
    htmlCache.set(
      key,
      codeToHtml(code, {
        lang,
        themes: {
          light: "light-plus",
          dark: "dark-plus",
        },
        rootStyle: "",
        defaultColor: false,
      }),
    );
  }
  return htmlCache.get(key)!;
}

type ShikiWrapperProps = PropsWithChildren<{
  dangerouslySetInnerHTML?: { __html: string };
  className?: string;
}>;

function ShikiWrapper(props: ShikiWrapperProps) {
  const { children, dangerouslySetInnerHTML, className } = props;
  return (
    <div
      className={cn(
        "shiki-wrapper overflow-x-auto rounded-lg border border-border bg-muted p-4 text-sm leading-relaxed",
        className,
      )}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
    >
      {children}
    </div>
  );
}

type CodeBlockProps = {
  children?: string;
  code?: string;
  lang?: BundledLanguage;
  className?: string;
};

function CodeBlockContent(props: CodeBlockProps) {
  const { code = "", lang = "tsx", className, children = "" } = props;
  const html = use(getHighlightedHtml(code || children, lang));

  return <ShikiWrapper className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

function CodeBlockFallback(props: CodeBlockProps) {
  const { code, className, children = "" } = props;

  return (
    <ShikiWrapper className={className}>
      <pre>
        <code>{code || children}</code>
      </pre>
    </ShikiWrapper>
  );
}

export function CodeBlock(props: CodeBlockProps) {
  return (
    <Suspense fallback={<CodeBlockFallback {...props} />}>
      <CodeBlockContent {...props} />
    </Suspense>
  );
}
