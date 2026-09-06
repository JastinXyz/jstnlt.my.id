"use client"

import Button from "@/components/button";
import FieldError from "@/components/field-error";
import Input from "@/components/input";
import Navbar from "@/components/navbar";
import { cn } from "@/lib/cn";
import PageHead from "@/components/page-head";
import buildValidationError from "@/lib/build-validation-error";
import readableTimestamp, { relativeTime } from "@/lib/readable-timestamp";
import { IconBrandGithub } from "@tabler/icons-react";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type GuestbookInput = { message: string; };

/** matches the validator in /api/guestbook */
const MAX = 150;
type Entry = { content: string; timestamp: number; user: { name: string; image?: string | null } };

export default function Guestbook() {
    const { data: session, status } = useSession();
    const { register, handleSubmit, reset, setError, watch, formState: { errors } } = useForm<GuestbookInput>();

    const [data, setData] = useState<Entry[]>();
    const [loading, setLoading] = useState(false);

    /* the field stops accepting at MAX, so the count has to be on screen */
    const typed = watch('message') ?? '';
    const left = MAX - typed.length;

    const fetchGuestbook = async () => {
        const get = await axios('/api/guestbook');
        setData(get.data.data);
    }

    useEffect(() => {
        fetchGuestbook();
    }, []);

    const sendMessage: SubmitHandler<GuestbookInput> = async (d) => {
        try {
            setLoading(true);
            await axios('/api/guestbook', { method: 'POST', data: d });

            // Silent success, the new entry appearing in the list below is
            // the confirmation. A toast here would just repeat what's visible.
            await fetchGuestbook();
            reset();
        } catch (error) {
            buildValidationError(error, setError);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Navbar page="guestbook" />

            <main className="pt-14 md:pt-20">
                <PageHead
                    label="Guestbook"
                    title={<>Sign the wall<span className="text-accent">.</span></>}
                    lead={
                        <p>
                            Leave a note, anything at all. Sign in with GitHub so I know it’s a
                            person, then it stays here for good.
                        </p>
                    }
                />

                {/* The compose block sits on its own surface. That's what
                    separates it from the messages, rather than a rule. */}
                <section className="mt-14 bg-paper-2 py-10 md:py-12">
                    <div className="shell">
                        {status === 'authenticated' ? (
                            <form onSubmit={handleSubmit(sendMessage)} noValidate className="max-w-2xl">
                                {/* who is signing, with the avatar GitHub already gave us:
                                    it says the session is real without spending a sentence
                                    on it, and it is the same face that will sit next to the
                                    message once it is posted */}
                                <div className="flex items-center gap-3">
                                    {session?.user?.image && (
                                        <img
                                            src={session.user.image}
                                            alt=""
                                            width={28}
                                            height={28}
                                            className="size-7 shrink-0 rounded-full bg-paper-3"
                                        />
                                    )}
                                    <p className="label">
                                        Signed in as <span className="text-ink">{session?.user?.name}</span>
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => signOut()}
                                        disabled={loading}
                                        className="label ml-auto underline decoration-rule-strong underline-offset-4 transition-colors duration-150 hover:text-accent-text disabled:opacity-45"
                                    >
                                        Sign out
                                    </button>
                                </div>

                                <label htmlFor="message" className="label mt-6 block">Your message</label>
                                <Input
                                    type="text"
                                    id="message"
                                    maxLength={MAX}
                                    aria-invalid={!!errors.message}
                                    aria-describedby="message-error message-count"
                                    {...register('message', { required: 'Write something first.' })}
                                    placeholder="hello world!"
                                    surface="paper-2"
                                    className="mt-2"
                                />

                                <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                                    <FieldError id="message-error" message={errors.message?.message} />
                                    {/* the limit is 150 and the field silently stops accepting
                                        at it, which reads as a broken keyboard unless the count
                                        is visible */}
                                    <p
                                        id="message-count"
                                        className={cn(
                                            "label ml-auto tnum",
                                            left <= 20 && "text-accent-text",
                                        )}
                                    >
                                        {left} left
                                    </p>
                                </div>

                                <div className="mt-4">
                                    <Button loading={loading} loadingLabel="signing…">Sign message</Button>
                                </div>
                            </form>
                        ) : (
                            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                                <Button
                                    type="button"
                                    onClick={() => signIn('github')}
                                    disabled={status === 'loading'}
                                >
                                    <IconBrandGithub className="h-4 w-4" />
                                    Sign in with GitHub
                                </Button>
                                <p className="label">Nothing is posted until you write something</p>
                            </div>
                        )}
                    </div>
                </section>

                <div className="shell mt-14 pb-4">
                    <h2 className="display-sm text-2xl">
                        {data ? `${data.length} message${data.length === 1 ? "" : "s"}` : "Messages"}
                    </h2>

                    {/* Rows, not paragraphs: who and when on the left, what they wrote
                        on the right, the same two-column shape the rest of the site uses
                        for lists. Older entries were stored without an avatar, so the
                        monogram is the fallback rather than a broken image. */}
                    <ul className="mt-8 flex flex-col">
                        {data
                            ? data.map((d, idx) => (
                                <li
                                    key={idx}
                                    className="grid gap-x-10 gap-y-3 border-t border-rule py-6 md:grid-cols-12"
                                >
                                    <div className="flex items-center gap-3 md:col-span-3 md:items-start">
                                        {d.user.image ? (
                                            <img
                                                src={d.user.image}
                                                alt=""
                                                width={32}
                                                height={32}
                                                loading="lazy"
                                                className="size-8 shrink-0 rounded-full bg-paper-2"
                                            />
                                        ) : (
                                            <span
                                                aria-hidden="true"
                                                className="display-sm grid size-8 shrink-0 place-items-center rounded-full bg-paper-2 text-sm text-muted"
                                            >
                                                {d.user.name?.trim().charAt(0).toUpperCase() || "?"}
                                            </span>
                                        )}
                                        <div className="min-w-0">
                                            <p className="display-sm truncate text-md">{d.user.name}</p>
                                            <p
                                                className="label mt-0.5 tnum"
                                                title={readableTimestamp(d.timestamp)}
                                            >
                                                {relativeTime(d.timestamp)}
                                            </p>
                                        </div>
                                    </div>

                                    <p className="text-md leading-relaxed md:col-span-8 md:col-start-5">
                                        {d.content}
                                    </p>
                                </li>
                            ))
                            : [...Array(5)].map((_, idx) => (
                                <li
                                    key={idx}
                                    aria-hidden="true"
                                    className="grid animate-pulse gap-x-10 gap-y-3 border-t border-rule py-6 md:grid-cols-12"
                                >
                                    <div className="flex items-center gap-3 md:col-span-3">
                                        <div className="size-8 shrink-0 rounded-full bg-paper-2" />
                                        <div className="w-full">
                                            <div className="h-3.5 w-28 rounded-xs bg-paper-2" />
                                            <div className="mt-2 h-3 w-16 rounded-xs bg-paper-2" />
                                        </div>
                                    </div>
                                    <div className="md:col-span-8 md:col-start-5">
                                        <div className="h-4 w-full max-w-md rounded-xs bg-paper-2" />
                                    </div>
                                </li>
                            ))}
                    </ul>

                    {data?.length === 0 && (
                        <p className="prose mt-8">No messages yet. Yours would be the first.</p>
                    )}
                </div>
            </main>
        </>
    );
}
