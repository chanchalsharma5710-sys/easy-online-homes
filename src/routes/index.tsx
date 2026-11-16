import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  BedDouble,
  BookOpen,
  Briefcase,
  ClipboardCheck,
  GraduationCap,
  IndianRupee,
  Landmark,
  MessageCircle,
  PhoneCall,
} from "lucide-react";

import heroImg from "@/assets/campus-hero.jpg";
import hostelImg from "@/assets/campus-hostel.jpg";
import labImg from "@/assets/campus-lab.jpg";
import libraryImg from "@/assets/campus-library.jpg";
import assistantImg from "@/assets/ju-assistant.png";
import { Button } from "@/components/ui/button";
import { useLang, type DictKey } from "@/lib/i18n";
import { about, courses, placements } from "@/lib/university";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JECRC University Jaipur — AI College Enquiry Agent" },
      {
        name: "description",
        content:
          "Welcome to JECRC University – Build Your World. Explore courses, fees, scholarships, hostel and placements, or ask JU Smart Assistant in English or Hindi.",
      },
      { property: "og:title", content: "JECRC University Jaipur — AI College Enquiry Agent" },
      {
        property: "og:description",
        content: "Courses, fees, admissions, scholarships and placements at JECRC University, with an AI assistant that answers in English and Hindi.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const quick: { to: string; key: DictKey; icon: typeof BookOpen }[] = [
  { to: "/about", key: "q.about", icon: Landmark },
  { to: "/courses", key: "q.courses", icon: BookOpen },
  { to: "/admissions", key: "q.admission", icon: ClipboardCheck },
  { to: "/fees", key: "q.fees", icon: IndianRupee },
  { to: "/scholarships", key: "q.scholarships", icon: Award },
  { to: "/facilities", key: "q.hostel", icon: BedDouble },
  { to: "/placements", key: "q.placements", icon: Briefcase },
  { to: "/contact", key: "q.contact", icon: PhoneCall },
];

