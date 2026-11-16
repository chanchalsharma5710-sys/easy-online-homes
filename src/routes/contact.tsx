import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Globe, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLang } from "@/lib/i18n";
import { contact, links } from "@/lib/university";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact JECRC University — Address, Helpline & Map" },
      { name: "description", content: "JECRC University address in Sitapura, Jaipur, toll-free admission helpline 1800-120-5616, email and Google Maps location." },
      { property: "og:title", content: "Contact JECRC University" },
      { property: "og:description", content: "Address, admission helpline, email and map location of JECRC University, Jaipur." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t, lang } = useLang();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email) || form.message.trim().length < 5) {
      toast.error(lang === "hi" ? "कृपया नाम, सही ईमेल और संदेश भरें।" : "Please enter your name, a valid email and a message.");
      return;
    }
    const subject = encodeURIComponent(`Admission enquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${contact.admissionEmail}?subject=${subject}&body=${body}`;
    toast.success(lang === "hi" ? "आपका ईमेल ऐप खुल रहा है…" : "Opening your email app…");
  };

  const cards = [
    { icon: MapPin, label: "Address", value: contact.address, href: contact.mapLink },
    { icon: Phone, label: "Admission helpline (toll-free)", value: contact.tollFree, href: `tel:${contact.tollFree}` },
    { icon: Mail, label: "Admission email", value: contact.admissionEmail, href: `mailto:${contact.admissionEmail}` },
    { icon: Globe, label: "Official website", value: "jecrcuniversity.edu.in", href: links.home },
  ];

  return (
    <>
      <PageHero eyebrow="We're here to help" title={t("page.contact")} />
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-4">
          {cards.map(({ icon: Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-card transition-colors hover:border-saffron"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
                <Icon className="size-5" />
              </span>
              <span>
                <span className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</span>
                <span className="mt-1 block font-semibold text-primary">{value}</span>
              </span>
            </a>
          ))}
          <div className="rounded-2xl bg-accent p-5 text-sm text-accent-foreground">
            <p className="font-bold">Other departments</p>
            <ul className="mt-2 space-y-1">
              <li>Director Admissions: {contact.directorAdmissionEmail}</li>
              <li>Ph.D. enquiry: {contact.phdEnquiryPhone} · {contact.phdEnquiryEmail}</li>
              <li>Executive education: {contact.executiveEducationPhone}</li>
              <li>Training & Placement: {contact.placementEmail}</li>
              <li>Accounts: {contact.accountsEmail}</li>
            </ul>
          </div>
        </div>
        <div className="space-y-6">
          <div className="overflow-hidden rounded-3xl border border-border shadow-card">
            <iframe
              title="JECRC University on Google Maps"
              src={contact.mapEmbed}
              className="h-80 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <form onSubmit={submit} className="space-y-3 rounded-3xl border border-border bg-card p-6 shadow-card">
            <h2 className="text-xl font-bold text-primary">{lang === "hi" ? "एडमिशन टीम को लिखें" : "Write to the admission team"}</h2>
            <Input placeholder={lang === "hi" ? "आपका नाम" : "Your name"} value={form.name} maxLength={100} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Input type="email" placeholder="Email" value={form.email} maxLength={255} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <Textarea
              placeholder={lang === "hi" ? "आपका सवाल" : "Your question"}
              rows={4}
              maxLength={1000}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            <Button type="submit" variant="hero" className="rounded-full">
              {lang === "hi" ? "ईमेल भेजें" : "Send email"} <ExternalLink />
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
