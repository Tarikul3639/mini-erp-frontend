import type { LucideIcon } from "lucide-react";

interface Props {
    title: string;
    description: string;
    icon: LucideIcon;
}

export default function EmptyState({
    title,
    description,
    icon: Icon,
}: Props) {
    return (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-20 text-center">
            <div className="bg-muted rounded-full p-4">
                <Icon className="text-muted-foreground size-10" />
            </div>

            <h3 className="mt-6 text-xl font-semibold">
                {title}
            </h3>

            <p className="text-muted-foreground mt-2 max-w-md">
                {description}
            </p>
        </div>
    );
}