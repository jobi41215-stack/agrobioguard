import { AnalysisProviderError } from "./analysis-provider-error";
import type { AnalysisSource, AnalysisResult, ImageAnalysisInput, ImageAnalyzer } from "./types";

/**
 * Explicit placeholder for a future local model or server-backed cloud provider.
 * It never attempts inference or makes a network request.
 */
export class UnconfiguredImageAnalyzer implements ImageAnalyzer {
  constructor(readonly source: Exclude<AnalysisSource, "demo">) {}

  analyzeImage(_input: ImageAnalysisInput): Promise<AnalysisResult> {
    return Promise.reject(new AnalysisProviderError(
      "provider_unavailable",
      `${this.source} image analysis is not configured.`,
    ));
  }
}
