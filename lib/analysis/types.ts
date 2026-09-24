export type IdentificationCategory = "Flora" | "Fauna" | "Pest" | "Insect" | "Weed" | "Unknown";

export type RiskLevel = "low" | "moderate" | "high" | "unknown";

export type AnalysisSource = "demo" | "local" | "cloud";

export type AnalysisStatus = "complete" | "failed";

export type AnalysisErrorCode = "unsupported_image" | "image_too_large" | "invalid_input" | "provider_unavailable" | "unsupported_provider" | "network_failure" | "analysis_failed";

export interface AnalysisResult {
  category: IdentificationCategory;
  identifiedName: string;
  commonName?: string;
  scientificName?: string;
  confidence?: number;
  description: string;
  riskLevel: RiskLevel;
  riskDescription: string;
  recommendation: string;
  locationContext?: string;
  analysisSource: AnalysisSource;
  provider?: {
    id: string;
    model?: string;
  };
  status: AnalysisStatus;
}

export interface ImageAnalysisInput {
  image: File;
  language?: string;
}

export interface ImageAnalyzer {
  readonly source: AnalysisSource;
  analyzeImage(input: ImageAnalysisInput): Promise<AnalysisResult>;
}
