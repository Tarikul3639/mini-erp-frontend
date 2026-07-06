import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"

interface Props {
    page: number
    totalPage: number
    onPageChange: (page: number) => void
}

export default function Pagination({ page, totalPage, onPageChange }: Props) {
    const pages = Array.from({ length: totalPage }, (_, i) => i + 1)

    return (
        <div className="flex items-center justify-center gap-2">
            <Button
                size="icon"
                variant="outline"
                disabled={page === 1}
                onClick={() => onPageChange(page - 1)}
            >
                <ChevronLeft className="size-4" />
            </Button>

            {pages.map((item) => (
                <Button
                    key={item}
                    size="icon"
                    variant={item === page ? "default" : "outline"}
                    onClick={() => onPageChange(item)}
                >
                    {item}
                </Button>
            ))}

            <Button
                size="icon"
                variant="outline"
                disabled={page === totalPage}
                onClick={() => onPageChange(page + 1)}
            >
                <ChevronRight className="size-4" />
            </Button>
        </div>
    )
}
