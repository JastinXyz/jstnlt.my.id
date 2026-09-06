import { cn } from "@/lib/cn";

/* The slot is always in the layout, even when empty, an error that
 * appears must not push the rest of the form down. */
export default function FieldError({
    id,
    message,
    onInk,
}: {
    id: string;
    message?: string;
    onInk?: boolean;
}) {
    return (
        <p
            id={id}
            aria-live="polite"
            className={cn("mt-2 min-h-[1lh] text-xs", onInk ? "text-danger-on-panel" : "text-danger")}
        >
            {message}
        </p>
    );
}
