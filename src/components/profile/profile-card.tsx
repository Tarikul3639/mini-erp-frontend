import { useRef } from "react"

import { Camera, Loader2, Mail, Shield, User } from "lucide-react"

import { toast } from "sonner"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import {
    useGetProfileQuery,
    useUpdateProfileMutation,
} from "@/redux/features/user/userApi"

export default function ProfileCard() {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const { data, isLoading } = useGetProfileQuery()

    const [updateProfile, { isLoading: isUploading }] = useUpdateProfileMutation()

    const user = data?.data

    async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]

        if (!file || !user) return

        const formData = new FormData()

        formData.append("name", user.name)

        formData.append("avatar", file)

        try {
            await updateProfile(formData).unwrap()

            toast.success("Avatar updated successfully")
        } catch (error: any) {
            toast.error(error?.data?.message ?? "Failed to update avatar")
        }
    }

    if (isLoading) {
        return (
            <Card>
                <CardContent className="flex h-80 items-center justify-center">
                    Loading...
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardContent className="flex flex-col items-center p-8">
                <div className="relative">
                    <img
                        src={
                            user?.avatar ||
                            `https://ui-avatars.com/api/?background=2563eb&color=fff&name=${encodeURIComponent(
                                user?.name ?? "User"
                            )}`
                        }
                        alt={user?.name}
                        className="h-28 w-28 rounded-full border object-cover"
                    />

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleAvatarChange}
                    />

                    <Button
                        size="icon"
                        variant="secondary"
                        className="absolute right-0 bottom-0 rounded-full"
                        disabled={isUploading}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        {isUploading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Camera className="h-4 w-4" />
                        )}
                    </Button>
                </div>

                <h2 className="mt-5 text-xl font-semibold">{user?.name}</h2>

                <p className="mt-1 text-sm text-muted-foreground">{user?.email}</p>

                <div className="mt-6 w-full space-y-3">
                    <div className="flex items-center gap-3 rounded-md border p-3">
                        <User className="h-4 w-4 text-primary" />

                        <div>
                            <p className="text-xs text-muted-foreground">Name</p>

                            <p className="text-sm font-medium">{user?.name}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-md border p-3">
                        <Mail className="h-4 w-4 text-primary" />

                        <div>
                            <p className="text-xs text-muted-foreground">Email</p>

                            <p className="text-sm font-medium break-all">{user?.email}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-md border p-3">
                        <Shield className="h-4 w-4 text-primary" />

                        <div>
                            <p className="text-xs text-muted-foreground">Role</p>

                            <p className="text-sm font-medium">{user?.role}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
