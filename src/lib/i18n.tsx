import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "hi";

const dict = {
  "nav.home": { en: "Home", hi: "होम" },
  "nav.about": { en: "About", hi: "परिचय" },
  "nav.courses": { en: "Courses", hi: "कोर्स" },
  "nav.admissions": { en: "Admissions", hi: "एडमिशन" },
  "nav.fees": { en: "Fees", hi: "फीस" },
  "nav.scholarships": { en: "Scholarships", hi: "स्कॉलरशिप" },
  "nav.facilities": { en: "Hostel & Campus", hi: "हॉस्टल व कैंपस" },
  "nav.placements": { en: "Placements", hi: "प्लेसमेंट" },
  "nav.contact": { en: "Contact", hi: "संपर्क" },
  "nav.faq": { en: "FAQ", hi: "सवाल-जवाब" },
  "nav.search": { en: "Search", hi: "खोजें" },
  "nav.ask": { en: "Ask AI Assistant", hi: "AI असिस्टेंट से पूछें" },
  "nav.apply": { en: "Apply Now", hi: "अभी आवेदन करें" },

  "home.eyebrow": { en: "Jaipur · Rajasthan · Since 2012", hi: "जयपुर · राजस्थान · 2012 से" },
  "home.title": { en: "Welcome to JECRC University", hi: "JECRC University में आपका स्वागत है" },
  "home.tagline": { en: "Build Your World.", hi: "अपनी दुनिया खुद बनाइए।" },
  "home.intro": {
    en: "A UGC-approved State Private University in Sitapura, Jaipur — 100+ industry-aligned programmes, a 32-acre campus and a 27-year JECRC legacy. Get instant answers about courses, fees, scholarships and admissions.",
    hi: "सीतापुरा, जयपुर स्थित UGC-मान्यता प्राप्त राज्य निजी विश्वविद्यालय — 100+ इंडस्ट्री से जुड़े प्रोग्राम, 32 एकड़ का कैंपस और JECRC की 27 वर्षों की विरासत। कोर्स, फीस, स्कॉलरशिप और एडमिशन के जवाब तुरंत पाएँ।",
  },
  "home.explore": { en: "Explore Courses", hi: "कोर्स देखें" },
  "home.quick": { en: "Find what you need", hi: "जो चाहिए, यहाँ खोजें" },
  "home.quickSub": { en: "Everything a future JECRCian asks about — in one place.", hi: "भविष्य के JECRCian जो पूछते हैं — सब एक जगह।" },
  "home.aiTitle": { en: "Meet JU Smart Assistant", hi: "मिलिए JU Smart Assistant से" },
  "home.aiSub": {
    en: "Ask in English or Hindi — about B.Tech fees, hostel rooms, scholarships or which course suits you. Answers come only from official university information.",
    hi: "अंग्रेज़ी या हिंदी में पूछें — B.Tech फीस, हॉस्टल, स्कॉलरशिप या कौन-सा कोर्स आपके लिए सही है। जवाब केवल आधिकारिक जानकारी से।",
  },
  "home.campus": { en: "Life on campus", hi: "कैंपस का जीवन" },

  "q.about": { en: "About University", hi: "विश्वविद्यालय परिचय" },
  "q.courses": { en: "Courses & Programs", hi: "कोर्स व प्रोग्राम" },
  "q.admission": { en: "Admission Process", hi: "एडमिशन प्रक्रिया" },
  "q.fees": { en: "Fee Structure", hi: "फीस संरचना" },
  "q.scholarships": { en: "Scholarships", hi: "स्कॉलरशिप" },
  "q.hostel": { en: "Hostel Facilities", hi: "हॉस्टल सुविधाएँ" },
  "q.placements": { en: "Placements", hi: "प्लेसमेंट" },
  "q.contact": { en: "Contact Us", hi: "संपर्क करें" },

  "common.official": { en: "Source: official JECRC University website (2026-27)", hi: "स्रोत: JECRC University की आधिकारिक वेबसाइट (2026-27)" },
  "common.viewOfficial": { en: "View on official site", hi: "आधिकारिक साइट पर देखें" },
  "common.duration": { en: "Duration", hi: "अवधि" },
  "common.eligibility": { en: "Eligibility", hi: "योग्यता" },
  "common.annualFee": { en: "Annual fee", hi: "वार्षिक फीस" },
  "common.searchPlaceholder": { en: "Search courses, e.g. B.Tech AI, MBA, BCA…", hi: "कोर्स खोजें, जैसे B.Tech AI, MBA, BCA…" },
  "common.all": { en: "All", hi: "सभी" },
  "common.noResults": { en: "No courses match your search.", hi: "आपकी खोज से कोई कोर्स नहीं मिला।" },
  "common.disclaimer": {
    en: "Fees may be revised in subsequent years. GST extra where applicable. For the latest and confirmed information, please contact the JECRC University admission department.",
    hi: "फीस आगामी वर्षों में बदल सकती है। जहाँ लागू हो GST अतिरिक्त। नवीनतम व पुष्ट जानकारी के लिए JECRC University एडमिशन विभाग से संपर्क करें।",
  },

  "page.about": { en: "About JECRC University", hi: "JECRC University के बारे में" },
  "page.courses": { en: "Courses & Programs", hi: "कोर्स व प्रोग्राम" },
  "page.admissions": { en: "Admission Information", hi: "एडमिशन जानकारी" },
  "page.fees": { en: "Fee Structure 2026-27", hi: "फीस संरचना 2026-27" },
  "page.scholarships": { en: "Scholarships 2026-27", hi: "स्कॉलरशिप 2026-27" },
  "page.facilities": { en: "Hostel & Campus Facilities", hi: "हॉस्टल व कैंपस सुविधाएँ" },
  "page.placements": { en: "Placements & Careers", hi: "प्लेसमेंट व करियर" },
  "page.contact": { en: "Contact Us", hi: "संपर्क करें" },
  "page.faq": { en: "Frequently Asked Questions", hi: "अक्सर पूछे जाने वाले सवाल" },

  "chat.name": { en: "JU Smart Assistant", hi: "JU Smart Assistant" },
  "chat.sub": { en: "JECRC University · AI enquiry desk", hi: "JECRC University · AI पूछताछ डेस्क" },
  "chat.welcome": {
    en: "Namaste! 👋 I'm JU Smart Assistant. Ask me anything about courses, admission, fees, scholarships, hostel, placements or campus life — in English or Hindi.",
    hi: "नमस्ते! 👋 मैं JU Smart Assistant हूँ। कोर्स, एडमिशन, फीस, स्कॉलरशिप, हॉस्टल, प्लेसमेंट या कैंपस के बारे में कुछ भी पूछिए — हिंदी या अंग्रेज़ी में।",
  },
  "chat.placeholder": { en: "Type your question… (Hindi or English)", hi: "अपना सवाल लिखें… (हिंदी या अंग्रेज़ी)" },
  "chat.thinking": { en: "Looking it up…", hi: "जानकारी खोज रहा हूँ…" },
  "chat.new": { en: "New chat", hi: "नई चैट" },
  "chat.try": { en: "Try asking", hi: "ये पूछकर देखें" },
  "chat.note": {
    en: "Answers use verified official information. Always confirm with the admission office before paying.",
    hi: "जवाब आधिकारिक जानकारी पर आधारित हैं। भुगतान से पहले एडमिशन ऑफिस से पुष्टि करें।",
  },
} as const;

export type DictKey = keyof typeof dict;

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: DictKey) => string;
  pick: <T>(v: { en: T; hi: T }) => T;
}

const LangContext = createContext<LangContextValue | null>(null);
const STORAGE_KEY = "ju-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "hi" || saved === "en") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
  }, []);

  const t = useCallback((key: DictKey) => dict[key][lang], [lang]);
  const pick = useCallback(<T,>(v: { en: T; hi: T }) => v[lang], [lang]);

  return <LangContext.Provider value={{ lang, setLang, t, pick }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
