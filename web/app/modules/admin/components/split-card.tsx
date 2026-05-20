import type { ReactNode } from "react";

type SplitCardProps = {
  left: ReactNode;
  right: ReactNode;
  className?: string;
  leftBasisClassName?: string;
  rightBasisClassName?: string;
  leftClassName?: string;
  rightClassName?: string;
  onClick?: () => void;
};

export function SplitCard({
  left,
  right,
  className = "",
  leftBasisClassName = "basis-3/5",
  rightBasisClassName = "basis-2/5",
  leftClassName = "",
  rightClassName = "",
  onClick,
}: SplitCardProps) {
  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      className={`rounded-2xl border border-border bg-background p-4 flex hover:shadow-sm ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      <div className={`pr-4 ${leftBasisClassName} ${leftClassName}`}>{left}</div>
      <div className={`flex items-center justify-end gap-3 ${rightBasisClassName} ${rightClassName}`}>{right}</div>
    </div>
  );
}
