import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock, ExternalLink, GraduationCap, MessageCircle } from "lucide-react";

import { FeeBreakdown } from "@/components/site/FeeTable";
import { PageHero, SourceNote } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";
import { admission, findCourse, links } from "@/lib/university";

export const Route = createFileRoute("/courses/$courseId")({
  loader: ({ params }) => {
    const course = findCourse(params.courseId);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.course.name;
    const title = name ? `${name} — Fees & Eligibility | JECRC University` : "Course not found | JECRC University";
    const desc = name
      ? `${name} at JECRC University Jaipur: duration, eligibility and official 2026-27 fee structure.`
      : "This course could not be found.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(name ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold text-primary">Course not found</h1>
      <Link to="/courses" className="mt-6 inline-block font-semibold text-saffron underline">
        Browse all courses
      </Link>
    </div>
  ),
  component: CourseDetail,
});

function CourseDetail() {
  const { course } = Route.useLoaderData();
  const { t } = useLang();
  return (
    <>
      <PageHero eyebrow={`${course.level === "Doctoral" ? "Ph.D." : course.level} · ${course.category}`} title={course.name} />
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-8">
          <Link to="/courses" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-saffron">
            <ArrowLeft className="size-4" /> {t("page.courses")}
          </Link>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <Clock className="size-5 text-saffron" />
              <p className="mt-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">{t("common.duration")}</p>
              <p className="mt-1 font-semibold text-primary">{course.duration ?? "See official page"}</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <GraduationCap className="size-5 text-saffron" />
              <p className="mt-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Programme</p>
              <p className="mt-1 font-semibold text-primary">{course.program}</p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-primary">{t("common.eligibility")}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{course.eligibility ?? "See official page."}</p>
            <p className="mt-3 text-sm text-muted-foreground">{admission.relaxation}</p>
            {course.program === "B.Tech" && <p className="mt-2 text-sm font-semibold text-primary">{admission.btechPreference}</p>}
          </div>
        </div>
        <aside className="space-y-4">
          <h2 className="text-2xl font-bold text-primary">Fee structure 2026-27</h2>
          <FeeBreakdown course={course} />
          <div className="flex flex-col gap-2 pt-2">
            <Button asChild variant="hero" className="rounded-full">
              <a href={links.apply} target="_blank" rel="noreferrer">
                {t("nav.apply")} <ExternalLink />
              </a>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <a href={course.url} target="_blank" rel="noreferrer">
                {t("common.viewOfficial")} <ExternalLink />
              </a>
            </Button>
            <Button asChild variant="navy" className="rounded-full">
              <Link to="/assistant">
                <MessageCircle /> {t("nav.ask")}
              </Link>
            </Button>
          </div>
          <SourceNote>{t("common.disclaimer")}</SourceNote>
        </aside>
      </section>
    </>
  );
}
