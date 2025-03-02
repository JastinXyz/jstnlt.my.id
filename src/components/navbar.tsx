import { cn } from "@/lib/cn";
import Link from "next/link";

type page = 'home' | 'achievements' | 'projects' | 'guestbook';

export default function Navbar({ page }: { page?: page }) {
    return (
        <nav className="flex items-center justify-between">
            <Link href="/" className="font-bold text-xl text-gray-900">jstn<span className="text-primary-500">lt.</span></Link>
            <div className="flex gap-6">
                <Link href={'/'} className={cn("text-neutral-700", page === 'home' && "underline text-gray-900")}>home</Link>
                <Link href={'/achievements'} className={cn("text-neutral-700", page === 'achievements' && "underline text-gray-900")}>achievements</Link>
                <Link href={'/projects'} className={cn("text-neutral-700", page === 'projects' && "underline text-gray-900")}>projects</Link>
                <Link href={'/guestbook'} className={cn("text-neutral-700", page === 'guestbook' && "underline text-gray-900")}>guestbook</Link>
            </div>
        </nav>
    );
}