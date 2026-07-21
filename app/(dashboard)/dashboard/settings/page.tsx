import { ThemeSettingsForm } from "@/components/settings/theme-settings-form";

export default function SettingsPage() {
  return (
    <div className="max-w-lg space-y-10">
      <div>
        <h1>Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences</p>
      </div>

      <section className="space-y-4">
        <h3>Theme</h3>
        <ThemeSettingsForm />
      </section>
    </div>
  );
}
