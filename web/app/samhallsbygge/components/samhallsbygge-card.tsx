import type { SamhallsbyggeItem } from "../samhallsbygge-api";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "../../shared/ui/card";

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
    // <article className="samhallsbyggeCard">
    //   <header className="samhallsbyggeCardHeader">
    //     <span className="samhallsbyggeStatusChip">{item.status}</span>
    //     <span className="samhallsbyggeReference">{item.reference ?? "Saknar ref"}</span>
    //   </header>

    //   <div className="samhallsbyggeCardBody">
    //     <h2>{item.title}</h2>
    //     {item.subtitle ? <p>{item.subtitle}</p> : null}
    //   </div>

    //   <footer className="samhallsbyggeCardFooter">
    //     <span className="samhallsbyggeCategory">{item.categoryLabel}</span>
    //     {dateLabel ? <span className="samhallsbyggeDate">{dateLabel}</span> : null}
    //   </footer>
    // </article>

     <Card className="group">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <span className="inline-flex items-center rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-semibold text-brand">
          {item.status}
        </span>
        <span className="text-xs text-foreground-muted">
          {item.reference ?? "Saknar ref"}
        </span>
      </CardHeader>

      <CardContent className="flex-1">
        <CardTitle className="text-lg">{item.title}</CardTitle>
        {item.subtitle ? <CardDescription className="mt-2">{item.subtitle}</CardDescription> : null}
      </CardContent>

      <CardFooter className="flex items-center justify-between mt-auto pt-4 border-t border-border">
        <span className="text-xs font-medium text-foreground-muted">{item.categoryLabel}</span>
        {dateLabel ? <span className="text-xs text-foreground-muted">{dateLabel}</span> : null}
      </CardFooter>
    </Card>
  );
}
