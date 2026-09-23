import type { AnalysisResult } from "./types";
import type {
  AgroWarning,
  LocationContext,
  RiskAssessment,
  WarningSeverity,
} from "./risk-types";

function severityFromRisk(
  riskLevel: RiskAssessment["level"],
): WarningSeverity {
  switch (riskLevel) {
    case "high":
      return "warning";

    case "moderate":
      return "caution";

    case "low":
      return "info";

    case "unknown":
    default:
      return "info";
  }
}

export function generateWarning(
  result: AnalysisResult,
  riskAssessment: RiskAssessment,
  locationContext?: LocationContext,
): AgroWarning {
  const severity = severityFromRisk(riskAssessment.level);

  let title = "Observation recorded";
  let message = riskAssessment.description;
  let recommendation = riskAssessment.recommendation;

  if (riskAssessment.level === "low") {
    title = "No immediate agricultural risk identified";
    message =
      `${riskAssessment.description} ` +
      "The current AgroBioGuard assessment does not identify an immediate agricultural or ecological threat.";
  } else if (riskAssessment.level === "moderate") {
    title = "Agricultural monitoring recommended";
    message = riskAssessment.description;
  } else if (riskAssessment.level === "high") {
    title = "Agricultural risk warning";
    message = riskAssessment.description;
  } else if (riskAssessment.level === "unknown") {
    title = "Assessment requires review";
    message =
      `${riskAssessment.description} ` +
      "A specific agricultural or ecological risk could not be determined by the current AgroBioGuard rule set.";
    recommendation =
      riskAssessment.recommendation ||
      "Review the identification before taking agricultural action.";
  }

  return {
    severity,
    title,
    message,
    recommendation,
    category: result.category,
    locationContext,
    isDemo: true,
  };
}