import { cn } from "@/lib/cn";
import { cva, VariantProps } from "class-variance-authority";

const variants = cva('cursor-pointer rounded-md py-2 px-4 disabled:pointer-events-none disabled:opacity-50', {
    variants: {
        variant: {
            primary: 'bg-primary-400 text-white',
            danger: 'bg-red-400 text-white',
        }
    },
    defaultVariants: {
        variant: 'primary'
    }
});

type ButtonProps = React.ComponentProps<"button"> & VariantProps<typeof variants>

export default function Button({ className, variant, ...props }: ButtonProps) {
    return <button className={cn(variants({ variant, className }))} {...props} />
}