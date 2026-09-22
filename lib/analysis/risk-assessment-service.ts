import type { AnalysisResult } from "./types";
import type { LocationContext, RiskAssessment } from "./risk-types";

export function assessRisk(
  result: AnalysisResult,
  _location?: LocationContext,
): RiskAssessment {
  return {
    level: result.riskLevel,
    title: `${result.category} risk assessment`,
    description: result.riskDescription,
    recommendation: result.recommendation,
    category: result.category,
  };
}