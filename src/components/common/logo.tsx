import { Boxes } from "lucide-react";

export default function Logo() {
    return (
        <div className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-lg">
                <Boxes className="size-5" />
            </div>

            <div>
                <h2 className="text-sm font-semibold">
                    Mini ERP
                </h2>

                <p className="text-muted-foreground text-xs">
                    Inventory System
                </p>
            </div>
        </div>
    );
}