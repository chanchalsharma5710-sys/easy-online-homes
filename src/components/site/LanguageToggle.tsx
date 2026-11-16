import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageToggle() {
  const { lang, setLang } = useLang();
  return (
    <div role="group" aria-label="Language" className="flex h-10 items-center rounded-full border border-border bg-card p-1 text-xs font-bold">
      {(["en", "hi"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={cn(
            "h-full rounded-full px-3 transition-colors",
            lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-primary",
          )}
        >
          {l === "en" ? "EN" : "हिं"}
        </button>
      ))}
    </div>
  );
}
