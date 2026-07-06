import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Lock } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useChangePasswordMutation } from "@/redux/features/auth/authApi"

const schema = z
    .object({
        currentPassword: z.string().min(6, "Current password is required"),

        newPassword: z.string().min(6, "Password must be at least 6 characters"),

        confirmPassword: z.string().min(6, "Confirm password is required"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    })

type FormValues = z.infer<typeof schema>

export default function ChangePasswordCard() {
    const [changePassword, { isLoading }] = useChangePasswordMutation()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
    })

    async function onSubmit(values: FormValues) {
        try {
            await changePassword({
                currentPassword: values.currentPassword,
                newPassword: values.newPassword,
            }).unwrap()

            toast.success("Password updated successfully")

            reset()
        } catch (error: any) {
            toast.error(error?.data?.message ?? "Failed to update password")
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Change Password</CardTitle>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>

                        <Input
                            id="currentPassword"
                            type="password"
                            {...register("currentPassword")}
                        />

                        {errors.currentPassword && (
                            <p className="text-sm text-destructive">
                                {errors.currentPassword.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>

                        <Input
                            id="newPassword"
                            type="password"
                            {...register("newPassword")}
                        />

                        {errors.newPassword && (
                            <p className="text-sm text-destructive">
                                {errors.newPassword.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>

                        <Input
                            id="confirmPassword"
                            type="password"
                            {...register("confirmPassword")}
                        />

                        {errors.confirmPassword && (
                            <p className="text-sm text-destructive">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    <Button type="submit" disabled={isLoading} className="gap-2">
                        <Lock className="h-4 w-4" />

                        {isLoading ? "Updating..." : "Update Password"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
