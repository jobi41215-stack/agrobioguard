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
  locationContext?: LocationContext,
  assessment?: RiskAssessment,
): AgroWarning {
  /*
   * Use AgroBioGuard's assessment when available.
   * This keeps the warning consistent with the risk-assessment card.
   */
  const riskLevel = assessment?.level ?? result.riskLevel;
  const severity = severityFromRisk(riskLevel);

  const message =
    assessment?.description ??
    result.riskDescription ??
    "AgroBioGuard could not determine a specific agricultural or ecological risk.";

  const recommendation =
    assessment?.recommendation ??
    result.recommendation ??
    "Review the identification before taking agricultural action.";

  let title: string;

  switch (riskLevel) {
    case "high":
      title = "Agricultural risk warning";
      break;

    case "moderate":
      title = "Agricultural monitoring advised";
      break;

    case "low":
      title = "No immediate agricultural risk identified";
      break;

    case "unknown":
    default:
      title = "Risk assessment requires review";
      break;
  }

  return {
    severity,
    title,
    message,
    recommendation,
    category: assessment?.category ?? result.category,
    locationContext,
    isDemo: true,
  };
}