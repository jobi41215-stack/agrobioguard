import type { AnalysisResult } from "./types";
import type {
  AgroWarning,
  LocationContext,
  RiskAssessment,
  WarningSeverity,
} from "./risk-types";
import { getWarningTitle } from "./risk-translations";
import type { IdentificationLanguage } from "../identification-translations";

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
  language: IdentificationLanguage = "English",
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

  const title = getWarningTitle(language, riskLevel);

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