import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
    "inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 disabled:pointer-events-none shrink-0",
    {
        variants: {
            variant: {
                default: "bg-brand text-brand-foreground hover:opacity-90 rounded-md",
                outline: "border border-border bg-transparent hover:bg-surface-hover text-foreground rounded-md",
                ghost: "bg-transparent hover:bg-surface-hover text-foreground rounded-md",
                round: "bg-brand text-brand-foreground hover:opacity-90 rounded-full",
            },
            size: {
                default: "h-10 py-2 px-4",
                sm: "h-9 px-3 ",
                lg: "h-11 px-8",
            },
            shadow: {
                default: "shadow-sm",
                none: "",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
            shadow: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> { }

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, shadow, ...props }, ref) => {
        return (
            <button
                className={buttonVariants({ variant, size, shadow, className })}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"