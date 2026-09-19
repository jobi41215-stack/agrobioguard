import { DemoImageAnalyzer } from "./demo-image-analyzer";
import type { AnalysisSource, ImageAnalysisInput, ImageAnalyzer, AnalysisResult } from "./types";

const configuredAnalyzers: Partial<Record<AnalysisSource, ImageAnalyzer>> = {
  demo: new DemoImageAnalyzer(),
};

const activeAnalysisSource: AnalysisSource = "demo";

export function getImageAnalyzer(source: AnalysisSource = "demo"): ImageAnalyzer {
  const analyzer = configuredAnalyzers[source];

  if (!analyzer) {
    throw new Error(`The ${source} image analysis provider is not configured.`);
  }

  return analyzer;
}

export function analyzeImage(input: ImageAnalysisInput): Promise<AnalysisResult> {
  return getImageAnalyzer(activeAnalysisSource).analyzeImage(input);
}

// Future local, cloud, or specialized analyzers only need to implement ImageAnalyzer
// and be registered here, then selected as activeAnalysisSource. The UI remains provider-agnostic.
