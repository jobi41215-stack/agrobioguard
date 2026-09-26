"use client";

import { useEffect, useState } from "react";
import {
  getTranslations,
  type SupportedLanguage,
} from "@/lib/translations";

type FarmDashboardProps = {
  language?: SupportedLanguage;
};
type SavedObservation = {
  id: string;
  species: string;
  category: string;
  risk: string;
  source: "local";
  savedAt: string;
};

export function FarmDashboard({
  language = "English",
}: FarmDashboardProps) {
  const t = getTranslations(language);

  const [pendingObservations, setPendingObservations] =
  useState(0);

const [activeAlerts, setActiveAlerts] =
  useState(0);

const [latestWildlifeAlert, setLatestWildlifeAlert] =
  useState<SavedObservation>();

  useEffect(() => {
    function updatePendingCount() {
  const saved = localStorage.getItem(
    "agrobioguard-observations",
  );

  let observations: SavedObservation[] = [];

  if (saved) {
    try {
      const parsed = JSON.parse(saved);

      if (Array.isArray(parsed)) {
        observations = parsed;
      }
    } catch {
      observations = [];
    }
  }

  setPendingObservations(
    observations.length,
  );

  const highRisk = observations.filter(
    (observation) =>
      observation.risk.toLowerCase() === "high",
  );

  const latestSavedAlert =
    localStorage.getItem(
      "agrobioguard-latest-alert",
    );

  let latestAlert: SavedObservation | undefined;

  if (latestSavedAlert) {
    try {
      const parsed =
        JSON.parse(latestSavedAlert);

      if (
        parsed &&
        typeof parsed.species === "string"
      ) {
        latestAlert = parsed;
      }
    } catch {
      latestAlert = undefined;
    }
  }

  setLatestWildlifeAlert(
    latestAlert,
  );

  const alertCount =
    highRisk.length > 0
      ? highRisk.length
      : latestAlert?.risk.toLowerCase() ===
          "high"
        ? 1
        : 0;

  setActiveAlerts(alertCount);
}

    window.addEventListener(
      "agrobioguard-observation-saved",
      updatePendingCount,
    );

    window.addEventListener(
      "agrobioguard-observations-synced",
      updatePendingCount,
    );
window.addEventListener(
  "storage",
  updatePendingCount,
);

    return () => {
      window.removeEventListener(
        "agrobioguard-observation-saved",
        updatePendingCount,
      );
window.removeEventListener(
  "storage",
  updatePendingCount,
);

      window.removeEventListener(
        "agrobioguard-observations-synced",
        updatePendingCount,
      );
    };
  }, []);

  return (
    <section className="farm-section wrap" id="farm-dashboard">
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

<strong>
  {String(activeAlerts).padStart(2, "0")}
</strong>

<b className="metric-alert">
  {activeAlerts > 0
    ? "Needs review"
    : "No active alert"}
</b>
          </div>

          <div className="dashboard-metric">
            <small>{t.lastScan}</small>

            <strong>{t.today}</strong>

            <b className="metric-good">
              Updated
            </b>
          </div>

          <div className="dashboard-metric">
            <small>Pending Sync</small>

            <strong>
              {pendingObservations}
            </strong>

            <b className="metric-pending">
              Offline queue
            </b>
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
              <span className="dashboard-map-pin pin-a">
                ●
              </span>

              <span className="dashboard-map-pin pin-b">
                ●
              </span>

              <span className="dashboard-map-pin pin-c">
                ●
              </span>

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

  <span>
    {latestWildlifeAlert
      ? `Alert: ${latestWildlifeAlert.species}`
      : "Monitor"}
  </span>
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

                <small>
                  Crop condition stable
                </small>
              </div>

              <strong className="zone-good">
                HEALTHY
              </strong>
            </div>

            <div className="risk-zone">
              <div>
                <b>{t.riverPlot}</b>

                <small>
                  Requires field inspection
                </small>
              </div>

              <strong className="zone-review">
                REVIEW
              </strong>
            </div>
<div className="risk-zone">
  <div>
    <b>Wildlife Perimeter</b>

    <small>
      {latestWildlifeAlert
        ? `${latestWildlifeAlert.species} detected`
        : "Monitor nearby activity"}
    </small>
  </div>

  <strong
    className={
      latestWildlifeAlert
        ? "zone-alert"
        : "zone-watch"
    }
  >
    {latestWildlifeAlert
      ? "ALERT"
      : "WATCH"}
  </strong>
</div>
                      </div>
        </div>
        {latestWildlifeAlert ? (
  <div className="dashboard-live-alert">
    <div>
      <small>
        LIVE WILDLIFE ALERT
      </small>

      <strong>
        🚨 {latestWildlifeAlert.species}
      </strong>

      <span>
        High-risk local observation detected.
      </span>
    </div>

    <small>
      {new Date(
        latestWildlifeAlert.savedAt,
      ).toLocaleString()}
    </small>
  </div>
) : null}
        <div className="dashboard-footer">
          <div>
            <b>
              AgroBioGuard monitoring status
            </b>

            <span>
              Demo dashboard uses local and sample
              monitoring data.
            </span>
          </div>

          <a
            href="/farm"
            className="button secondary"
          >
            Farm Dashboard <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}