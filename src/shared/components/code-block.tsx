import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { ComponentProps, Suspense, use } from "react";
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

const CodeBlockVariants = cva(
  "shiki-wrapper overflow-x-auto rounded-lg border border-border bg-muted p-4 text-sm leading-relaxed",
  {
    variants: {
      variant: {
        default: "",
        inline: "inline-block px-2 py-0 align-bottom",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type CodeBlockProps = ComponentProps<"div"> &
  VariantProps<typeof CodeBlockVariants> & {
    children?: string;
    code?: string;
    lang?: BundledLanguage;
    className?: string;
  };

function CodeBlockContent(props: CodeBlockProps) {
  const { code = "", lang = "tsx", className, variant, children = "" } = props;
  const html = use(getHighlightedHtml(code || children, lang));

  return <div className={cn(CodeBlockVariants({ variant }), className)} dangerouslySetInnerHTML={{ __html: html }} />;
}

function CodeBlockFallback(props: CodeBlockProps) {
  const { code, className, variant, children = "" } = props;

  return (
    <div className={cn(CodeBlockVariants({ variant }), className)}>
      <pre>
        <code>{code || children}</code>
      </pre>
    </div>
  );
}

export function CodeBlock(props: CodeBlockProps) {
  return (
    <Suspense fallback={<CodeBlockFallback {...props} />}>
      <CodeBlockContent {...props} />
    </Suspense>
  );
}
