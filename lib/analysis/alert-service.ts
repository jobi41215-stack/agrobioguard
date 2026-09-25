import type { AnalysisResult } from "./types";
import type {
  LocationContext,
  RiskAssessment,
} from "./risk-types";

export type AlertPriority = "high" | "moderate" | "low";

export type AgroAlert = {
  id: string;
  priority: AlertPriority;
  category: AnalysisResult["category"];
  species: string;
  scientificName?: string;
  title: string;
  message: string;
  recommendation: string;
  location?: LocationContext;
  detectedAt: string;
  notificationRequired: boolean;
};

function getAlertFingerprint(
  result: AnalysisResult,
  location?: LocationContext,
): string {
  const species = (
    result.scientificName ??
    result.identifiedName
  )
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");

  const locationKey =
    location?.latitude !== undefined &&
    location?.longitude !== undefined
      ? `${location.latitude.toFixed(3)}-${location.longitude.toFixed(3)}`
      : "no-location";

  const timeBucket = Math.floor(
    Date.now() / (10 * 60 * 1000),
  );

  return `${species}-${locationKey}-${timeBucket}`;
}
export function createAgroAlert(
  result: AnalysisResult,
  assessment: RiskAssessment,
  location?: LocationContext,
): AgroAlert | null {
  if (assessment.level !== "high") {
    return null;
  }

  const alert: AgroAlert = {
    id: `alert-${getAlertFingerprint(result, location)}`,
    priority: "high",
    category: result.category,
    species: result.identifiedName,
    scientificName: result.scientificName,
    title: assessment.title,
    message: assessment.description,
    recommendation: assessment.recommendation,
    location,
    detectedAt: new Date().toISOString(),
    notificationRequired: true,
  };

  return alert;
}