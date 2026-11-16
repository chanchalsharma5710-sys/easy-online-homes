import type { DictKey } from "@/lib/i18n";

export const navItems = [
  { to: "/about", key: "nav.about" },
  { to: "/courses", key: "nav.courses" },
  { to: "/admissions", key: "nav.admissions" },
  { to: "/fees", key: "nav.fees" },
  { to: "/scholarships", key: "nav.scholarships" },
  { to: "/facilities", key: "nav.facilities" },
  { to: "/placements", key: "nav.placements" },
  { to: "/contact", key: "nav.contact" },
] as const satisfies ReadonlyArray<{ to: string; key: DictKey }>;
