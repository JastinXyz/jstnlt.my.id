import { Metadata } from "next";
import Guestbook from "./guestbook";

export const metadata: Metadata = {
    title: "Guestbook",
    description: "Leave a note. Sign in with GitHub, and it stays here for good.",
    alternates: { canonical: "/guestbook" },
}

export default function GuestbookPage() {
    return <Guestbook />
}
