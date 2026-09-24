"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  analyzeImage as analyzeSelectedImage,
  type IdentificationMode,
} from "@/lib/analysis/image-analysis-service";
import { getSafeAnalysisErrorMessage } from "@/lib/analysis/analysis-provider-error";
import { assessRisk } from "@/lib/analysis/risk-assessment-service";
import { generateWarning } from "@/lib/analysis/warning-service";
import { getCurrentLocation } from "@/lib/analysis/location-service";

import type { AnalysisResult } from "@/lib/analysis/types";
import type {
  AgroWarning,
  LocationContext,
  RiskAssessment,
} from "@/lib/analysis/risk-types";

type AnalysisState = "empty" | "ready" | "loading" | "success" | "error";
type LocationState = "unavailable" | "loading" | "success" | "error";

type IdentificationWorkspaceProps = {
  language: string;
};

export function IdentificationWorkspace({
  language,
}: IdentificationWorkspaceProps) {
  const [identificationMode, setIdentificationMode] =
    useState<IdentificationMode>("flora");
  const [preview, setPreview] = useState<string>();
  const [fileName, setFileName] = useState("");
  const [image, setImage] = useState<File>();

  const [result, setResult] = useState<AnalysisResult>();
  const [riskAssessment, setRiskAssessment] =
    useState<RiskAssessment>();
  const [warning, setWarning] = useState<AgroWarning>();

  const [state, setState] = useState<AnalysisState>("empty");
    const [error, setError] = useState("");

  const [location, setLocation] = useState<LocationContext>();
  const [locationState, setLocationState] =
    useState<LocationState>("unavailable");
  const [locationError, setLocationError] = useState("");

  const uploadInput = useRef<HTMLInputElement>(null);
  const cameraInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  function selectFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError(
        "Choose an image file in JPG, PNG, WebP, or another supported image format.",
      );
      setState("error");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError(
        "This image is larger than 10 MB. Choose a smaller image and try again.",
      );
      setState("error");
      return;
    }

    if (preview?.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setError("");
    setPreview(URL.createObjectURL(file));
    setFileName(file.name);
    setImage(file);

    setResult(undefined);
    setRiskAssessment(undefined);
    setWarning(undefined);

    setState("ready");
  }

  function clearImage() {
    if (preview?.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setPreview(undefined);
    setFileName("");
    setImage(undefined);

    setResult(undefined);
    setRiskAssessment(undefined);
    setWarning(undefined);

    setError("");
    setState("empty");

    if (uploadInput.current) {
      uploadInput.current.value = "";
    }

    if (cameraInput.current) {
      cameraInput.current.value = "";
    }
  }

  async function useMyLocation() {
    setLocationState("loading");
    setLocationError("");

    try {
      const currentLocation = await getCurrentLocation();

      const locationContext: LocationContext = {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        source: "device",
      };

      setLocation(locationContext);
      setLocationState("success");
    } catch (locationError) {
      setLocationState("error");

      setLocationError(
        locationError instanceof Error
          ? locationError.message
          : "Unable to access your current location.",
      );
    }
  }

  async function analyzeImage() {
    if (!image) {
      setError("Add an image before starting an analysis.");
      setState("error");
      return;
    }

    setError("");
    setRiskAssessment(undefined);
    setWarning(undefined);
    setState("loading");

    try {
      // Step 1: Identify the uploaded image.
      const analysis = await analyzeSelectedImage(
  {
    image,
    language,
  },
  identificationMode,
);

      // Step 2: Assess agricultural/ecological risk.
      const assessment = assessRisk(
        analysis,
        location,
      );

      // Step 3: Generate a user-facing warning.
      const generatedWarning = generateWarning(
       analysis,
       location,
       assessment,
      );
      setResult(analysis);
      setRiskAssessment(assessment);
      setWarning(generatedWarning);
      setState("success");
    } catch (analysisError) {
      setError(
        getSafeAnalysisErrorMessage(analysisError),
      );
      setState("error");
    }
  }

  function getWarningClass(
    severity?: AgroWarning["severity"],
  ) {
    switch (severity) {
      case "critical":
        return "risk-card critical";

      case "warning":
        return "risk-card warning";

      case "caution":
        return "risk-card caution";

      default:
        return "risk-card info";
    }
  }

  const hasCoordinates =
    location?.latitude !== undefined &&
    location?.longitude !== undefined;

  return (
    <section
      className="identification-section"
      id="identify"
      aria-labelledby="identify-title"
    >
      <div className="wrap">
        <div className="section-heading identification-heading">
          <div>
            <p className="eyebrow">
              <i /> AI IDENTIFICATION
            </p>

            <h2 id="identify-title">
              Turn a field image into a clearer next step.
            </h2>
          </div>

          <p>
            Upload a close, well-lit image or use your device
            camera. AgroBioGuard identifies the observation and
            then passes the result through its agricultural
            risk-assessment workflow.
          </p>
        </div>

        <div className="identification-grid">

          {/* =========================
              IMAGE INPUT
          ========================== */}

          <div className="upload-panel">
<div className="identification-mode">
  <div className="panel-label">
    <span>IDENTIFICATION TYPE</span>
    <b>Choose what to identify</b>
  </div>

  <div className="mode-options">
    <button
      type="button"
      className={
        identificationMode === "flora"
          ? "mode-option active"
          : "mode-option"
      }
      onClick={() => setIdentificationMode("flora")}
    >
      🌿 Flora
    </button>

    <button
      type="button"
      className={
        identificationMode === "fauna"
          ? "mode-option active"
          : "mode-option"
      }
      onClick={() => setIdentificationMode("fauna")}
    >
      🐾 Fauna
    </button>
  </div>
</div>
          <div className="analysis-mode-selector">
  <div className="panel-label">
    <span>IDENTIFICATION TYPE</span>
    <b>Choose what you're analyzing</b>
  </div>

  <div className="mode-grid">
    <button
      type="button"
      className={
        identificationMode === "flora"
          ? "mode-card selected"
          : "mode-card"
      }
      onClick={() => setIdentificationMode("flora")}
    >
      <span className="mode-icon">🌿</span>
      <div>
        <small>PLANTNET AI</small>
        <h3>Flora</h3>
        <p>Plants, crops, trees, and weeds.</p>
      </div>
    </button>

    <button
      type="button"
      className={
        identificationMode === "fauna"
          ? "mode-card selected"
          : "mode-card"
      }
      onClick={() => setIdentificationMode("fauna")}
    >
      <span className="mode-icon">🐾</span>
      <div>
        <small>GEMINI AI</small>
        <h3>Fauna</h3>
        <p>Animals and wildlife observations.</p>
      </div>
    </button>
  </div>
</div>
            <div className="panel-label">
              <span>IMAGE INPUT</span>
              <b>AI-powered workflow</b>
            </div>

            {!preview ? (
              <div className="dropzone">
                <span
                  className="upload-symbol"
                  aria-hidden="true"
                >
                  ⌁
                </span>

                <h3>Add an observation image</h3>

                <p>
                  Use a focused image of one plant, animal,
                  insect, or weed for the best identification
                  result.
                </p>

                <div className="upload-actions">
                  <label className="button primary upload-trigger">
                    Upload image

                    <input
                      ref={uploadInput}
                      type="file"
                      accept="image/*"
                      onChange={selectFile}
                    />
                  </label>

                  <label className="button outline upload-trigger">
                    Use camera

                    <input
                      ref={cameraInput}
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={selectFile}
                    />
                  </label>
                </div>

                <small>
                  JPG, PNG, WebP · maximum 10 MB
                </small>
              </div>
            ) : (
              <div className="image-preview-wrap">
                <img
                  className="image-preview"
                  src={preview}
                  alt={`Selected image: ${fileName}`}
                />

                <div className="preview-details">
                  <span>
                    <b>READY FOR ANALYSIS</b>
                    <small>{fileName}</small>
                  </span>

                  <button
                    className="remove-image"
                    onClick={clearImage}
                    type="button"
                  >
                    Remove image
                  </button>
                </div>

                <div className="upload-actions compact">
                  <label className="button outline upload-trigger">
                    Change image

                    <input
                      ref={uploadInput}
                      type="file"
                      accept="image/*"
                      onChange={selectFile}
                    />
                  </label>

                  <label className="button outline upload-trigger">
                    Use camera

                    <input
                      ref={cameraInput}
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={selectFile}
                    />
                  </label>
                </div>
              </div>
            )}

            {/* =========================
                LOCATION
            ========================== */}

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
                      Location-aware assessment
                    </strong>

                    <p>
                      Allow AgroBioGuard to use your current
                      location for contextual risk assessment.
                    </p>
                  </div>
                </div>

                <button
                  className="button outline"
                  onClick={useMyLocation}
                  disabled={locationState === "loading"}
                  type="button"
                >
                  {locationState === "loading"
                    ? "Getting location..."
                    : locationState === "success"
                      ? "Update location"
                      : "Use my location"}
                </button>
              </div>

              {locationState === "success" && location ? (
                <div className="location-success">
                  <span>
                    ✓ Location available
                  </span>

                  {hasCoordinates ? (
                    <small>
                      Latitude:{" "}
                      {location.latitude!.toFixed(6)} ·
                      Longitude:{" "}
                      {location.longitude!.toFixed(6)}
                    </small>
                  ) : (
                    <small>
                      Coordinates are not available.
                    </small>
                  )}
                </div>
              ) : null}

              {locationState === "error" ? (
                <p
                  className="analysis-error"
                  role="alert"
                >
                  {locationError}
                </p>
              ) : null}

              {locationState === "unavailable" ? (
                <small className="location-note">
                  Location is optional. You can analyze an
                  image without sharing your location.
                </small>
              ) : null}
            </div>

            {/* =========================
                GENERAL ERROR
            ========================== */}

            {state === "error" && (
              <p
                className="analysis-error"
                role="alert"
              >
                {error}
              </p>
            )}

            {/* =========================
                ANALYZE BUTTON
            ========================== */}

            <button
              className="button analyze-button"
              onClick={analyzeImage}
              disabled={state === "loading"}
              type="button"
            >
              {state === "loading"
                ? "Analyzing image..."
                : "Analyze image"}

              <span>→</span>
            </button>
          </div>

          {/* =========================
              ANALYSIS RESULT
          ========================== */}

          <div
            className="result-panel"
            aria-live="polite"
          >
            <div className="panel-label">
              <span>ANALYSIS RESULT</span>

              <b className="demo-label">
                {result?.category === "Fauna" ? "GEMINI AI" : "PLANTNET AI"}
              </b>
            </div>

            {/* EMPTY / ERROR */}

            {state === "empty" ||
            state === "error" ? (
              <div className="result-empty">
                <span aria-hidden="true">
                  ◌
                </span>

                <h3>
                  Your identification will appear here.
                </h3>

                <p>
                  Results will include the identified
                  species, confidence, AgroBioGuard risk
                  context, and a practical recommendation.
                </p>
              </div>
            ) : null}

            {/* READY */}

            {state === "ready" ? (
              <div className="result-empty">
                <span aria-hidden="true">
                  ◎
                </span>

                <h3>
                  Image ready for analysis.
                </h3>

                <p>
                  Select{" "}
                  <b>Analyze image</b>{" "}
                  to identify the uploaded observation.
                </p>
              </div>
            ) : null}

            {/* LOADING */}

            {state === "loading" ? (
              <div className="result-loading">
                <span className="loader" />

                <h3>
                  Analyzing your observation
                </h3>

                <p>
                  Plant identification and
                  AgroBioGuard assessment are being
                  processed.
                </p>
              </div>
            ) : null}

            {/* SUCCESS */}

            {state === "success" ? (
              <div className="result-content">

                {/* IDENTIFICATION HEADER */}

                <div className="result-title">
                  <span className="category-pill">
                    {result?.category}
                  </span>

                  {result?.confidence !==
                  undefined ? (
                    <span className="confidence">
                      Identification confidence{" "}
                      <b>
                        {result.confidence}%
                      </b>
                    </span>
                  ) : null}
                </div>

                <h3>
                  {result?.identifiedName}

                  {result?.scientificName
                    ? ` (${result.scientificName})`
                    : ""}
                </h3>

                <p className="result-description">
                  {result?.description}
                </p>

                {/* IDENTIFICATION DETAILS */}

                <dl className="result-details">
                  <div>
                    <dt>
                      Identification source
                    </dt>

                    <dd>
                      {result?.provider?.model ??
                        "Plant identification service"}
                    </dd>
                  </div>

                  <div>
                    <dt>Common name</dt>

                    <dd>
                      {result?.commonName ??
                        result?.identifiedName ??
                        "Not available"}
                    </dd>
                  </div>

                  <div>
                    <dt>
                      Location &amp; context
                    </dt>

                    <dd>
                      {location ? (
                        <>
                          Device location available.
                          <br />

                          {hasCoordinates ? (
                            <small>
                              {location.latitude!.toFixed(
                                6,
                              )}
                              ,{" "}
                              {location.longitude!.toFixed(
                                6,
                              )}
                            </small>
                          ) : (
                            <small>
                              Coordinates are not available.
                            </small>
                          )}
                        </>
                      ) : (
                        "Location was not provided."
                      )}
                    </dd>
                  </div>
                </dl>

                {/* AGROBIOGUARD RISK ASSESSMENT */}

                {riskAssessment ? (
                  <div className="risk-assessment-card">
                    <div className="risk-assessment-header">
                      <span>
                        AGROBIOGUARD RISK ASSESSMENT
                      </span>

                      <strong>
                        {riskAssessment.level.toUpperCase()}
                      </strong>
                    </div>

                    <h4>
                      {riskAssessment.title}
                    </h4>

                    <p>
                      {riskAssessment.description}
                    </p>

                    <div className="risk-recommendation">
                      <b>
                        Recommended action
                      </b>

                      <span>
                        {riskAssessment.recommendation}
                      </span>
                    </div>
                  </div>
                ) : null}

                {/* AGRICULTURAL WARNING */}
                {warning && warning.category === "Fauna" && warning.severity === "warning" ? (
  <div className="important-alert-label">
    🚨 IMPORTANT WILDLIFE ALERT
  </div>
) : null}
                {warning ? (
                  <div
                    className={getWarningClass(
                      warning.severity,
                    )}
                  >
                    <div className="risk-card-header">
  <span
    aria-hidden="true"
    className="warning-icon"
  >
    {warning.severity === "warning" ? "🚨" : "⚠️"}
  </span>

  <div>
    <b>
      {warning.title}
    </b>

    <small>
      {warning.severity.toUpperCase()}
    </small>
  </div>
</div>
                    <p>
                      {warning.message}
                    </p>

                    <div className="warning-recommendation">
                      <b>Action</b>

                      <span>
                        {warning.recommendation}
                      </span>
                    </div>
                  </div>
                ) : null}

                {/* LOCATION CONTEXT */}

                <div className="location-result-card">
                  <div className="location-result-header">
                    <span aria-hidden="true">
                      📍
                    </span>

                    <div>
                      <b>
                        LOCATION CONTEXT
                      </b>

                      <small>
                        {location
                          ? "Device location used"
                          : "No location provided"}
                      </small>
                    </div>
                  </div>

                  {location ? (
                    <p>
                      AgroBioGuard received the device
                      coordinates for location-aware
                      processing.
                      <br />

                      {hasCoordinates ? (
                        <strong>
                          {location.latitude!.toFixed(
                            6,
                          )}
                          ,{" "}
                          {location.longitude!.toFixed(
                            6,
                          )}
                        </strong>
                      ) : (
                        <strong>
                          Coordinates are not available.
                        </strong>
                      )}
                    </p>
                  ) : (
                    <p>
                      No device location was shared.
                      The identification can still be
                      reviewed without location data.
                    </p>
                  )}
                </div>

                {/* INFORMATION NOTE */}

                <div className="analysis-note">
                  <span>ⓘ</span>

                  <p>
                    <b>
                      AI identification +
                      AgroBioGuard assessment.
                    </b>{" "}
                    Plant identification is provided
                    by the PlantNet identification
                    service. Agricultural risk
                    assessment is handled separately
                    by AgroBioGuard.
                  </p>
                </div>

              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
