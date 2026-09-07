/* Sourced from Jastin's own public writing, the LinkedIn About, experience
 * entries and project descriptions, plus the GitHub profile README. Nothing
 * here is invented; edit it here rather than in the page. */

export const positioning = {
    /** the strongest line he has written about himself */
    headline: "Systems where being wrong has a cost somebody notices.",
    subject: "Backend, frontend, and the server it all ends up on.",
    role: "Fullstack developer in Purwokerto, Indonesia. Four years building school and finance systems end to end. Go, TypeScript and PHP, plus the CI/CD and containers underneath them.",
};

export const about = [
    "A bad edge case in these systems is not a rounding error. It is somebody's record, or somebody's money. So I would rather ship something boring that holds.",
    "Most of what I know came from working inside a platform of around 20 services that has to stay consistent without sharing a database. It taught me the habits I default to now: clear boundaries between services, contracts another team can build against, migrations that are safe to run twice, and queries that still behave once the table stops being small.",
    "I like owning a service properly, from its data model to the endpoints other people call, and staying close enough to the product to know why something is being built and not just what.",
];

/* Affandra Solusi Teknologi, the production unit of his vocational school,
 * which he has run as a freelance practice since 2022. Longer than the day
 * job, and entirely his: 41 repositories, still pushed to this week.
 * Figures come from his CV; repo counts from the GitHub org. */
export const affandra = {
    name: "Affandra Solusi Teknologi",
    kind: "The software arm of my vocational school, run as a freelance practice",
    period: "Jul 2022 to present",
    lead: "Web systems for schools and small institutions, plus whatever else comes through the door. Four years, and still the place I try things first.",
    team: "Built with a small team, where roles blur. Mine usually runs from the schema to the server.",
    /* Counted from the public GitHub org, not from memory. */
    figures: [
        { value: "41", label: "repositories in the org" },
        { value: "8", label: "languages across them" },
        { value: "4 yrs", label: "and still pushing weekly" },
    ],
    /* Described from what is publicly visible in the org, deliberately the
     * range of it, rather than a module list. */
    items: [
        {
            title: "Institution websites",
            body: "Schools, a clinic and a foundation. The unglamorous side of the practice, and the part that pays for the rest. Mostly Laravel and Blade.",
        },
        {
            title: "Internship tracking, several cohorts deep",
            body: "PKL monitoring rebuilt across a few years, with a WhatsApp bot handling the daily loop and a downtime checker watching that the bot is still alive.",
        },
        {
            title: "A wedding invitation product",
            body: "Three repositories: a TypeScript API, a Next.js frontend, and a Go rewrite of the backend when the first one stopped being fun to extend.",
        },
        {
            title: "The plumbing nobody asks for",
            body: "CI/CD pipelines, a frontend boilerplate, an internal SDK and server utilities, so a new project starts from something instead of from nothing. Katla also lives here, rewritten in Rust.",
        },
    ],
};

/* The work itself, detached from the employer. These are the things he has
 * actually shipped in production; who signed the cheque is a credit line in
 * the timeline below, not a heading repeated three times.
 *
 * Scope is stated by naming what he built, not by apologising for what he did
 * not. "Invoice logic on the school side" says how far the work reached
 * without either claiming the payments domain or talking him down; the
 * platform item names the boundary the same way. A portfolio that claims the
 * whole stack is checkable, and fails the check. */
export const productionWork = {
    lead: "On a team since 2025, inside an education and payments platform of around twenty Go, Laravel and Node services used by schools, partners and their members.",
    /* the phrase the highlighter sits under, verbatim from the sentence above */
    leadMark: "around twenty Go, Laravel and Node services",
    items: [
        {
            title: "A school service, end to end",
            body: "Admissions, attendance, scheduling, quizzes and hafalan tracking, from the data model through the REST contracts to the mobile endpoints, plus the Next.js dashboard built against that same service so the API and the screens ship together.",
        },
        {
            title: "Migrations that are safe to run twice",
            body: "Moved live schools off the old platform onto the new one with a migration that resumes where it stopped, so no school lost a working day.",
            mark: "so no school lost a working day",
        },
        {
            title: "Signup to a running tenant",
            body: "The pipeline that takes a new partner from signup to live: document checks, provisioning across services, their own subdomain, and the stock they start with.",
        },
        {
            title: "Invoices and payment references",
            body: "Invoice logic on the school side, and reference IDs that stay unique across invoices and every payment made against them, so a payment matches exactly one bill.",
            mark: "reference IDs that stay unique",
        },
        {
            title: "Notifications that survive the busy days",
            body: "Reworked the delivery path across push, email and WhatsApp so notifications survive the days everyone gets one at once.",
            mark: "survive the days everyone gets one at once",
        },
        {
            title: "Enough of the Kubernetes side to ship",
            body: "Routing, certificates and per-environment manifests when something I built needs them. The platform itself belongs to the people who run it full time.",
        },
    ],
};

