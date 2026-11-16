import { createFileRoute } from "@tanstack/react-router";
import { BedDouble, Bus, Coffee, Dumbbell, FlaskConical, HeartPulse, Library, Phone, Snowflake, Users } from "lucide-react";

import hostelImg from "@/assets/campus-hostel.jpg";
import labImg from "@/assets/campus-lab.jpg";
import libraryImg from "@/assets/campus-library.jpg";
import { PageHero, SourceNote } from "@/components/site/PageHero";
import { useLang } from "@/lib/i18n";
import { about, approvedOutsideHostels, contact, facilities, formatINR, hostelFees, links, transportFee } from "@/lib/university";

export const Route = createFileRoute("/facilities")({
  head: () => ({
    meta: [
      { title: "Hostel & Campus Facilities — Library, Labs, Sports | JECRC University" },
      { name: "description", content: "Boys and girls hostels, AC and non-AC rooms, library, labs, cafeteria, sports, medical and bus facilities at JECRC University Jaipur." },
      { property: "og:title", content: "Hostel & Campus Facilities — JECRC University" },
      { property: "og:description", content: "Hostels, library, labs, cafeteria, sports and transport on the 32-acre Jaipur campus." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FacilitiesPage,
});

function FacilitiesPage() {
  const { t, lang } = useLang();
  return (
    <>
      <PageHero eyebrow="32-acre campus · Jaipur" title={t("page.facilities")}>
        {lang === "hi" ? "घर से दूर एक घर — आधुनिक हॉस्टल, पुस्तकालय, लैब और खेल सुविधाएँ।" : "Your home away from home — modern hostels, libraries, labs and sports."}
      </PageHero>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2">
        <img src={hostelImg} alt="Single occupancy hostel room" loading="lazy" width={1280} height={896} className="aspect-[4/3] w-full rounded-3xl object-cover shadow-lift" />
        <div>
          <p className="eyebrow">JU Residence</p>
          <h2 className="mt-2 text-3xl font-bold text-primary">{lang === "hi" ? "बॉयज़ व गर्ल्स हॉस्टल" : "Boys & girls hostels"}</h2>
          <p className="mt-4 text-muted-foreground">{facilities.hostel}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {hostelFees.map((h) => (
              <div key={h.room} className="rounded-2xl border border-border bg-card p-4 shadow-card">
                {h.room.startsWith("AC") ? <Snowflake className="size-5 text-saffron" /> : <BedDouble className="size-5 text-saffron" />}
                <p className="mt-2 text-xs font-semibold text-muted-foreground">{h.room}</p>
                <p className="mt-1 font-display text-lg font-bold text-primary">{formatINR(h.perAnnum)}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            <strong className="text-primary">Approved outside hostels:</strong> {approvedOutsideHostels.join(" · ")}
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            {contact.hostelContacts.map((h) => (
              <a key={h.phone} href={`tel:${h.phone}`} className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 font-semibold text-secondary-foreground hover:bg-accent">
                <Phone className="size-3.5" /> {h.name.split(",")[0]} · {h.phone}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary/60">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
            <div className="overflow-hidden rounded-3xl bg-card shadow-card">
              <img src={libraryImg} alt="University library" loading="lazy" width={1280} height={896} className="aspect-[16/9] w-full object-cover" />
              <div className="p-7">
                <Library className="size-7 text-saffron" />
                <h3 className="mt-3 text-2xl font-bold text-primary">Central Library</h3>
                <p className="mt-2 text-sm text-muted-foreground">{facilities.library.summary}</p>
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {facilities.library.stats.map((s) => (
                    <div key={s.label}>
                      <p className="font-display text-xl font-bold text-primary">{s.value}</p>
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="overflow-hidden rounded-3xl bg-card shadow-card">
              <img src={labImg} alt="Computer laboratory" loading="lazy" width={1280} height={896} className="aspect-[16/9] w-full object-cover" />
              <div className="p-7">
                <FlaskConical className="size-7 text-saffron" />
                <h3 className="mt-3 text-2xl font-bold text-primary">Computer & specialised labs</h3>
                <ul className="mt-3 grid gap-1.5 text-sm text-muted-foreground sm:grid-cols-2">
                  {facilities.labs.map((l) => (
                    <li key={l}>• {l}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Dumbbell, title: "Sports & gym", body: facilities.sports },
          { icon: Coffee, title: "Cafeteria", body: facilities.cafeteria },
          { icon: Bus, title: "Transportation", body: `Bus facility on identified routes — ${formatINR(transportFee.perAnnum)} per annum (2026-27), subject to seat availability.` },
          { icon: HeartPulse, title: "Medical & wellbeing", body: facilities.medical },
        ].map(({ icon: Icon, title, body }) => (
          <article key={title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <Icon className="size-7 text-saffron" />
            <h3 className="mt-3 font-display text-lg font-semibold text-primary">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{body}</p>
          </article>
        ))}
        <article className="rounded-2xl bg-navy-gradient p-6 text-navy-foreground shadow-lift md:col-span-2 lg:col-span-4">
          <Users className="size-7 text-saffron" />
          <h3 className="mt-3 font-display text-lg font-semibold">Campus activities</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {about.clubs.map((c) => (
              <span key={c} className="rounded-full border border-navy-foreground/25 bg-navy-foreground/10 px-3 py-1 text-sm">
                {c}
              </span>
            ))}
          </div>
        </article>
        <SourceNote>
          {t("common.official")} —{" "}
          <a href={links.hostel} target="_blank" rel="noreferrer" className="text-saffron underline">
            Hostel
          </a>{" "}
          ·{" "}
          <a href={links.library} target="_blank" rel="noreferrer" className="text-saffron underline">
            Library
          </a>{" "}
          ·{" "}
          <a href={links.labs} target="_blank" rel="noreferrer" className="text-saffron underline">
            Labs
          </a>
        </SourceNote>
      </section>
    </>
  );
}
