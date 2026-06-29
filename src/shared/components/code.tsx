import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import type { ComponentProps, ComponentType } from "react";
import { Suspense, use } from "react";
import type { BuiltinLanguage, BundledLanguage } from "shiki";
import { codeToHtml } from "shiki";
import { cn } from "../lib/utils";
import { CopyButton } from "./copy-button";

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
  "shiki-wrapper overflow-x-auto rounded-lg border border-border bg-muted p-4 text-sm leading-relaxed relative",
  {
    variants: {
      variant: {
        default: "",
        inline: "inline-block px-2 py-0 align-bottom max-w-full",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type CodeBlockProps = Omit<ComponentProps<"div">, "children"> &
  VariantProps<typeof CodeBlockVariants> & {
    children: string;
    lang?: BundledLanguage;
    className?: string;
  };

// eslint-disable-next-line react-refresh/only-export-components
function CodeBlockContent(props: CodeBlockProps) {
  const { children, lang = "tsx" } = props;
  const html = use(getHighlightedHtml(children, lang));

  return (
    <div className="contents" dangerouslySetInnerHTML={{ __html: html }} />
  );
}

// eslint-disable-next-line react-refresh/only-export-components
function CodeBlockFallback(props: CodeBlockProps) {
  const { children } = props;

  return (
    <div className="contents">
      <pre>
        <code>{children}</code>
      </pre>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
function CodeBlock(props: CodeBlockProps) {
  const { children, className, variant } = props;
  return (
    <div className={cn(CodeBlockVariants({ variant }), className)}>
      {variant !== "inline" ? (
        <CopyButton className="absolute top-2 right-2" textToCopy={children} />
      ) : null}
      <Suspense fallback={<CodeBlockFallback {...props} />}>
        <CodeBlockContent {...props} />
      </Suspense>
    </div>
  );
}

type CodeProps = Omit<ComponentProps<typeof CodeBlock>, "lang">;

type CodeProxy = {
  [K in BundledLanguage]: ComponentType<CodeProps>;
};

const componentCache = new Map<string, ComponentType<CodeProps>>();

function createLangCodeBlock(lang: BuiltinLanguage) {
  function LangCodeBlock(props: CodeBlockProps) {
    const { children, variant, ...rest } = props;

    return (
      <CodeBlock {...rest} variant={variant} lang={lang}>
        {children}
      </CodeBlock>
    );
  }

  LangCodeBlock.displayName = `code.${lang}`;
  return LangCodeBlock;
}

export const code = new Proxy({} as CodeProxy, {
  get(_, lang: string | symbol) {
    if (typeof lang !== "string") return undefined;

    if (!componentCache.has(lang)) {
      componentCache.set(lang, createLangCodeBlock(lang as BuiltinLanguage));
    }

    return componentCache.get(lang)!;
  },
});
