import * as React from "react";
import { cn } from "../utils/cn";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("rounded-xl border border-border bg-surface text-foreground shadow-sm hover:shadow-md overflow-hidden flex flex-col", className)}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col p-4", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("font-semibold leading-tight tracking-tight text-xl mb-1", className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-foreground-muted", className)}
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-4 pt-0 flex-1", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center p-4 pt-0", className)}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

const CardMedia = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { src?: string | null; fallback?: React.ReactNode }>(
  ({ className, src, fallback = "Bild saknas", ...props }, ref) => {
    if (src) {
      return (
        <div
          ref={ref}
          className={cn("bg-brand-foreground bg-cover bg-center shrink-0", className)}
          style={{ backgroundImage: `url(${src})`, ...props.style }}
          {...props}
        />
      );
    }
    
    return (
      <div
        ref={ref}
        className={cn("flex items-center justify-center bg-brand-foreground text-foreground-muted text-sm p-4 text-center shrink-0", className)}
        {...props}
      >
        {fallback}
      </div>
    );
  }
);
CardMedia.displayName = "CardMedia";



export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardMedia };
