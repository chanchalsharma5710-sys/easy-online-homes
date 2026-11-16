import coursesData from "@/data/courses.json";

/**
 * Verified JECRC University knowledge base.
 * Every value here was copied from the official website (jecrcuniversity.edu.in)
 * for the 2026-27 session. Do not add figures that are not on an official page.
 */

export const OFFICIAL_SITE = "https://jecrcuniversity.edu.in/";
export const FALLBACK_MESSAGE =
  "For the latest and confirmed information, please contact the JECRC University admission department.";

export type Level = "UG" | "PG" | "Doctoral" | "Diploma";

export interface ProgramFees {
  tuition: number | null;
  other: number | null;
  total: number | null;
  admissionAlumni: number | null;
  firstInstallment: number | null;
}

export interface PhdFees {
  admissionRegistration: number;
  annualAcademic: number;
  thesisSubmission: number;
}

export interface Course {
  id: string;
  name: string;
  program: string;
  level: Level;
  category: string;
  duration: string | null;
  eligibility: string | null;
  url: string;
  fees: ProgramFees | PhdFees | null;
}

export const courses = coursesData as Course[];

export function isPhdFees(fees: Course["fees"]): fees is PhdFees {
  return !!fees && "annualAcademic" in fees;
}

export function formatINR(value: number | null | undefined): string {
  if (value == null) return "—";
  return "₹" + value.toLocaleString("en-IN");
}

export function findCourse(id: string) {
  return courses.find((c) => c.id === id);
}

export function searchCourses(query: string, level?: Level | "All", category?: string) {
  const q = query.trim().toLowerCase();
  return courses.filter((c) => {
    if (level && level !== "All" && c.level !== level) return false;
    if (category && category !== "All" && c.category !== category) return false;
    if (!q) return true;
    return (
      c.name.toLowerCase().includes(q) ||
      c.program.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      (c.eligibility ?? "").toLowerCase().includes(q)
    );
  });
}

export const categories = Array.from(new Set(courses.map((c) => c.category))).sort();

export const contact = {
  address:
    "Plot No. IS-2036 to IS-2039, Ramchandrapura Industrial Area, Vidhani, Sitapura Extension, Jaipur – 303905, Rajasthan, India",
  tollFree: "1800-120-5616",
  admissionEmail: "admission@jecrcu.edu.in",
  directorAdmissionEmail: "director.admission@jecrcu.edu.in",
  executiveEducationPhone: "+91-9116107504",
  phdEnquiryPhone: "+91-9001699997",
  phdEnquiryEmail: "dean.research@jecrcu.edu.in",
  accountsEmail: "accounts@jecrcu.edu.in",
  placementEmail: "tpo@jecrcu.edu.in",
  hostelContacts: [
    { name: "Mr. Nirmal Jain, Dy. Director (Hostels)", phone: "+91-9358724196" },
    { name: "Mr. Satyavir Singh (Chief Warden)", phone: "+91-7727039228" },
    { name: "Ms. Kajal", phone: "+91-7300061890" },
  ],
  mapEmbed:
    "https://www.google.com/maps?q=JECRC+University+Sitapura+Jaipur&output=embed",
  mapLink: "https://www.google.com/maps/search/?api=1&query=JECRC+University+Jaipur",
};

export const links = {
  home: OFFICIAL_SITE,
  apply: "https://jecrcuniversity.edu.in/application/",
  admissionInstructions:
    "https://jecrcuniversity.edu.in/important-instructions-students-of-application-and-admission/",
  scholarship: "https://jecrcuniversity.edu.in/scholarship/",
  hostelFee: "https://jecrcuniversity.edu.in/hostel-transportation-fee/",
  hostel: "https://jecrcuniversity.edu.in/hostel-facility/",
  placements: "https://jecrcuniversity.edu.in/placements/",
  contact: "https://jecrcuniversity.edu.in/contact-us/",
  prospectus: "https://jecrcuniversity.edu.in/wp-content/uploads/2026/04/JU-Prospectus-2026.pdf",
  library: "https://jecrcuniversity.edu.in/central-library/",
  labs: "https://jecrcuniversity.edu.in/labs-ju/",
  vision: "https://jecrcuniversity.edu.in/vision-mission-and-the-spirit-of-ju/",
  refund: "https://jecrcuniversity.edu.in/refund-policy/",
};

