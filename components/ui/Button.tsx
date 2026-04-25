import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { type ButtonHTMLAttributes, forwardRef } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "ghost" | "sand";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", asChild = false, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    const base =
      "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 cursor-pointer select-none font-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caya-clay disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      primary:
        "bg-caya-clay text-caya-warm-white hover-scale-caya hover:bg-caya-clay-dark hover:shadow-caya-button",
      outline:
        "border border-caya-clay text-caya-clay hover:bg-caya-clay-8",
      ghost:
        "text-caya-charcoal-soft hover:bg-caya-sand-50 hover:text-caya-clay",
      sand: "bg-caya-sand text-caya-charcoal hover-scale-caya hover:bg-caya-sand-deep",
    };

    const sizes = {
      sm: "text-xs px-4 py-2",
      md: "text-sm px-6 py-2.5",
      lg: "text-base px-8 py-3.5",
    };

    return (
      <Comp
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
