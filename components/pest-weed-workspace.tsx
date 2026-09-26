"use client";

import {
  ChangeEvent,
  useState,
} from "react";
import {
  OfflinePestDemoAnalyzer,
} from "@/lib/analysis/offline-pest-demo-analyzer";
import { assessRisk } from "@/lib/analysis/risk-assessment-service";
import { getCurrentLocation } from "@/lib/analysis/location-service";
import type { AnalysisResult } from "@/lib/analysis/types";
import type {
  LocationContext,
  RiskAssessment,
} from "@/lib/analysis/risk-types";

export function PestWeedWorkspace() {
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<string>();
  const [result, setResult] =
    useState<AnalysisResult>();
  const [assessment, setAssessment] =
    useState<RiskAssessment>();
  const [location, setLocation] =
    useState<LocationContext>();
  const [locationLoading, setLocationLoading] =
    useState(false);
  const [locationMessage, setLocationMessage] =
    useState("");
  const [loading, setLoading] = useState(false);

  function selectImage(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setLocationMessage(
        "Please choose an image file.",
      );
      return;
    }

    if (preview?.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setImage(file);
    setPreview(
      URL.createObjectURL(file),
    );
    setResult(undefined);
    setAssessment(undefined);
    setLocationMessage("");
  }

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
        "Device location available.",
      );
    } catch {
      setLocationMessage(
        "Location could not be accessed. The demo can still continue.",
      );
    } finally {
      setLocationLoading(false);
    }
  }

  async function analyzeDemo() {
    if (!image) {
      setLocationMessage(
        "Upload a pest image before starting the demo.",
      );
      return;
    }

    setLoading(true);
    setResult(undefined);
    setAssessment(undefined);

    try {
      const analysis =
        await new OfflinePestDemoAnalyzer().analyzeImage(
          {
            image,
          },
        );

      const risk = assessRisk(
        analysis,
        location,
        "English",
      );

      setResult(analysis);
      setAssessment(risk);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      className="identification-section"
      id="pest-demo"
      aria-labelledby="pest-title"
    >
      <div className="wrap">
        <div className="section-heading">
          <p className="eyebrow">
            <i /> PEST &amp; WEED DETECTION
          </p>

          <h2 id="pest-title">
            Detect Agricultural Pests
          </h2>

          <p>
            Upload an insect or pest image to demonstrate
            AgroBioGuard&apos;s agricultural risk workflow.
          </p>
        </div>

        <div className="identification-grid">
          <div className="upload-panel">
            <div className="ai-mode-banner offline">
              <div className="ai-mode-icon">
                🐛
              </div>

              <div>
                <strong>
                  LOCAL PEST DEMO
                </strong>

                <span>
                  No cloud AI API is used for this demonstration.
                </span>
              </div>
            </div>

            <div className="view-context-banner">
              <span className="view-context-icon">
                🌾
              </span>

              <div>
                <strong>
                  Agricultural Monitoring
                </strong>

                <span>
                  Demonstrating pest identification and
                  agricultural risk assessment.
                </span>
              </div>
            </div>

            {!preview ? (
              <div className="dropzone">
                <span
                  className="upload-symbol"
                  aria-hidden="true"
                >
                  🐛
                </span>

                <h3>
                  Upload a pest image
                </h3>

                <p>
                  Use a clear insect, pest, or crop-damage
                  image for the demonstration.
                </p>

                <div className="upload-actions">
                  <label className="button primary upload-trigger">
                    Upload image

                    <input
                      type="file"
                      accept="image/*"
                      onChange={selectImage}
                    />
                  </label>

                  <label className="button outline upload-trigger">
                    Use camera

                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={selectImage}
                    />
                  </label>
                </div>
              </div>
            ) : (
              <div className="image-preview-wrap">
                <img
                  className="image-preview"
                  src={preview}
                  alt="Selected pest image"
                />

                <div className="preview-details">
                  <span>
                    <b>IMAGE READY</b>
                    <small>
                      {image?.name}
                    </small>
                  </span>

                  <button
                    className="remove-image"
                    type="button"
                    onClick={() => {
                      if (
                        preview?.startsWith("blob:")
                      ) {
                        URL.revokeObjectURL(
                          preview,
                        );
                      }

                      setImage(undefined);
                      setPreview(undefined);
                      setResult(undefined);
                      setAssessment(undefined);
                    }}
                  >
                    Remove image
                  </button>
                </div>
              </div>
            )}

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
                      Location-aware risk context
                    </strong>

                    <p>
                      Add device location to attach
                      surroundings to the demo assessment.
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

            <button
              className="button analyze-button"
              type="button"
              onClick={analyzeDemo}
              disabled={loading}
            >
              {loading
                ? "Running pest demo..."
                : "Analyze pest demo"}
              <span>→</span>
            </button>
          </div>

          <div
            className="result-panel"
            aria-live="polite"
          >
            <div className="panel-label">
              <span>ANALYSIS RESULT</span>

              <b className="demo-label">
                LOCAL PEST DEMO
              </b>
            </div>

            {!result ? (
              <div className="result-empty">
                <span aria-hidden="true">
                  🐛
                </span>

                <h3>
                  Pest analysis will appear here.
                </h3>

                <p>
                  The demonstration will show a pest
                  identification, risk level, and recommended
                  agricultural action.
                </p>
              </div>
            ) : (
              <div className="result-content">
                <div className="result-title">
                  <span className="category-pill">
                    Pest
                  </span>

                  {result.confidence !== undefined ? (
                    <span className="confidence">
                      Demo confidence{" "}
                      <b>
                        {result.confidence}%
                      </b>
                    </span>
                  ) : null}
                </div>

                <h3>
                  {result.identifiedName}
                </h3>

                <p className="result-description">
                  {result.description}
                </p>

                <dl className="result-details">
                  <div>
                    <dt>Scientific name</dt>
                    <dd>
                      {result.scientificName}
                    </dd>
                  </div>

                  <div>
                    <dt>Detection source</dt>
                    <dd>
                      {result.provider?.model}
                    </dd>
                  </div>

                  <div>
                    <dt>Location context</dt>
                    <dd>
                      {location?.latitude !== undefined &&
location?.longitude !== undefined
  ? `${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`
  : location
    ? "Location available, coordinates unavailable"
    : "Not provided"}
                    </dd>
                  </div>
                </dl>

                {assessment ? (
                  <div className="risk-assessment-card">
                    <div className="risk-assessment-header">
                      <span>
                        AGROBIOGUARD RISK ASSESSMENT
                      </span>

                      <strong>
                        {assessment.level.toUpperCase()}
                      </strong>
                    </div>

                    <h4>
                      {assessment.title}
                    </h4>

                    <p>
                      {assessment.description}
                    </p>

                    <div className="risk-recommendation">
                      <b>
                        Recommended action
                      </b>

                      <span>
                        {assessment.recommendation}
                      </span>
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}