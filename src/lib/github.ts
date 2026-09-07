/* Server-only GitHub readers. Every call is cached by Next's fetch cache and
 * revalidated hourly, so a page render never costs a live API round-trip.
 * Nothing here throws: GitHub being down degrades the section, never the build. */

const API = "https://api.github.com";
const LOGIN = "JastinXyz";
const REVALIDATE = 3600;

/* Repos he authored that live under an organisation, so they never appear in
 * /users/JastinXyz/repos. Listed explicitly rather than pulling whole orgs 
 * an org also contains other people's work, and counting that would overclaim.
 * These four are the ones he lists as his own. */
const AUTHORED_ELSEWHERE = [
    "Mengkodingan/ckptw",
];

/* Curated out of the site. GitHub is the archive; this site is the portfolio,
 * and the two are not the same list. Everything here is either a joke repo, a
 * learning exercise, an old version of this site, a private image host, or has
 * no description at all. Nothing with a real description and a real user is on
 * this list: it costs 22 repos and only 27 stars.
 *
 * Add a name here to hide it from the work page and from every total. */
const HIDDEN = new Set([
    "JastinXyz",            // profile README, not a project
    "sticker-api",
    "good-argument",
    "simple-portfolio",
    "v2-jstnlt.my.id",      // v1 stays: it has 21 stars of its own
    "jastinxyz.github.io",
    "bratbretbrot",
    "ily",
    "ikan-lele-bertanya",
    "chatgpt-whatsapp",
    "data-siswa",
    "dashtools",
    "simple-rps",
    "wetonjodoh",
    "ratelokal",
    "img",
    "kebelet-ngoding",
    "tugasdlu",
    "dphp",
    "pehape",
    "weah",
    "tolog",
    /* second pass, his call: old packages, one-off tools and bots he no longer
       wants standing next to the current work */
    "withcoding.me",
    "consolefy",
    "indonesia-logo",
    "telegraf-command-handler",
    "basa",
    "create-badut-dc",
    "whatscode.db",
    "whatscode.mongo",
    "bmbx",
    "scramb",
    "replace-word",
    "sengkalan.js",
    "google-tts.js",
    "nime2x",
    "euphoriachan-api",
    "whatsappBot",
    "chatbot-indo",
    "chatbot-discord-bot",
    "telegraf-brainly",
    "tumpaksewu",
    "MysqldumpOverTelegram",
    "cvmaker",
]);

/* Still listed, but stated as no longer maintained. GitHub's own archived flag
 * is not set on these, and leaving them unmarked implies they are current. */
const UNMAINTAINED = new Set([
    "economy-DiscordBot",
    "Moderation-Discord-Bot",
    "gempa-bot",
]);

const auth = (): HeadersInit => {
    const token = process.env.GITHUB_TOKEN;
    return {
        Accept: "application/vnd.github+json",
        ...(token ? { Authorization: `bearer ${token}` } : {}),
    };
};

export type Repo = {
    name: string;
    /** owner/name, org repos need this for links and social cards */
    fullName: string;
    description: string | null;
    stars: number;
    forks: number;
    language: string | null;
    url: string;
    homepage: string | null;
    pushedAt: string;
    /** when the project started, which is what the work page dates it by */
    createdAt: string;
    /** archived repos stay in the list, some of the best-starred work is archived */
    archived: boolean;
    /** not archived on GitHub, but not being kept up either */
    unmaintained: boolean;
};

export type ProfileTotals = {
    repos: number;
    stars: number;
    forks: number;
    topLanguage: string | null;
};

type RawRepo = {
    name: string; full_name: string; description: string | null; fork: boolean; archived: boolean;
    stargazers_count: number; forks_count: number; language: string | null;
    html_url: string; homepage: string | null; pushed_at: string; created_at: string;
};

const shape = (r: RawRepo): Repo => ({
    name: r.name,
    unmaintained: UNMAINTAINED.has(r.name),
    createdAt: r.created_at,
    fullName: r.full_name,
    description: r.description,
    stars: r.stargazers_count,
    forks: r.forks_count,
    language: r.language,
    url: r.html_url,
    homepage: r.homepage,
    pushedAt: r.pushed_at,
    archived: r.archived,
});

async function getOne(fullName: string): Promise<Repo | null> {
    try {
        const res = await fetch(`${API}/repos/${fullName}`, {
            headers: auth(),
            next: { revalidate: REVALIDATE },
        });
        if (!res.ok) return null;
        return shape(await res.json());
    } catch {
        return null;
    }
}

