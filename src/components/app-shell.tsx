import type * as React from "react";
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Bell,
  Bot,
  CalendarDays,
  ChevronRight,
  GraduationCap,
  LayoutDashboard,
  LibraryBig,
  Lock,
  Map,
  Megaphone,
  MessageSquareHeart,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Settings,
  Sparkles,
  User,
  Users,
  Menu,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ThemeToggle } from "@/components/theme-toggle";
import { SoftBadge } from "@/components/common";
import { announcements, student } from "@/lib/data";

type NavItem = {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  exact?: boolean;
};

const nav: { group: string; items: NavItem[] }[] = [
  {
    group: "Campus",
    items: [
      { to: "/app", label: "Dashboard", icon: LayoutDashboard, exact: true },
      { to: "/app/events", label: "Events", icon: CalendarDays },
      { to: "/app/clubs", label: "Clubs", icon: Users },
      { to: "/app/navigate", label: "Navigation", icon: Map },
      { to: "/app/announcements", label: "Announcements", icon: Megaphone },
    ],
  },
  {
    group: "Grow",
    items: [
      { to: "/app/learn", label: "Learning Hub", icon: LibraryBig },
      { to: "/app/skills", label: "Faculty Skill Hub", icon: GraduationCap },
      { to: "/app/mentorship", label: "Mentorship", icon: MessageSquareHeart },
      { to: "/app/ai", label: "Ask AI", icon: Bot },
    ],
  },
  {
    group: "You",
    items: [
      { to: "/app/academics", label: "My Academics", icon: Lock },
      { to: "/app/profile", label: "Profile", icon: User },
      { to: "/app/feedback", label: "Feedback", icon: Sparkles },
      { to: "/app/settings", label: "Settings", icon: Settings },
    ],
  },
];

const allItems = nav.flatMap((g) => g.items);

function useActivePath() {
  return useRouterState({ select: (s) => s.location.pathname });
}

