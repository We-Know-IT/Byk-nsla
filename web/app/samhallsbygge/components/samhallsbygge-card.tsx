import type { SamhallsbyggeItem } from "../samhallsbygge-api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../shared/ui/card";
import { Button } from "../../shared/ui/button";

type SamhallsbyggeCardProps = {
  item: SamhallsbyggeItem;
};

const formatDate = (isoDate: string | null): string | null => {
  if (!isoDate) {
    return null;
  }

  const parsed = new Date(isoDate);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat("sv-SE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parsed);
};

export default function SamhallsbyggeCard({ item }: SamhallsbyggeCardProps) {
  const dateLabel = formatDate(item.publishedAt);

  return (
    <Card>
      <CardHeader className="gap-1 pb-2">
        <div className="flex items-center justify-between gap-2 text-xs text-foreground-muted">
          <span className="rounded-full border border-border bg-brand-foreground px-2 py-0.5">
            {item.status}
          </span>
          <span>{item.reference ?? "Saknar ref"}</span>
        </div>
        <CardTitle className="text-base">{item.title}</CardTitle>
        {item.subtitle ? <CardDescription>{item.subtitle}</CardDescription> : null}
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-sm text-foreground-muted">{item.categoryLabel}</p>
      </CardContent>

      <CardFooter className="mt-auto justify-between">
        {dateLabel ? <span className="text-xs text-foreground-muted">{dateLabel}</span> : <span />}
        {item.externalUrl ? (
          <a href={item.externalUrl} target="_blank" rel="noreferrer">
            <Button variant="ghost" className="h-8 px-2 text-sm">
              Mer info <span aria-hidden="true">→</span>
            </Button>
          </a>
        ) : null}
      </CardFooter>
    </Card>
  );
}
