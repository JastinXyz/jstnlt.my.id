"use client"

import Button from "@/components/button";
import FieldError from "@/components/field-error";
import Input from "@/components/input";
import Textarea from "@/components/textarea";
import buildValidationError from "@/lib/build-validation-error";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type ContactInputs = { name: string; email: string; message: string };

export default function ContactForm({ className }: { className?: string }) {
    const { register, handleSubmit, reset, setError, formState: { errors } } = useForm<ContactInputs>();
    const [loading, setLoading] = useState(false);

    const sendMessage: SubmitHandler<ContactInputs> = async (d) => {
        try {
            setLoading(true);
            const { data } = await axios("/api/sendmessage", { method: "POST", data: d });

            toast.success(data.message);
            reset();
        } catch (error) {
            buildValidationError(error, setError);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(sendMessage)} noValidate className={className}>
            <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
                <div>
                    <label htmlFor="name" className="label text-on-panel-muted">Name</label>
                    <Input
                        onInk
                        type="text"
                        id="name"
                        autoComplete="name"
                        aria-invalid={!!errors.name}
                        aria-describedby="name-error"
                        {...register("name", { required: "Tell me what to call you." })}
                        placeholder="jstn"
                    />
                    <FieldError onInk id="name-error" message={errors.name?.message} />
                </div>
                <div>
                    <label htmlFor="email" className="label text-on-panel-muted">Email address</label>
                    <Input
                        onInk
                        type="email"
                        id="email"
                        autoComplete="email"
                        aria-invalid={!!errors.email}
                        aria-describedby="email-error"
                        {...register("email", { required: "I need an address to reply to." })}
                        placeholder="jstn@example.com"
                    />
                    <FieldError onInk id="email-error" message={errors.email?.message} />
                </div>
            </div>

            <div className="mt-4">
                <label htmlFor="message" className="label text-on-panel-muted">Message</label>
                <Textarea
                    onInk
                    id="message"
                    aria-invalid={!!errors.message}
                    aria-describedby="message-error"
                    {...register("message", { required: "Write something first." })}
                    placeholder="hello world!"
                />
                <FieldError onInk id="message-error" message={errors.message?.message} />
            </div>

            <Button variant="onInk" className="mt-4 w-full sm:w-auto" loading={loading}>
                Send message
            </Button>
        </form>
    );
}
