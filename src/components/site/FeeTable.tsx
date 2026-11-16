import { formatINR, isPhdFees, type Course } from "@/lib/university";

export function FeeBreakdown({ course }: { course: Course }) {
  const f = course.fees;
  if (!f) return <p className="text-sm text-muted-foreground">Fee not published on the official page.</p>;
  const rows = isPhdFees(f)
    ? [
        ["Admission & Registration Fee", f.admissionRegistration],
        ["Annual Academic Fee", f.annualAcademic],
        ["Thesis Submission Fee", f.thesisSubmission],
      ]
    : [
        ["Tuition Fee (per annum)", f.tuition],
        ["Other Fee (per annum)", f.other],
        ["Total Annual Fee", f.total],
        ["Admission & Alumni Fee (one-time, non-refundable)", f.admissionAlumni],
        ["1st Instalment at admission (incl. admission fee)", f.firstInstallment],
      ];
  return (
    <dl className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
      {rows.map(([label, value]) => (
        <div key={label as string} className={"flex items-center justify-between gap-4 px-5 py-3.5 text-sm " + (label === "Total Annual Fee" ? "bg-accent font-bold text-accent-foreground" : "")}>
          <dt>{label}</dt>
          <dd className="font-display text-base font-semibold tabular-nums">{formatINR(value as number | null)}</dd>
        </div>
      ))}
    </dl>
  );
}

export function annualTotal(c: Course): number | null {
  if (!c.fees) return null;
  return isPhdFees(c.fees) ? c.fees.annualAcademic : c.fees.total;
}
