"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  analyzeImage as analyzeSelectedImage,
  type IdentificationMode,
} from "@/lib/analysis/image-analysis-service";
import {
  getIdentificationTranslations,
  type IdentificationLanguage,
} from "@/lib/identification-translations";
import { getSafeAnalysisErrorMessage } from "@/lib/analysis/analysis-provider-error";
import { assessRisk } from "@/lib/analysis/risk-assessment-service";
import { generateWarning } from "@/lib/analysis/warning-service";
import { getCurrentLocation } from "@/lib/analysis/location-service";
import {
  createAgroAlert,
  type AgroAlert,
} from "@/lib/analysis/alert-service";

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
  const t = getIdentificationTranslations(
    language as IdentificationLanguage,
  );
  const [identificationMode, setIdentificationMode] =
    useState<IdentificationMode>("flora");
  const [preview, setPreview] = useState<string>();
  const [fileName, setFileName] = useState("");
  const [image, setImage] = useState<File>();

  const [result, setResult] = useState<AnalysisResult>();
  const [riskAssessment, setRiskAssessment] =
    useState<RiskAssessment>();
  const [warning, setWarning] = useState<AgroWarning>();
const [smsPhoneNumber, setSmsPhoneNumber] = useState("");
const [smsEnabled, setSmsEnabled] = useState(false);
const [smsWildlifeEnabled, setSmsWildlifeEnabled] = useState(true);
const [smsAgricultureEnabled, setSmsAgricultureEnabled] = useState(true);
const [smsPreferencesLoaded, setSmsPreferencesLoaded] =
  useState(false);
const [agroAlert, setAgroAlert] =
  useState<AgroAlert>();
const [analyzedLanguage, setAnalyzedLanguage] =
  useState<string>();

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
  language as IdentificationLanguage,
);
      // Step 3: Generate a user-facing warning.
      const generatedWarning = generateWarning(
       analysis,
       location,
       assessment,
       language as IdentificationLanguage,
      );
      const generatedAlert = createAgroAlert(
  analysis,
  assessment,
  location,
);
     setResult(analysis);
setRiskAssessment(assessment);
setWarning(generatedWarning);
setAgroAlert(generatedAlert ?? undefined);
setAnalyzedLanguage(language);
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
  <i /> {t.sectionEyebrow}
</p>

<h2 id="identify-title">
  {t.sectionHeading}
</h2>
          </div>

          <p>{t.sectionDescription}</p>
        </div>

        <div className="identification-grid">

          {/* =========================
              IMAGE INPUT
          ========================== */}

          <div className="upload-panel">
<div className="identification-mode">
  <div className="panel-label">
    <span>{t.identificationType}</span>
    <b>{t.chooseWhatToIdentify}</b>
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
      🌿 {t.flora}
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
      🐾 {t.fauna}
    </button>
  </div>
</div>

