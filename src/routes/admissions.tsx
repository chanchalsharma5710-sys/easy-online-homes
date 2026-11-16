import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, CheckCircle2, ExternalLink, FileText, IndianRupee } from "lucide-react";

import { PageHero, SourceNote } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";
import { admission, contact, formatINR, links } from "@/lib/university";

export const Route = createFileRoute("/admissions")({
  head: () => ({
    meta: [
      { title: "Admissions 2026 — Process, Documents & Eligibility | JECRC University" },
      { name: "description", content: "Step-by-step admission procedure, required documents, application fee and important dates for JECRC University Jaipur." },
      { property: "og:title", content: "JECRC University Admissions" },
      { property: "og:description", content: "Admission procedure, documents, application fee and important dates." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdmissionsPage,
});

function AdmissionsPage() {
  const { t, lang } = useLang();
  return (
    <>
      <PageHero eyebrow="Admissions 2026-27" title={t("page.admissions")}>
        {lang === "hi"
          ? "ऑनलाइन आवेदन से लेकर फिज़िकल काउंसलिंग और सीट आवंटन तक — पूरी प्रक्रिया।"
          : "From online application to physical counselling and seat allotment — the complete process."}
      </PageHero>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="text-3xl font-bold text-primary">{lang === "hi" ? "एडमिशन प्रक्रिया" : "Admission procedure"}</h2>
          <ol className="mt-8 space-y-5">
            {admission.steps.map((s, i) => (
              <li key={s} className="flex gap-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-navy-gradient font-display text-lg font-bold text-navy-foreground ring-4 ring-saffron/30">
                  {i + 1}
                </span>
                <p className="pt-2 text-muted-foreground">{s}</p>
              </li>
            ))}
          </ol>

          <h2 className="mt-14 text-3xl font-bold text-primary">{lang === "hi" ? "आवश्यक दस्तावेज़" : "Required documents"}</h2>
          <p className="mt-2 text-sm text-muted-foreground">Bring originals + one set of self-attested photocopies.</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {admission.documents.map((d) => (
              <li key={d} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-sm shadow-card">
                <FileText className="size-5 shrink-0 text-saffron" /> {d}
              </li>
            ))}
          </ul>

          <h2 className="mt-14 text-3xl font-bold text-primary">{t("common.eligibility")}</h2>
          <p className="mt-3 text-muted-foreground">
            Eligibility differs by programme — e.g. B.Tech needs 10+2 with minimum 60% (English, Physics, Mathematics + one optional subject), MBA needs a
            3-year bachelor's degree with 60% plus GD-PI, and Ph.D. needs a master's degree with 55%. Open any course on the Courses page to see its exact criteria.
          </p>
          <p className="mt-3 flex gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="size-5 shrink-0 text-saffron" /> {admission.relaxation}
          </p>
        </div>

        <aside className="space-y-5">
          <div className="rounded-3xl bg-navy-gradient p-7 text-navy-foreground shadow-lift">
            <IndianRupee className="size-7 text-saffron" />
            <h3 className="mt-3 text-xl font-bold">{lang === "hi" ? "आवेदन शुल्क" : "Application fee"}</h3>
            <div className="mt-4 space-y-2">
              <p className="flex justify-between border-b border-navy-foreground/15 pb-2">
                <span>All programmes</span> <strong className="font-display text-lg">{formatINR(admission.applicationFee.general)}</strong>
              </p>
              <p className="flex justify-between">
                <span>Ph.D. programme</span> <strong className="font-display text-lg">{formatINR(admission.applicationFee.phd)}</strong>
              </p>
            </div>
            <Button asChild variant="hero" className="mt-6 w-full rounded-full">
              <a href={links.apply} target="_blank" rel="noreferrer">
                {t("nav.apply")} <ExternalLink />
              </a>
            </Button>
          </div>
          <div className="rounded-3xl border border-border bg-card p-7 shadow-card">
            <CalendarDays className="size-7 text-saffron" />
            <h3 className="mt-3 text-xl font-bold text-primary">{lang === "hi" ? "महत्वपूर्ण तिथियाँ" : "Important dates"}</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {admission.importantDates.map((d) => (
                <li key={d.label}>
                  <p className="text-muted-foreground">{d.label}</p>
                  <p className="font-semibold text-primary">{d.value}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">
              UG/PG admission dates for the current session are announced by the university. For the latest and confirmed information, please contact the JECRC
              University admission department at {contact.tollFree}.
            </p>
          </div>
          <a href={links.admissionInstructions} target="_blank" rel="noreferrer" className="block text-sm font-semibold text-saffron underline">
            Official admission instructions ↗
          </a>
        </aside>
        <SourceNote>{t("common.official")}</SourceNote>
      </section>
    </>
  );
}
