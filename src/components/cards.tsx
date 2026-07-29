import { Link } from "@tanstack/react-router";
import {
  Bookmark,
  CalendarDays,
  Clock,
  MapPin,
  Share2,
  Star,
  Trophy,
  Users,
  Download,
  PlayCircle,
  FileText,
  BookOpen,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SoftBadge } from "@/components/common";
import type { Club, Event, Material, Mentor, Session } from "@/lib/data";

export function EventCard({ event }: { event: Event }) {
  const [saved, setSaved] = useState(false);
  const fill = Math.round(((event.seatsTotal - event.seatsLeft) / event.seatsTotal) * 100);
  const scarce = event.seatsLeft < event.seatsTotal * 0.12;

  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-card elevate card-lift">
      <div className={cn("relative h-40 bg-gradient-to-br p-4", event.gradient)}>
        <div className="flex items-start justify-between">
          <SoftBadge tone="muted" className="bg-card/85 text-foreground">
            {event.category}
          </SoftBadge>
          <div className="flex gap-1.5">
            <Button
              size="icon-sm"
              variant="glass"
              aria-label="Bookmark event"
              onClick={() => {
                setSaved((s) => !s);
                toast.success(saved ? "Removed from saved" : "Saved to your list");
              }}
            >
              <Bookmark className={cn(saved && "fill-current")} />
            </Button>
            <Button
              size="icon-sm"
              variant="glass"
              aria-label="Share event"
              onClick={() => toast.success("Event link copied")}
            >
              <Share2 />
            </Button>
          </div>
        </div>
        <span className="absolute bottom-3 left-4 text-4xl drop-shadow-sm" aria-hidden>
          {event.emoji}
        </span>
        <span className="absolute bottom-3 right-4 rounded-full bg-card/85 px-3 py-1 text-xs font-semibold text-foreground">
          <Trophy className="mr-1 inline h-3 w-3" />
          {event.prize}
        </span>
      </div>

      <div className="space-y-3 p-5">
        <div className="min-w-0">
          <h3 className="truncate font-display text-base font-semibold">{event.title}</h3>
          <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{event.tagline}</p>
        </div>

        <ul className="space-y-1.5 text-xs text-muted-foreground">
          <li className="flex items-center gap-2">
            <CalendarDays className="h-3.5 w-3.5 shrink-0 text-primary" />
            {event.date}
            <Clock className="ml-2 h-3.5 w-3.5 shrink-0 text-primary" />
            <span className="truncate">{event.time}</span>
          </li>
          <li className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
            <span className="truncate">{event.venue}</span>
          </li>
          <li className="flex items-center gap-2">
            <Users className="h-3.5 w-3.5 shrink-0 text-primary" />
            {event.participants.toLocaleString()} registered
          </li>
        </ul>

        <div>
          <Progress value={fill} className="h-1.5" />
          <p
            className={cn(
              "mt-1.5 text-xs font-medium",
              scarce ? "text-destructive" : "text-muted-foreground",
            )}
          >
            {event.seatsLeft} of {event.seatsTotal} seats left
          </p>
        </div>

        <div className="flex gap-2 pt-1">
          <Button variant="hero" className="flex-1" asChild>
            <Link to="/app/events/$eventId" params={{ eventId: event.id }}>
              Register
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/app/events/$eventId" params={{ eventId: event.id }}>
              Details
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}

export function ClubCard({ club }: { club: Club }) {
  return (
    <Link
      to="/app/clubs/$clubId"
      params={{ clubId: club.id }}
      className="group block overflow-hidden rounded-2xl border border-border bg-card elevate card-lift"
    >
      <div className={cn("relative h-28 bg-gradient-to-br", club.gradient)}>
        <span className="absolute -bottom-6 left-5 grid h-14 w-14 place-items-center rounded-2xl border border-border bg-card text-2xl elevate">
          {club.emoji}
        </span>
        {club.recruiting ? (
          <span className="absolute right-4 top-4 rounded-full bg-card/90 px-2.5 py-1 text-xs font-semibold text-success">
            Recruiting
          </span>
        ) : null}
      </div>
      <div className="p-5 pt-9">
        <div className="flex items-center gap-2">
          <h3 className="truncate font-display text-base font-semibold">{club.name}</h3>
          <SoftBadge tone="muted">{club.category}</SoftBadge>
        </div>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{club.about}</p>
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" /> {club.members.toLocaleString()} members
          </span>
          <span className="font-medium text-primary transition-transform group-hover:translate-x-0.5">
            View club →
          </span>
        </div>
      </div>
    </Link>
  );
}

