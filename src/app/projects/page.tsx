import { Metadata } from "next";
import Projects from "./projects";

export const metadata: Metadata = { title: "work" };
export const revalidate = 3600;

export default function Page() {
    return <Projects />;
}
