"use client";

import { useState } from "react";
import { features, languages } from "@/lib/content";
import { IdentificationWorkspace } from "@/components/identification-workspace";

const statuses = ["ONLINE AI", "OFFLINE AI", "SYNC PENDING"];

export function ProductShell() {
  const [mode, setMode] = useState("Home & Community");
  const [status, setStatus] = useState("ONLINE AI");
  const [language, setLanguage] = useState("English");

  return (
    <main>
      <nav className="nav wrap" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="AgroBioGuard home"><span className="brand-mark">A</span><span>Agro<span>Bio</span>Guard</span></a>
        <div className="nav-links"><a href="#identify">AI Identification</a><a href="#features">Capabilities</a><a href="#farm">Farm view</a><a href="#about">About</a></div>
        <div className="nav-controls">
          <label className="language"><span className="sr-only">Language</span><select value={language} onChange={(e) => setLanguage(e.target.value)}>{languages.map((item) => <option key={item}>{item}</option>)}</select></label>
          <button className="menu-button" aria-label="Open menu">☰</button>
        </div>
      </nav>

      <section className="hero wrap" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><i /> BUILT FOR FARMS &amp; NATURE</p>
          <h1>See what matters.<br /><em>Protect what grows.</em></h1>
          <p className="intro">AgroBioGuard brings identification, agricultural awareness, and location context into one calm, practical experience.</p>
          <div className="hero-actions"><a className="button primary" href="#identify">Identify an image <span>→</span></a><a className="button text-button" href="#features">Explore capabilities</a></div>
          <p className="formal-title">An AI-Based Location-Aware System for Flora and Fauna Identification and Agricultural Risk Assessment</p>
        </div>
        <div className="hero-art" aria-label="Illustration of a protected agricultural landscape" role="img">
          <div className="sun" /><div className="hill hill-back" /><div className="hill hill-front" /><div className="field-lines" />
          <div className="scan-card"><span className="scan-icon">⌖</span><div><small>FIELD STATUS</small><strong>All clear today</strong></div><b>98%</b></div>
          <div className="leaf leaf-one">✦</div><div className="leaf leaf-two">✦</div>
        </div>
      </section>

      <section className="status-wrap"><div className="wrap status-bar" aria-label="AI connectivity status">
        <span className="status-label">SYSTEM STATUS</span>
        <div className="status-options">{statuses.map((item) => <button key={item} onClick={() => setStatus(item)} className={status === item ? "status active" : "status"}><i />{item}</button>)}</div>
        <span className="status-message">{status === "ONLINE AI" ? "Connected · Demo mode" : status === "OFFLINE AI" ? "Local demo knowledge ready" : "Demo observations awaiting sync"}</span>
      </div></section>

      <section className="section wrap modes" id="modes">
        <div className="section-heading"><p className="eyebrow"><i /> CHOOSE YOUR VIEW</p><h2>One system, two ways to care.</h2></div>
        <div className="mode-grid">{[
          ["Home & Community", "Explore local flora, fauna, pests, and safety information.", "⌂", "For everyday discovery"],
          ["Smart Agriculture", "Monitor crop areas and turn farm observations into action.", "⌘", "For resilient farming"],
        ].map(([name, text, icon, label]) => <button key={name} className={mode === name ? "mode-card selected" : "mode-card"} onClick={() => setMode(name)} aria-pressed={mode === name}><span className="mode-icon">{icon}</span><div><small>{label}</small><h3>{name}</h3><p>{text}</p></div><span className="choice">{mode === name ? "✓" : ""}</span></button>)}</div>
      </section>

      <IdentificationWorkspace language={language} />

      <section className="section feature-section" id="features"><div className="wrap">
        <div className="section-heading centered"><p className="eyebrow"><i /> DESIGNED TO GROW WITH YOU</p><h2>Nature intelligence, made approachable.</h2><p>Today’s polished product shell is ready for future camera, map, AI, and farm-data integrations.</p></div>
        <div className="feature-grid">{features.map((feature) => <article className="feature-card" key={feature.title}><span className={`feature-icon ${feature.tint}`}>{feature.icon}</span><h3>{feature.title}</h3><p>{feature.text}</p><span className="coming">Coming next <b>→</b></span></article>)}</div>
      </div></section>

      <section className="farm-section wrap" id="farm"><div className="farm-copy"><p className="eyebrow"><i /> SMART AGRICULTURE</p><h2>A clearer view of every field.</h2><p>Bring crop areas, observations, and emerging risks into a single focused farm workspace.</p><a className="button secondary" href="#top">Preview farm workspace <span>↗</span></a></div>
        <div className="farm-preview" aria-label="Demo farm monitoring dashboard"><div className="preview-head"><span>Farm overview</span><small>Demo data</small></div><div className="map-demo"><span className="map-pin pin-one">●</span><span className="map-pin pin-two">●</span><span className="field-label">NORTH FIELD<br /><b>Healthy</b></span><span className="field-label second">RIVER PLOT<br /><b>Review</b></span></div><div className="metrics"><div><small>FIELD HEALTH</small><strong>86<span>%</span></strong></div><div><small>ACTIVE ALERTS</small><strong>02</strong></div><div><small>LAST SCAN</small><strong>Today</strong></div></div></div>
      </section>

      <footer className="footer wrap" id="about"><a className="brand" href="#top"><span className="brand-mark">A</span><span>Agro<span>Bio</span>Guard</span></a><p>AI-Powered Protection for Farms &amp; Nature</p><small>Phase 1 product foundation · Demo interface only</small></footer>
    </main>
  );
}
