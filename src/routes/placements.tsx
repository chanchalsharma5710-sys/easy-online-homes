import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, GraduationCap, Rocket, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { PageHero, SourceNote } from "@/components/site/PageHero";
import { useLang } from "@/lib/i18n";
import { links, placements } from "@/lib/university";

export const Route = createFileRoute("/placements")({
  head: () => ({
    meta: [
      { title: "Placements 2025-26 — ₹33 LPA Highest Package | JECRC University" },
      { name: "description", content: "Verified placement statistics, recruiters, internships and career training at JECRC University for 2025-26." },
      { property: "og:title", content: "JECRC University Placements 2025-26" },
      { property: "og:description", content: "2104+ offers, ₹33 LPA highest package, 200+ recruiters and six-month internships." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PlacementsPage,
});

const chartData = placements.byDiscipline.map((d) => ({
  name: d.discipline,
  Average: parseFloat(d.average.replace(/[^\d.]/g, "")),
  Highest: parseFloat(d.highest.replace(/[^\d.]/g, "")),
}));

function PlacementsPage() {
  const { t, lang } = useLang();
  return (
    <>
      <PageHero eyebrow={`Placement highlights ${placements.session}`} title={t("page.placements")}>
        {lang === "hi" ? "केवल आधिकारिक, सत्यापित प्लेसमेंट जानकारी।" : "Only verified, official placement information."}
      </PageHero>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {placements.highlights.map((h) => (
            <div key={h.label} className="rounded-2xl border border-border bg-card p-5 text-center shadow-card">
              <p className="font-display text-2xl font-bold text-saffron md:text-3xl">{h.value}</p>
              <p className="mt-1 text-xs font-semibold text-muted-foreground">{h.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-primary">
              <TrendingUp className="size-6 text-saffron" /> Package by discipline (LPA)
            </h2>
            <div className="mt-6 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }} />
                  <YAxis tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }} />
                  <Tooltip />
                  <Bar dataKey="Average" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="Highest" fill="var(--color-chart-2)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">{placements.nonTech}</p>
          </div>
          <div className="space-y-5">
            <div className="rounded-3xl bg-navy-gradient p-7 text-navy-foreground shadow-lift">
              <Briefcase className="size-7 text-saffron" />
              <h3 className="mt-3 text-xl font-bold">Recruiting companies</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {placements.recruiters.map((r) => (
                  <span key={r} className="rounded-full bg-navy-foreground/10 px-3 py-1 text-xs font-semibold">
                    {r}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs text-navy-foreground/70">{placements.foundation}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-border bg-card p-7 shadow-card">
            <Rocket className="size-7 text-saffron" />
            <h3 className="mt-3 text-xl font-bold text-primary">Internship opportunities</h3>
            <p className="mt-2 text-sm text-muted-foreground">{placements.internship}</p>
          </article>
          <article className="rounded-3xl border border-border bg-card p-7 shadow-card">
            <GraduationCap className="size-7 text-saffron" />
            <h3 className="mt-3 text-xl font-bold text-primary">Career development & training</h3>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              {placements.training.map((tr) => (
                <li key={tr}>• {tr}</li>
              ))}
            </ul>
          </article>
        </div>
        <SourceNote>
          {placements.note}{" "}
          <a href={links.placements} target="_blank" rel="noreferrer" className="text-saffron underline">
            Official placements page ↗
          </a>
        </SourceNote>
      </section>
    </>
  );
}
