import * as React from "react";
import { cn } from "../../lib/utils"; // adjust path if needed

// 🟣 Card wrapper
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-purple-200 bg-purple-50/60 shadow-md backdrop-blur-sm p-6",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

// 🟣 CardContent
const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("mt-4", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

export { Card, CardContent };
