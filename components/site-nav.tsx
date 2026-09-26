"use client";

import Link from "next/link";
import {
  getTranslations,
} from "@/lib/translations";
import { useLanguage } from "@/components/language-provider";
import type { SupportedLanguage } from "@/lib/translations";

const languageKeys: SupportedLanguage[] = [
  "English",
  "Tamil",
  "Telugu",
  "Hindi",
  "Kannada",
  "Malayalam",
];

const languageLabels = [
  "English",
  "தமிழ்",
  "తెలుగు",
  "हिन्दी",
  "ಕನ್ನಡ",
  "മലയാളം",
];

export function SiteNav() {
  const { language, setLanguage } =
    useLanguage();

  const t = getTranslations(language);

  return (
    <nav
      className="nav wrap"
      aria-label={t.mainNavigation}
    >
      <Link
        className="brand"
        href="/"
        aria-label={t.navHome}
      >
        <span className="brand-mark">
          A
        </span>

        <span>
          Agro<span>Bio</span>Guard
        </span>
      </Link>

      <div className="nav-links">
        <Link href="/">
          {t.navHome}
        </Link>

        <Link href="/community">
          {t.navCommunity}
        </Link>

        <Link href="/farm">
          {t.navFarming}
        </Link>

        <Link href="/flora">
          {t.navFlora}
        </Link>

        <Link href="/fauna">
          {t.navFauna}
        </Link>

        <Link href="/pest-weed">
          {t.navPestWeed}
        </Link>

        <Link href="/risk">
          {t.navRisk}
        </Link>

        <Link href="/location">
          {t.navLocation}
        </Link>

        <Link href="/cctv">
          {t.navCctv}
        </Link>
      </div>

      <div className="nav-controls">
        <label className="language">
          <span className="sr-only">
            {t.language}
          </span>

          <select
            value={language}
            onChange={(event) =>
              setLanguage(
                event.target.value as SupportedLanguage,
              )
            }
          >
            {languageLabels.map(
              (label, index) => {
                const value =
                  languageKeys[index];

                return (
                  <option
                    key={value}
                    value={value}
                  >
                    {label}
                  </option>
                );
              },
            )}
          </select>
        </label>
      </div>
    </nav>
  );
}