export function SessionCard({ session }: { session: Session }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card elevate card-lift">
      <div className={cn("flex h-24 items-center gap-3 bg-gradient-to-r px-5", session.gradient)}>
        <span className="text-3xl" aria-hidden>
          {session.emoji}
        </span>
        <span className="rounded-full bg-card/85 px-2.5 py-1 text-xs font-semibold text-foreground">
          {session.category}
        </span>
      </div>
      <div className="space-y-3 p-5">
        <div>
          <h3 className="line-clamp-1 font-display text-base font-semibold">{session.title}</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {session.faculty} · {session.department}
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <SoftBadge tone="violet">{session.level}</SoftBadge>
          <SoftBadge tone="muted">{session.sessions} sessions</SoftBadge>
          <SoftBadge tone="muted">{session.duration}</SoftBadge>
        </div>
        <ul className="space-y-1 text-xs text-muted-foreground">
          {session.outcomes.map((o) => (
            <li key={o} className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-primary" /> {o}
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-warning text-warning" /> {session.rating} ·{" "}
            {session.enrolled} enrolled
          </span>
          <span>{session.schedule}</span>
        </div>
        <Button variant="hero" className="w-full" onClick={() => toast.success("Enrolled — schedule added to your calendar")}>
          Enroll
        </Button>
      </div>
    </article>
  );
}

export function MentorCard({ mentor }: { mentor: Mentor }) {
  return (
    <article className="rounded-2xl border border-border bg-card p-5 elevate card-lift">
      <div className="flex items-start gap-3">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent text-xl">
          {mentor.emoji}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-display text-base font-semibold">{mentor.name}</h3>
            {mentor.available ? (
              <span className="h-2 w-2 shrink-0 rounded-full bg-success" title="Available" />
            ) : null}
          </div>
          <p className="truncate text-xs text-muted-foreground">
            {mentor.year} · {mentor.branch}
          </p>
        </div>
      </div>
      <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{mentor.headline}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {mentor.skills.map((s) => (
          <SoftBadge key={s} tone="muted">
            {s}
          </SoftBadge>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-warning text-warning" /> {mentor.rating}
        </span>
        <span>{mentor.sessionsDone} sessions</span>
        <span>Replies {mentor.responseTime}</span>
      </div>
      <Button
        className="mt-4 w-full"
        variant={mentor.available ? "hero" : "outline"}
        disabled={!mentor.available}
        onClick={() => toast.success(`Session request sent to ${mentor.name}`)}
      >
        {mentor.available ? "Book a session" : "Fully booked"}
      </Button>
    </article>
  );
}

const typeIcon = {
  Notes: BookOpen,
  PDF: FileText,
  Video: PlayCircle,
  Paper: FileText,
};

export function MaterialCard({ material }: { material: Material }) {
  const Icon = typeIcon[material.type];
  return (
    <article className="rounded-2xl border border-border bg-card p-5 elevate card-lift">
      <div className="flex items-start gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent text-lg">
          {material.emoji}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-1 font-display text-sm font-semibold">{material.title}</h3>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            {material.subject} · {material.author} · {material.size}
          </p>
        </div>
        <SoftBadge tone="brand" className="shrink-0">
          <Icon className="h-3 w-3" /> {material.type}
        </SoftBadge>
      </div>
      <div className="mt-4">
        <Progress value={material.progress} className="h-1.5" />
        <div className="mt-1.5 flex justify-between text-xs text-muted-foreground">
          <span>{material.progress}% complete</span>
          <span>{material.downloads.toLocaleString()} downloads</span>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <Button variant="soft" className="flex-1" onClick={() => toast.success("Opening resource")}>
          {material.type === "Video" ? "Watch" : "Read"}
        </Button>
        <Button variant="outline" size="icon" aria-label="Download" onClick={() => toast.success("Download started")}>
          <Download />
        </Button>
        <Button variant="outline" size="icon" aria-label="Bookmark" onClick={() => toast.success("Bookmarked")}>
          <Bookmark className={cn(material.bookmarked && "fill-current text-primary")} />
        </Button>
      </div>
    </article>
  );
}
