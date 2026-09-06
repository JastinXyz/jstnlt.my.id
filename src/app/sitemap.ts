import { MetadataRoute } from "next";

const SITE = "https://jstnlt.my.id";

/* Four pages, so this is written out rather than generated. The home page is
 * the only one that changes on its own, because it reads GitHub hourly. */
export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();
    return [
        { url: SITE, lastModified: now, changeFrequency: "daily", priority: 1 },
        { url: `${SITE}/projects`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
        { url: `${SITE}/achievements`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
        { url: `${SITE}/guestbook`, lastModified: now, changeFrequency: "weekly", priority: 0.4 },
    ];
}
