import type { SamhallsbyggeItem } from "../samhallsbygge-api";

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
    <article className="samhallsbyggeCard">
      <header className="samhallsbyggeCardHeader">
        <span className="samhallsbyggeStatusChip">{item.status}</span>
        <span className="samhallsbyggeReference">{item.reference ?? "Saknar ref"}</span>
      </header>

      <div className="samhallsbyggeCardBody">
        <h2>{item.title}</h2>
        {item.subtitle ? <p>{item.subtitle}</p> : null}
      </div>

      <footer className="samhallsbyggeCardFooter">
        <span className="samhallsbyggeCategory">{item.categoryLabel}</span>
        {dateLabel ? <span className="samhallsbyggeDate">{dateLabel}</span> : null}
      </footer>
    </article>
  );
}
