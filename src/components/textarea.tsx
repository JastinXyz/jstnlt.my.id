import { cn } from "@/lib/cn";
import { fieldClass, FieldSurface } from "./input";

type TextareaProps = React.ComponentProps<"textarea"> & { surface?: FieldSurface };

export default function Textarea({ className, surface, ...props }: TextareaProps) {
    return <textarea className={cn(fieldClass(surface), "h-32 resize-y leading-relaxed", className)} {...props} />;
}
