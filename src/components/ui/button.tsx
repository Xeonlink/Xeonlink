import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "cursor-pointer inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs motion-safe:hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs motion-safe:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40",
        outline:
          "border bg-background shadow-xs motion-safe:hover:bg-accent motion-safe:hover:text-accent-foreground dark:border-input dark:bg-input/30 motion-safe:dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs motion-safe:hover:bg-secondary/80",
        ghost: "hover:bg-accent motion-safe:hover:text-accent-foreground motion-safe:dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 motion-safe:hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type Props = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button(props: Props) {
  const { className, variant, size, asChild = false, ...rest } = props;
  const Comp = asChild ? Slot : "button";

  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...rest} />;
}

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants };
