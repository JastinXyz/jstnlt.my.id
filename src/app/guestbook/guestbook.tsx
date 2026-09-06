"use client"

import Button from "@/components/button";
import FieldError from "@/components/field-error";
import Input from "@/components/input";
import Navbar from "@/components/navbar";
import PageHead from "@/components/page-head";
import buildValidationError from "@/lib/build-validation-error";
import readableTimestamp from "@/lib/readable-timestamp";
import { IconBrandGithub } from "@tabler/icons-react";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type GuestbookInput = { message: string; };
type Entry = { content: string; timestamp: number; user: { name: string } };

export default function Guestbook() {
    const { data: session, status } = useSession();
    const { register, handleSubmit, reset, setError, formState: { errors } } = useForm<GuestbookInput>();

    const [data, setData] = useState<Entry[]>();
    const [loading, setLoading] = useState(false);

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
                                <label htmlFor="message" className="label">Your message</label>
                                <Input
                                    type="text"
                                    id="message"
                                    maxLength={150}
                                    aria-invalid={!!errors.message}
                                    aria-describedby="message-error"
                                    {...register('message', { required: 'Write something first.' })}
                                    placeholder="hello world!"
                                />
                                <FieldError id="message-error" message={errors.message?.message} />

                                <div className="mt-3 flex flex-wrap items-center gap-4">
                                    <Button loading={loading} loadingLabel="signing…">Sign message</Button>
                                    <Button type="button" variant="quiet" onClick={() => signOut()} disabled={loading}>
                                        Sign out
                                    </Button>
                                    <p className="label">
                                        Signed in as <span className="text-ink">{session?.user?.name}</span>
                                    </p>
                                </div>
                            </form>
                        ) : (
                            <Button
                                type="button"
                                variant="quiet"
                                onClick={() => signIn('github')}
                                disabled={status === 'loading'}
                            >
                                <IconBrandGithub className="h-4 w-4" />
                                Sign in with GitHub
                            </Button>
                        )}
                    </div>
                </section>

                <div className="shell mt-14 pb-4">
                    <h2 className="display-sm text-2xl">
                        {data ? `${data.length} message${data.length === 1 ? "" : "s"}` : "Messages"}
                    </h2>

                    <ul className="mt-8 flex flex-col gap-8">
                        {data
                            ? data.map((d, idx) => (
                                <li key={idx} className="max-w-2xl">
                                    <p className="text-md leading-relaxed">{d.content}</p>
                                    <p className="label mt-2">
                                        {d.user.name} <span aria-hidden="true">·</span>{" "}
                                        <span className="tnum">{readableTimestamp(d.timestamp)}</span>
                                    </p>
                                </li>
                            ))
                            : [...Array(5)].map((_, idx) => (
                                <li key={idx} aria-hidden="true" className="max-w-2xl animate-pulse">
                                    <div className="h-4 w-full max-w-sm rounded-xs bg-paper-2" />
                                    <div className="mt-3 h-3 w-40 rounded-xs bg-paper-2" />
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