export type Role = {
    title: string;
    org: string;
    period: string;
    length: string;
    summary: string;
    points: string[];
    stack: string[];
};

export const experience: Role[] = [
    {
        title: "Fullstack Web Developer",
        org: "Cazh",
        period: "Apr 2026 to present",
        length: "6 mos",
        summary:
            "Across the Cazh education and financial platform of around 20 Go, Laravel and Node.js services used by schools, partners and their members.",
        points: [
            "Own the Go service behind the school product: admissions, attendance, scheduling, quizzes and hafalan tracking, from the data model through the REST contracts to the mobile endpoints.",
            "Build the school dashboard in Next.js against that same service, so the API and the screens that use it ship together instead of one waiting on the other.",
            "Built the pipeline that takes a new partner from signup to a running tenant: document checks, provisioning across services, their own subdomain, and the stock they start with.",
            "Moved live schools off the old platform onto the new one, with a migration that resumes where it stopped and is safe to run twice, so no school lost a working day.",
            "Look after the Kubernetes side: routing, wildcard certificates, per-environment manifests, and staging to production cutovers.",
        ],
        stack: ["Go", "TypeScript", "Next.js", "Laravel", "PostgreSQL", "MongoDB", "Redis", "RabbitMQ", "Kubernetes", "AWS"],
    },
    {
        title: "Backend Developer",
        org: "Cazh",
        period: "May 2025 to Mar 2026",
        length: "11 mos",
        summary:
            "Backend and full-stack features for the school management and digital identity products, in a setup where each service owns its own data.",
        points: [
            "Owned the operational side of the school product: admissions, attendance and class scheduling, including staff shifts, multiple campuses and late-tolerance rules.",
            "Built the billing logic behind school invoices, including reference IDs that stay unique across invoices and the payments made against them.",
            "Helped start the Go service the school product now runs on, moving load off the older Node.js monolith it grew out of.",
            "Made messaging dependable across push, email and WhatsApp, reworking the delivery path so notifications stopped getting dropped under load.",
        ],
        stack: ["Go", "Laravel", "Livewire", "Express", "TypeScript", "PostgreSQL", "MongoDB", "Redis", "RabbitMQ"],
    },
    {
        title: "Fullstack Web Developer, Intern",
        org: "Cazh",
        period: "Jan 2024 to Jun 2024",
        length: "6 mos",
        summary: "First role at Cazh, on the public-facing product site.",
        points: [
            "Built and maintained the Cazh Cards marketing site in Next.js: solution pages, pricing and payment sections, client logos and the live product stats.",
            "Moved hardcoded page content into a data layer the team could edit without touching the markup.",
        ],
        stack: ["Next.js", "React", "TypeScript"],
    },
];

export const stack = [
    { group: "Languages", items: ["Go", "TypeScript", "PHP", "JavaScript"] },
    { group: "Backend", items: ["Laravel", "Express", "Fastify", "NestJS", "Inertia.js"] },
    { group: "Frontend", items: ["React", "Next.js", "Tailwind CSS"] },
    { group: "Data", items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "RabbitMQ"] },
    { group: "Architecture", items: ["REST", "WebSocket", "Microservices", "API Gateway", "JWT", "Swagger/OpenAPI"] },
    { group: "Infra", items: ["Docker", "Kubernetes", "CI/CD", "AWS"] },
];

export const education = [
    { school: "Universitas Sains dan Teknologi Komputer (STEKOM)", detail: "BSc Informatics Engineering", period: "2025 to present" },
    { school: "SMK Ma'arif NU 1 Ajibarang", detail: "Rekayasa Perangkat Lunak", period: "2022 to 2025" },
];
