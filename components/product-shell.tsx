"use client";

import { useEffect, useState } from "react";
import { features, languages } from "@/lib/content";
import {
  getTranslations,
  type SupportedLanguage,
} from "@/lib/translations";
import { IdentificationWorkspace } from "@/components/identification-workspace";

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
  const [mode, setMode] = useState<
  "Home & Community" | "Smart Agriculture"
>("Home & Community");
  const [status, setStatus] = useState("ONLINE AI");
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
        <a className="brand" href="#top" aria-label="AgroBioGuard home"><span className="brand-mark">A</span><span>Agro<span>Bio</span>Guard</span></a>
<div className="nav-links">
  <a href="#identify">{t.navIdentification}</a>
  <a href="#features">{t.navCapabilities}</a>
  <a href="#farm">{t.navFarm}</a>
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
          <div className="hero-actions"><a className="button primary" href="#identify">{t.identifyImage} <span>→</span></a><a className="button text-button" href="#features">{t.exploreCapabilities}</a></div>
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
    onClick={() => setStatus("ONLINE AI")}
    className={status === "ONLINE AI" ? "status active" : "status"}
  >
    <i />
    {t.onlineAI}
  </button>

  <button
    onClick={() => setStatus("OFFLINE AI")}
    className={status === "OFFLINE AI" ? "status active" : "status"}
  >
    <i />
    {t.offlineAI}
  </button>

  <button
    onClick={() => {
  setStatus("SYNC PENDING");
  openSyncPanel();
}}
    className={status === "SYNC PENDING" ? "status active" : "status"}
  >
    <i />
    {t.syncPending}
      {pendingObservations > 0
  ? ` (${pendingObservations})`
  : ""}
  </button>
</div>

<span className="status-message">
  {status === "ONLINE AI"
    ? t.connectedDemo
    : status === "OFFLINE AI"
      ? t.localDemo
      : t.syncDemo}
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
</div>

  {observationList.length > 0 ? (
    <button
      type="button"
      className="button primary"
      onClick={markObservationsAsSynced}
    >
      Mark as Synced
    </button>
  ) : null}
</div>
    </div>

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
  {[
    [
      "Home & Community",
      t.homeCommunity,
      t.homeCommunityText,
      "⌂",
      t.homeDiscovery,
    ],
    [
      "Smart Agriculture",
      t.smartAgriculture,
      t.smartAgricultureText,
      "⌘",
      t.farmResilience,
    ],
  ].map(([value, name, text, icon, label]) => (
    <button
      key={value}
      className={
        mode === value ? "mode-card selected" : "mode-card"
      }
      onClick={() =>
  setMode(
    value as
      | "Home & Community"
      | "Smart Agriculture",
  )
}
      aria-pressed={mode === value}
    >
      <span className="mode-icon">{icon}</span>

      <div>
        <small>{label}</small>
        <h3>{name}</h3>
        <p>{text}</p>
      </div>

      <span className="choice">
        {mode === value ? "✓" : ""}
      </span>
    </button>
  ))}
</div>      </section>

      <IdentificationWorkspace
  language={language}
  connectivity={
    status === "ONLINE AI"
      ? "online"
      : "offline"
  }
  viewMode={mode}
/>
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

        return (
  <a
    className="feature-card"
    key={feature.title}
    href={index === 5 ? "#farm" : "#identify"}
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
      {t.comingNext} <b>→</b>
    </span>
  </a>
);
      })}
    </div>
  </div>
</section>
      <section className="farm-section wrap" id="farm">
  <div className="farm-copy">
    <p className="eyebrow">
      <i /> {t.smartAgricultureEyebrow}
    </p>

    <h2>{t.farmTitle}</h2>

    <p>{t.farmText}</p>

    <div className="farm-demo-badge">
      <span /> SMART AGRICULTURE DEMO
    </div>
  </div>

  <div className="agri-dashboard">
    <div className="dashboard-header">
      <div>
        <small>SMART AGRICULTURE</small>
        <strong>{t.farmOverview}</strong>
      </div>

      <span>{t.demoData}</span>
    </div>

    <div className="dashboard-metrics">
      <div className="dashboard-metric">
        <small>{t.fieldHealth}</small>
        <strong>
          86<span>%</span>
        </strong>
        <b className="metric-good">Healthy</b>
      </div>

      <div className="dashboard-metric">
        <small>{t.activeAlerts}</small>
        <strong>02</strong>
        <b className="metric-alert">Needs review</b>
      </div>

      <div className="dashboard-metric">
        <small>{t.lastScan}</small>
        <strong>{t.today}</strong>
        <b className="metric-good">Updated</b>
      </div>

      <div className="dashboard-metric">
        <small>Pending Sync</small>
        <strong>{pendingObservations}</strong>
        <b className="metric-pending">Offline queue</b>
      </div>
    </div>

    <div className="dashboard-content">
      <div className="dashboard-map-card">
        <div className="dashboard-card-header">
          <div>
            <small>FIELD MONITORING</small>
            <strong>Farm Risk Map</strong>
          </div>

          <span className="map-status">
            DEMO MAP
          </span>
        </div>

        <div className="dashboard-map">
          <span className="dashboard-map-pin pin-a">●</span>
          <span className="dashboard-map-pin pin-b">●</span>
          <span className="dashboard-map-pin pin-c">●</span>

          <div className="dashboard-field north">
            <b>{t.northField}</b>
            <span>Healthy</span>
          </div>

          <div className="dashboard-field river">
            <b>{t.riverPlot}</b>
            <span>Review required</span>
          </div>

          <div className="dashboard-field wildlife">
            <b>Wildlife Zone</b>
            <span>Monitor</span>
          </div>
        </div>
      </div>

      <div className="dashboard-risk-card">
        <div className="dashboard-card-header">
          <div>
            <small>RISK MONITORING</small>
            <strong>Current Zones</strong>
          </div>

          <span>3 zones</span>
        </div>

        <div className="risk-zone">
          <div>
            <b>{t.northField}</b>
            <small>Crop condition stable</small>
          </div>
          <strong className="zone-good">
            HEALTHY
          </strong>
        </div>

        <div className="risk-zone">
          <div>
            <b>{t.riverPlot}</b>
            <small>Requires field inspection</small>
          </div>
          <strong className="zone-review">
            REVIEW
          </strong>
        </div>

        <div className="risk-zone">
          <div>
            <b>Wildlife Perimeter</b>
            <small>Monitor nearby activity</small>
          </div>
          <strong className="zone-watch">
            WATCH
          </strong>
        </div>
      </div>
    </div>

    <div className="dashboard-footer">
      <div>
        <b>AgroBioGuard monitoring status</b>
        <span>
          Demo dashboard uses local and sample monitoring data.
        </span>
      </div>

      <a href="#identify" className="button secondary">
        Review Analysis <span>→</span>
      </a>
    </div>
  </div>
</section>

      <footer className="footer wrap" id="about"><a className="brand" href="#top"><span className="brand-mark">A</span><span>Agro<span>Bio</span>Guard</span></a><p>{t.footerTagline}</p><small>{t.footerPhase}</small></footer>
    </main>
  );
}
