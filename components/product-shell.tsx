"use client";

import { useEffect, useState } from "react";
import { features, languages } from "@/lib/content";
import {
  getTranslations,
  type SupportedLanguage,
} from "@/lib/translations";
import { IdentificationWorkspace } from "@/components/identification-workspace";

const statuses = ["ONLINE AI", "OFFLINE AI", "SYNC PENDING"];
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
  const [language, setLanguage] =
  useState<SupportedLanguage>("English");
const t = getTranslations(language);

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
    onClick={() => setStatus("SYNC PENDING")}
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
      <section className="farm-section wrap" id="farm"><div className="farm-copy"><p className="eyebrow">
  <i /> {t.smartAgricultureEyebrow}
</p>

<h2>{t.farmTitle}</h2>

<p>{t.farmText}</p><a className="button secondary" href="#top">{t.previewFarm} <span>↗</span></a></div>
        <div className="farm-preview" aria-label="Demo farm monitoring dashboard"><div className="preview-head"><span>{t.farmOverview}</span><small>{t.demoData}</small></div><div className="map-demo"><span className="map-pin pin-one">●</span><span className="map-pin pin-two">●</span><span className="field-label">{t.northField}<br /><b>{t.healthy}</b></span><span className="field-label second">{t.riverPlot}<br /><b>{t.review}</b></span></div><div className="metrics"><div><small>{t.fieldHealth}</small><strong>86<span>%</span></strong></div><div><small>{t.activeAlerts}</small><strong>02</strong></div><div><small>{t.lastScan}</small><strong>{t.today}</strong></div></div></div>
      </section>

      <footer className="footer wrap" id="about"><a className="brand" href="#top"><span className="brand-mark">A</span><span>Agro<span>Bio</span>Guard</span></a><p>{t.footerTagline}</p><small>{t.footerPhase}</small></footer>
    </main>
  );
}
