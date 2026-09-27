"use client";

import Link from "next/link";
import { FarmDashboard } from "@/components/farm-dashboard";
import { SiteNav } from "@/components/site-nav";
import { getTranslations, type SupportedLanguage } from "@/lib/translations";
import { useLanguage } from "@/components/language-provider";

const farmPageText: Record<
  SupportedLanguage,
  {
    cctv: string;
    pest: string;
    home: string;
  }
> = {
  English: {
    cctv: "Open CCTV Monitoring",
    pest: "Open Pest Detection",
    home: "Back to Home",
  },
  Tamil: {
    cctv: "CCTV கண்காணிப்பைத் திறக்கவும்",
    pest: "பூச்சி கண்டறிதலைத் திறக்கவும்",
    home: "முகப்புக்குத் திரும்பு",
  },
  Telugu: {
    cctv: "CCTV పర్యవేక్షణను తెరవండి",
    pest: "కీటక గుర్తింపును తెరవండి",
    home: "హోమ్‌కు తిరిగి వెళ్లండి",
  },
  Hindi: {
    cctv: "CCTV निगरानी खोलें",
    pest: "कीट पहचान खोलें",
    home: "होम पर वापस जाएँ",
  },
  Kannada: {
    cctv: "CCTV ಮೇಲ್ವಿಚಾರಣೆ ತೆರೆಯಿರಿ",
    pest: "ಕೀಟ ಪತ್ತೆ ತೆರೆಯಿರಿ",
    home: "ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ",
  },
  Malayalam: {
    cctv: "CCTV നിരീക്ഷണം തുറക്കുക",
    pest: "കീട കണ്ടെത്തൽ തുറക്കുക",
    home: "ഹോമിലേക്ക് മടങ്ങുക",
  },
};

export default function FarmPage() {
  const { language } = useLanguage();
  const t = getTranslations(language);
  const pageText = farmPageText[language];

  return (
    <main>
      <section
        className="section wrap"
        style={{ paddingTop: "7rem" }}
      >
        <SiteNav />
      </section>

      <FarmDashboard />

      <section
        className="section wrap"
        style={{
          paddingTop: "1rem",
          paddingBottom: "5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <Link
            className="button primary"
            href="/cctv"
          >
            {pageText.cctv} →
          </Link>

          <Link
            className="button outline"
            href="/pest-weed"
          >
            {pageText.pest} →
          </Link>

          <Link
            className="button outline"
            href="/"
          >
            ← {pageText.home}
          </Link>
        </div>
      </section>
    </main>
  );
}