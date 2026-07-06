import {
    createBrowserRouter,
    // Navigate,
} from "react-router-dom";

import AuthLayout from "@/layouts/auth-layout";
import DashboardLayout from "@/layouts/dashboard-layout";

import ProtectedRoute from "@/components/layout/protected-route";

import LoginPage from "@/pages/auth/login";
import DashboardPage from "@/pages/dashboard/dashboard";
import NotFoundPage from "@/pages/not-found";

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

            {
                path: "products",
                element: <div>Products</div>,
            },

            {
                path: "customers",
                element: <div>Customers</div>,
            },

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