import type { EventGridCardData } from "../model/data";
import EventCard from "../components/event-card";


type EventGridCardProps = {
  card: EventGridCardData;
};

export default function EventGridCard({ card }: EventGridCardProps) {
  
  return (
    <EventCard card={card} />
  );
}
