export function truncateLabel(text: string, maxChars: number): string {
  const trimmed = text.trim();
  if (trimmed.length <= maxChars) {
    return trimmed;
  }
  const slice = trimmed.slice(0, Math.max(0, maxChars - 1)).trimEnd();
  return `${slice}…`;
}
