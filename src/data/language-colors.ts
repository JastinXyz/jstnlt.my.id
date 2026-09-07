/* GitHub's own colour for each language, so the bar in "On my own" reads the
 * way the same data reads on a repository page.
 *
 * This is the one place the site carries hues outside its single accent, and
 * it is deliberate: here the colour is the label, not decoration. Every swatch
 * gets a hairline ring in the UI, because JavaScript yellow on paper is around
 * 1.4:1 and would otherwise be a blank space in the legend.
 *
 * Anything not listed falls back to a neutral, so a new language in the org
 * never renders as an invisible gap. */
const LANGUAGE_COLORS: Record<string, string> = {
    PHP: "#4F5D95",
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    Go: "#00ADD8",
    Blade: "#f7523f",
    HTML: "#e34c26",
    CSS: "#663399",
    Rust: "#dea584",
    Python: "#3572A5",
    Shell: "#89e051",
    Dockerfile: "#384d54",
    Vue: "#41b883",
    Java: "#b07219",
    Kotlin: "#A97BFF",
    Dart: "#00B4AB",
    SCSS: "#c6538c",
    EJS: "#a91e50",
};

export const languageColor = (name: string) => LANGUAGE_COLORS[name] ?? "#8b8e94";

export default LANGUAGE_COLORS;