export const about = {
  established:
    "Established and incorporated as a State Private University under the JECRC University Act (Act 15/2012 of the Rajasthan State Legislature). Approved by UGC u/s 2(f) and 12(B) of the UGC Act 1956, with the right to confer degrees u/s 22(1).",
  vision:
    "To become a renowned center of higher learning, and work towards academic, professional, cultural and social enrichment of the lives of individuals and communities.",
  mission: [
    "To focus on research and spirit of innovation that will drive academic orientation and pursue innovative solutions to local, regional and global needs.",
    "To undertake collaborative projects which offer opportunities for long-term interaction with academia and industry.",
    "To develop human potential to its fullest extent so that intellectually capable and imaginatively gifted leaders can emerge in a range of professions.",
    "To provide a vibrant and inspiring academic atmosphere in which the students enjoy the process of learning and developing their creativity in a dynamic and competitive environment.",
    "To achieve excellence in every activity by developing a culture of quality, benchmarking and best practices.",
  ],
  stats: [
    { value: "27+", label: "Years of JECRC legacy" },
    { value: "26,000+", label: "Active students" },
    { value: "34,000+", label: "Alumni worldwide" },
    { value: "32 acre", label: "Campus in Jaipur" },
  ],
  research: [
    "12,000+ students in Entrepreneurship Development Programmes (JECRC Incubation Centre)",
    "3,800+ startup ideas cultivated; 200+ alumni & incubated startups",
    "₹12 Cr+ GENESIS grant for startups — recognised by MeitY under the GENESIS scheme",
    "Library access to INFLIBNET, Shodhganga, DELNET, NDLI and Turnitin/iThenticate",
  ],
  clubs: [
    "Cultural Clubs & Technical Communities",
    "JECRC Incubation Centre (JIC)",
    "MUN Society (JMS)",
    "JU Creators",
    "IAESTE LC JECRC (Global Outreach)",
    "Socialz – Social Media Marketing Cell",
    "Maker Space",
    "Abhyudaya – Social Arm of JECRC",
    "IPR Cell",
    "NCC & NSS",
    "Student Council",
    "JECRC Center for SDGs",
  ],
  collaborations: [
    "Google Cloud", "Microsoft", "AWS", "HPE", "Adobe", "Tech Mahindra", "TCS", "IBM", "Cisco",
    "Salesforce", "Automation Anywhere", "UiPath", "EC-Council", "Xebia", "Samatrix", "Deloitte",
    "Zell Education", "Paytm", "Federation University Australia", "L&T EduTech", "Kalvium", "NASSCOM",
  ],
};

export const admission = {
  applicationFee: { general: 1000, phd: 1500 },
  steps: [
    "Apply online at the official university website. An application fee of ₹1,000 applies to all programs (₹1,500 for Ph.D.). Pay online while submitting.",
    "Note the unique application number generated after submission — it is your reference for all further communication.",
    "Attend physical counselling in person before the Admission Committee with original documents and one set of self-attested photocopies.",
    "Report to the Registration Desk, get documents verified by the Document Verification Committee, then appear before the Admission Committee.",
    "Seats are allotted in order of merit, subject to availability. Deposit the fee on the spot (DD / Credit / Debit card / Online via University ERP) to confirm the seat.",
  ],
  documents: [
    "10th Marksheet",
    "12th Marksheet",
    "Graduation Marksheet (for PG admission)",
    "Post-Graduation Marksheet (for Ph.D. admission)",
    "Migration Certificate",
    "Character Certificate from the institution last attended",
    "Caste Certificate (if seeking relaxation in eligibility)",
    "Affidavit for Gap Year(s), if applicable",
    "Copy of Aadhaar Card",
    "4 passport-size coloured photographs in formal dress",
    "Proof of APAR ID",
  ],
  relaxation:
    "Relaxation of 5% marks in minimum eligibility is given to SC / ST / Rajasthan state OBC (Non-creamy layer) / women candidates (UG & PG). For Ph.D., SC/ST/OBC (NCL) and differently-abled candidates get 5% exemption.",
  importantDates: [
    { label: "Ph.D. July Session 2026 — last date for application", value: "31 July 2026" },
    { label: "Ph.D. July Session 2026 — entrance examination", value: "09 August 2026" },
  ],
  btechPreference: "Preference is given to candidates with a valid JEE (Main) 2026 score.",
};

