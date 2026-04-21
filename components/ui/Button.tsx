import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "sand";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    const base =
      "inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-300 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(55%_0.12_38)] disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      primary:
        "bg-[oklch(55%_0.12_38)] text-[oklch(99%_0.005_80)] hover:bg-[oklch(48%_0.11_38)] hover:shadow-[0_4px_20px_oklch(55%_0.12_38/0.3)] hover:scale-[1.02]",
      outline:
        "border border-[oklch(55%_0.12_38)] text-[oklch(55%_0.12_38)] hover:bg-[oklch(55%_0.12_38/0.08)]",
      ghost:
        "text-[oklch(38%_0.02_60)] hover:bg-[oklch(88%_0.04_75/0.5)] hover:text-[oklch(55%_0.12_38)]",
      sand: "bg-[oklch(88%_0.04_75)] text-[oklch(22%_0.02_60)] hover:bg-[oklch(82%_0.06_72)] hover:scale-[1.02]",
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
        style={{ fontFamily: "var(--font-body)" }}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
