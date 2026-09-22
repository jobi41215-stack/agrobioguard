import { DemoImageAnalyzer } from "./demo-image-analyzer";
import { AnalysisProviderError } from "./analysis-provider-error";
import { UnconfiguredImageAnalyzer } from "./unconfigured-image-analyzer";
import type { AnalysisSource, ImageAnalysisInput, ImageAnalyzer, AnalysisResult } from "./types";

const configuredAnalyzers: Partial<Record<AnalysisSource, ImageAnalyzer>> = {
  demo: new DemoImageAnalyzer(),
  local: new UnconfiguredImageAnalyzer("local"),
  cloud: new UnconfiguredImageAnalyzer("cloud"),
};

// This is the single switch for the active provider. It remains demo until a real
// local model or server-side cloud integration is configured.
export const activeAnalysisSource: AnalysisSource = "demo";

export function getImageAnalyzer(source: AnalysisSource = "demo"): ImageAnalyzer {
  const analyzer = configuredAnalyzers[source];

  if (!analyzer) {
    throw new AnalysisProviderError("unsupported_provider", `The ${source} image analysis provider is not registered.`);
  }

  return analyzer;
}

export function analyzeImage(input: ImageAnalysisInput): Promise<AnalysisResult> {
  return getImageAnalyzer(activeAnalysisSource).analyzeImage(input);
}

// Future local, cloud, or specialized analyzers only need to implement ImageAnalyzer
// and replace their explicit placeholder here, then selected as activeAnalysisSource.
// The UI remains provider-agnostic.
