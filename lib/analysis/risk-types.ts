import type { IdentificationCategory, RiskLevel } from "./types";

export type WarningSeverity = "info" | "caution" | "warning" | "critical";

export interface LocationContext {
  latitude?: number;
  longitude?: number;
  region?: string;
  locality?: string;
  source: "user" | "device" | "demo" | "unavailable";
}

export interface RiskAssessment {
  level: RiskLevel;
  title: string;
  description: string;
  recommendation: string;
  category: IdentificationCategory;
}

export interface AgroWarning {
  severity: WarningSeverity;
  title: string;
  message: string;
  recommendation: string;
  category: IdentificationCategory;
  locationContext?: LocationContext;
  isDemo: boolean;
}