function SidebarBody({ collapsed, onNavigate }: { collapsed?: boolean; onNavigate?: () => void }) {
  const pathname = useActivePath();
  const isActive = (to: string, exact?: boolean) =>
    exact ? pathname === to : pathname === to || pathname.startsWith(`${to}/`);

  return (
    <div className="flex h-full flex-col">
      <div className={cn("flex items-center gap-2.5 px-4 py-5", collapsed && "justify-center px-0")}>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl gradient-brand text-primary-foreground">
          <Sparkles className="h-4.5 w-4.5" />
        </span>
        {!collapsed ? (
          <div className="min-w-0">
            <p className="truncate font-display text-sm font-semibold">CampuSphere</p>
            <p className="truncate text-[11px] text-muted-foreground">Northgate University</p>
          </div>
        ) : null}
      </div>

      <nav className="flex-1 space-y-5 overflow-y-auto px-3 pb-4 no-scrollbar">
        {nav.map((group) => (
          <div key={group.group}>
            {!collapsed ? (
              <p className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {group.group}
              </p>
            ) : null}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = isActive(item.to, item.exact);
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to as never}
                      onClick={onNavigate}
                      title={collapsed ? item.label : undefined}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                        collapsed && "justify-center px-0",
                        active
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/60",
                      )}
                    >
                      <item.icon className="h-4.5 w-4.5 shrink-0" />
                      {!collapsed ? <span className="truncate">{item.label}</span> : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {!collapsed ? (
        <div className="m-3 rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-violet/10 p-4">
          <p className="font-display text-sm font-semibold">Campus Pass</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Priority registration for every flagship event this semester.
          </p>
          <Button variant="hero" size="sm" className="mt-3 w-full">
            Activate
          </Button>
        </div>
      ) : null}
    </div>
  );
}

function Breadcrumbs() {
  const pathname = useActivePath();
  const parts = pathname.split("/").filter(Boolean).slice(1);
  const labels = parts.map((p) => p.replace(/-/g, " "));
  return (
    <nav aria-label="Breadcrumb" className="hidden min-w-0 items-center gap-1.5 text-xs text-muted-foreground lg:flex">
      <Link to="/app" className="shrink-0 hover:text-foreground">
        Campus
      </Link>
      {labels.map((l, i) => (
        <span key={`${l}-${i}`} className="flex min-w-0 items-center gap-1.5">
          <ChevronRight className="h-3 w-3 shrink-0" />
          <span className={cn("truncate capitalize", i === labels.length - 1 && "text-foreground")}>
            {l}
          </span>
        </span>
      ))}
    </nav>
  );
}

export function AppShell() {
  const [collapsed, setCollapsed] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useActivePath();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCmdOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside
        className={cn(
          "sticky top-0 hidden h-screen shrink-0 border-r border-sidebar-border bg-sidebar transition-[width] duration-300 lg:block",
          collapsed ? "w-[76px]" : "w-[264px]",
        )}
      >
        <SidebarBody collapsed={collapsed} />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-border glass">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] bg-sidebar p-0">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <SidebarBody onNavigate={() => setMobileOpen(false)} />
              </SheetContent>
            </Sheet>

            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:inline-flex"
              onClick={() => setCollapsed((c) => !c)}
              aria-label="Toggle sidebar"
            >
              {collapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
            </Button>

            <Breadcrumbs />

            <button
              onClick={() => setCmdOpen(true)}
              className="ml-auto flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-colors hover:text-foreground sm:ml-auto sm:w-[280px] sm:justify-start sm:gap-2 sm:px-3 xl:w-[380px]"
            >
              <Search className="h-4 w-4 shrink-0" />
              <span className="hidden truncate text-sm sm:inline">
                Search events, clubs, people…
              </span>
              <kbd className="ml-auto hidden rounded-md border border-border px-1.5 py-0.5 text-[10px] sm:inline">
                ⌘K
              </kbd>
            </button>

            <Button variant="hero" size="sm" className="hidden md:inline-flex">
              <Plus /> Quick action
            </Button>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
                  <Bell />
                  <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-[340px] p-0">
                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                  <p className="font-display text-sm font-semibold">Notifications</p>
                  <SoftBadge tone="brand">3 new</SoftBadge>
                </div>
                <ul className="max-h-80 divide-y divide-border overflow-y-auto">
                  {announcements.slice(0, 4).map((a) => (
                    <li key={a.id} className="px-4 py-3 hover:bg-accent/50">
                      <p className="text-sm font-medium leading-snug">{a.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {a.author} · {a.ago}
                      </p>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-border p-2">
                  <Button variant="ghost" size="sm" className="w-full" asChild>
                    <Link to="/app/announcements">View all announcements</Link>
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            <ThemeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl gradient-brand text-sm font-semibold text-primary-foreground"
                  aria-label="Profile menu"
                >
                  {student.initials}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <p className="text-sm font-semibold">{student.name}</p>
                  <p className="text-xs font-normal text-muted-foreground">{student.roll}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/app/profile">My profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/app/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/app/feedback">Give feedback</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/login">Sign out</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main key={pathname} className="mx-auto w-full max-w-[1400px] flex-1 animate-rise px-4 py-6 sm:px-6 lg:py-8">
          <Outlet />
        </main>
      </div>

      <CommandDialog open={cmdOpen} onOpenChange={setCmdOpen}>
        <CommandInput placeholder="Jump to a page, event, club or person…" />
        <CommandList>
          <CommandEmpty>Nothing matched your search.</CommandEmpty>
          <CommandGroup heading="Navigate">
            {allItems.map((item) => (
              <CommandItem key={item.to} value={item.label} asChild>
                <Link to={item.to as never} onSelect={() => setCmdOpen(false)} onClick={() => setCmdOpen(false)}>
                  <item.icon className="mr-2 h-4 w-4" /> {item.label}
                </Link>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}
