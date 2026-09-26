"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type SavedObservation = {
  id: string;
  species: string;
  category: string;
  risk: string;
  source: "local";
  savedAt: string;
};

function getRiskClass(risk: string) {
  switch (risk.toLowerCase()) {
    case "high":
      return "risk-level-high";

    case "moderate":
      return "risk-level-moderate";

    case "low":
      return "risk-level-low";

    default:
      return "risk-level-unknown";
  }
}

function getRecommendation(
  observation: SavedObservation,
) {
  if (observation.category === "Fauna") {
    return "Maintain a safe distance and follow appropriate wildlife-safety procedures.";
  }

  if (
    observation.category === "Pest" ||
    observation.category === "Insect"
  ) {
    return "Inspect nearby crops and confirm the identification before applying pest-control measures.";
  }

  if (observation.category === "Weed") {
    return "Inspect the affected area and confirm the identification before taking control measures.";
  }

  return "Review the observation and monitor the surrounding area.";
}

export function RiskDashboard() {
  const [observations, setObservations] =
    useState<SavedObservation[]>([]);

  function loadObservations() {
    const saved = localStorage.getItem(
      "agrobioguard-observations",
    );

    if (!saved) {
      setObservations([]);
      return;
    }

    try {
      const parsed = JSON.parse(saved);

      if (Array.isArray(parsed)) {
        setObservations(parsed);
      } else {
        setObservations([]);
      }
    } catch {
      setObservations([]);
    }
  }

  useEffect(() => {
    loadObservations();

    window.addEventListener(
      "agrobioguard-observation-saved",
      loadObservations,
    );

    window.addEventListener(
      "agrobioguard-observations-synced",
      loadObservations,
    );

    window.addEventListener(
      "storage",
      loadObservations,
    );

    return () => {
      window.removeEventListener(
        "agrobioguard-observation-saved",
        loadObservations,
      );

      window.removeEventListener(
        "agrobioguard-observations-synced",
        loadObservations,
      );

      window.removeEventListener(
        "storage",
        loadObservations,
      );
    };
  }, []);

  const highRiskCount = observations.filter(
    (observation) =>
      observation.risk.toLowerCase() === "high",
  ).length;

  const moderateRiskCount =
    observations.filter(
      (observation) =>
        observation.risk.toLowerCase() ===
        "moderate",
    ).length;

  const latestObservation =
    observations[0];

  const latestHighRisk =
    observations.find(
      (observation) =>
        observation.risk.toLowerCase() ===
        "high",
    );

  return (
    <section className="risk-dashboard-section">
      <div className="wrap">
        <div className="section-heading">
          <p className="eyebrow">
            <i /> RISK ASSESSMENT
          </p>

          <h1>
            AgroBioGuard Risk Intelligence
          </h1>

          <p>
            Review recent observations, identify
            high-risk events, and understand the
            recommended next step.
          </p>
        </div>

        <div className="risk-summary-grid">
          <div className="risk-summary-card">
            <small>HIGH RISK EVENTS</small>

            <strong>
              {String(highRiskCount).padStart(
                2,
                "0",
              )}
            </strong>

            <span>
              Requires attention
            </span>
          </div>

          <div className="risk-summary-card">
            <small>MODERATE EVENTS</small>

            <strong>
              {String(
                moderateRiskCount,
              ).padStart(2, "0")}
            </strong>

            <span>
              Continue monitoring
            </span>
          </div>

          <div className="risk-summary-card">
            <small>TOTAL OBSERVATIONS</small>

            <strong>
              {String(
                observations.length,
              ).padStart(2, "0")}
            </strong>

            <span>
              Stored locally
            </span>
          </div>
        </div>

        {latestHighRisk ? (
          <div className="risk-priority-card">
            <div className="risk-priority-header">
              <div>
                <small>
                  HIGH PRIORITY EVENT
                </small>

                <strong>
                  🚨 {latestHighRisk.species}
                </strong>
              </div>

              <span>
                HIGH
              </span>
            </div>

            <p>
              A high-risk {latestHighRisk.category.toLowerCase()} observation
              is currently stored in AgroBioGuard.
            </p>

            <div className="risk-priority-details">
              <span>
                Category
                <strong>
                  {latestHighRisk.category}
                </strong>
              </span>

              <span>
                Source
                <strong>
                  Local observation
                </strong>
              </span>

              <span>
                Detected
                <strong>
                  {new Date(
                    latestHighRisk.savedAt,
                  ).toLocaleString()}
                </strong>
              </span>
            </div>

            <div className="risk-recommendation-box">
              <b>
                Recommended action
              </b>

              <span>
                {getRecommendation(
                  latestHighRisk,
                )}
              </span>
            </div>

            {latestHighRisk.category ===
            "Fauna" ? (
              <div className="risk-action-row">
                <Link
                  className="button primary"
                  href="/cctv"
                >
                  Open CCTV Monitoring →
                </Link>

                <Link
                  className="button outline"
                  href="/farm"
                >
                  View Farm Dashboard →
                </Link>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="risk-empty-card">
            <span>◌</span>

            <strong>
              No high-risk event is active
            </strong>

            <small>
              New local observations will appear
              here when they are created.
            </small>
          </div>
        )}

        <div className="risk-observation-card">
          <div className="risk-section-header">
            <div>
              <small>
                OBSERVATION HISTORY
              </small>

              <strong>
                Recent Risk Events
              </strong>
            </div>

            <span>
              {observations.length} stored
            </span>
          </div>

          {observations.length === 0 ? (
            <div className="risk-empty-history">
              No local observations available.
            </div>
          ) : (
            <div className="risk-observation-list">
              {observations
                .slice(0, 10)
                .map((observation) => (
                  <div
                    className="risk-observation-row"
                    key={observation.id}
                  >
                    <div>
                      <strong>
                        {observation.species}
                      </strong>

                      <small>
                        {observation.category} ·{" "}
                        {new Date(
                          observation.savedAt,
                        ).toLocaleString()}
                      </small>
                    </div>

                    <span
                      className={getRiskClass(
                        observation.risk,
                      )}
                    >
                      {observation.risk.toUpperCase()}
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>

        {latestObservation ? (
          <div className="risk-note">
            Latest observation:
            {" "}
            <strong>
              {latestObservation.species}
            </strong>
            {" · "}
            {latestObservation.risk.toUpperCase()}
          </div>
        ) : null}

        <div className="risk-navigation">
          <Link
            className="button outline"
            href="/community"
          >
            ← Community
          </Link>

          <Link
            className="button outline"
            href="/farm"
          >
            Smart Agriculture →
          </Link>
        </div>
      </div>
    </section>
  );
}