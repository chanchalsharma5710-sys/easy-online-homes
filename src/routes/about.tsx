import { createFileRoute } from "@tanstack/react-router";
import { Compass, FlaskConical, MapPin, Target, Users } from "lucide-react";

import heroImg from "@/assets/campus-hero.jpg";
import { PageHero, SourceNote } from "@/components/site/PageHero";
import { useLang } from "@/lib/i18n";
import { about, contact, links } from "@/lib/university";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About JECRC University Jaipur — Vision, Mission & Campus" },
      { name: "description", content: "History, vision, mission, campus, research and student clubs at JECRC University, Sitapura, Jaipur." },
      { property: "og:title", content: "About JECRC University Jaipur" },
      { property: "og:description", content: "History, vision, mission, campus, research and student clubs at JECRC University." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t, lang } = useLang();
  return (
    <>
      <PageHero eyebrow="Since 2012 · UGC approved" title={t("page.about")}>
        {lang === "hi"
          ? "JECRC Foundation की 27 वर्षों की विरासत पर बना, जयपुर का एक शोध-उन्मुख विश्वविद्यालय।"
          : "A research-oriented university in Jaipur, built on the 27-year legacy of the JECRC Foundation."}
      </PageHero>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-5">
          <h2 className="text-3xl font-bold text-primary">{lang === "hi" ? "परिचय व इतिहास" : "Introduction & history"}</h2>
          <p className="text-muted-foreground">{about.established}</p>
          <p className="text-muted-foreground">
            JECRC University is driven by the spirit of innovation-led research — reflected in its infrastructure and practices. It has
            more than 26,000 active students from 29 states, over 34,000 alumni worldwide and 12,000+ students placed in the last five years.
          </p>
          <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-card">
            <MapPin className="mt-1 size-5 shrink-0 text-saffron" />
            <div>
              <p className="font-semibold text-primary">Sitapura Extension, Jaipur, Rajasthan</p>
              <p className="text-sm text-muted-foreground">{contact.address}</p>
            </div>
          </div>
        </div>
        <img src={heroImg} alt="University campus" loading="lazy" width={1920} height={1088} className="aspect-[4/3] w-full rounded-3xl object-cover shadow-lift" />
      </section>

      <section className="bg-secondary/60">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 md:grid-cols-2">
          <article className="rounded-3xl bg-navy-gradient p-8 text-navy-foreground shadow-lift">
            <Compass className="size-8 text-saffron" />
            <h2 className="mt-4 text-2xl font-bold">{lang === "hi" ? "विज़न" : "Vision"}</h2>
            <p className="mt-3 text-navy-foreground/85">{about.vision}</p>
          </article>
          <article className="rounded-3xl border border-border bg-card p-8 shadow-card">
            <Target className="size-8 text-saffron" />
            <h2 className="mt-4 text-2xl font-bold text-primary">{lang === "hi" ? "मिशन" : "Mission"}</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {about.mission.map((m) => (
                <li key={m} className="flex gap-2">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-saffron" /> {m}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 md:grid-cols-3">
        <article className="rounded-3xl border border-border bg-card p-7 shadow-card">
          <h3 className="text-xl font-bold text-primary">{lang === "hi" ? "शैक्षणिक वातावरण" : "Academic environment"}</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Choice Based Credit System, industry-integrated specialisations and collaborations with global leaders:
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {about.collaborations.map((c) => (
              <span key={c} className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground">
                {c}
              </span>
            ))}
          </div>
        </article>
        <article className="rounded-3xl border border-border bg-card p-7 shadow-card">
          <FlaskConical className="size-7 text-saffron" />
          <h3 className="mt-3 text-xl font-bold text-primary">{lang === "hi" ? "शोध व नवाचार" : "Research & innovation"}</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {about.research.map((r) => (
              <li key={r}>• {r}</li>
            ))}
          </ul>
        </article>
        <article className="rounded-3xl border border-border bg-card p-7 shadow-card">
          <Users className="size-7 text-saffron" />
          <h3 className="mt-3 text-xl font-bold text-primary">{lang === "hi" ? "क्लब व गतिविधियाँ" : "Clubs & student activities"}</h3>
          <ul className="mt-3 grid grid-cols-1 gap-1.5 text-sm text-muted-foreground">
            {about.clubs.map((c) => (
              <li key={c}>• {c}</li>
            ))}
          </ul>
        </article>
        <SourceNote>
          {t("common.official")} —{" "}
          <a className="text-saffron underline" href={links.vision} target="_blank" rel="noreferrer">
            Vision & Mission
          </a>
        </SourceNote>
      </section>
    </>
  );
}
