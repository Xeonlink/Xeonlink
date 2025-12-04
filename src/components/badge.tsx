import { getStaticBadgeUrl, type StaticBadgeOptions } from "@/lib/shields.io";

type Props = StaticBadgeOptions & {
  children: string;
  href?: string;
  className?: string;
};

export function Badge(props: Props) {
  const { children, ...rest } = props;

  return <img className="h-8" src={getStaticBadgeUrl(children, rest)} alt={`${children} badge`} />;
}
