import { useGetProfileQuery } from "@/redux/features/user/userApi"

export type UserRole = "ADMIN" | "MANAGER" | "EMPLOYEE"

export function useRole() {
  const { data } = useGetProfileQuery()

  const role = data?.data.role as UserRole | undefined

  return {
    role,
    isAdmin: role === "ADMIN",
    isManager: role === "MANAGER",
    isEmployee: role === "EMPLOYEE",
  }
}
