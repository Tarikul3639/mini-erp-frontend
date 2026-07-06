import { Search, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ProductToolbarProps {
    search: string;
    onSearchChange: (value: string) => void;
}

export default function ProductToolbar({
    search,
    onSearchChange,
}: ProductToolbarProps) {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-sm">
                <Search className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />

                <Input
                    placeholder="Search product..."
                    value={search}
                    onChange={(e) =>
                        onSearchChange(
                            e.target.value
                        )
                    }
                    className="max-w-sm"
                />
            </div>

            <Button onClick={() => navigate("/products/create")}>
                <Plus className="mr-2 size-4" />
                Add Product
            </Button>
        </div>
    );
}