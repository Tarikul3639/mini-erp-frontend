import { createBrowserRouter } from "react-router-dom";

import AuthLayout from "@/layouts/auth-layout";
import DashboardLayout from "@/layouts/dashboard-layout";

import ProtectedRoute from "@/components/layout/protected-route";

import LoginPage from "@/pages/auth/login";
import DashboardPage from "@/pages/dashboard/dashboard";
import NotFoundPage from "@/pages/not-found";

// Product
import ProductsPage from "@/pages/products/products";
import CreateProductPage from "@/pages/products/create-product";
import EditProductPage from "@/pages/products/edit-product";

// Customer
import CustomersPage from "@/pages/customers/customers";
import CreateCustomerPage from "@/pages/customers/create-customer";
import EditCustomerPage from "@/pages/customers/edit-customer";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: (
            <AuthLayout>
                <LoginPage />
            </AuthLayout>
        ),
    },

    {
        path: "/",
        element: (
            <ProtectedRoute>
                <DashboardLayout />
            </ProtectedRoute>
        ),

        children: [
            {
                index: true,
                element: <DashboardPage />,
            },

            // Products
            {
                path: "products",
                children: [
                    {
                        index: true,
                        element: <ProductsPage />,
                    },
                    {
                        path: "create",
                        element: <CreateProductPage />,
                    },
                    {
                        path: ":id/edit",
                        element: <EditProductPage />,
                    },
                ],
            },

            // Customers
            {
                path: "customers",
                children: [
                    {
                        index: true,
                        element: <CustomersPage />,
                    },
                    {
                        path: "create",
                        element: <CreateCustomerPage />,
                    },
                    {
                        path: ":id/edit",
                        element: <EditCustomerPage />,
                    },
                ],
            },

            // Sales
            {
                path: "sales",
                element: <div>Sales</div>,
            },
        ],
    },

    {
        path: "*",
        element: <NotFoundPage />,
    },
]);