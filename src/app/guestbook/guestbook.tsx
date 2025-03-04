"use client"

import Navbar from "@/components/navbar";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Button from "@/components/button";
import { IconBrandGithub, IconInfoCircle, IconLogout } from "@tabler/icons-react";
import axios from "axios";
import readableTimestamp from "@/lib/readable-timestamp";
import Input from "@/components/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import buildValidationError from "@/lib/build-validation-error";
import { headers } from "next/headers";

type GuestbookInput = { message: string; };

export default function Guestbook() {
    let { data: session, status } = useSession();
    let { register, handleSubmit, reset, setError, formState: { errors } } = useForm<GuestbookInput>();
    
    let [data, setData] = useState<{ content: string; timestamp: number; user: { name: string } }[]>();
    let [loading, setLoading] = useState<boolean>(false);

    const fetchGuestbook = async () => {
        let get = await axios('/api/guestbook');
        setData(get.data.data);
    }

    useEffect(() => {
        fetchGuestbook();
    }, []);

    let sendMessage: SubmitHandler<GuestbookInput> = async(d) => {
        try {
          setLoading(true);
          let { data } = await axios('/api/guestbook', { method: 'POST', data: d });

          fetchGuestbook();
          toast.success(data.message);
          reset();
          setLoading(false);
        } catch (error) {
          buildValidationError(error, setError);
          setLoading(false)
        }
    }
    return (
        <>
            <Navbar page="guestbook" />
            <div className="mt-20">
                <h1 className="text-2xl text-gray-900 font-bold">Guestbook</h1>
                <div className="mt-2 leading-7 text-neutral-700">
                    <p>Leave a message and say hello!</p>
                    <div className="mt-10">
                        {status === 'authenticated' && (
                            <form onSubmit={handleSubmit(sendMessage)}>
                                <div>
                                    <label htmlFor="message">message</label>
                                    <Input type="text" id="message" {...register('message', { required: true })} placeholder="hello world!" />
                                    <span className="text-xs text-red-500">{errors.message?.message}</span>
                                </div>
                                <div className="mt-2 flex flex-col md:flex-row gap-2">
                                    <Button className="w-full" disabled={loading}>sign message</Button>
                                    <Button variant={'danger'} onClick={() => signOut()} disabled={loading} className="w-full md:w-1/3 flex items-center gap-2 justify-center"><span>sign out</span> <IconLogout className="w-5 h-5" /></Button>
                                </div>
                                <div className="text-xs md:text-sm flex gap-1 items-center mt-2">
                                    <IconInfoCircle className="w-4 h-4" />
                                    <p>Logged in as <span className="font-semibold">{session?.user?.name}</span>.</p>
                                </div>
                            </form>
                        )}
                        
                        {status !== 'authenticated' && (
                            <Button onClick={() => signIn('github')} variant={'blank'} className="bg-[#333333] hover:bg-[#555555] transition inline-flex gap-2 text-white"><IconBrandGithub className="w-6 h-6" /> Log in with GitHub</Button>
                        )}
                    </div>
                    <div className="mt-10 flex flex-col gap-6">
                        {data?.map((d, idx) => (
                            <div key={idx}>
                                <p className="text-gray-900">{d.content}</p>
                                <p className="text-sm text-neutral-500">— By {d.user.name} on {readableTimestamp(d.timestamp)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}