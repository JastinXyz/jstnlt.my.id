import { cn } from "@/lib/cn";

export default function Input({ className, ...props }: React.ComponentProps<"input">) {
    return <input className={cn(className, 'w-full bg-primary-100 rounded-md focus:outline-2 focus:outline-primary-200 p-2 mt-1')} {...props} />
}