{!preview ? (
              <div className="dropzone">
                <span
                  className="upload-symbol"
                  aria-hidden="true"
                >
                  ⌁
                </span>

                <h3>{t.addObservationImage}</h3>

                <p>{t.observationImageHint}</p>

                <div className="upload-actions">
                  <label className="button primary upload-trigger">
                    {t.uploadImage}

                    <input
                      ref={uploadInput}
                      type="file"
                      accept="image/*"
                      onChange={selectFile}
                    />
                  </label>

                  <label className="button outline upload-trigger">
                    {t.useCamera}

                    <input
                      ref={cameraInput}
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={selectFile}
                    />
                  </label>
                </div>

                <small>{t.imageFormats}</small>
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
                    <b>{t.readyForAnalysis}</b>
                    <small>{fileName}</small>
                  </span>

                  <button
                    className="remove-image"
                    onClick={clearImage}
                    type="button"
                  >
                    {t.removeImage}
                  </button>
                </div>

                <div className="upload-actions compact">
                  <label className="button outline upload-trigger">
                    {t.changeImage}

                    <input
                      ref={uploadInput}
                      type="file"
                      accept="image/*"
                      onChange={selectFile}
                    />
                  </label>

                  <label className="button outline upload-trigger">
                    {t.useCamera}

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
  {t.locationAwareAssessment}
</strong>

<p>
  {t.locationDescription}
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
  ? t.gettingLocation
  : locationState === "success"
    ? t.updateLocation
    : t.useMyLocation}
                </button>
              </div>

              {locationState === "success" && location ? (
                <div className="location-success">
                  <span>
                    ✓ {t.locationAvailable}
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
                      {t.coordinatesUnavailable}
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
                  {t.locationOptional}
                </small>
              ) : null}
            </div>
            {/* SMS ALERT PREFERENCES */}

<div className="sms-alert-panel">
  <div className="risk-card-header">
    <span
      aria-hidden="true"
      className="warning-icon"
    >
      📱
    </span>

    <div>
      <b>AGROBIOGUARD SMS ALERTS</b>
      <small>NOTIFICATION SETTINGS</small>
    </div>
  </div>

  <div className="sms-field">
    <label htmlFor="sms-phone">
      Phone number
    </label>

    <input
      id="sms-phone"
      type="tel"
      inputMode="tel"
      placeholder="+91 9876543210"
      value={smsPhoneNumber}
      onChange={(event) =>
        setSmsPhoneNumber(event.target.value)
      }
    />
  </div>

  <label className="sms-option">
    <input
      type="checkbox"
      checked={smsEnabled}
      onChange={(event) =>
        setSmsEnabled(event.target.checked)
      }
    />

    <span>
      Enable SMS alerts
    </span>
  </label>

  <label className="sms-option">
    <input
      type="checkbox"
      checked={smsWildlifeEnabled}
      onChange={(event) =>
        setSmsWildlifeEnabled(event.target.checked)
      }
      disabled={!smsEnabled}
    />

    <span>
      Wildlife danger alerts
    </span>
  </label>

  <label className="sms-option">
    <input
      type="checkbox"
      checked={smsAgricultureEnabled}
      onChange={(event) =>
        setSmsAgricultureEnabled(
          event.target.checked,
        )
      }
      disabled={!smsEnabled}
    />

    <span>
      Agricultural danger alerts
    </span>
  </label>

  <div className="sms-status">
    <b>SMS status</b>

    <span>
      {smsEnabled && smsPhoneNumber.trim()
        ? "Ready"
        : "Not configured"}
    </span>
  </div>

  <small>
    SMS alerts will use your selected AgroBioGuard language.
  </small>
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
  ? t.analyzingImage
  : t.analyzeImage}
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
              <span>{t.analysisResult}</span>

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

                <h3>{t.emptyResultHeading}</h3>

