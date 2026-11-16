import { createFileRoute, Link } from "@tanstack/react-router";
import { Bus, BedDouble, ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";

import { annualTotal, FeeBreakdown } from "@/components/site/FeeTable";
import { PageHero, SourceNote } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { courses, findCourse, formatINR, hostelFees, hostelNotes, isPhdFees, links, transportFee } from "@/lib/university";

export const Route = createFileRoute("/fees")({
  head: () => ({
    meta: [
      { title: "Fee Structure 2026-27 — Tuition, Hostel & Bus | JECRC University" },
      { name: "description", content: "Course-wise official fee structure of JECRC University with tuition, other fees, hostel and transport fees, and a comparison table." },
      { property: "og:title", content: "JECRC University Fee Structure 2026-27" },
      { property: "og:description", content: "Course-wise tuition, hostel and transport fees from official university documents." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FeesPage,
});

const compareGroups = ["B.Tech", "BCA", "BBA", "MBA", "MCA", "B.Des", "B.Com", "BA", "B.Sc", "MA", "M.Sc"] as const;

function FeesPage() {
  const { t, lang } = useLang();
  const [selected, setSelected] = useState("b-tech-computer-science-and-engineering");
  const [group, setGroup] = useState<(typeof compareGroups)[number]>("B.Tech");
  const course = findCourse(selected);
  const compare = useMemo(() => courses.filter((c) => c.program === group && c.fees && !isPhdFees(c.fees)), [group]);

  return (
    <>
      <PageHero eyebrow="Official fee documents · 2026-27" title={t("page.fees")}>
        {lang === "hi" ? "कोर्स चुनें और उसकी पूरी फीस देखें — साथ में हॉस्टल और बस फीस।" : "Pick a course to see its full fee breakdown — plus hostel and bus fees."}
      </PageHero>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <label htmlFor="course-select" className="text-sm font-bold text-primary">
            {lang === "hi" ? "कोर्स चुनें" : "Select a course"}
          </label>
          <select
            id="course-select"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="mt-2 h-12 w-full rounded-xl border border-border bg-card px-4 text-sm font-semibold shadow-card"
          >
            {(["UG", "PG", "Doctoral", "Diploma"] as const).map((lvl) => (
              <optgroup key={lvl} label={lvl === "Doctoral" ? "Ph.D." : lvl}>
                {courses
                  .filter((c) => c.level === lvl)
                  .map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
              </optgroup>
            ))}
          </select>
          {course && (
            <div className="mt-6 rounded-2xl bg-accent p-5 text-accent-foreground">
              <p className="text-xs font-bold uppercase tracking-wider">{t("common.duration")}</p>
              <p className="mt-1 font-semibold">{course.duration}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button asChild size="sm" variant="navy" className="rounded-full">
                  <Link to="/courses/$courseId" params={{ courseId: course.id }}>
                    Course details
                  </Link>
                </Button>
                <Button asChild size="sm" variant="outline" className="rounded-full">
                  <a href={course.url} target="_blank" rel="noreferrer">
                    {t("common.viewOfficial")} <ExternalLink />
                  </a>
                </Button>
              </div>
            </div>
          )}
        </div>
        <div>{course && <FeeBreakdown course={course} />}</div>
      </section>

      <section className="bg-secondary/60">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <h2 className="text-3xl font-bold text-primary">{lang === "hi" ? "फीस तुलना" : "Fee comparison"}</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {compareGroups.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGroup(g)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
                  group === g ? "bg-primary text-primary-foreground" : "bg-card text-secondary-foreground hover:bg-accent",
                )}
              >
                {g}
              </button>
            ))}
          </div>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-card shadow-card">
            <table className="w-full min-w-[720px] text-sm">
              <thead className="bg-primary text-left text-primary-foreground">
                <tr>
                  <th className="px-4 py-3 font-semibold">Programme</th>
                  <th className="px-4 py-3 text-right font-semibold">Tuition / yr</th>
                  <th className="px-4 py-3 text-right font-semibold">Other / yr</th>
                  <th className="px-4 py-3 text-right font-semibold">Total / yr</th>
                  <th className="px-4 py-3 text-right font-semibold">At admission</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {compare.map((c) => {
                  const f = c.fees && !isPhdFees(c.fees) ? c.fees : null;
                  return (
                    <tr key={c.id} className="hover:bg-accent/50">
                      <td className="px-4 py-3">
                        <Link to="/courses/$courseId" params={{ courseId: c.id }} className="font-semibold text-primary hover:text-saffron">
                          {c.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums">{formatINR(f?.tuition)}</td>
                      <td className="px-4 py-3 text-right tabular-nums">{formatINR(f?.other)}</td>
                      <td className="px-4 py-3 text-right font-bold tabular-nums text-primary">{formatINR(annualTotal(c))}</td>
                      <td className="px-4 py-3 text-right tabular-nums">{formatINR(f?.firstInstallment)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <h2 className="flex items-center gap-3 text-3xl font-bold text-primary">
            <BedDouble className="size-7 text-saffron" /> {lang === "hi" ? "हॉस्टल फीस 2026-27" : "Hostel fee 2026-27"}
          </h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-card shadow-card">
            <table className="w-full min-w-[620px] text-sm">
              <thead className="bg-primary text-left text-primary-foreground">
                <tr>
                  <th className="px-4 py-3 font-semibold">Room category</th>
                  <th className="px-4 py-3 text-right font-semibold">Per annum</th>
                  <th className="px-4 py-3 text-right font-semibold">1st instalment*</th>
                  <th className="px-4 py-3 text-right font-semibold">2nd instalment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {hostelFees.map((h) => (
                  <tr key={h.room}>
                    <td className="px-4 py-3 font-semibold text-primary">{h.room}</td>
                    <td className="px-4 py-3 text-right font-bold tabular-nums">{formatINR(h.perAnnum)}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{formatINR(h.first)}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{formatINR(h.second)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">*Includes ₹5,000 one-time non-refundable registration fee.</p>
          <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
            {hostelNotes.map((n) => (
              <li key={n}>• {n}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl bg-navy-gradient p-7 text-navy-foreground shadow-lift">
          <Bus className="size-8 text-saffron" />
          <h2 className="mt-3 text-2xl font-bold">{lang === "hi" ? "बस / ट्रांसपोर्ट फीस" : "Transport (bus) fee"}</h2>
          <p className="mt-4 font-display text-4xl font-bold text-saffron">{formatINR(transportFee.perAnnum)}</p>
          <p className="text-sm text-navy-foreground/75">per annum · 2026-27</p>
          <div className="mt-5 space-y-2 text-sm">
            <p className="flex justify-between border-b border-navy-foreground/15 pb-2">
              <span>1st instalment</span> <strong>{formatINR(transportFee.first)}</strong>
            </p>
            <p className="flex justify-between">
              <span>2nd instalment</span> <strong>{formatINR(transportFee.second)}</strong>
            </p>
          </div>
          <p className="mt-5 text-xs text-navy-foreground/70">Available on identified routes from specific pickup points, subject to seat availability. GST extra.</p>
          <a href={links.hostelFee} target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm font-semibold text-saffron underline">
            Official hostel & transport fee page ↗
          </a>
        </div>
        <SourceNote>{t("common.disclaimer")}</SourceNote>
      </section>
    </>
  );
}
