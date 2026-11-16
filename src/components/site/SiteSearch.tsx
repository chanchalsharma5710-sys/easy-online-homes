import { useNavigate } from "@tanstack/react-router";
import { BookOpen, FileQuestion, LayoutGrid, Search } from "lucide-react";
import { useEffect, useState } from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useLang } from "@/lib/i18n";
import { courses, faqs } from "@/lib/university";
import { navItems } from "./nav";

export function SiteSearch({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { t, pick } = useLang();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (fn: () => void) => {
    setOpen(false);
    fn();
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          compact
            ? "grid size-10 place-items-center rounded-full border border-border bg-card text-primary transition-colors hover:border-saffron hover:text-saffron"
            : "flex h-10 items-center gap-2 rounded-full border border-border bg-card px-4 text-sm text-muted-foreground transition-colors hover:border-saffron"
        }
        aria-label={t("nav.search")}
      >
        <Search className="size-4" />
        {!compact && (
          <>
            <span>{t("nav.search")}…</span>
            <kbd className="ml-4 rounded border border-border bg-muted px-1.5 text-[10px] font-semibold">Ctrl K</kbd>
          </>
        )}
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder={t("common.searchPlaceholder")} />
        <CommandList className="max-h-[420px]">
          <CommandEmpty>{t("common.noResults")}</CommandEmpty>
          <CommandGroup heading="Pages">
            {navItems.map((n) => (
              <CommandItem key={n.to} value={`page ${t(n.key)} ${n.to}`} onSelect={() => go(() => navigate({ to: n.to }))}>
                <LayoutGrid className="text-saffron" />
                {t(n.key)}
              </CommandItem>
            ))}
            <CommandItem value="page faq questions" onSelect={() => go(() => navigate({ to: "/faq" }))}>
              <LayoutGrid className="text-saffron" />
              {t("nav.faq")}
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Courses">
            {courses.map((c) => (
              <CommandItem
                key={c.id}
                value={`${c.name} ${c.program} ${c.category} ${c.level}`}
                onSelect={() => go(() => navigate({ to: "/courses/$courseId", params: { courseId: c.id } }))}
              >
                <BookOpen className="text-primary" />
                <span className="truncate">{c.name}</span>
                <span className="ml-auto shrink-0 text-xs text-muted-foreground">{c.level}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="FAQ">
            {faqs.map((f, i) => (
              <CommandItem key={i} value={`faq ${f.q.en} ${f.q.hi}`} onSelect={() => go(() => navigate({ to: "/faq" }))}>
                <FileQuestion className="text-muted-foreground" />
                <span className="truncate">{pick(f.q)}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
