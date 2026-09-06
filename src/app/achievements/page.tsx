import { Metadata } from "next";
import Achievements from "./achievements"

export const metadata: Metadata = {
    title: "Awards",
    description:
        "Six placements in LKS SMK and one hackathon, including first at regency and provincial level and a top four finish in the national final.",
    alternates: { canonical: "/achievements" },
}

export default function AchievementsPage() {
    return <Achievements />
}
