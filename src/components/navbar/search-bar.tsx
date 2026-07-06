import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import { Loader2, Search } from "lucide-react"

import { Input } from "@/components/ui/input"

import useDebounce from "@/hooks/use-debounce"
import { useGlobalSearchQuery } from "@/redux/features/search/searchApi"

import SearchResults from "./search-result"

export default function SearchBar() {
    const navigate = useNavigate()

    const containerRef = useRef<HTMLDivElement>(null)

    const [search, setSearch] = useState("")

    const [open, setOpen] = useState(false)

    const debouncedSearch = useDebounce(search, 400)

    const { data, isFetching } = useGlobalSearchQuery(debouncedSearch, {
        skip: debouncedSearch.trim().length < 2,
    })

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClick)

        return () => document.removeEventListener("mousedown", handleClick)
    }, [])

    useEffect(() => {
        if (debouncedSearch.trim().length >= 2) {
            setOpen(true)
        } else {
            setOpen(false)
        }
    }, [debouncedSearch])

    const handleSubmit = () => {
        if (!search.trim()) return

        navigate(`/products?search=${encodeURIComponent(search)}`)

        setOpen(false)
    }

    return (
        <div ref={containerRef} className="relative hidden lg:block">
            <Search className="absolute top-1/2 left-3 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
                value={search}
                onFocus={() => {
                    if (debouncedSearch.length >= 2) {
                        setOpen(true)
                    }
                }}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSubmit()
                    }
                }}
                placeholder="Search products, customers..."
                className="w-80 pr-10 pl-10"
            />

            {isFetching && (
                <Loader2 className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground" />
            )}

            {open && (
                <div className="absolute top-12 left-0 z-50 w-full overflow-hidden rounded-lg border bg-popover shadow-lg">
                    <SearchResults
                        products={data?.data.products ?? []}
                        customers={data?.data.customers ?? []}
                        sales={data?.data.sales ?? []}
                    />
                </div>
            )}
        </div>
    )
}
