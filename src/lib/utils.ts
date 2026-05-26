export function dateFormatter(timestamp?: string): string {
    if (!timestamp) return "";

    const match = timestamp.match(/<(\d{4})-(\d{2})-(\d{2})/);
    if (!match) return timestamp;

    const [, y, m, d] = match;

    const date = new Date(Number(y), Number(m) - 1, Number(d));

    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

export function makeExcerpt(content?: string, maxWords = 50): string {
    if (!content) {
        return "";
    }

    const firstParagraph = content
        .split(/\n\s*\n/)
        .find(p => p.trim());

    if (!firstParagraph) {
        return "";
    }

    const words = firstParagraph
        .replace(/\s+/g, " ")
        .trim()
        .split(" ");

    return words.length <= maxWords
        ? words.join(" ")
        : words.slice(0, maxWords).join(" ") + "...";
}