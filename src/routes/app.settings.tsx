import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { PageHeader, Surface } from "@/components/common";
import { ThemeToggle } from "@/components/theme-toggle";
import { student } from "@/lib/data";

export const Route = createFileRoute("/app/settings")({
  head: () => ({
    meta: [
      { title: "Settings — CampuSphere" },
      { name: "description", content: "Manage your profile, notifications, appearance and accessibility preferences." },
      { property: "og:title", content: "Settings — CampuSphere" },
      { property: "og:description", content: "Manage your profile, notifications, appearance and accessibility preferences." },
    ],
  }),
  component: SettingsPage,
});

const toggles = [
  ["Event reminders", "Get notified 1 hour before events you registered for."],
  ["Club announcements", "Updates from clubs you follow."],
  ["Deadline alerts", "Assignment and submission reminders."],
  ["Mentorship requests", "When a mentor replies to your booking."],
  ["Reduced motion", "Minimise animations across the platform."],
];

function SettingsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-7">
      <PageHeader eyebrow="Settings" title="Preferences" description="Control your profile, notifications and how CampuSphere looks." />
      <Surface>
        <h2 className="font-display text-base font-semibold">Profile</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="space-y-2"><Label htmlFor="n">Full name</Label><Input id="n" defaultValue={student.name} className="h-11 rounded-xl" /></div>
          <div className="space-y-2"><Label htmlFor="r">Roll number</Label><Input id="r" defaultValue={student.roll} className="h-11 rounded-xl" /></div>
          <div className="space-y-2 sm:col-span-2"><Label htmlFor="e">Email</Label><Input id="e" defaultValue={student.email} className="h-11 rounded-xl" /></div>
        </div>
        <Button variant="hero" className="mt-4" onClick={() => toast.success("Profile updated")}>Save changes</Button>
      </Surface>

      <Surface>
        <h2 className="font-display text-base font-semibold">Notifications & accessibility</h2>
        <ul className="mt-4 space-y-4">
          {toggles.map(([t, d], i) => (
            <li key={t}>
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium">{t}</p>
                  <p className="text-xs text-muted-foreground">{d}</p>
                </div>
                <Switch defaultChecked={i < 3} />
              </div>
              {i < toggles.length - 1 ? <Separator className="mt-4" /> : null}
            </li>
          ))}
        </ul>
      </Surface>

      <Surface className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <div className="min-w-0">
          <h2 className="font-display text-base font-semibold">Appearance</h2>
          <p className="text-xs text-muted-foreground">Switch between light and dark mode.</p>
        </div>
        <ThemeToggle className="border border-border" />
      </Surface>
    </div>
  );
}
