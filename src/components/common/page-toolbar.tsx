import { Search, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface PageToolbarProps {
    search: string
    searchPlaceholder?: string
    buttonText?: string

    onSearchChange: (value: string) => void
    onCreate: () => void
}

export default function PageToolbar({
    search,
    searchPlaceholder = "Search...",
    buttonText = "Create",
    onSearchChange,
    onCreate,
}: PageToolbarProps) {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-sm">
                <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                    placeholder={searchPlaceholder}
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-10"
                />
            </div>

            <Button onClick={onCreate}>
                <Plus className="mr-2 size-4" />
                {buttonText}
            </Button>
        </div>
    )
}
