import { DollarSign } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

interface Props {
  revenue: number
}

export default function RevenueCard({ revenue }: Props) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-4">
        <div>
          <p className="text-xs font-medium text-muted-foreground">
            Total Revenue
          </p>

          <h2 className="mt-1 text-2xl font-semibold tracking-tight">
            ৳{revenue.toLocaleString()}
          </h2>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
          <DollarSign className="h-5 w-5" />
        </div>
      </CardContent>
    </Card>
  )
}