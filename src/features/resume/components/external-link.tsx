import type { ComponentProps } from "react";

// type Props = LinkProps & {
//   to: LinkProps["to"] | (string & {});
// };

export function ExternalLink(props: ComponentProps<"a">) {
  const { children, ...rest } = props;

  return (
    <a target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}
