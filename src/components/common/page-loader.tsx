import { LoaderCircle } from "lucide-react";

export default function PageLoader() {
    return (
        <div className="flex min-h-[70vh] items-center justify-center">
            <LoaderCircle className="text-primary size-10 animate-spin" />
        </div>
    );
}