function Index() {
  const { t, lang } = useLang();
  const levels = {
    UG: courses.filter((c) => c.level === "UG").length,
    PG: courses.filter((c) => c.level === "PG").length,
    PhD: courses.filter((c) => c.level === "Doctoral").length,
  };

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImg}
          alt="University campus in Jaipur at sunset"
          width={1920}
          height={1088}
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div className="bg-hero-overlay absolute inset-0 -z-10" aria-hidden />
        <div className="mx-auto flex min-h-[640px] max-w-7xl flex-col justify-center px-4 py-20 text-navy-foreground sm:px-6">
          <p className="eyebrow animate-rise">{t("home.eyebrow")}</p>
          <h1 className="mt-4 max-w-3xl animate-rise text-5xl font-bold leading-[1.05] md:text-7xl">
            {t("home.title")}
            <span className="block text-saffron">– {t("home.tagline")}</span>
          </h1>
          <p className="mt-6 max-w-xl animate-rise text-lg text-navy-foreground/85">{t("home.intro")}</p>
          <div className="mt-9 flex flex-wrap gap-3 animate-rise">
            <Button asChild variant="hero" size="xl">
              <Link to="/assistant">
                <MessageCircle className="size-5" />
                {t("nav.ask")}
              </Link>
            </Button>
            <Button asChild variant="heroOutline" size="xl">
              <Link to="/courses">
                {t("home.explore")} <ArrowRight />
              </Link>
            </Button>
          </div>
          <dl className="mt-14 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
            {about.stats.map((s) => (
              <div key={s.label} className="border-l-2 border-saffron pl-4">
                <dt className="text-xs text-navy-foreground/70">{s.label}</dt>
                <dd className="font-display text-2xl font-bold">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Quick navigation */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Quick links</p>
            <h2 className="mt-2 text-3xl font-bold text-primary md:text-4xl">{t("home.quick")}</h2>
            <p className="mt-2 text-muted-foreground">{t("home.quickSub")}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {quick.map(({ to, key, icon: Icon }, i) => (
            <Link
              key={to}
              to={to}
              style={{ animationDelay: `${i * 60}ms` }}
              className="group relative animate-rise overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-saffron hover:shadow-lift"
            >
              <span className="grid size-12 place-items-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-saffron group-hover:text-saffron-foreground">
                <Icon className="size-6" />
              </span>
              <p className="mt-5 font-display text-lg font-semibold text-primary">{t(key)}</p>
              <ArrowRight className="absolute right-5 top-6 size-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-saffron" />
            </Link>
          ))}
        </div>
      </section>

      {/* Intro + programmes */}
      <section className="bg-secondary/60">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-4">
            <img src={libraryImg} alt="Students studying in a library" loading="lazy" width={1280} height={896} className="col-span-2 aspect-[16/9] w-full rounded-2xl object-cover shadow-lift" />
            <img src={labImg} alt="Students in a computer lab" loading="lazy" width={1280} height={896} className="aspect-[4/3] w-full rounded-2xl object-cover shadow-card" />
            <img src={hostelImg} alt="A single occupancy hostel room" loading="lazy" width={1280} height={896} className="aspect-[4/3] w-full rounded-2xl object-cover shadow-card" />
          </div>
          <div>
            <p className="eyebrow">{t("nav.about")}</p>
            <h2 className="mt-2 text-3xl font-bold text-primary md:text-4xl">
              {lang === "hi" ? "शोध, नवाचार और इंडस्ट्री से जुड़ी शिक्षा" : "Research-led, industry-connected learning"}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {lang === "hi"
                ? "JECRC University की स्थापना JECRC University Act, 2012 के तहत हुई और यह UGC Act की धारा 2(f) व 12(B) के तहत मान्यता प्राप्त है। Google Cloud, Microsoft, AWS, IBM, TCS, Deloitte जैसी कंपनियों के साथ साझेदारी में नए ज़माने के प्रोग्राम चलाए जाते हैं।"
                : "Established under the JECRC University Act, 2012 and approved by UGC u/s 2(f) and 12(B), JECRC University runs new-age programmes with partners like Google Cloud, Microsoft, AWS, IBM, TCS and Deloitte."}
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { n: levels.UG, l: "UG programmes" },
                { n: levels.PG, l: "PG programmes" },
                { n: levels.PhD, l: "Ph.D. areas" },
              ].map((x) => (
                <div key={x.l} className="rounded-2xl bg-card p-5 text-center shadow-card">
                  <p className="font-display text-3xl font-bold text-saffron">{x.n}</p>
                  <p className="mt-1 text-xs font-semibold text-muted-foreground">{x.l}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="navy" className="rounded-full">
                <Link to="/about">
                  {t("q.about")} <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/placements">
                  <GraduationCap /> {placements.highlights[1]?.value} {lang === "hi" ? "सर्वाधिक पैकेज" : "highest package"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* AI assistant CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-navy-gradient p-8 text-navy-foreground shadow-lift md:p-14">
          <div className="pattern-dots absolute inset-0 opacity-40" aria-hidden />
          <div className="absolute -bottom-20 -right-10 size-80 rounded-full bg-saffron/30 blur-3xl" aria-hidden />
          <div className="relative grid items-center gap-10 md:grid-cols-[1fr_auto]">
            <div>
              <p className="eyebrow">AI · English + हिंदी</p>
              <h2 className="mt-3 text-3xl font-bold md:text-5xl">{t("home.aiTitle")}</h2>
              <p className="mt-4 max-w-xl text-navy-foreground/80">{t("home.aiSub")}</p>
              <div className="mt-6 flex flex-wrap gap-2 text-sm">
                {["B.Tech CSE fees?", "हॉस्टल की फीस कितनी है?", "Which course for AI?", "Scholarship for 85%?"].map((s) => (
                  <span key={s} className="rounded-full border border-navy-foreground/25 bg-navy-foreground/10 px-3 py-1.5">
                    {s}
                  </span>
                ))}
              </div>
              <Button asChild variant="hero" size="xl" className="mt-8">
                <Link to="/assistant">
                  <MessageCircle className="size-5" /> {t("nav.ask")}
                </Link>
              </Button>
            </div>
            <img src={assistantImg} alt="JU Smart Assistant owl mascot" loading="lazy" width={816} height={816} className="mx-auto w-48 animate-float md:w-64" />
          </div>
        </div>
      </section>
    </>
  );
}
