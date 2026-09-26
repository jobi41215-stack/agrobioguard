"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCurrentLocation } from "@/lib/analysis/location-service";
import type { LocationContext } from "@/lib/analysis/risk-types";

type SavedObservation = {
  id: string;
  species: string;
  category: string;
  risk: string;
  source: "local";
  savedAt: string;
};

export function LocationDashboard() {
  const [location, setLocation] =
    useState<LocationContext>();

  const [locationLoading, setLocationLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [observations, setObservations] =
    useState<SavedObservation[]>([]);

  async function useMyLocation() {
    setLocationLoading(true);
    setMessage("");

    try {
      const currentLocation =
        await getCurrentLocation();

      const locationContext: LocationContext = {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        source: "device",
      };

      setLocation(locationContext);
      setMessage(
        "Your device location is available for AgroBioGuard context.",
      );
    } catch {
      setMessage(
        "Location could not be accessed. You can still review saved observations.",
      );
    } finally {
      setLocationLoading(false);
    }
  }

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

      setObservations(
        Array.isArray(parsed)
          ? parsed
          : [],
      );
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

  function refreshLocationData() {
    loadObservations();
    void useMyLocation();
  }

  return (
    <section className="location-dashboard-section">
      <div className="wrap">
        <div className="section-heading">
          <p className="eyebrow">
            <i /> LOCATION INTELLIGENCE
          </p>

          <h1>
            Understand Where the Observation Happened
          </h1>

          <p>
            AgroBioGuard connects observations with
            device location context to support
            agricultural and ecological assessment.
          </p>
        </div>

        <div className="location-main-grid">
          <div className="location-main-card">
            <div className="location-card-top">
              <div>
                <small>
                  DEVICE LOCATION
                </small>

                <strong>
                  Location Status
                </strong>
              </div>

              <span
                className={
                  location
                    ? "location-status active"
                    : "location-status"
                }
              >
                {location
                  ? "AVAILABLE"
                  : "NOT CONNECTED"}
              </span>
            </div>

            {!location ? (
              <div className="location-empty-state">
                <span>📍</span>

                <strong>
                  No location has been shared yet
                </strong>

                <small>
                  Use your device location to attach
                  coordinates to AgroBioGuard observations.
                </small>

                <button
                  className="button primary"
                  type="button"
                  onClick={refreshLocationData}
                  disabled={locationLoading}
                >
                  {locationLoading
                    ? "Getting location..."
                    : "Use My Location →"}
                </button>
              </div>
            ) : (
              <div className="location-coordinate-card">
                <div>
                  <small>
                    LATITUDE
                  </small>

                  <strong>
                    {location.latitude !==
                      undefined
                      ? location.latitude.toFixed(
                          6,
                        )
                      : "Unavailable"}
                  </strong>
                </div>

                <div>
                  <small>
                    LONGITUDE
                  </small>

                  <strong>
                    {location.longitude !==
                      undefined
                      ? location.longitude.toFixed(
                          6,
                        )
                      : "Unavailable"}
                  </strong>
                </div>
              </div>
            )}

            {message ? (
              <div className="location-page-message">
                {message}
              </div>
            ) : null}

            {location ? (
              <div className="location-actions">
                <button
                  className="button outline"
                  type="button"
                  onClick={refreshLocationData}
                  disabled={locationLoading}
                >
                  {locationLoading
                    ? "Updating..."
                    : "Update Location"}
                </button>

                <a
                  className="button secondary"
                  href={`https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open in Maps →
                </a>
              </div>
            ) : null}
          </div>

          <div className="location-context-card">
            <small>
              HOW IT WORKS
            </small>

            <h2>
              Location-Aware Risk Context
            </h2>

            <div className="location-step-list">
              <div>
                <span>01</span>

                <div>
                  <strong>
                    Capture location
                  </strong>

                  <small>
                    Read device coordinates after user permission.
                  </small>
                </div>
              </div>

              <div>
                <span>02</span>

                <div>
                  <strong>
                    Connect observation
                  </strong>

                  <small>
                    Use location alongside flora, fauna, pest,
                    or wildlife observations.
                  </small>
                </div>
              </div>

              <div>
                <span>03</span>

                <div>
                  <strong>
                    Assess risk
                  </strong>

                  <small>
                    AgroBioGuard uses the available context
                    in its risk-assessment workflow.
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="location-observation-card">
          <div className="location-section-header">
            <div>
              <small>
                LOCAL OBSERVATIONS
              </small>

              <strong>
                Recent Location-Ready Events
              </strong>
            </div>

            <button
              type="button"
              className="button outline"
              onClick={loadObservations}
            >
              Refresh
            </button>
          </div>

          {observations.length === 0 ? (
            <div className="location-no-observations">
              <span>◌</span>

              <strong>
                No saved observations found
              </strong>

              <small>
                CCTV, offline, or other local observation
                events will appear here.
              </small>
            </div>
          ) : (
            <div className="location-observation-list">
              {observations
                .slice(0, 10)
                .map((observation) => (
                  <div
                    key={observation.id}
                    className="location-observation-row"
                  >
                    <div>
                      <strong>
                        {observation.species}
                      </strong>

                      <small>
                        {observation.category} ·{" "}
                        Risk{" "}
                        {observation.risk.toUpperCase()}
                      </small>
                    </div>

                    <span>
                      {new Date(
                        observation.savedAt,
                      ).toLocaleString()}
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>

        <div className="location-navigation">
          <Link
            className="button outline"
            href="/community"
          >
            ← Community
          </Link>

          <Link
            className="button outline"
            href="/risk"
          >
            Risk Assessment →
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
