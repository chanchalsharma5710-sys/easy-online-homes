import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

import { useLang } from "@/lib/i18n";
import { contact, links } from "@/lib/university";
import { Logo } from "./Logo";
import { navItems } from "./nav";

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="relative overflow-hidden bg-navy-gradient text-navy-foreground">
      <div className="pattern-dots absolute inset-0 opacity-40" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1.2fr]">
        <div className="space-y-4">
          <Logo inverted />
          <p className="max-w-sm text-sm text-navy-foreground/75">
            AI College Enquiry Agent for JECRC University, Jaipur. Information sourced from the official university website for the 2026-27 session.
          </p>
          <a href={links.home} target="_blank" rel="noreferrer" className="inline-block text-sm font-semibold text-saffron hover:underline">
            jecrcuniversity.edu.in ↗
          </a>
        </div>
        <div>
          <p className="eyebrow mb-4">Explore</p>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {navItems.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="text-navy-foreground/80 hover:text-saffron">
                  {t(n.key)}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/faq" className="text-navy-foreground/80 hover:text-saffron">
                {t("nav.faq")}
              </Link>
            </li>
            <li>
              <Link to="/assistant" className="text-navy-foreground/80 hover:text-saffron">
                {t("chat.name")}
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-3 text-sm">
          <p className="eyebrow mb-4">{t("nav.contact")}</p>
          <p className="flex gap-3 text-navy-foreground/80">
            <MapPin className="mt-0.5 size-4 shrink-0 text-saffron" /> {contact.address}
          </p>
          <a href={`tel:${contact.tollFree}`} className="flex gap-3 text-navy-foreground/80 hover:text-saffron">
            <Phone className="size-4 shrink-0 text-saffron" /> {contact.tollFree} (Toll-free)
          </a>
          <a href={`mailto:${contact.admissionEmail}`} className="flex gap-3 text-navy-foreground/80 hover:text-saffron">
            <Mail className="size-4 shrink-0 text-saffron" /> {contact.admissionEmail}
          </a>
        </div>
      </div>
      <div className="relative border-t border-navy-foreground/10 py-5 text-center text-xs text-navy-foreground/60">
        © 2026 JECRC University AI Enquiry Agent · College project demo · Not an official university portal
      </div>
    </footer>
  );
}
