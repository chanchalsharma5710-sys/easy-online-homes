import { describe, expect, it } from "vitest";

import {
  admission,
  buildKnowledgeText,
  courses,
  FALLBACK_MESSAGE,
  findCourse,
  hostelFees,
  isPhdFees,
  searchCourses,
  transportFee,
} from "@/lib/university";
import { buildInstructions } from "@/lib/ai/chat.server";

describe("verified university knowledge", () => {
  it("uses the exact fallback sentence from the brief", () => {
    expect(FALLBACK_MESSAGE).toBe(
      "For the latest and confirmed information, please contact the JECRC University admission department.",
    );
    expect(buildInstructions()).toContain(FALLBACK_MESSAGE);
  });

  it("keeps the official B.Tech CSE 2026-27 fee", () => {
    const c = findCourse("b-tech-computer-science-and-engineering");
    expect(c?.fees && !isPhdFees(c.fees) ? c.fees.total : null).toBe(245000);
    expect(c?.fees && !isPhdFees(c.fees) ? c.fees.tuition : null).toBe(174000);
  });

  it("keeps official hostel and bus fees", () => {
    expect(hostelFees.map((h) => h.perAnnum)).toEqual([172000, 142000, 127000]);
    expect(transportFee.perAnnum).toBe(55000);
  });

  it("keeps the official application fees", () => {
    expect(admission.applicationFee).toEqual({ general: 1000, phd: 1500 });
  });

  it("never lists a course with made-up negative or zero fees", () => {
    for (const c of courses) {
      if (c.fees && !isPhdFees(c.fees) && c.fees.total != null) expect(c.fees.total).toBeGreaterThan(0);
    }
  });

  it("search finds B.Tech AI programmes and filters by level", () => {
    const r = searchCourses("artificial intelligence", "UG");
    expect(r.length).toBeGreaterThan(0);
    expect(r.every((c) => c.level === "UG")).toBe(true);
  });

  it("puts course fees into the assistant's knowledge", () => {
    expect(buildKnowledgeText()).toContain("₹2,45,000");
  });
});
