import type { ReactNode } from "react";

export function PageHero({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-navy-gradient text-navy-foreground">
      <div className="pattern-dots absolute inset-0 opacity-50" aria-hidden />
      <div className="absolute -right-24 -top-24 size-80 rounded-full bg-saffron/25 blur-3xl" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20">
        {eyebrow && <p className="eyebrow mb-3 animate-rise">{eyebrow}</p>}
        <h1 className="max-w-3xl animate-rise text-4xl font-bold md:text-5xl">{title}</h1>
        {children && <div className="mt-5 max-w-2xl animate-rise text-base text-navy-foreground/80 md:text-lg">{children}</div>}
      </div>
    </section>
  );
}

export function SourceNote({ children }: { children: ReactNode }) {
  return <p className="mt-6 text-xs text-muted-foreground">{children}</p>;
}
