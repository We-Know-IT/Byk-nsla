type EventMonthNavigatorProps = {
  monthLabel: string;
  onPrev: () => void;
  onNext: () => void;
};

export default function EventMonthNavigator({
  monthLabel,
  onPrev,
  onNext,
}: EventMonthNavigatorProps) {
  return (
    <div className="eventMonthControls">
      <button type="button" className="monthArrow" aria-label="Föregående månad" onClick={onPrev}>
        ←
      </button>
      <span className="monthLabel" aria-current="false">
        {monthLabel} <span aria-hidden="true">⌄</span>
      </span>
      <button type="button" className="monthArrow" aria-label="Nästa månad" onClick={onNext}>
        →
      </button>
    </div>
  );
}
