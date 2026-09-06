import { cn } from "@/lib/cn";
import { cva, VariantProps } from "class-variance-authority";

/* Eight states: default · hover · focus-visible · active · disabled ·
 * loading · error · success. Squared slab, not a pill.
 * Motion: colour shift + 1px press. No lift, no scale, no shadow.
 * Fills use --color-accent-text, not --color-accent: the label is 11px,
 * which needs 4.5:1, and the hot accent only clears 3:1. */
const variants = cva(
    [
        "font-body font-medium text-2xs uppercase tracking-[0.18em] cursor-pointer",
        "inline-flex items-center justify-center gap-2 whitespace-nowrap",
        "min-h-11 rounded-xs px-5 py-3",
        "transition-[background-color,color,border-color] duration-150 ease-out",
        "active:translate-y-px",
        "disabled:cursor-not-allowed disabled:opacity-45",
        "data-[state=loading]:opacity-70",
    ].join(" "),
    {
        variants: {
            variant: {
                primary:
                    "bg-ink text-paper border border-ink hover:bg-accent-text hover:border-accent-text data-[state=error]:bg-danger data-[state=error]:border-danger",
                quiet:
                    "bg-transparent text-ink border border-rule-strong hover:border-ink hover:bg-paper-2",
                /* on the inverted contact panel: solid paper, inverting to outline */
                onInk:
                    "bg-on-panel text-panel border border-on-panel hover:bg-transparent hover:text-on-panel",
                danger:
                    "bg-transparent text-danger border border-danger hover:bg-danger hover:text-paper",
                blank: "",
            },
        },
        defaultVariants: {
            variant: "primary",
        },
    }
);

type ButtonProps = React.ComponentProps<"button"> &
    VariantProps<typeof variants> & {
        /** swaps the label and blocks input while a request is in flight */
        loading?: boolean;
        loadingLabel?: string;
        /** transient states surfaced by the form, not by the button itself */
        state?: "error" | "success";
    };

export default function Button({
    className,
    variant,
    loading,
    loadingLabel = "sending…",
    state,
    children,
    ...props
}: ButtonProps) {
    return (
        <button
            type={props.type ?? "submit"}
            data-state={loading ? "loading" : state}
            aria-busy={loading || undefined}
            disabled={props.disabled || loading}
            className={cn(variants({ variant, className }))}
            {...props}
        >
            {loading ? loadingLabel : children}
        </button>
    );
}
