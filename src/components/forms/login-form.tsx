import { useState } from "react"

import { Eye, EyeOff, Boxes } from "lucide-react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
    loginSchema,
    type LoginFormValues,
} from "@/lib/validations/login.schema"

import { useLoginMutation } from "@/redux/features/auth/authApi"
import { useAppDispatch } from "@/redux/hooks"
import { setAccessToken } from "@/redux/features/auth/authSlice"
import { useNavigate } from "react-router-dom"

export default function LoginForm() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [login, { isLoading }] = useLoginMutation()
    const [showPassword, setShowPassword] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (values: LoginFormValues) => {
        try {
            const res = await login(values).unwrap()

            dispatch(setAccessToken(res.data.accessToken))

            toast.success(res.message)

            navigate("/", {
                replace: true,
            })
        } catch (error: any) {
            toast.error(error?.data?.message ?? "Login failed")
        }
    }

    return (
        <Card className="shadow-lg">
            <CardHeader className="space-y-4 text-center">
                <div className="mx-auto flex size-14 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <Boxes className="size-7" />
                </div>

                <div>
                    <CardTitle className="text-2xl">Mini ERP</CardTitle>

                    <CardDescription>Login to continue</CardDescription>
                </div>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Email */}

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>

                        <Input
                            id="email"
                            type="email"
                            placeholder="admin@erp.com"
                            {...register("email")}
                        />

                        {errors.email && (
                            <p className="text-sm text-destructive">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password */}

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>

                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="********"
                                {...register("password")}
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground"
                            >
                                {showPassword ? (
                                    <EyeOff className="size-4" />
                                ) : (
                                    <Eye className="size-4" />
                                )}
                            </button>
                        </div>

                        {errors.password && (
                            <p className="text-sm text-destructive">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading || isSubmitting}>
                        {isLoading ? "Logging in..." : "Login"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
