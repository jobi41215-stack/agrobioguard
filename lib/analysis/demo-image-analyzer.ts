import type { AnalysisResult, ImageAnalysisInput, ImageAnalyzer } from "./types";

const DEMO_DELAY_MS = 1050;

export class DemoImageAnalyzer implements ImageAnalyzer {
  readonly source = "demo" as const;

  async analyzeImage(_input: ImageAnalysisInput): Promise<AnalysisResult> {
    await new Promise((resolve) => window.setTimeout(resolve, DEMO_DELAY_MS));

    return {
      category: "Flora",
      identifiedName: "Neem",
      scientificName: "Azadirachta indica",
      confidence: 92,
      description: "A common South Asian tree valued for shade, biodiversity support, and traditional agricultural use.",
      riskLevel: "low",
      riskDescription: "Low agricultural risk. Young plants should still be checked for pest damage or stress symptoms.",
      recommendation: "Record the observation and monitor leaf condition during routine field walks.",
      locationContext: "Not collected in demo mode. Future releases can add consent-based field context.",
      analysisSource: this.source,
      status: "complete",
    };
  }
}