export const hostelFees = [
  { room: "AC Room — Single Occupancy, Three Seated", perAnnum: 172000, registration: 5000, first: 108000, second: 69000 },
  { room: "Non-AC Room — Single Occupancy, Three Seated", perAnnum: 142000, registration: 5000, first: 90000, second: 57000 },
  { room: "Non-AC Room — Single Occupancy, Four Seated", perAnnum: 127000, registration: 5000, first: 81000, second: 51000 },
];

export const hostelNotes = [
  "Hostels are allotted for only two years (four semesters) for all UG programmes.",
  "One-time non-refundable registration fee of ₹5,000 when joining the hostel for the first time.",
  "Fee is charged for 10 months; summer semester stay is charged separately.",
  "Gymnasium fee: ₹1,000 per semester (only for hostellers, if availed).",
  "GST extra as applicable. Hostel is allotted subject to seat availability.",
  "Separate hostels for boys and girls; common mess & dining facility.",
];

export const transportFee = { perAnnum: 55000, first: 33000, second: 22000 };

export const approvedOutsideHostels = [
  "Unique Green Meadows Boys Hostel (Outside, Boys)",
  "Seasons Park Girls Hostel (Outside, Girls)",
  "Shree Kishan Residency Girls Hostel (Outside, Girls)",
];

export const scholarships = [
  { type: "Merit Scholarship", criteria: "70% to 84.99% aggregate in 10+2", programs: "B.Tech + all UG programmes", amount: "15%" },
  { type: "Merit Scholarship", criteria: "85% and above aggregate in 10+2", programs: "B.Tech + all UG programmes", amount: "25%" },
  { type: "Merit Scholarship", criteria: "JEE (Main) 2026 percentile 85 to 89.99 (General)", programs: "All B.Tech programmes", amount: "15%" },
  { type: "Merit Scholarship", criteria: "JEE (Main) 2026 percentile more than 90 (General)", programs: "All B.Tech programmes", amount: "25%" },
  { type: "Merit Scholarship", criteria: "CAT 2025 percentile 40 to 59.99", programs: "MBA programmes", amount: "15%" },
  { type: "Merit Scholarship", criteria: "CAT 2025 percentile more than 60", programs: "MBA programmes", amount: "25%" },
  {
    type: "Additional Scholarship (one time)",
    criteria:
      "NCC 'A' Certificate / Alumni / Sibling / JU Employee / Single Mother / Single Girl Child / War Widow / Father from Ex-Services or Para-Military killed in action / State-level sports medalist (IOA recognised federation)",
    programs: "All programmes",
    amount: "10%",
  },
];

export const scholarshipRules = [
  "Scholarship amount is a percentage of the Tuition Fee only; other fees are payable as applicable.",
  "Only one merit scholarship (S.No. 1–4) is given — whichever is higher.",
  "To continue: minimum 8.0 CGPA (SGPA in 1st semester), 75% attendance in every course and no compartment.",
  "Scholarship is reviewed at the end of every even semester and may be withdrawn for indiscipline.",
  "Students availing financial assistance from Government or private organisations are not entitled to JU scholarship.",
  "Ph.D. programmes: scholarship not applicable.",
];

export const placements = {
  session: "2025-26",
  highlights: [
    { value: "2104+", label: "On-campus offers (till 31 Mar 2026)" },
    { value: "₹33 LPA", label: "Highest package offered" },
    { value: "₹6 LPA", label: "Average package" },
    { value: "₹10.70 LPA", label: "Avg. of top 30% offers" },
    { value: "205", label: "Recruiters" },
    { value: "856", label: "Offers from Fortune 500 companies" },
  ],
  byDiscipline: [
    { discipline: "Technical", average: "₹6.45 LPA", highest: "₹33 LPA" },
    { discipline: "Management", average: "₹7 LPA", highest: "₹11 LPA" },
    { discipline: "ME / CE / ECE", average: "₹5 LPA", highest: "₹13.8 LPA" },
    { discipline: "Skill-based programs", average: "₹4 LPA", highest: "₹6.5 LPA" },
  ],
  nonTech:
    "Non-tech schools (Law, Design, Journalism, Sciences, Humanities, Hospitality): median package ≈ ₹3.5 LPA, highest ₹8 LPA, most offers in the ₹3–4 LPA range, with 120+ hours of Campus Recruitment Training.",
  foundation: "JECRC Foundation: 12,000+ offers in the last five years; 2000+ offers every year.",
  recruiters: [
    "Hewlett Packard Enterprise", "Deloitte", "Wipro", "Capgemini", "L&T Technology Services", "Nestlé",
    "Celebal Technologies", "Dabur", "Zomato", "Blinkit", "Decathlon", "Finastra", "Tredence",
    "Jman Group", "WatchGuard", "Future First", "Jaro Education", "Hashira", "AU Small Finance Bank",
  ],
  training: [
    "200 hours of Campus Recruitment Training a month before placements — aptitude, GD, technical & HR interviews, mock drills.",
    "Training in Python & ML, Cyber Security, Digital Marketing, RPA, Data Science, Salesforce, AI, IoT and Red Hat Linux.",
    "500+ students certified in Robotic Process Automation by Automation Anywhere.",
  ],
  internship:
    "Full six-month internship programme for all final-year students across disciplines. JECRC University was ranked 5th (out of 800 participating colleges across India) for internships by Internshala.",
  note: "Placement statistics are updated annually. For the latest placement report, contact the Training & Placement Cell (tpo@jecrcu.edu.in).",
};

