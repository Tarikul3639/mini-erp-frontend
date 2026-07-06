import { User } from "lucide-react";

import { useGetCustomersQuery } from "@/redux/features/customer/customerApi";

import EmptyState from "@/components/common/empty-state";
import PageLoader from "@/components/common/page-loader";
import Pagination from "@/components/common/pagination";

import CustomerActions from "./customer-actions";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface Props {
    page: number;
    search: string;
    onPageChange: (page: number) => void;
}

export default function CustomerTable({
    page,
    search,
    onPageChange,
}: Props) {
    const { data, isLoading } =
        useGetCustomersQuery({
            page,
            limit: 10,
            search,
        });

    if (isLoading) {
        return <PageLoader />;
    }

    if (!data || data.data.length === 0) {
        return (
            <EmptyState
                title="No customers found"
                description="Create your first customer."
                icon={User}
            />
        );
    }

    return (
        <div className="overflow-hidden rounded-lg border bg-card">
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                Name
                            </TableHead>

                            <TableHead>
                                Email
                            </TableHead>

                            <TableHead>
                                Phone
                            </TableHead>

                            <TableHead>
                                Address
                            </TableHead>

                            <TableHead className="text-center">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {data.data.map(
                            (customer) => (
                                <TableRow
                                    key={
                                        customer._id
                                    }
                                >
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full font-semibold">
                                                {customer.name
                                                    .charAt(
                                                        0
                                                    )
                                                    .toUpperCase()}
                                            </div>

                                            <span className="font-medium">
                                                {
                                                    customer.name
                                                }
                                            </span>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        {
                                            customer.email
                                        }
                                    </TableCell>

                                    <TableCell>
                                        {
                                            customer.phone
                                        }
                                    </TableCell>

                                    <TableCell>
                                        {
                                            customer.address
                                        }
                                    </TableCell>

                                    <TableCell className="text-center">
                                        <CustomerActions
                                            customerId={
                                                customer._id
                                            }
                                        />
                                    </TableCell>
                                </TableRow>
                            )
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="border-t p-4">
                <Pagination
                    page={page}
                    totalPage={
                        data.meta.totalPage
                    }
                    onPageChange={
                        onPageChange
                    }
                />
            </div>
        </div>
    );
}