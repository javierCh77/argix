import { ComponentProps } from "react";
import { Slot } from "@radix-ui/react-slot";

type Props = ComponentProps<"button"> & {
  asChild?: boolean;
  variant?: "solid" | "outline";
};

export function Button({ asChild, variant = "solid", className = "", ...props }: Props) {
  const Comp = asChild ? Slot : "button";

  const base =
    "inline-flex items-center gap-2 rounded-full px-4 py-2 font-medium transition";

  if (variant === "outline") {
    return (
      <Comp
        {...props}
        className={`${base} bg-white border text-[--color-foreground] ${className}`}
        style={{ borderColor: "var(--border)" }}
      />
    );
  }

  return (
    <Comp
      {...props}
      className={`${base} text-white ${className}`}
      style={{
        background: "linear-gradient(135deg,var(--accentA),var(--accentB))",
      }}
    />
  );
}
