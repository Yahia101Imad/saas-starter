import { getSession } from "@/lib/session";
import { ProfileForm } from "@/components/profile/profile-form";
import { ChangeEmailForm } from "@/components/profile/change-email-form";
import { ImageDropzone } from "@/components/profile/image-dropzone";

export default async function ProfilePage() {
  const session = await getSession();
  const user = session!.user;

  return (
    <div className="max-w-lg space-y-10">
      <div>
        <h1>Profile</h1>
        <p className="text-muted-foreground">
          Manage your personal information
        </p>
      </div>

      <section className="space-y-4">
        <h3>Photo</h3>
        <ImageDropzone name={user.name} currentImage={user.image} />
      </section>

      <section className="space-y-4">
        <h3>Basic information</h3>
        <ProfileForm user={{ name: user.name }} />
      </section>

      <section className="space-y-4">
        <h3>Email address</h3>
        <ChangeEmailForm currentEmail={user.email} />
      </section>
    </div>
  );
}
