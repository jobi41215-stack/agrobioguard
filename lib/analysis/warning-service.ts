import type { AnalysisResult } from "./types";
import type {
  AgroWarning,
  LocationContext,
  WarningSeverity,
} from "./risk-types";

function severityFromRisk(riskLevel: AnalysisResult["riskLevel"]): WarningSeverity {
  switch (riskLevel) {
    case "high":
      return "warning";
    case "moderate":
      return "caution";
    case "low":
      return "info";
    default:
      return "info";
  }
}

export function generateWarning(
  result: AnalysisResult,
  locationContext?: LocationContext,
): AgroWarning {
  const severity = severityFromRisk(result.riskLevel);

  return {
    severity,
    title:
      severity === "info"
        ? "Observation recorded"
        : `${severity === "warning" ? "Risk warning" : "Risk caution"} detected`,
    message: result.riskDescription,
    recommendation: result.recommendation,
    category: result.category,
    locationContext,
    isDemo: true,
  };
}