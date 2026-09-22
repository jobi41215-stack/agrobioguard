import type { AnalysisResult } from "./types";
import type { LocationContext, RiskAssessment } from "./risk-types";

export function assessRisk(
  result: AnalysisResult,
  location?: LocationContext,
): RiskAssessment {
  if (!location) {
    return {
      level: result.riskLevel,
      title: `${result.category} risk assessment`,
      description:
        result.riskDescription ||
        "Agricultural or ecological risk could not be assessed without additional context.",
      recommendation:
        result.recommendation ||
        "Review the identification before taking agricultural action.",
      category: result.category,
    };
  }

  /*
   * LocationContext allows optional coordinates.
   * Copy them into explicitly narrowed number variables.
   */
  const latitude = location.latitude;
  const longitude = location.longitude;

  if (typeof latitude !== "number" || typeof longitude !== "number") {
    return {
      level: result.riskLevel,
      title: `${result.category} risk assessment`,
      description:
        `${result.riskDescription} ` +
        "Location context was provided, but exact coordinates were not available.",
      recommendation:
        result.recommendation ||
        "Review the identification before taking agricultural action.",
      category: result.category,
    };
  }

  const locationDescription =
    `The observation was analyzed with device location context ` +
    `(${latitude.toFixed(6)}, ${longitude.toFixed(6)}).`;

  /*
   * Preserve an existing provider risk assessment when available.
   */
  if (result.riskLevel !== "unknown") {
    return {
      level: result.riskLevel,
      title: `${result.category} risk assessment`,
      description: `${result.riskDescription} ${locationDescription}`,
      recommendation: result.recommendation,
      category: result.category,
    };
  }

  /*
   * Location is available, but the current provider did not provide
   * an agricultural/ecological risk level.
   */
  return {
    level: "unknown",
    title: `${result.category} risk assessment`,
    description:
      `${result.riskDescription} ${locationDescription} ` +
      "AgroBioGuard does not yet have a regional agricultural risk database " +
      "to determine a specific risk level from location alone.",
    recommendation:
      "Review the identification and use local agricultural guidance before taking action.",
    category: result.category,
  };
}