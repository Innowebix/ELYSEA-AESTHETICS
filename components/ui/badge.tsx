import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
    "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em]",
    {
        variants: {
            variant: {
                default: "bg-plum text-cream",
                soft: "bg-blush text-plum",
                gild: "bg-gild/20 text-[#7d5a1c]",
                rose: "bg-rose/10 text-rose",
                sage: "bg-sage/15 text-[#44573a]",
                outline: "border border-sand text-plum/70",
            },
        },
        defaultVariants: { variant: "default" },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <span className={cn(badgeVariants({ variant }), className)} {...props} />
    );
}

export { Badge, badgeVariants };