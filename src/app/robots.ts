import { MetadataRoute } from "next";

/* The auth routes are the only thing worth keeping out: they are redirects and
 * error pages, and a crawler that indexes /api/auth/signin?error=... publishes
 * a broken sign-in page under this domain's name. */
export default function robots(): MetadataRoute.Robots {
    return {
        rules: { userAgent: "*", allow: "/", disallow: "/api/" },
        sitemap: "https://jstnlt.my.id/sitemap.xml",
        host: "https://jstnlt.my.id",
    };
}
