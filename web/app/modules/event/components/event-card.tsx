import type { EventCardData } from "../../start/model/data";

import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription, CardMedia } from "../../../shared/ui/card";
import { Button } from "../../../shared/ui/button";

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
    <Card className="group relative">
      <CardMedia
        src={card.imageSrc}
        className="h-48 w-full border-b border-border"
        style={eventImageStyle}
      />

      <Button variant="round" size="sm" className="absolute top-3 right-3 bg-surface text-foreground transition hover:bg-surface-hover" aria-label="Spara">
        ♡
      </Button>

      <CardHeader>
        <CardTitle>{card.title}</CardTitle>
        {card.date && <CardDescription>{card.date}</CardDescription>}
      </CardHeader>

      <CardContent>
        <p className="line-clamp-3 text-foreground-muted">{card.text}</p>
      </CardContent>

      <CardFooter className="mt-auto">
        {card.eventUrl ? (
          <Button variant="ghost" className="">
            <a href={card.eventUrl} target="_blank" rel="noopener noreferrer">
              {actionInner}
            </a>
          </Button>
        ) : (
          <Button variant="ghost" className="">
            {actionInner}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
