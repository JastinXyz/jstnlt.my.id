import { MongoDBAdapter } from '@auth/mongodb-adapter';
import GithubProvider from "next-auth/providers/github";
import db from '@/lib/db';
import { AuthOptions, getServerSession } from 'next-auth';
 
export const authConfig = {
    adapter: MongoDBAdapter(db),
    secret: process.env.NEXT_AUTH_SECRET,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
            /* GitHub now returns iss=https://github.com/login/oauth on the
             * callback. openid-client validates that against the configured
             * issuer and the two have to match character for character, but
             * next-auth ships this provider without one, because GitHub is
             * plain OAuth 2 rather than OpenID Connect. Without it the callback
             * fails as "issuer must be configured on the issuer", which reaches
             * the browser as OAuthCallback with nothing to go on. */
            issuer: "https://github.com/login/oauth",
        })
    ],
} satisfies AuthOptions;

/**
 * Helper function to get the session on the server without having to import the authOptions object every single time
 * @returns The session object or null
 */
export const getSession = () => getServerSession(authConfig)
