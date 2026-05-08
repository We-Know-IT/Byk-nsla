import type { EventCardData } from "../model/data";

type EventCardProps = {
  card: EventCardData;
};

export default function EventCard({ card }: EventCardProps) {
  const eventImageStyle = card.imageSrc
    ? { backgroundImage: `url(${card.imageSrc})` }
    : undefined;
  const actionInner = (
    <>
      {card.cta} <span aria-hidden="true">→</span>
    </>
  );

  return (
    <article className="eventCard">
      <div className="eventImage" style={eventImageStyle} />
      <button type="button" className="saveButton" aria-label="Spara">
        ♡
      </button>
      <div className="eventBody">
        <h3>{card.title}</h3>
        {card.date ? <p className="eventGridDate">{card.date}</p> : null}
        <p>{card.text}</p>
        {card.eventUrl ? (
          <a href={card.eventUrl} className="inlineAction" target="_blank" rel="noopener noreferrer">
            {actionInner}
          </a>
        ) : (
          <button type="button" className="inlineAction">
            {actionInner}
          </button>
        )}
      </div>
    </article>
  );
}