export const facilities = {
  library: {
    summary:
      "Two libraries with 500+ seating capacity, Wi-Fi enabled, with INFLIBNET, Shodhganga, DELNET, NDLI, SCC Online and Turnitin/iThenticate.",
    stats: [
      { value: "43,130", label: "Physical books" },
      { value: "17,277", label: "E-books" },
      { value: "24,758", label: "E-journals" },
      { value: "4,000+", label: "UG/PG projects" },
    ],
  },
  labs: [
    "Computer Science labs with latest computing & high-speed internet",
    "Mechanical — CAD/CAM, Automobile, Advanced Manufacturing, I.C. Engine",
    "Electronics & Communication — Digital, Microprocessor, Measurement",
    "Civil — Concrete, Geotechnical, Environmental, Hydraulics",
    "Power System & Electrical Machines labs",
    "Media — TV Studio, Radio Studio, Video Editing Suite, Print News Room",
    "Science — Forensic, Microbiology, Biotechnology, Physics, Chemistry",
    "Moot Court, Hotel Management training kitchens, Design & Jewellery labs",
  ],
  cafeteria:
    "18,000 sq. ft. fully air-conditioned food court with brands like Domino's, Burger Singh, Moti Mahal, Chai Garam and Divine Dosa.",
  sports:
    "A wide variety of intramural sports and a well-equipped gymnasium for students, faculty and staff.",
  medical:
    "24/7 on-campus medical assistance, regular health check-ups, and free counselling sessions through the Aditya Birla Education Trust.",
  hostel:
    "In-campus air-conditioned JU Residence, managed in partnership with Stanza Living: 3–4 single-occupancy rooms open into a common living room with internet. Separate hostels for boys and girls, professional housekeeping, healthy menu, 24×7 staff and power back-up.",
};

export interface Faq {
  q: { en: string; hi: string };
  a: { en: string; hi: string };
}

