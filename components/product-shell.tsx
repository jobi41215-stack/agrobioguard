"use client";

import { useEffect, useState } from "react";
import { features, languages } from "@/lib/content";
import {
  getTranslations,
  type SupportedLanguage,
} from "@/lib/translations";


const statuses = ["ONLINE AI", "OFFLINE AI", "SYNC PENDING"];
type PendingObservation = {
  id: string;
  species: string;
  category: string;
  risk: string;
  source: "local";
  savedAt: string;
};
const languageKeys: SupportedLanguage[] = [
  "English",
  "Tamil",
  "Telugu",
  "Hindi",
  "Kannada",
  "Malayalam",
];

export function ProductShell() {
  
  
const [pendingObservations, setPendingObservations] =
  useState(0);
const [showSyncPanel, setShowSyncPanel] =
  useState(false);

const [observationList, setObservationList] =
  useState<PendingObservation[]>([]);
  const [language, setLanguage] =
  useState<SupportedLanguage>("English");
const t = getTranslations(language);
useEffect(() => {
  function updatePendingCount() {
    const saved = localStorage.getItem(
      "agrobioguard-observations",
    );

    if (!saved) {
      setPendingObservations(0);
      return;
    }

    try {
      const observations = JSON.parse(saved);

      setPendingObservations(
        Array.isArray(observations)
          ? observations.length
          : 0,
      );
    } catch {
      setPendingObservations(0);
    }
  }

  updatePendingCount();

  window.addEventListener(
    "agrobioguard-observation-saved",
    updatePendingCount,
  );

  return () => {
    window.removeEventListener(
      "agrobioguard-observation-saved",
      updatePendingCount,
    );
  };
}, []);

function openSyncPanel() {
  const saved = localStorage.getItem(
    "agrobioguard-observations",
  );

  if (!saved) {
    setObservationList([]);
    setShowSyncPanel(true);
    return;
  }

  try {
    const observations = JSON.parse(saved);

    setObservationList(
      Array.isArray(observations)
        ? observations
        : [],
    );
  } catch {
    setObservationList([]);
  }

  setShowSyncPanel(true);
}
function markObservationsAsSynced() {
  localStorage.removeItem(
    "agrobioguard-observations",
  );

  setObservationList([]);
  setPendingObservations(0);

  window.dispatchEvent(
    new Event("agrobioguard-observations-synced"),
  );

  setShowSyncPanel(false);
}


  return (
    <main>
      <nav className="nav wrap" aria-label="Main navigation">
        <a className="brand" href="/" aria-label="AgroBioGuard home"><span className="brand-mark">A</span><span>Agro<span>Bio</span>Guard</span></a>
<div className="nav-links">
  <a href="/">Home</a>
  <a href="/community">Community</a>
  <a href="/farm">Farming</a>
  <a href="#features">{t.navCapabilities}</a>
  <a href="#about">{t.navAbout}</a>
</div>
                <div className="nav-controls">
          <label className="language"><span className="sr-only">Language</span><select
  value={language}
  onChange={(e) =>
    setLanguage(e.target.value as SupportedLanguage)
  }
>
  {languages.map((label, index) => {
    const value = languageKeys[index];

    return (
      <option key={value} value={value}>
        {label}
      </option>
    );
  })}
</select></label>
          <button className="menu-button" aria-label="Open menu">☰</button>
        </div>
      </nav>

      <section className="hero wrap" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><i /> {t.heroEyebrow}</p>
          <h1>
  {t.heroTitle}
  <br />
  <em>{t.heroTitleAccent}</em>
</h1>
          <p className="intro">{t.heroIntro}</p>
          <div className="hero-actions"><a className="button primary" href="/community">
  {t.identifyImage} <span>→</span>
</a><a className="button text-button" href="#features">{t.exploreCapabilities}</a></div>
        <p className="formal-title">{t.formalTitle}</p>        </div>
        <div className="hero-art" aria-label="Illustration of a protected agricultural landscape" role="img">
          <div className="sun" /><div className="hill hill-back" /><div className="hill hill-front" /><div className="field-lines" />
          <div className="scan-card"><span className="scan-icon">⌖</span><div><small>{t.fieldStatus}</small><strong>{t.allClear}</strong></div><b>98%</b></div>
          <div className="leaf leaf-one">✦</div><div className="leaf leaf-two">✦</div>
        </div>
      </section>

      <section className="status-wrap"><div className="wrap status-bar" aria-label="AI connectivity status">
        <span className="status-label">{t.systemStatus}</span>
         
  <div className="status-options">
  <button
    onClick={() => {
      openSyncPanel();
    }}
    className="status active"
    type="button"
  >
    <i />
    {t.syncPending}
    {pendingObservations > 0
      ? ` (${pendingObservations})`
      : ""}
  </button>
</div>

<span className="status-message">
  {pendingObservations > 0
    ? `${pendingObservations} local observation${
        pendingObservations === 1
          ? ""
          : "s"
      } awaiting sync.`
    : "AgroBioGuard system ready for new observations."}
</span>
              </div></section>
{showSyncPanel ? (
  <section className="sync-panel wrap">
    <div className="sync-panel-header">
      <div>
        <span className="eyebrow">
          <i /> OFFLINE STORAGE
        </span>

        <h3>Pending Observations</h3>

        <p>
          These observations are stored locally and
          are waiting for synchronization.
        </p>
      </div>

      <div className="sync-panel-actions">
  <button
    type="button"
    className="button outline"
    onClick={() => setShowSyncPanel(false)}
  >
    Close
  </button>

  {observationList.length > 0 ? (
    <button
      type="button"
      className="button primary"
      onClick={markObservationsAsSynced}
    >
      Mark as Synced
    </button>
  ) : null}
</div>    </div>

    {observationList.length === 0 ? (
      <div className="sync-empty">
        <span>✓</span>
        <strong>No observations pending</strong>
        <small>
          Your local observation queue is empty.
        </small>
      </div>
    ) : (
      <div className="sync-observation-list">
        {observationList.map((observation) => (
          <div
            className="sync-observation"
            key={observation.id}
          >
            <div>
              <strong>{observation.species}</strong>
              <span>
                {observation.category} · Risk{" "}
                {observation.risk.toUpperCase()}
              </span>
            </div>

            <small>
              {new Date(
                observation.savedAt,
              ).toLocaleString()}
            </small>

            <b>AWAITING SYNC</b>
          </div>
        ))}
      </div>
    )}
  </section>
) : null}

      <section className="section wrap modes" id="modes">
        <div className="section-heading"><p className="eyebrow"><i /> {t.chooseView}</p><h2>{t.twoWays}</h2></div>
        <div className="mode-grid">
  <a
    className="mode-card selected"
    href="/community"
  >
    <span className="mode-icon">⌂</span>

    <div>
      <small>{t.homeDiscovery}</small>
      <h3>{t.homeCommunity}</h3>
      <p>{t.homeCommunityText}</p>
    </div>

    <span className="choice">→</span>
  </a>

  <a
    className="mode-card"
    href="/farm"
  >
    <span className="mode-icon">⌘</span>

    <div>
      <small>{t.farmResilience}</small>
      <h3>{t.smartAgriculture}</h3>
      <p>{t.smartAgricultureText}</p>
    </div>

    <span className="choice">→</span>
  </a>
</div>     </section>

          <section className="section feature-section" id="features">
  <div className="wrap">
    <div className="section-heading centered">
      <p className="eyebrow">
        <i /> {t.capabilitiesEyebrow}
      </p>

      <h2>{t.capabilitiesTitle}</h2>

      <p>{t.heroIntro}</p>
    </div>

    <div className="feature-grid">
      {[
        {
          title: t.featureFloraTitle,
          text: t.featureFloraText,
        },
        {
          title: t.featureFaunaTitle,
          text: t.featureFaunaText,
        },
        {
          title: t.featurePestTitle,
          text: t.featurePestText,
        },
        {
          title: t.featureRiskTitle,
          text: t.featureRiskText,
        },
        {
          title: t.featureLocationTitle,
          text: t.featureLocationText,
        },
        {
          title: t.featureCameraTitle,
          text: t.featureCameraText,
        },
      ].map((feature, index) => {
  const original = features[index];

  const featureLinks = [
    "/flora",
    "/fauna",
    "/pest-weed",
    "/risk",
    "/location",
    "/cctv",
  ];

  return (
    <a
      className="feature-card"
      key={feature.title}
      href={featureLinks[index]}
    aria-label={`${feature.title} workspace`}
  >
    <span
      className={`feature-icon ${original.tint}`}
    >
      {original.icon}
    </span>

    <h3>{feature.title}</h3>

    <p>{feature.text}</p>

    <span className="coming">
  Open workspace <b>→</b>
</span>
  </a>
);
      })}
    </div>
  </div>
</section>
     

      <footer className="footer wrap" id="about"><a className="brand" href="/"><span className="brand-mark">A</span><span>Agro<span>Bio</span>Guard</span></a><p>{t.footerTagline}</p><small>{t.footerPhase}</small></footer>
    </main>
  );
}
