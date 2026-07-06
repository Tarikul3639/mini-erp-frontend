import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface Props {
    title: string;
    value: number | string;
    icon: LucideIcon;
}

export default function StatCard({
    title,
    value,
    icon: Icon,
}: Props) {
    return (
        <Card>
            <CardContent className="flex items-center justify-between p-6">
                <div>
                    <p className="text-muted-foreground text-sm">
                        {title}
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
                        {value}
                    </h2>
                </div>

                <div className="bg-primary/10 text-primary rounded-xl p-3">
                    <Icon className="size-6" />
                </div>
            </CardContent>
        </Card>
    );
}