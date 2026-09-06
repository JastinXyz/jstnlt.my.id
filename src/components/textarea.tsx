import { cn } from "@/lib/cn";
import { fieldClass } from "./input";

type TextareaProps = React.ComponentProps<"textarea"> & { onInk?: boolean };

export default function Textarea({ className, onInk, ...props }: TextareaProps) {
    return <textarea className={cn(fieldClass(onInk), "h-32 resize-y leading-relaxed", className)} {...props} />;
}
