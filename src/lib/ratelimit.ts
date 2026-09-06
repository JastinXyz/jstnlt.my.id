import { LRUCache } from "lru-cache";

type Options = {
    /** how many distinct keys to remember at once */
    uniqueTokenPerInterval?: number;
    /** the window, in milliseconds */
    interval?: number;
};

/* A per-key counter in an LRU with a TTL, which is enough for a contact form
 * on a single instance. It is not a distributed limiter: every deployment
 * region counts on its own.
 *
 * The key has to be something about the caller. Passing a constant makes one
 * global bucket, so three submissions from anybody lock out everybody. */
export default function ratelimit(options?: Options) {
    const hits = new LRUCache<string, number>({
        max: options?.uniqueTokenPerInterval ?? 500,
        ttl: options?.interval ?? 60_000,
    });

    return {
        /** resolves while under the limit, rejects once the key has spent it */
        check: (limit: number, key: string) =>
            new Promise<number>((resolve, reject) => {
                const used = (hits.get(key) ?? 0) + 1;
                /* noUpdateTTL: the window runs from the first hit, not the last.
                   Without it the clock restarts on every attempt, so someone
                   knocking once a minute is never let back in. */
                hits.set(key, used, { noUpdateTTL: true });
                return used > limit ? reject(new Error("rate limited")) : resolve(limit - used);
            }),
    };
}

/* Whatever the platform tells us about the caller. Behind a proxy the first
 * entry of x-forwarded-for is the client; everything else here is a fallback
 * so a local run still gets a stable key rather than one shared bucket. */
export function clientKey(req: Request): string {
    const h = req.headers;
    const forwarded = h.get("x-forwarded-for")?.split(",")[0]?.trim();
    return forwarded || h.get("x-real-ip") || h.get("cf-connecting-ip") || "local";
}
