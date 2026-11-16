import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle, Search } from "lucide-react";
import { useState } from "react";

import { PageHero } from "@/components/site/PageHero";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLang } from "@/lib/i18n";
import { faqs } from "@/lib/university";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — JECRC University Admissions, Fees & Hostel" },
      { name: "description", content: "Answers to the most common questions about JECRC University admissions, fees, scholarships, hostel, transport and placements." },
      { property: "og:title", content: "JECRC University FAQ" },
      { property: "og:description", content: "Common questions about admissions, fees, scholarships, hostel and placements — in English and Hindi." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  const { t, pick, lang } = useLang();
  const [q, setQ] = useState("");
  const list = faqs.filter((f) => {
    const s = q.trim().toLowerCase();
    return !s || [f.q.en, f.q.hi, f.a.en, f.a.hi].some((x) => x.toLowerCase().includes(s));
  });
  return (
    <>
      <PageHero eyebrow="English · हिंदी" title={t("page.faq")} />
      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={lang === "hi" ? "सवाल खोजें…" : "Search questions…"} className="h-12 rounded-full pl-12" />
        </div>
        <Accordion type="single" collapsible className="mt-8 space-y-3">
          {list.map((f, i) => (
            <AccordionItem key={i} value={`f${i}`} className="rounded-2xl border border-border bg-card px-5 shadow-card">
              <AccordionTrigger className="text-left font-display text-base font-semibold text-primary hover:no-underline">{pick(f.q)}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{pick(f.a)}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        {list.length === 0 && <p className="mt-8 text-center text-muted-foreground">{lang === "hi" ? "कोई सवाल नहीं मिला।" : "No matching questions."}</p>}
        <div className="mt-12 rounded-3xl bg-navy-gradient p-8 text-center text-navy-foreground shadow-lift">
          <p className="font-display text-2xl font-bold">{lang === "hi" ? "आपका सवाल यहाँ नहीं है?" : "Didn't find your question?"}</p>
          <Button asChild variant="hero" className="mt-5 rounded-full">
            <Link to="/assistant">
              <MessageCircle /> {t("nav.ask")}
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
