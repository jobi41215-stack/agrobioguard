"use client";

import { useEffect, useState } from "react";
import { assessRisk } from "@/lib/analysis/risk-assessment-service";
import {
  createAgroAlert,
  type AgroAlert,
} from "@/lib/analysis/alert-service";
import { getCurrentLocation } from "@/lib/analysis/location-service";
import type { AnalysisResult } from "@/lib/analysis/types";
import type { LocationContext } from "@/lib/analysis/risk-types";

type CameraState = "monitoring" | "detected";

export function CctvDemo() {
  const [cameraState, setCameraState] =
    useState<CameraState>("monitoring");

  const [alert, setAlert] =
    useState<AgroAlert>();

  const [location, setLocation] =
    useState<LocationContext>();

  const [locationLoading, setLocationLoading] =
    useState(false);

  const [locationMessage, setLocationMessage] =
    useState("");

  const [currentTime, setCurrentTime] =
    useState("");

  useEffect(() => {
    function updateTime() {
      setCurrentTime(
        new Date().toLocaleTimeString(),
      );
    }

    updateTime();

    const timer = window.setInterval(
      updateTime,
      1000,
    );

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  async function useMyLocation() {
    setLocationLoading(true);
    setLocationMessage("");

    try {
      const currentLocation =
        await getCurrentLocation();

      setLocation({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        source: "device",
      });

      setLocationMessage(
        "Device location available for CCTV alert context.",
      );
    } catch {
      setLocationMessage(
        "Location unavailable. The CCTV demo can still run.",
      );
    } finally {
      setLocationLoading(false);
    }
  }

async function playAlertBeep() {
  if (
    typeof window === "undefined" ||
    !window.AudioContext
  ) {
    return;
  }

  const audioContext =
    new window.AudioContext();

  if (audioContext.state === "suspended") {
    await audioContext.resume();
  }

  const frequencies = [
    660,
    880,
    660,
  ];

  frequencies.forEach(
    (frequency, index) => {
      window.setTimeout(() => {
        const oscillator =
          audioContext.createOscillator();

        const gain =
          audioContext.createGain();

        oscillator.type = "square";
        oscillator.frequency.value =
          frequency;

        gain.gain.setValueAtTime(
          0.0001,
          audioContext.currentTime,
        );

        gain.gain.exponentialRampToValueAtTime(
          0.18,
          audioContext.currentTime + 0.01,
        );

        gain.gain.exponentialRampToValueAtTime(
          0.0001,
          audioContext.currentTime + 0.16,
        );

        oscillator.connect(gain);
        gain.connect(
          audioContext.destination,
        );

        oscillator.start();
        oscillator.stop(
          audioContext.currentTime + 0.17,
        );
      }, index * 220);
    },
  );

  window.setTimeout(() => {
    void audioContext.close();
  }, 1000);
}

  async function sendBrowserAlert(
    generatedAlert: AgroAlert,
  ) {
    if (
      !("Notification" in window)
    ) {
      return;
    }

    if (
      Notification.permission === "default"
    ) {
      await Notification.requestPermission();
    }

    if (
      Notification.permission === "granted"
    ) {
      new Notification(
        "AgroBioGuard CCTV Alert",
        {
          body:
            `${generatedAlert.species}: ` +
            generatedAlert.message,
        },
      );
    }
  }

  function saveObservation(
    analysis: AnalysisResult,
    riskLevel: string,
  ) {
    const saved =
      localStorage.getItem(
        "agrobioguard-observations",
      );

    let existing: Array<{
      id: string;
      species: string;
      category: string;
      risk: string;
      source: "local";
      savedAt: string;
    }> = [];

    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          existing = parsed;
        }
      } catch {
        existing = [];
      }
    }

    const observation = {
      id: `cctv-${Date.now()}`,
      species: analysis.identifiedName,
      category: analysis.category,
      risk: riskLevel,
      source: "local" as const,
      savedAt:
        new Date().toISOString(),
    };

    const updated = [
      observation,
      ...existing,
    ].slice(0, 10);
    localStorage.setItem(
  "agrobioguard-observations",
  JSON.stringify(updated),
);

const latestAlert = {
  id: observation.id,
  species: observation.species,
  category: observation.category,
  risk: observation.risk,
  source: "local" as const,
  savedAt: observation.savedAt,
};

localStorage.setItem(
  "agrobioguard-latest-alert",
  JSON.stringify(latestAlert),
);

window.dispatchEvent(
  new Event(
    "agrobioguard-observation-saved",
  ),
);
      }

  async function simulateDetection() {
    const analysis: AnalysisResult = {
      category: "Fauna",
      identifiedName: "Asian elephant",
      commonName: "Asian elephant",
      scientificName: "Elephas maximus",
      confidence: 97,
      description:
        "CCTV demonstration detection generated by AgroBioGuard.",
      riskLevel: "unknown",
      riskDescription:
        "Risk is assessed separately by AgroBioGuard.",
      recommendation:
        "Maintain a safe distance and follow appropriate wildlife-safety procedures.",
      locationContext:
        "CCTV demo detection can use device location context.",
      analysisSource: "demo",
      provider: {
        id: "agrobioguard-cctv-demo",
        model: "CCTV Simulation",
      },
      status: "complete",
    };

    const assessment = assessRisk(
      analysis,
      location,
      "English",
    );

    const generatedAlert =
      createAgroAlert(
        analysis,
        assessment,
        location,
      );

    setCameraState("detected");
    setAlert(
      generatedAlert ?? undefined,
    );

    saveObservation(
      analysis,
      assessment.level,
    );

    await playAlertBeep();

    if (generatedAlert) {
      await sendBrowserAlert(
        generatedAlert,
      );
    }
  }

  function resetDetection() {
    setCameraState("monitoring");
    setAlert(undefined);
  }

  return (
    <section className="cctv-section">
      <div className="wrap">
        <div className="section-heading">
          <p className="eyebrow">
            <i /> CAMERA &amp; CCTV MONITORING
          </p>

          <h1>
            Wildlife Camera Alert Demo
          </h1>

          <p>
            Simulate a wildlife event and watch
            AgroBioGuard connect camera detection,
            risk assessment, local storage, and
            browser alerting.
          </p>
        </div>

        <div className="cctv-grid">
          <div className="cctv-camera-card">
            <div className="cctv-camera-header">
              <div>
                <small>
                  FARM CAMERA 01
                </small>

                <strong>
                  WILDLIFE PERIMETER
                </strong>
              </div>

              <span className="cctv-live">
                ● DEMO
              </span>
            </div>

            <div
              className={
                cameraState === "detected"
                  ? "cctv-screen detected"
                  : "cctv-screen"
              }
            >
              <div className="cctv-grid-lines" />

              <div className="cctv-scan-line" />

              <div className="cctv-camera-label">
                CAMERA 01
              </div>

              <div className="cctv-time">
                {currentTime}
              </div>

              {cameraState ===
              "monitoring" ? (
                <div className="cctv-monitoring">
                  <span>◉</span>
                  <strong>
                    MONITORING
                  </strong>
                  <small>
                    Awaiting wildlife event
                  </small>
                </div>
              ) : (
                <div className="cctv-detection-overlay">
                  <span className="detection-box">
                    🐘
                  </span>

                  <strong>
                    WILDLIFE DETECTED
                  </strong>

                  <small>
                    Asian elephant
                  </small>

                  <b>
                    HIGH RISK
                  </b>
                </div>
              )}

              <div className="cctv-location-chip">
                {location
                  ? "📍 LOCATION ACTIVE"
                  : "📍 LOCATION OPTIONAL"}
              </div>
            </div>

            <div className="cctv-camera-status">
              <div>
                <span>CAMERA STATUS</span>
                <strong>
                  ONLINE DEMO
                </strong>
              </div>

              <div>
                <span>MOTION</span>
                <strong>
                  {cameraState ===
                  "detected"
                    ? "DETECTED"
                    : "CLEAR"}
                </strong>
              </div>

              <div>
                <span>AI PIPELINE</span>
                <strong>
                  SIMULATED
                </strong>
              </div>
            </div>
          </div>

          <div className="cctv-control-card">
            <span className="cctv-demo-badge">
              CCTV DEMONSTRATION
            </span>

            <h2>
              Wildlife Detection Control
            </h2>

            <p>
              This demonstration simulates a
              camera detecting an elephant near
              an agricultural area.
            </p>

            <div className="cctv-control-actions">
              {cameraState ===
              "monitoring" ? (
                <button
                  className="button primary"
                  type="button"
                  onClick={simulateDetection}
                >
                  🚨 Simulate Wildlife Detection
                </button>
              ) : (
                <button
                  className="button outline"
                  type="button"
                  onClick={resetDetection}
                >
                  Reset Camera Demo
                </button>
              )}
            </div>

            <div className="location-panel">
              <div className="location-panel-header">
                <div>
                  <span
                    className="location-icon"
                    aria-hidden="true"
                  >
                    📍
                  </span>

                  <div>
                    <strong>
                      Alert location context
                    </strong>

                    <p>
                      Add your device location
                      to include coordinates in
                      the simulated alert.
                    </p>
                  </div>
                </div>

                <button
                  className="button outline"
                  type="button"
                  onClick={useMyLocation}
                  disabled={locationLoading}
                >
                  {locationLoading
                    ? "Getting location..."
                    : location
                      ? "Update location"
                      : "Use my location"}
                </button>
              </div>

              {locationMessage ? (
                <small className="location-note">
                  {locationMessage}
                </small>
              ) : null}
            </div>

            {alert ? (
              <div className="cctv-alert-card">
                <div className="risk-card-header">
                  <span
                    className="warning-icon"
                    aria-hidden="true"
                  >
                    🚨
                  </span>

                  <div>
                    <b>
                      HIGH PRIORITY ALERT
                    </b>

                    <small>
                      BROWSER ALERT TRIGGERED
                    </small>
                  </div>
                </div>

                <h3>
                  {alert.species}
                </h3>

                <p>
                  {alert.message}
                </p>

                <div className="cctv-alert-details">
                  <span>
                    Risk
                    <strong>
                      HIGH
                    </strong>
                  </span>

                  <span>
                    Source
                    <strong>
                      CCTV Demo
                    </strong>
                  </span>

                  <span>
                    Saved
                    <strong>
                      Local observation
                    </strong>
                  </span>
                </div>

                {location?.latitude !==
                  undefined &&
                location?.longitude !==
                  undefined ? (
                  <small>
                    📍{" "}
                    {location.latitude.toFixed(
                      6,
                    )}
                    ,{" "}
                    {location.longitude.toFixed(
                      6,
                    )}
                  </small>
                ) : null}

                <div className="cctv-alert-signal">
                  🔊 Audible alert played
                  <span>•</span>
                  🔔 Browser notification requested
                </div>
<a
  href="/farm"
  className="button secondary cctv-farm-alert-button"
>
  View Farm Alert <span>→</span>
</a>
              </div>
            ) : (
              <div className="cctv-ready-card">
                <span>◉</span>

                <strong>
                  Alert system ready
                </strong>

                <small>
                  Press the detection button
                  to trigger the complete demo.
                </small>
              </div>
            )}
          </div>
        </div>

        <div className="cctv-disclaimer">
          <strong>
            Demonstration note
          </strong>

          <span>
            The camera feed and wildlife detection
            are simulated for prototype demonstration.
            No physical CCTV camera is connected.
          </span>
        </div>
      </div>
    </section>
  );
}