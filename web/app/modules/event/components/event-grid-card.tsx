import type { EventGridCardData } from "../model/data";
import EventCard from "../components/event-card";


type EventGridCardProps = {
  card: EventGridCardData;
};

export default function EventGridCard({ card }: EventGridCardProps) {
  const cardForDisplay = {
    id: card.id,
    title: card.title,
    date: card.date,
    text: card.text,
    cta: card.cta,
    imageSrc: card.imageUrl,
    eventUrl: card.eventUrl,
  };

  return <EventCard card={cardForDisplay} />;
}
