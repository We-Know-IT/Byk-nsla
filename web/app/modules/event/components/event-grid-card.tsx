import type { EventGridCardData } from "../model/data";

type EventGridCardProps = {
  card: EventGridCardData;
};

export default function EventGridCard({ card }: EventGridCardProps) {
  const actionInner = (
    <>
      {card.cta} <span aria-hidden="true">→</span>
    </>
  );

  return (
    <article className="eventGridCard">
      <div className="eventGridImage">
        {card.imageUrl ? (
          <img
            src={card.imageUrl}
            alt=""
            className="eventGridImagePhoto"
          />
        ) : null}
      </div>
      <button type="button" className="eventGridSave" aria-label="Spara">
        ♡
      </button>
      <div className="eventGridBody">
        <h3>{card.title}</h3>
        <p className="eventGridDate">{card.date}</p>
        <p>{card.text}</p>
        {card.eventUrl ? (
          <a
            href={card.eventUrl}
            className="eventGridAction"
            target="_blank"
            rel="noopener noreferrer"
          >
            {actionInner}
          </a>
        ) : (
          <button type="button" className="eventGridAction">
            {actionInner}
          </button>
        )}
      </div>
    </article>
  );
}
