import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { annualTotal } from "@/components/site/FeeTable";
import { PageHero, SourceNote } from "@/components/site/PageHero";
import { Input } from "@/components/ui/input";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { categories, courses, formatINR, searchCourses, type Level } from "@/lib/university";

export const Route = createFileRoute("/courses/")({
  head: () => ({
    meta: [
      { title: "Courses & Programs at JECRC University — B.Tech, MBA, BCA, Ph.D." },
      { name: "description", content: "Search 100+ UG, PG and Ph.D. programmes at JECRC University with duration, eligibility and official 2026-27 fees." },
      { property: "og:title", content: "Courses & Programs — JECRC University" },
      { property: "og:description", content: "Search UG, PG and doctoral programmes with eligibility and official fees." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CoursesPage,
});

const levels: (Level | "All")[] = ["All", "UG", "PG", "Doctoral", "Diploma"];

function CoursesPage() {
  const { t, lang } = useLang();
  const [q, setQ] = useState("");
  const [level, setLevel] = useState<Level | "All">("All");
  const [category, setCategory] = useState("All");
  const results = useMemo(() => searchCourses(q, level, category), [q, level, category]);

  return (
    <>
      <PageHero eyebrow={`${courses.length} programmes · 2026-27`} title={t("page.courses")}>
        {lang === "hi"
          ? "अंडरग्रेजुएट, पोस्टग्रेजुएट और डॉक्टोरल प्रोग्राम — अवधि, योग्यता और आधिकारिक फीस के साथ।"
          : "Undergraduate, postgraduate and doctoral programmes — with duration, eligibility and official fees."}
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="sticky top-[72px] z-20 -mx-4 space-y-4 bg-background/95 px-4 py-4 backdrop-blur sm:mx-0 sm:rounded-2xl sm:border sm:border-border sm:shadow-card">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("common.searchPlaceholder")}
              className="h-12 rounded-full pl-12 text-base"
              aria-label="Search courses"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {levels.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLevel(l)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
                  level === l ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-accent",
                )}
              >
                {l === "All" ? t("common.all") : l === "Doctoral" ? "Ph.D." : l}
              </button>
            ))}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="ml-auto h-9 rounded-full border border-border bg-card px-4 text-sm font-semibold"
              aria-label="Category"
            >
              <option value="All">{t("common.all")} schools</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">{results.length} results</p>
        {results.length === 0 ? (
          <p className="mt-10 rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">{t("common.noResults")}</p>
        ) : (
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {results.map((c) => (
              <Link
                key={c.id}
                to="/courses/$courseId"
                params={{ courseId: c.id }}
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-saffron hover:shadow-lift"
              >
                <div className="flex items-center gap-2 text-xs font-bold">
                  <span className="rounded-full bg-primary px-2.5 py-1 text-primary-foreground">{c.level === "Doctoral" ? "Ph.D." : c.level}</span>
                  <span className="rounded-full bg-accent px-2.5 py-1 text-accent-foreground">{c.category}</span>
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-primary">{c.name}</h3>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="size-4 text-saffron" /> {c.duration ?? "—"}
                </p>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{c.eligibility}</p>
                <div className="mt-auto flex items-end justify-between pt-5">
                  <div>
                    <p className="text-xs text-muted-foreground">{c.level === "Doctoral" ? "Annual academic fee" : t("common.annualFee")}</p>
                    <p className="font-display text-xl font-bold text-primary">{formatINR(annualTotal(c))}</p>
                  </div>
                  <ArrowRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-saffron" />
                </div>
              </Link>
            ))}
          </div>
        )}
        <SourceNote>{t("common.official")}. {t("common.disclaimer")}</SourceNote>
      </section>
    </>
  );
}