export const faqs: Faq[] = [
  {
    q: { en: "Where is JECRC University located?", hi: "JECRC University कहाँ स्थित है?" },
    a: {
      en: `JECRC University is at ${contact.address}.`,
      hi: `JECRC University, सीतापुरा एक्सटेंशन, जयपुर (राजस्थान) में स्थित है — ${contact.address}.`,
    },
  },
  {
    q: { en: "Is JECRC University UGC approved?", hi: "क्या JECRC University UGC से मान्यता प्राप्त है?" },
    a: {
      en: "Yes. It is a State Private University established under the JECRC University Act, 2012, approved by UGC u/s 2(f) and 12(B) of the UGC Act 1956.",
      hi: "हाँ। यह JECRC University Act, 2012 के तहत स्थापित राज्य निजी विश्वविद्यालय है और UGC Act 1956 की धारा 2(f) व 12(B) के तहत UGC से मान्यता प्राप्त है।",
    },
  },
  {
    q: { en: "What is the application fee?", hi: "आवेदन शुल्क कितना है?" },
    a: {
      en: "₹1,000 for all programmes and ₹1,500 for the Ph.D. programme, payable online.",
      hi: "सभी प्रोग्राम के लिए ₹1,000 और Ph.D. के लिए ₹1,500, जो ऑनलाइन जमा होता है।",
    },
  },
  {
    q: { en: "What is the B.Tech CSE fee?", hi: "B.Tech CSE की फीस कितनी है?" },
    a: {
      en: "B.Tech Computer Science & Engineering: Tuition ₹1,74,000 + Other ₹71,000 = ₹2,45,000 per annum, plus a one-time ₹10,000 admission & alumni fee.",
      hi: "B.Tech कंप्यूटर साइंस: ट्यूशन ₹1,74,000 + अन्य ₹71,000 = ₹2,45,000 प्रति वर्ष, साथ में एक बार ₹10,000 एडमिशन व एलुमनी फीस।",
    },
  },
  {
    q: { en: "What is the minimum eligibility for B.Tech?", hi: "B.Tech के लिए न्यूनतम योग्यता क्या है?" },
    a: {
      en: "10+2 with minimum 60% aggregate, with English, Physics & Mathematics and one of Chemistry / Biology / Biotechnology / Technical vocational subject. 5% relaxation for SC/ST/Rajasthan OBC-NCL/women. Preference to valid JEE (Main) 2026 score.",
      hi: "10+2 में न्यूनतम 60% अंक, अंग्रेज़ी, फिज़िक्स, गणित तथा केमिस्ट्री/बायोलॉजी/बायोटेक्नोलॉजी/टेक्निकल वोकेशनल में से एक विषय। SC/ST/राजस्थान OBC-NCL/महिलाओं को 5% छूट। JEE (Main) 2026 स्कोर वालों को प्राथमिकता।",
    },
  },
  {
    q: { en: "What scholarships are available?", hi: "कौन-कौन सी स्कॉलरशिप उपलब्ध हैं?" },
    a: {
      en: "Merit scholarships of 15% or 25% of tuition fee based on 10+2 marks, JEE (Main) percentile (B.Tech) or CAT percentile (MBA), plus an additional one-time 10% for categories like NCC 'A', alumni, sibling, single girl child and more.",
      hi: "10+2 अंक, JEE (Main) पर्सेंटाइल (B.Tech) या CAT पर्सेंटाइल (MBA) के आधार पर ट्यूशन फीस पर 15% या 25% मेरिट स्कॉलरशिप, साथ में NCC 'A', एलुमनी, सिबलिंग, सिंगल गर्ल चाइल्ड आदि के लिए एक बार 10% अतिरिक्त।",
    },
  },
  {
    q: { en: "What are the hostel fees?", hi: "हॉस्टल फीस कितनी है?" },
    a: {
      en: "2026-27: AC 3-seated ₹1,72,000; Non-AC 3-seated ₹1,42,000; Non-AC 4-seated ₹1,27,000 per annum (single occupancy rooms), plus ₹5,000 one-time registration. GST extra.",
      hi: "2026-27: AC 3-सीटेड ₹1,72,000; नॉन-AC 3-सीटेड ₹1,42,000; नॉन-AC 4-सीटेड ₹1,27,000 प्रति वर्ष (सिंगल ऑक्यूपेंसी रूम), साथ में ₹5,000 एक बार रजिस्ट्रेशन। GST अतिरिक्त।",
    },
  },
  {
    q: { en: "Is bus / transport available?", hi: "क्या बस सुविधा उपलब्ध है?" },
    a: {
      en: "Yes. Bus fee is ₹55,000 per annum (₹33,000 + ₹22,000 instalments) on identified routes, subject to seat availability. GST extra.",
      hi: "हाँ। बस फीस ₹55,000 प्रति वर्ष (₹33,000 + ₹22,000 किस्तें) है, निर्धारित रूट पर, सीट उपलब्धता के अनुसार। GST अतिरिक्त।",
    },
  },
  {
    q: { en: "What was the highest placement package?", hi: "सबसे ज़्यादा प्लेसमेंट पैकेज कितना था?" },
    a: {
      en: "For 2025-26, the highest package offered was ₹33 LPA with an average of ₹6 LPA and 2104+ on-campus offers (till 31 March 2026).",
      hi: "2025-26 में सबसे ज़्यादा पैकेज ₹33 LPA रहा, औसत ₹6 LPA, और 31 मार्च 2026 तक 2104+ ऑन-कैंपस ऑफर।",
    },
  },
  {
    q: { en: "How do I contact the admission office?", hi: "एडमिशन ऑफिस से कैसे संपर्क करें?" },
    a: {
      en: `Call the toll-free number ${contact.tollFree} or email ${contact.admissionEmail}.`,
      hi: `टोल-फ्री नंबर ${contact.tollFree} पर कॉल करें या ${contact.admissionEmail} पर ईमेल करें।`,
    },
  },
];

