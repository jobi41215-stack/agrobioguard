export type IdentificationCategory = "Flora" | "Fauna" | "Pest" | "Insect" | "Weed" | "Unknown";

export type RiskLevel = "low" | "moderate" | "high" | "unknown";

export type AnalysisSource = "demo" | "local" | "cloud";

export type AnalysisStatus = "complete" | "failed";

export interface AnalysisResult {
  category: IdentificationCategory;
  identifiedName: string;
  scientificName?: string;
  confidence?: number;
  description: string;
  riskLevel: RiskLevel;
  riskDescription: string;
  recommendation: string;
  locationContext?: string;
  analysisSource: AnalysisSource;
  status: AnalysisStatus;
}

export interface ImageAnalysisInput {
  image: File;
}

export interface ImageAnalyzer {
  readonly source: AnalysisSource;
  analyzeImage(input: ImageAnalysisInput): Promise<AnalysisResult>;
}
