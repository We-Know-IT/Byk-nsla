const ALLOWED_TAGS = new Set(["p", "br", "strong", "em", "b", "i", "ul", "ol", "li"]);

const stripDangerousBlocks = (input: string): string => {
  return input
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "");
};

const sanitizeTag = (rawTag: string): string => {
  const isClosing = /^<\s*\//.test(rawTag);
  const nameMatch = rawTag.match(/^<\s*\/?\s*([a-z0-9]+)/i);
  const tagName = nameMatch?.[1]?.toLowerCase();

  if (!tagName || !ALLOWED_TAGS.has(tagName)) {
    return "";
  }

  if (isClosing) {
    return `</${tagName}>`;
  }

  if (tagName === "br") {
    return "<br />";
  }

  return `<${tagName}>`;
};

export const sanitizeHtml = (input: string | null | undefined): string => {
  if (!input) {
    return "";
  }

  const withoutBlocks = stripDangerousBlocks(input);
  return withoutBlocks.replace(/<\/?[^>]+>/g, (tag) => sanitizeTag(tag));
};
