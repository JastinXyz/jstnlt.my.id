import ratelimit, { clientKey } from "@/lib/ratelimit";
import { NextResponse } from "next/server";
import { make } from "simple-body-validator";

const LIMIT = 3;
const limiter = ratelimit({
    interval: 60 * 60 * 1000,
    uniqueTokenPerInterval: 500,
});

/* Telegram's parse_mode=html reads five characters as markup. A message with
 * an ampersand or an angle bracket in it used to come back as a 400, and a
 * message with a tag in it used to be rendered as one. */
const escapeHtml = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function POST(req: Request) {
    const body = await req.json();
    const validator = make(body, {
        name: "required",
        email: "required|email",
        message: "required|max:3500",
    });

    if (!validator.validate()) {
        return NextResponse.json({ errors: validator.errors().all() }, { status: 400 });
    }

    try {
        await limiter.check(LIMIT, clientKey(req));
    } catch {
        return NextResponse.json(
            { errors: { message: [`To avoid spam, this is limited to ${LIMIT} messages per hour.`] } },
            { status: 429 },
        );
    }

    const { name, email, message } = body as { name: string; email: string; message: string };
    const text = `<b>${escapeHtml(name)}</b>\n${escapeHtml(email)}\n\n${escapeHtml(message)}`;

    try {
        /* POST with a JSON body, not a query string: the message is user input
           and has no business being URL-encoded by hand. */
        const res = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: process.env.TELEGRAM_CHAT_ID,
                text,
                parse_mode: "HTML",
            }),
        });
        if (!res.ok) throw new Error(String(res.status));

        return NextResponse.json({ message: "Message sent successfully!", toast: { type: "success" } });
    } catch {
        return NextResponse.json({ errors: { message: ["Failed to send message."] } }, { status: 500 });
    }
}
