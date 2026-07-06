import { createBrowserRouter } from "react-router-dom"

import AuthLayout from "@/layouts/auth-layout"
import DashboardLayout from "@/layouts/dashboard-layout"

import ProtectedRoute from "@/components/layout/protected-route"
import RoleRoute from "@/routes/RoleRoute"

import LoginPage from "@/pages/auth/login"
import DashboardPage from "@/pages/dashboard/dashboard"
import NotFoundPage from "@/pages/not-found"

// Product
import ProductsPage from "@/pages/products/products"
import CreateProductPage from "@/pages/products/create-product"
import EditProductPage from "@/pages/products/edit-product"

// Customer
import CustomersPage from "@/pages/customers/customers"
import CreateCustomerPage from "@/pages/customers/create-customer"
import EditCustomerPage from "@/pages/customers/edit-customer"

// Sale
import SalesPage from "@/pages/sales/sales"
import CreateSalePage from "@/pages/sales/create-sale"
import SaleDetailsPage from "@/pages/sales/sale-details"

// Profile
import ProfilePage from "@/pages/profile/profile"

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
                        element: (
                            <RoleRoute allow={["ADMIN", "MANAGER"]}>
                                <CreateProductPage />
                            </RoleRoute>
                        ),
                    },
                    {
                        path: ":id/edit",
                        element: (
                            <RoleRoute allow={["ADMIN", "MANAGER"]}>
                                <EditProductPage />
                            </RoleRoute>
                        ),
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
                        element: (
                            <RoleRoute allow={["ADMIN", "MANAGER"]}>
                                <CreateCustomerPage />
                            </RoleRoute>
                        ),
                    },
                    {
                        path: ":id/edit",
                        element: (
                            <RoleRoute allow={["ADMIN", "MANAGER"]}>
                                <EditCustomerPage />
                            </RoleRoute>
                        ),
                    },
                ],
            },

            // Sales
            {
                path: "sales",
                children: [
                    {
                        index: true,
                        element: <SalesPage />,
                    },
                    {
                        path: "create",
                        element: (
                            <RoleRoute allow={["ADMIN", "MANAGER", "EMPLOYEE"]}>
                                <CreateSalePage />
                            </RoleRoute>
                        ),
                    },
                    {
                        path: ":id",
                        element: (
                            <RoleRoute allow={["ADMIN", "MANAGER", "EMPLOYEE"]}>
                                <SaleDetailsPage />
                            </RoleRoute>
                        ),
                    },
                ],
            },

            // Profile
            {
                path: "profile",
                element: <ProfilePage />,
            },
        ],
    },

    {
        path: "*",
        element: <NotFoundPage />,
    },
])
