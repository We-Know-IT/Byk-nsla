import type { SpotlightCardData } from "../model/data";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardMedia } from "../../../shared/ui/card";
import { Button } from "../../../shared/ui/button";

type SpotlightCardProps = {
  card: SpotlightCardData;
};

export default function SpotlightCard({ card }: SpotlightCardProps) {
  return (
    <Card className="group flex flex-row overflow-hidden">
      <CardMedia 
        src={card.imageSrc} 
        className="w-2/5 border-r border-border" 
      />
      
      <div className="flex w-3/5 flex-col">
        <CardHeader>
          <CardTitle>{card.title}</CardTitle>
        </CardHeader>
        
        <CardContent>
          <p className="line-clamp-3 text-foreground-muted">{card.text}</p>
        </CardContent>
        
        <CardFooter className="mt-auto items-end">
          <Button variant="ghost">
            {card.cta} <span aria-hidden="true" className="ml-1">→</span>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