function feeLine(c: Course) {
  if (!c.fees) return "fee: not published";
  if (isPhdFees(c.fees)) {
    return `fee: admission & registration ${formatINR(c.fees.admissionRegistration)}, annual academic ${formatINR(c.fees.annualAcademic)}, thesis submission ${formatINR(c.fees.thesisSubmission)}`;
  }
  const f = c.fees;
  return `fee per annum: tuition ${formatINR(f.tuition)}, other ${formatINR(f.other)}, total ${formatINR(f.total)}; one-time admission & alumni ${formatINR(f.admissionAlumni)}; 1st instalment at admission ${formatINR(f.firstInstallment)}`;
}

/** Compact knowledge text injected into the AI assistant's instructions. */
export function buildKnowledgeText(): string {
  const courseLines = courses
    .map(
      (c) =>
        `- [${c.level} | ${c.category}] ${c.name} | duration: ${c.duration ?? "see official page"} | eligibility: ${(c.eligibility ?? "see official page").slice(0, 260)} | ${feeLine(c)} | page: ${c.url}`,
    )
    .join("\n");

  return [
    "## About",
    about.established,
    `Vision: ${about.vision}`,
    `Mission: ${about.mission.join(" ")}`,
    `Key facts: ${about.stats.map((s) => `${s.value} ${s.label}`).join("; ")}.`,
    `Research & innovation: ${about.research.join("; ")}.`,
    `Clubs & activities: ${about.clubs.join(", ")}.`,
    `Industry collaborations: ${about.collaborations.join(", ")}.`,
    "",
    "## Contact",
    `Address: ${contact.address}. Toll-free: ${contact.tollFree}. Admission email: ${contact.admissionEmail}. Director Admissions: ${contact.directorAdmissionEmail}. Ph.D. enquiry: ${contact.phdEnquiryPhone}, ${contact.phdEnquiryEmail}. Placement cell: ${contact.placementEmail}. Hostel: ${contact.hostelContacts.map((h) => `${h.name} ${h.phone}`).join("; ")}.`,
    "",
    "## Admission process",
    admission.steps.join(" "),
    `Documents: ${admission.documents.join(", ")}.`,
    admission.relaxation,
    admission.btechPreference,
    `Important dates: ${admission.importantDates.map((d) => `${d.label}: ${d.value}`).join("; ")}.`,
    `Application fee: ₹1,000 (all programmes), ₹1,500 (Ph.D.). Apply: ${links.apply}`,
    "",
    "## Scholarships 2026-27 (percentage of tuition fee)",
    scholarships.map((s) => `- ${s.type}: ${s.criteria} → ${s.amount} (${s.programs})`).join("\n"),
    scholarshipRules.join(" "),
    "",
    "## Hostel fee 2026-27",
    hostelFees
      .map((h) => `- ${h.room}: ${formatINR(h.perAnnum)} per annum; registration ${formatINR(h.registration)}; 1st instalment ${formatINR(h.first)}; 2nd ${formatINR(h.second)}`)
      .join("\n"),
    hostelNotes.join(" "),
    `Approved outside hostels: ${approvedOutsideHostels.join("; ")}.`,
    `Transport (bus) fee 2026-27: ${formatINR(transportFee.perAnnum)} per annum (1st ${formatINR(transportFee.first)}, 2nd ${formatINR(transportFee.second)}). GST extra.`,
    "",
    "## Campus facilities",
    `Hostel: ${facilities.hostel}`,
    `Library: ${facilities.library.summary} ${facilities.library.stats.map((s) => `${s.value} ${s.label}`).join(", ")}.`,
    `Labs: ${facilities.labs.join("; ")}.`,
    `Cafeteria: ${facilities.cafeteria}`,
    `Sports: ${facilities.sports}`,
    `Medical: ${facilities.medical}`,
    "",
    `## Placements ${placements.session}`,
    placements.highlights.map((h) => `${h.label}: ${h.value}`).join("; "),
    placements.byDiscipline.map((d) => `${d.discipline}: average ${d.average}, highest ${d.highest}`).join("; "),
    placements.nonTech,
    placements.foundation,
    `Recruiters include: ${placements.recruiters.join(", ")}.`,
    placements.training.join(" "),
    placements.internship,
    "",
    "## Programmes, eligibility and official fees (2026-27)",
    "Note: 5% relaxation in minimum eligibility for SC/ST/Rajasthan OBC-NCL/women applies to UG & PG programmes.",
    courseLines,
  ].join("\n");
}
