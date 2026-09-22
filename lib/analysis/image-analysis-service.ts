import { AnalysisProviderError } from "./analysis-provider-error";
import { DemoImageAnalyzer } from "./demo-image-analyzer";
import { PlantNetImageAnalyzer } from "./plantnet-image-analyzer";
import { UnconfiguredImageAnalyzer } from "./unconfigured-image-analyzer";
import type {
  AnalysisResult,
  AnalysisSource,
  ImageAnalysisInput,
  ImageAnalyzer,
} from "./types";

const configuredAnalyzers: Partial<Record<AnalysisSource, ImageAnalyzer>> = {
  demo: new DemoImageAnalyzer(),
  local: new UnconfiguredImageAnalyzer("local"),
  cloud: new PlantNetImageAnalyzer(),
};
// Keep Demo as the default until we explicitly test the real provider.
export const activeAnalysisSource: AnalysisSource = "cloud";

export function getImageAnalyzer(
  source: AnalysisSource = activeAnalysisSource,
): ImageAnalyzer {
  const analyzer = configuredAnalyzers[source];

  if (!analyzer) {
    throw new AnalysisProviderError(
      "unsupported_provider",
      `The ${source} image analysis provider is not registered.`,
    );
  }

  return analyzer;
}

export function analyzeImage(
  input: ImageAnalysisInput,
): Promise<AnalysisResult> {
  return getImageAnalyzer(activeAnalysisSource).analyzeImage(input);
}