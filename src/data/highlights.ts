/* The open-source work, described the way he describes it, what the thing
 * is, and the decision worth naming. Metrics are the ones he publishes:
 * GitHub stars, and for Katla the server count from its top.gg listing. */

export type Highlight = {
    name: string;
    repo?: string;
    href: string;
    live?: string;
    /** static fallback; when `repo` resolves in the live list the real count wins */
    metric: string;
    metricLabel: string;
    /** what the compact index row shows, unit included */
    short: string;
    /** a real screenshot when one exists; without it the row falls back to the
     *  repo's GitHub social card, which is a title, not a product */
    image?: string;
    period: string;
    what: string;
    decision: string;
    stack: string[];
};

const highlights: Highlight[] = [
    {
        name: "@mengkodingan/ckptw",
        repo: "Mengkodingan/ckptw",
        href: "https://github.com/Mengkodingan/ckptw",
        live: "https://npmjs.com/package/@mengkodingan/ckptw",
        metric: "86",
        metricLabel: "stars · 3 years maintained",
        short: "86 stars",
        period: "2022 to 2025",
        what: "A framework for building WhatsApp bots on top of Baileys, published on npm and maintained for three years.",
        decision:
            "The work here is mostly API design: deciding what a bot author has to write, what the library should handle for them, and keeping that surface stable while the underlying protocol library moves.",
        stack: ["TypeScript", "npm"],
    },
    {
        name: "Katla Discord",
        href: "https://top.gg/bot/1089062830243856425",
        image: "/shots/katla.webp",
        metric: "700+",
        metricLabel: "servers",
        short: "700+ servers",
        period: "2023 ",
        what: "An Indonesian word game bot for Discord, with Daily, Battle and Time Attack modes.",
        decision:
            "The number that matters here is not stars, it is servers. This one is running in more than seven hundred of them.",
        stack: ["Node.js", "Discord API"],
    },
    {
        name: "discord-bot-landing-page-web",
        repo: "JastinXyz/discord-bot-landing-page-web",
        href: "https://github.com/JastinXyz/discord-bot-landing-page-web",
        live: "https://jastinxyz.github.io/discord-bot-landing-page-web",
        metric: "120",
        metricLabel: "stars",
        short: "120 stars",
        period: "2022 to 2024",
        what: "A free landing page template for Discord bot projects, released in 2022 and picked up by other bot developers as a starting point.",
        decision: "My most-used piece of open source.",
        stack: ["HTML", "Bulma"],
    },
    {
        name: "fana",
        repo: "JastinXyz/fana",
        href: "https://github.com/JastinXyz/fana",
        live: "https://fana.jstnlt.my.id",
        image: "/shots/fana.webp",
        metric: "SMTP",
        metricLabel: "runs its own mail server",
        short: "own SMTP server",
        period: "2026 ",
        what: "Self-hostable disposable email, built so automated tests can actually use it. Each test run gets its own inbox, waits for a message to land, pulls the OTP out of it, and gets a webhook instead of polling.",
        decision:
            "It runs its own SMTP server rather than leaning on a mail provider, so a test suite never depends on someone else's inbox.",
        stack: ["Hono", "Next.js", "Postgres", "Drizzle", "Redis", "Docker"],
    },
    {
        name: "s3-explorer",
        repo: "JastinXyz/s3-explorer",
        href: "https://github.com/JastinXyz/s3-explorer",
        live: "https://s3.jstnlt.my.id",
        image: "/shots/s3-explorer.webp",
        metric: "0",
        metricLabel: "credentials stored server-side",
        short: "0 credentials stored",
        period: "2026 ",
        what: "A web file manager for S3-compatible storage. Browse buckets, upload, move and delete from the browser.",
        decision:
            "It stores no credentials on the server. Keys stay with the person using it, which means you can run it against your own bucket without handing them to anything.",
        stack: ["TypeScript", "Next.js"],
    },
];

export default highlights;
