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

/* The fill has to differ from whatever the field is sitting on. On plain paper
 * that means a paper-2 fill; inside a paper-2 block the same fill disappears,
 * so there it flips to paper and takes a hairline as well, because a fill that
 * is lighter than its surroundings reads as a gap without one. */
const onPaper = [
    "bg-paper-2 text-ink placeholder:text-neutral",
    "hover:bg-paper-3",
    "focus:border-accent focus:bg-paper",
    "aria-[invalid=true]:border-danger",
].join(" ");

const onPaper2 = [
    "bg-paper text-ink placeholder:text-neutral",
    /* colour the 2px border that is already there rather than adding a ring
       inside it: the field paints its background under a transparent border,
       so an inset ring leaves 2px of fill stranded outside the line */
    "border-rule",
    "hover:border-rule-strong",
    "focus:border-accent",
    "aria-[invalid=true]:border-danger",
].join(" ");

const onInkSurface = [
    "bg-panel-2 text-on-panel placeholder:text-on-panel-muted",
    "hover:border-on-panel-rule",
    "focus:border-accent-on-panel focus:bg-panel",
    "aria-[invalid=true]:border-danger-on-panel",
].join(" ");

export type FieldSurface = "paper" | "paper-2" | "panel";

export const fieldClass = (surface: FieldSurface = "paper") =>
    cn(base, surface === "panel" ? onInkSurface : surface === "paper-2" ? onPaper2 : onPaper);

type InputProps = React.ComponentProps<"input"> & { surface?: FieldSurface };

export default function Input({ className, surface, ...props }: InputProps) {
    return <input className={cn(fieldClass(surface), className)} {...props} />;
}
