import type { FrivilligkraftTeaser } from "../frivilligkraft-api";
import FrivilligkraftCardMedia from "./frivilligkraft-card-media";
import { sanitizeHtml } from "../sanitize-html";
import { truncateLabel } from "../truncate-label";

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
    <article className="frivilligkraftCard">
      <FrivilligkraftCardMedia imageUrl={teaser.imageUrl ?? null} />

      <div className="frivilligkraftCardBody">
        <h2 title={teaser.title}>{teaser.title}</h2>

        {dateLabel ? (
          <p className="frivilligkraftCardDate">
            <span aria-hidden="true">🗓</span>
            {dateLabel}
          </p>
        ) : null}

        <div
          className="frivilligkraftCardDescription"
          dangerouslySetInnerHTML={{ __html: descriptionHtml }}
        />

        <div className="frivilligkraftCardFooter">
          <div className="frivilligkraftMetaList">
            {orgChip ? (
              <span title={teaser.organization ?? undefined}>{orgChip}</span>
            ) : null}
            {locChip ? <span title={teaser.location ?? undefined}>{locChip}</span> : null}
            {freqChip ? (
              <span title={teaser.frequency ?? undefined}>{freqChip}</span>
            ) : null}
          </div>

          {teaser.missionUrl ? (
            <a className="frivilligkraftLink" href={teaser.missionUrl} target="_blank" rel="noreferrer">
              Se uppdrag <span aria-hidden="true">→</span>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
