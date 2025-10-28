import { jsx as _jsx } from "react/jsx-runtime";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
const buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-pink-400/60 focus-visible:ring-offset-2 hover:scale-[1.02] active:scale-[0.98]", {
    variants: {
        variant: {
            // 💜 Gradient primary button
            default: "cursor-pointer bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white shadow-lg hover:from-pink-600 hover:to-indigo-600 hover:shadow-pink-500/30",
            // ❤️ Destructive button with soft red tones
            destructive: "cursor-pointer bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-md hover:opacity-90 focus-visible:ring-rose-400/50",
            // 🩶 Outline / Ghost button with glass effect
            outline: "cursor-pointer border border-white/30 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-pink-300 transition-all",
            // 🌈 Secondary subtle button
            secondary: "cursor-pointer bg-gradient-to-br from-indigo-800/40 to-pink-700/40 text-white border border-white/20 hover:bg-white/20",
            // 👻 Ghost button (for nav or icons)
            ghost: "text-pink-200 hover:text-white hover:bg-white/10 transition-all duration-300",
            // 🔗 Link-style button
            link: "text-pink-300 underline-offset-4 hover:underline hover:text-pink-200",
        },
        size: {
            default: "h-10 px-5 py-2.5",
            sm: "h-8 px-4 text-sm",
            lg: "h-12 px-8 text-base font-semibold",
            icon: "size-10 rounded-full flex items-center justify-center",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});
function Button({ className, variant, size, asChild = false, ...props }) {
    const Comp = asChild ? Slot : "button";
    return (_jsx(Comp, { "data-slot": "button", className: cn(buttonVariants({ variant, size, className })), ...props }));
}
export { Button, buttonVariants };
