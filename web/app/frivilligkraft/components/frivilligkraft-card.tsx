import type { FrivilligkraftTeaser } from "../frivilligkraft-api";
import FrivilligkraftCardMedia from "./frivilligkraft-card-media";
import { sanitizeHtml } from "../sanitize-html";
import { truncateLabel } from "../truncate-label";

import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "../../shared/ui/card";
import { Button } from "../../shared/ui/button";

const META_CHIP_MAX = 72;

type FrivilligkraftCardProps = {
  teaser: FrivilligkraftTeaser;
  dateLabel: string | null;
};

export default function FrivilligkraftCard({ teaser, dateLabel }: FrivilligkraftCardProps) {
  const descriptionHtml = sanitizeHtml(teaser.description);

  const orgChip = teaser.organization ? truncateLabel(teaser.organization, META_CHIP_MAX) : null;
  const locChip = teaser.location ? truncateLabel(teaser.location, META_CHIP_MAX) : null;
  const freqChip = teaser.frequency ? truncateLabel(teaser.frequency, META_CHIP_MAX) : null;

  return (
    <Card className="group flex flex-row overflow-hidden">
      <FrivilligkraftCardMedia imageUrl={teaser.imageUrl ?? null} />

      <div className="flex w-3/5 flex-col">
        <CardHeader>
          {dateLabel && (
            <CardDescription>
              {dateLabel}
            </CardDescription>
          )}
          <CardTitle title={teaser.title}>{teaser.title}</CardTitle>
        </CardHeader>

        <CardContent>
          <div
            className="text-foreground-muted line-clamp-3"
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          />
        </CardContent>

        <CardFooter className="justify-between mt-auto">
          <div className="flex gap-2 text-xs font-medium text-brand">
            {orgChip && <span title={teaser.organization ?? undefined}>{orgChip}</span>}
            {locChip && <span className="opacity-50">•</span>}
            {locChip && <span title={teaser.location ?? undefined}>{locChip}</span>}
          </div>

          {teaser.missionUrl && (
            <Button variant="ghost" size="sm">
              <a href={teaser.missionUrl} target="_blank" rel="noreferrer">
                Se uppdrag <span aria-hidden="true" className="ml-1">→</span>
              </a>
            </Button>
          )}
        </CardFooter>
      </div>
    </Card>
  );
}
