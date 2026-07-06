import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Props {
  products: {
    _id: string
    quantity: number

    product: {
      name: string
      image: string
      sku: string
    }
  }[]
}

export default function TopSellingProducts({ products }: Props) {
  return (
    <Card className="gap-0 py-2">
      <CardHeader className="px-4 py-3">
        <CardTitle className="text-sm font-semibold">
          Top Selling Products
        </CardTitle>
      </CardHeader>

      <CardContent className="px-4 pb-4 pt-0">
        <div className="space-y-2">
          {products.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between rounded-sm py-1"
            >
              <div className="flex min-w-0 items-center gap-2">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="h-8 w-8 rounded-sm border object-cover"
                />

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {item.product.name}
                  </p>

                  <p className="truncate text-xs text-muted-foreground">
                    {item.product.sku}
                  </p>
                </div>
              </div>

              <span className="rounded-sm bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                {item.quantity}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}