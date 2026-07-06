import { Link } from "react-router-dom"

import { TriangleAlert } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Props {
  products: {
    _id: string
    name: string
    sku: string
    stockQuantity: number
    image: string
  }[]
}

export default function LowStockTable({ products }: Props) {
  return (
    <Card className="gap-0">
      <CardHeader className="flex-row items-center justify-between px-4 py-3">
        <div>
          <CardTitle className="text-sm font-semibold">
            Low Stock Products
          </CardTitle>

          <p className="text-xs text-muted-foreground">
            Products requiring attention
          </p>
        </div>

        <TriangleAlert className="h-5 w-5 text-amber-500" />
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="h-9">
                <TableHead>Product</TableHead>

                <TableHead>SKU</TableHead>

                <TableHead className="text-right">Stock</TableHead>

                <TableHead className="w-24 text-right">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell className="py-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-6 w-6 rounded-sm border object-cover"
                      />

                      <span className="truncate text-xs font-medium">
                        {product.name}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="py-2 text-xs text-muted-foreground">
                    {product.sku}
                  </TableCell>

                  <TableCell className="py-2 text-right">
                    <span className="rounded-sm bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600">
                      {product.stockQuantity}
                    </span>
                  </TableCell>

                  <TableCell className="py-2 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 rounded-sm px-2 text-xs"
                    >
                      <Link to={`/products/${product._id}/edit`}>
                        Restock
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}