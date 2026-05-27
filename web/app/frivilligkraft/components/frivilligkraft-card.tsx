import type { FrivilligkraftTeaser } from "../frivilligkraft-api";
import { sanitizeHtml } from "../sanitize-html";
import { truncateLabel } from "../truncate-label";
import FrivilligkraftCardMedia from "./frivilligkraft-card-media";

const META_CHIP_MAX = 72;

type FrivilligkraftCardProps = {
  teaser: FrivilligkraftTeaser;
  dateLabel: string | null;
};

const chipClasses =
  "inline-flex items-center rounded-full border border-border bg-surface px-2 py-1 text-xs text-foreground-muted";

export default function FrivilligkraftCard({ teaser, dateLabel }: FrivilligkraftCardProps) {
  const descriptionHtml = sanitizeHtml(teaser.description);
  const orgChip = teaser.organization ? truncateLabel(teaser.organization, META_CHIP_MAX) : null;
  const locChip = teaser.location ? truncateLabel(teaser.location, META_CHIP_MAX) : null;
  const freqChip = teaser.frequency ? truncateLabel(teaser.frequency, META_CHIP_MAX) : null;

  return (
    <article className="flex h-full flex-col gap-3 rounded-[10px] border border-border bg-surface p-3 shadow-[0_1px_2px_rgb(0_0_0/0.07)]">
      <FrivilligkraftCardMedia imageUrl={teaser.imageUrl ?? null} organization={teaser.organization} />

      <div className="flex min-h-0 flex-1 flex-col gap-2">
        <h2 className="m-0 text-lg font-semibold leading-tight text-foreground" title={teaser.title}>
          {teaser.title}
        </h2>

        {dateLabel ? <p className="m-0 text-sm text-foreground-muted">{dateLabel}</p> : null}

        <div
          className="min-h-0 flex-1 text-sm leading-snug text-foreground-muted [&_p]:m-0 [&_ul]:my-1 [&_ol]:my-1"
          dangerouslySetInnerHTML={{ __html: descriptionHtml }}
        />

        <div className="flex flex-wrap gap-1.5">
          {orgChip ? <span className={chipClasses}>{orgChip}</span> : null}
          {locChip ? <span className={chipClasses}>{locChip}</span> : null}
          {freqChip ? <span className={chipClasses}>{freqChip}</span> : null}
        </div>

        <div>
          <a
            className="inline-flex items-center gap-1 text-sm font-medium text-brand-primary hover:underline"
            href={teaser.missionUrl}
            target="_blank"
            rel="noreferrer"
          >
            Se uppdrag <span aria-hidden="true">{"->"}</span>
          </a>
        </div>
      </div>
    </article>
  );
}
