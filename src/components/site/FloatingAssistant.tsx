import { Link, useRouterState } from "@tanstack/react-router";

import assistantImg from "@/assets/ju-assistant.png";
import { useLang } from "@/lib/i18n";

export function FloatingAssistant() {
  const { t } = useLang();
  const path = useRouterState({ select: (s) => s.location.pathname });
  if (path.startsWith("/assistant")) return null;
  return (
    <Link
      to="/assistant"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full bg-navy-gradient py-2 pl-2 pr-5 text-sm font-bold text-navy-foreground shadow-lift ring-2 ring-saffron/60 transition-transform hover:-translate-y-1"
      aria-label={t("nav.ask")}
    >
      <span className="grid size-11 place-items-center rounded-full bg-card">
        <img src={assistantImg} alt="" width={44} height={44} className="size-10 animate-float" />
      </span>
      <span className="hidden sm:inline">{t("nav.ask")}</span>
    </Link>
  );
}
