import type { LucideIcon } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

interface Props {
  title: string
  value: number | string
  icon: LucideIcon
}

export default function StatCard({
  title,
  value,
  icon: Icon,
}: Props) {
  return (
    <Card className="gap-0 rounded-sm">
      <CardContent className="flex items-center justify-between p-3 sm:p-4">
        <div className="min-w-0">
          <p className="truncate text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            {title}
          </p>

          <h2 className="mt-1 text-lg font-semibold leading-none sm:text-2xl">
            {value}
          </h2>
        </div>

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-primary/10 text-primary sm:h-10 sm:w-10">
          <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
      </CardContent>
    </Card>
  )
}