import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => (
        <input
            type={type}
            ref={ref}
            className={cn(
                "flex h-12 w-full rounded-xl border border-sand bg-porcelain/70 px-4 py-2 text-sm text-plum transition-colors placeholder:text-plum/40 focus-visible:border-copper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper/25 disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            {...props}
        />
    )
);
Input.displayName = "Input";

export { Input };