<p>{t.emptyResultText}</p>
              </div>
            ) : null}

            {/* READY */}

            {state === "ready" ? (
              <div className="result-empty">
                <span aria-hidden="true">
                  ◎
                </span>

               <h3>{t.imageReadyHeading}</h3>

<p>
  {t.imageReadyText}
</p>              </div>
            ) : null}

            {/* LOADING */}

            {state === "loading" ? (
              <div className="result-loading">
                <span className="loader" />

               <h3>{t.analyzingHeading}</h3>

<p>{t.analyzingText}</p>
              </div>
            ) : null}

            {/* SUCCESS */}

            {state === "success" ? (
              <div className="result-content">

                {/* IDENTIFICATION HEADER */}

                <div className="result-title">
                  <span className="category-pill">
  {result?.category === "Fauna" ? t.fauna : t.flora}
</span>
                  {result?.confidence !==
                  undefined ? (
                    <span className="confidence">
                      {t.identificationConfidence}{" "}
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
                      {t.identificationSource}
                    </dt>

                    <dd>
                      {result?.provider?.model ??
                        "Plant identification service"}
                    </dd>
                  </div>

                  <div>
                    <dt>{t.commonName}</dt>

                    <dd>
                      {result?.commonName ??
                        result?.identifiedName ??
                        "Not available"}
                    </dd>
                  </div>

                  <div>
                    <dt>
                      {t.locationAndContext}
                    </dt>

                    <dd>
                      {location ? (
                        <>
                          {t.deviceLocationAvailable}
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
                        t.locationNotProvided
                      )}
                    </dd>
                  </div>
                </dl>

                {/* AGROBIOGUARD RISK ASSESSMENT */}

                {riskAssessment ? (
                  <div className="risk-assessment-card">
                    <div className="risk-assessment-header">
                      <span>
                        {t.riskAssessment}
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
                        {t.recommendedAction}
                      </b>

                      <span>
                        {riskAssessment.recommendation}
                      </span>
                    </div>
                  </div>
                ) : null}

                {/* AGRICULTURAL WARNING */}
                
                
{/* AGROBIOGUARD DANGER ALERT */}
{agroAlert ? (
  <div className="risk-card warning">
    <div className="risk-card-header">
      <span
        aria-hidden="true"
        className="warning-icon"
      >
        🚨
      </span>

      <div>
        <b>HIGH PRIORITY ALERT</b>

        <small>
          {agroAlert.priority.toUpperCase()}
        </small>
      </div>
    </div>

    <h4>{agroAlert.species}</h4>

    <p>
      {agroAlert.message}
    </p>

    {agroAlert.location?.latitude !== undefined &&
    agroAlert.location?.longitude !== undefined ? (
      <p>
        📍{" "}
        {agroAlert.location.latitude.toFixed(6)},{" "}
        {agroAlert.location.longitude.toFixed(6)}
      </p>
    ) : null}
{/* SMS ALERT PREFERENCES */}
<div className="sms-alert-panel">
  <div className="risk-card-header">
    <span
      aria-hidden="true"
      className="warning-icon"
    >
      📱
    </span>

    <div>
      <b>AGROBIOGUARD SMS ALERTS</b>
      <small>NOTIFICATION SETTINGS</small>
    </div>
  </div>

  <div className="sms-field">
    <label htmlFor="sms-phone">
      Phone number
    </label>

    <input
      id="sms-phone"
      type="tel"
      inputMode="tel"
      placeholder="+91 9876543210"
      value={smsPhoneNumber}
      onChange={(event) =>
        setSmsPhoneNumber(event.target.value)
      }
    />
  </div>

  <label className="sms-option">
    <input
      type="checkbox"
      checked={smsEnabled}
      onChange={(event) =>
        setSmsEnabled(event.target.checked)
      }
    />
    <span>
      Enable SMS alerts
    </span>
  </label>

  <label className="sms-option">
    <input
      type="checkbox"
      checked={smsWildlifeEnabled}
      onChange={(event) =>
        setSmsWildlifeEnabled(event.target.checked)
      }
      disabled={!smsEnabled}
    />
    <span>
      Wildlife danger alerts
    </span>
  </label>

  <label className="sms-option">
    <input
      type="checkbox"
      checked={smsAgricultureEnabled}
      onChange={(event) =>
        setSmsAgricultureEnabled(
          event.target.checked,
        )
      }
      disabled={!smsEnabled}
    />
    <span>
      Agricultural danger alerts
    </span>
  </label>

  <div className="sms-status">
    <b>SMS status</b>

    <span>
      {smsEnabled && smsPhoneNumber.trim()
        ? "Ready"
        : "Not configured"}
    </span>
  </div>

  <small>
    SMS language will follow the language selected in
    AgroBioGuard.
  </small>
</div>
    <div className="warning-recommendation">
      <b>{t.warningAction}</b>

      <span>
        {agroAlert.recommendation}
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
                        {t.locationContextCard}
                      </b>

                      <small>
                        {location
  ? t.deviceLocationUsed
  : t.noLocationProvided}
                      </small>
                    </div>
                  </div>

                  {location ? (
                    <p>
                      {t.locationReceived}                      <br />

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
                           {t.coordinatesUnavailable}
                        </strong>
                      )}
                    </p>
                  ) : (
                    <p>
                      {t.noDeviceLocation}
                    </p>
                  )}
                </div>

                {/* INFORMATION NOTE */}

                <div className="analysis-note">
                  <span>ⓘ</span>

                  <p>
                    <b>
                      {t.analysisNoteTitle}
                    </b>{" "}
                    {result?.category === "Fauna"
  ? t.faunaNote
  : t.floraNote}
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
