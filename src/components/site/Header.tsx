import { Link } from "@tanstack/react-router";
import { Menu, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { LanguageToggle } from "./LanguageToggle";
import { Logo } from "./Logo";
import { navItems } from "./nav";
import { SiteSearch } from "./SiteSearch";

export function Header() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-all",
        scrolled ? "border-border bg-background/90 shadow-card backdrop-blur-lg" : "border-transparent bg-background",
      )}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        <Logo />
        <nav className="ml-6 hidden flex-1 items-center gap-1 xl:flex" aria-label="Main">
          {navItems.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-full px-3 py-2 text-sm font-semibold text-foreground/75 transition-colors hover:bg-secondary hover:text-primary"
              activeProps={{ className: "bg-secondary text-primary" }}
            >
              {t(n.key)}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden md:block">
            <SiteSearch />
          </div>
          <div className="md:hidden">
            <SiteSearch compact />
          </div>
          <LanguageToggle />
          <Button asChild variant="hero" className="hidden rounded-full sm:inline-flex">
            <Link to="/assistant">
              <MessageCircle />
              {t("nav.ask")}
            </Link>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full xl:hidden" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-background">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <nav className="mt-8 flex flex-col gap-1" aria-label="Mobile">
                <Link to="/" onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 font-semibold hover:bg-secondary">
                  {t("nav.home")}
                </Link>
                {navItems.map((n) => (
                  <Link
                    key={n.to}
                    to={n.to}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 font-semibold hover:bg-secondary"
                    activeProps={{ className: "bg-secondary text-primary" }}
                  >
                    {t(n.key)}
                  </Link>
                ))}
                <Link to="/faq" onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 font-semibold hover:bg-secondary">
                  {t("nav.faq")}
                </Link>
                <Button asChild variant="hero" className="mt-4 rounded-full">
                  <Link to="/assistant" onClick={() => setOpen(false)}>
                    <MessageCircle />
                    {t("nav.ask")}
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
