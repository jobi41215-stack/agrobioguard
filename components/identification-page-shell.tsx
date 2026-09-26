"use client";
import { useState } from "react";
import {
  getTranslations,
  type SupportedLanguage,
} from "@/lib/translations";
import { useLanguage } from "@/components/language-provider";

import {
  IdentificationWorkspace,
} from "@/components/identification-workspace";
import type { IdentificationMode } from "@/lib/analysis/image-analysis-service";

type IdentificationPageShellProps = {
  title: string;
  eyebrow: string;
  description: string;
  mode: IdentificationMode;
  backHref: string;
  backLabel: string;
};

export function IdentificationPageShell({
  title,
  eyebrow,
  description,
  mode,
  backHref,
  backLabel,
}: IdentificationPageShellProps) {
  
const { language, setLanguage } =
  useLanguage();

const t = getTranslations(language);
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
  const [connectivity, setConnectivity] =
    useState<"online" | "offline">(
      "online",
    );

  
  
  return (
    <main>
      <nav
        className="nav wrap"
        aria-label="Identification navigation"
      >
        <a
          className="brand"
          href="/"
          aria-label="AgroBioGuard home"
        >
          <span className="brand-mark">
            A
          </span>

          <span>
            Agro<span>Bio</span>Guard
          </span>
        </a>

        <div className="nav-links">
          <a href="/">
  {t.navHome}
</a>

<a href="/community">
  {t.navCommunity}
</a>

<a href="/farm">
  {t.navFarming}
</a>

<a href="/risk">
  {t.navRisk}
</a>

<a href="/location">
  {t.navLocation}
</a>

<a href="/cctv">
  {t.navCctv}
</a>
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
                (label, index) => (
                  <option
                    key={languageKeys[index]}
                    value={languageKeys[index]}
                  >
                    {label}
                  </option>
                ),
              )}
            </select>
          </label>
        </div>
      </nav>

      <section
        className="section wrap"
        style={{
          paddingTop: "5rem",
          paddingBottom: "1rem",
        }}
      >
        <div className="section-heading">
          <p className="eyebrow">
            <i />
{mode === "flora"
  ? t.floraPageEyebrow
  : t.faunaPageEyebrow}
          </p>

          <h1>
  {mode === "flora"
    ? t.floraPageTitle
    : t.faunaPageTitle}
</h1>

          <p>
  {mode === "flora"
    ? t.floraPageDescription
    : t.faunaPageDescription}
</p>
        </div>

        <div className="feature-connectivity-bar">
          <span>
            {t.systemStatus}
          </span>

          <button
            type="button"
            className={
              connectivity === "online"
                ? "feature-connectivity active"
                : "feature-connectivity"
            }
            onClick={() =>
              setConnectivity("online")
            }
          >
            ● {t.onlineAI}
          </button>

          <button
            type="button"
            className={
              connectivity === "offline"
                ? "feature-connectivity active"
                : "feature-connectivity"
            }
            onClick={() =>
              setConnectivity("offline")
            }
          >
            ◌ {t.offlineAI}
          </button>

          <small>
            {connectivity === "online"
              ? t.connectedDemo
              : t.localDemo}
          </small>
        </div>
      </section>

      <IdentificationWorkspace
        language={language}
        connectivity={connectivity}
        viewMode="Home & Community"
        initialIdentificationMode={mode}
        lockedIdentificationMode={mode}
      />

      <section
        className="section wrap"
        style={{
          paddingTop: "1rem",
          paddingBottom: "5rem",
        }}
      >
        <a
          className="button outline"
          href={backHref}
        >
          ← {t.backToCommunity}
        </a>
      </section>
    </main>
  );
}