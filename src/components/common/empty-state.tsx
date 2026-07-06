import type { LucideIcon } from "lucide-react"

interface Props {
    title: string
    description: string
    icon: LucideIcon
}

export default function EmptyState({
    title,
    description,
    icon: Icon,
}: Props) {
    return (
        <div className="flex flex-col items-center justify-center rounded-sm border border-dashed px-6 py-12 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-muted">
                <Icon className="h-6 w-6 text-muted-foreground" />
            </div>

            <h3 className="mt-4 text-base font-semibold">
                {title}
            </h3>

            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                {description}
            </p>
        </div>
    )
}