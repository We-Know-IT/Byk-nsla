import type { SpotlightCardData } from "../model/data";

type SpotlightCardProps = {
  card: SpotlightCardData;
};

export default function SpotlightCard({ card }: SpotlightCardProps) {
  return (
    <article className="spotlightCard">
      <div className="spotlightIcon" aria-hidden="true">
        <svg width="138" height="138" viewBox="0 0 138 138" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M34.5 74.75C24.9167 74.75 5.75 80.5 5.75 103.5C5.75 126.5 24.9167 132.25 34.5 132.25H103.5C113.083 132.25 132.25 126.5 132.25 103.5C132.25 80.5 113.083 74.75 103.5 74.75"
            stroke="black"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M69 69C78.5269 69 86.25 61.2769 86.25 51.75C86.25 42.2231 78.5269 34.5 69 34.5C59.4731 34.5 51.75 42.2231 51.75 51.75C51.75 61.2769 59.4731 69 69 69Z"
            stroke="black"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M109.25 51.75L115 51.75" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M69 11.5V5.75" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M106.375 20.125L100.625 25.875" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M31.625 20.125L37.375 25.875" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M23 51.75L28.75 51.75" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="spotlightBody">
        <h2>{card.title}</h2>
        <p>{card.text}</p>
        <button type="button" className="inlineAction">
          {card.cta} <span aria-hidden="true">→</span>
        </button>
      </div>
    </article>
  );
}
