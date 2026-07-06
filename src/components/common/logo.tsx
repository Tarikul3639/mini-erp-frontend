import { Boxes } from "lucide-react";

export default function Logo() {
    return (
        <div className="flex items-center gap-3 overflow-hidden">
            <div className="bg-primary text-primary-foreground flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                <Boxes className="h-5 w-5" />
            </div>

            <div className="min-w-0 group-data-[collapsible=icon]:hidden">
                <h2 className="truncate text-sm font-semibold">
                    Mini ERP
                </h2>

                <p className="text-muted-foreground truncate text-xs">
                    Inventory System
                </p>
            </div>
        </div>
    );
}