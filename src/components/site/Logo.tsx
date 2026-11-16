import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Logo({ inverted = false, className }: { inverted?: boolean; className?: string }) {
  return (
    <Link to="/" className={cn("group flex items-center gap-3", className)} aria-label="JECRC University home">
      <span className="relative grid size-11 place-items-center rounded-xl bg-navy-gradient font-display text-lg font-bold text-navy-foreground shadow-card ring-2 ring-saffron/70 transition-transform group-hover:-rotate-3">
        JU
        <span className="absolute -bottom-1 -right-1 size-3 rounded-full bg-saffron" />
      </span>
      <span className="leading-tight">
        <span className={cn("block font-display text-lg font-bold", inverted ? "text-navy-foreground" : "text-primary")}>
          JECRC University
        </span>
        <span className={cn("block text-[11px] font-semibold uppercase tracking-[0.2em]", inverted ? "text-navy-foreground/70" : "text-muted-foreground")}>
          Jaipur · Build Your World
        </span>
      </span>
    </Link>
  );
}