/** Every non-fork public repo he authored, personal account plus the org ones. */
/** everything public, hidden ones included: the honest star and fork count */
export async function getAllRepos(): Promise<Repo[]> {
    const [own, extra] = await Promise.all([getOwnRepos(), Promise.all(AUTHORED_ELSEWHERE.map(getOne))]);
    const seen = new Set(own.map((r) => r.fullName));
    return [...own, ...extra.filter((r): r is Repo => !!r && !seen.has(r.fullName))];
}

/** what the site shows: the same list with HIDDEN taken out */
export async function getRepos(): Promise<Repo[]> {
    return (await getAllRepos()).filter((r) => !HIDDEN.has(r.name));
}

async function getOwnRepos(): Promise<Repo[]> {
    try {
        const res = await fetch(`${API}/users/${LOGIN}/repos?per_page=100&sort=pushed`, {
            headers: auth(),
            next: { revalidate: REVALIDATE },
        });
        if (!res.ok) return [];

        const raw: RawRepo[] = await res.json();
        return raw
            .filter((r) => !r.fork)
            .map(shape);
    } catch {
        return [];
    }
}

export function totalsFrom(repos: Repo[]): ProfileTotals {
    const byLang = new Map<string, number>();
    for (const r of repos) {
        if (r.language) byLang.set(r.language, (byLang.get(r.language) ?? 0) + 1);
    }
    const topLanguage = [...byLang.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;

    return {
        repos: repos.length,
        stars: repos.reduce((n, r) => n + r.stars, 0),
        forks: repos.reduce((n, r) => n + r.forks, 0),
        topLanguage,
    };
}

export type LanguageShare = { name: string; repos: number; share: number; pct: number };

/** Language mix across every repo, the real distribution, not a hand-written list. */
export function languagesFrom(repos: Repo[], take = 7): LanguageShare[] {
    const count = new Map<string, number>();
    for (const r of repos) {
        if (r.language) count.set(r.language, (count.get(r.language) ?? 0) + 1);
    }
    const total = [...count.values()].reduce((a, b) => a + b, 0);
    if (!total) return [];

    return [...count.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, take)
        .map(([name, repos]) => ({ name, repos, share: repos / total, pct: Math.round((repos / total) * 100) }));
}

export type ContributionDay = { date: string; count: number };
export type Contributions = { total: number; weeks: ContributionDay[][] };

/** The contribution calendar, GraphQL only, so this one needs the token. */
export async function getContributions(): Promise<Contributions | null> {
    if (!process.env.GITHUB_TOKEN) return null;

    const query = `query($l:String!){
      user(login:$l){
        contributionsCollection{
          contributionCalendar{
            totalContributions
            weeks{ contributionDays{ date contributionCount } }
          }
        }
      }
    }`;

    try {
        const res = await fetch(`${API}/graphql`, {
            method: "POST",
            headers: { ...auth(), "Content-Type": "application/json" },
            body: JSON.stringify({ query, variables: { l: LOGIN } }),
            next: { revalidate: REVALIDATE },
        });
        if (!res.ok) return null;

        const json = await res.json();
        const cal = json?.data?.user?.contributionsCollection?.contributionCalendar;
        if (!cal) return null;

        return {
            total: cal.totalContributions,
            weeks: cal.weeks.map((w: { contributionDays: { date: string; contributionCount: number }[] }) =>
                w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount }))
            ),
        };
    } catch {
        return null;
    }
}

/** GitHub renders a social card per repo, a real image, always current, free.
 *  Takes owner/name, so org repos get the right card instead of a 404. */
export const ogCard = (fullName: string) =>
    `https://opengraph.githubassets.com/1/${fullName}`;

/* What the practice is actually written in, counted across the whole Affandra
 * org rather than typed in by hand. The repos themselves are private, so only
 * the shape of the stack is published: language names and their share, never a
 * repository name. Without a token that can see the org this returns nothing
 * and the section renders without the bar. */
export async function getOrgLanguages(org = "AFFANDRA-SOLUSI-TEKNOLOGI"): Promise<LanguageShare[]> {
    try {
        const res = await fetch(`${API}/orgs/${org}/repos?per_page=100`, {
            headers: auth(),
            next: { revalidate: REVALIDATE },
        });
        if (!res.ok) return [];

        const raw: { language: string | null }[] = await res.json();
        const counts = new Map<string, number>();
        for (const r of raw) {
            if (!r.language) continue;
            counts.set(r.language, (counts.get(r.language) ?? 0) + 1);
        }

        const total = [...counts.values()].reduce((a, b) => a + b, 0);
        if (!total) return [];

        return [...counts.entries()]
            .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
            .map(([name, repos]) => ({
                name,
                repos,
                share: repos / total,
                pct: Math.round((repos / total) * 100),
            }));
    } catch {
        return [];
    }
}
