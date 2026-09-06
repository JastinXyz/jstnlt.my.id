import { Metadata } from "next";
import Projects from "./projects";

export const metadata: Metadata = {
    title: "Open source",
    description:
        "Public repositories worth keeping: a WhatsApp bot framework on npm, a disposable email service with its own SMTP server, an S3 file manager that stores no credentials.",
    alternates: { canonical: "/projects" },
};
export const revalidate = 3600;

export default function Page() {
    return <Projects />;
}
