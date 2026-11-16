import { createFileRoute } from "@tanstack/react-router";
import { Award, CheckCircle2, ExternalLink } from "lucide-react";

import { PageHero, SourceNote } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";
import { admission, links, scholarshipRules, scholarships } from "@/lib/university";

export const Route = createFileRoute("/scholarships")({
  head: () => ({
    meta: [
      { title: "Scholarships 2026-27 — Merit, JEE & CAT | JECRC University" },
      { name: "description", content: "Merit scholarships of 15%–25% of tuition fee at JECRC University based on 10+2, JEE (Main) and CAT scores, plus additional 10% scholarships." },
      { property: "og:title", content: "JECRC University Scholarships 2026-27" },
      { property: "og:description", content: "Merit-based scholarships, eligibility criteria, percentages and how to apply." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ScholarshipsPage,
});

function ScholarshipsPage() {
  const { t, lang } = useLang();
  return (
    <>
      <PageHero eyebrow="Merit-based · 2026-27" title={t("page.scholarships")}>
        {lang === "hi"
          ? "पिछली परीक्षा के अंकों के आधार पर ट्यूशन फीस पर 25% तक की स्कॉलरशिप।"
          : "Up to 25% of tuition fee, awarded on the basis of marks in the last qualifying examination."}
      </PageHero>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {scholarships.map((s, i) => (
            <article key={i} className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card">
              <span className="absolute right-5 top-5 font-display text-4xl font-bold text-saffron">{s.amount}</span>
              <Award className="size-7 text-primary" />
              <h3 className="mt-3 pr-20 font-display text-lg font-semibold text-primary">{s.type}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.criteria}</p>
              <p className="mt-4 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground">{s.programs}</p>
            </article>
          ))}
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-primary">{lang === "hi" ? "नियम व शर्तें" : "Rules & continuation criteria"}</h2>
            <ul className="mt-5 space-y-3">
              {scholarshipRules.map((r) => (
                <li key={r} className="flex gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="size-5 shrink-0 text-saffron" /> {r}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-navy-gradient p-7 text-navy-foreground shadow-lift">
            <h2 className="text-2xl font-bold">{lang === "hi" ? "आवेदन कैसे करें" : "How to apply"}</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-navy-foreground/85">
              <li>Scholarships are offered to all eligible students on the basis of marks in the qualifying examination / JEE (Main) / CAT score — apply for admission online first.</li>
              <li>Bring your 12th marksheet, JEE / CAT scorecard and any certificate for additional scholarship (NCC 'A', sports, etc.) to physical counselling.</li>
              <li>Maintain 8.0 CGPA and 75% attendance every year to continue the scholarship.</li>
            </ol>
            <p className="mt-4 text-xs text-navy-foreground/70">Required documents also include: {admission.documents.slice(0, 3).join(", ")}…</p>
            <Button asChild variant="hero" className="mt-6 rounded-full">
              <a href={links.scholarship} target="_blank" rel="noreferrer">
                Official scholarship page <ExternalLink />
              </a>
            </Button>
          </div>
        </div>
        <SourceNote>{t("common.official")}</SourceNote>
      </section>
    </>
  );
}
