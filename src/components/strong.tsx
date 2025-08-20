import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const strongVariants = cva("text-accent", {
  variants: {
    variant: {
      default: "font-normal",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type Props = React.ComponentProps<"strong"> & VariantProps<typeof strongVariants>;

function Strong(props: Props) {
  const { className, variant, ...rest } = props;

  return <strong className={cn(strongVariants({ variant, className }))} {...rest} />;
}

export { Strong };
