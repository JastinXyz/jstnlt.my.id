"use client"

import type { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export default function Providers({ session, children }: { session: Session | null, children: React.ReactNode }) {
    return (
        <SessionProvider session={session}>
            {children}
            <ProgressBar
                height="4px"
                color="#7993B7"
            />
        </SessionProvider>
    )
}