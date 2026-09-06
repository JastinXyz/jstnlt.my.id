import { cn } from "@/lib/cn";

/* Filled field with a 2px border that is transparent at rest and accent on
 * focus. Two reasons over the old bare underline:
 *
 * - the global :focus-visible outline drew a hard rectangle around a field
 *   that had no rectangle, which is what looked broken on the dark panel;
 * - a 2px perimeter that only changes colour is a real focus indicator and
 *   costs no layout shift, because the border is always there.
 *
 * Password managers inject their own icon into the field. A padded, filled
 * box gives that somewhere to sit instead of colliding with a hairline. */
const base = [
    "w-full min-h-11 rounded-xs px-3 py-2.5",
    "border-2 border-transparent",
    "transition-[background-color,border-color] duration-150 ease-out",
    "focus:outline-none focus-visible:outline-none",
    "disabled:opacity-45 disabled:cursor-not-allowed",
].join(" ");

const onPaper = [
    "bg-paper-2 text-ink placeholder:text-neutral",
    "hover:bg-paper-3",
    "focus:border-accent focus:bg-paper",
    "aria-[invalid=true]:border-danger",
].join(" ");

const onInkSurface = [
    "bg-panel-2 text-on-panel placeholder:text-on-panel-muted",
    "hover:border-on-panel-rule",
    "focus:border-accent-on-panel focus:bg-panel",
    "aria-[invalid=true]:border-danger-on-panel",
].join(" ");

export const fieldClass = (onInk?: boolean) => cn(base, onInk ? onInkSurface : onPaper);

type InputProps = React.ComponentProps<"input"> & { onInk?: boolean };

export default function Input({ className, onInk, ...props }: InputProps) {
    return <input className={cn(fieldClass(onInk), className)} {...props} />;
}
