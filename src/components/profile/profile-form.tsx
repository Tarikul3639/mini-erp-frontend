import { useEffect } from "react"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Save } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
    useGetProfileQuery,
    useUpdateProfileMutation,
} from "@/redux/features/user/userApi"

const profileSchema = z.object({
    name: z.string().min(2, "Name is required"),
})

type ProfileFormValues = z.infer<typeof profileSchema>

export default function ProfileForm() {
    const { data } = useGetProfileQuery()

    const [updateProfile, { isLoading }] = useUpdateProfileMutation()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: "",
        },
    })

    useEffect(() => {
        if (data?.data) {
            reset({
                name: data.data.name,
            })
        }
    }, [data, reset])

    async function onSubmit(values: ProfileFormValues) {
        try {
            await updateProfile(values).unwrap()

            toast.success("Profile updated successfully")
        } catch (error: any) {
            toast.error(error?.data?.message ?? "Failed to update profile")
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Personal Information</CardTitle>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>

                        <Input id="name" placeholder="Full Name" {...register("name")} />

                        {errors.name && (
                            <p className="text-sm text-destructive">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Email</Label>

                        <Input value={data?.data?.email ?? ""} disabled />
                    </div>

                    <div className="space-y-2">
                        <Label>Role</Label>

                        <Input value={data?.data?.role ?? ""} disabled />
                    </div>

                    <Button type="submit" disabled={isLoading} className="gap-2">
                        <Save className="h-4 w-4" />

                        {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
