import PageHeader from "@/components/common/page-header";

import ProfileCard from "@/components/profile/profile-card";
import ProfileForm from "@/components/profile/profile-form";
import ChangePasswordCard from "@/components/profile/change-password-card";

export default function ProfilePage() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Profile"
                description="Manage your account settings."
            />

            <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
                <ProfileCard />

                <div className="space-y-6">
                    <ProfileForm />

                    <ChangePasswordCard />
                </div>
            </div>
        </div>
    );
}