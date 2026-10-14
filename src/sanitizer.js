import DOMPurify from "dompurify";

export function nettoyage(toClean) {
  const cleaned = DOMPurify.sanitize(toClean);
  return cleaned;
}
