import { AnalysisProviderError } from "./analysis-provider-error";
import { DemoImageAnalyzer } from "./demo-image-analyzer";
import { GeminiFaunaImageAnalyzer } from "./gemini-fauna-analyzer";
import { PlantNetImageAnalyzer } from "./plantnet-image-analyzer";
import { UnconfiguredImageAnalyzer } from "./unconfigured-image-analyzer";

import type {
  AnalysisResult,
  AnalysisSource,
  ImageAnalysisInput,
  ImageAnalyzer,
} from "./types";

const plantNetAnalyzer = new PlantNetImageAnalyzer();
const faunaAnalyzer = new GeminiFaunaImageAnalyzer();

const configuredAnalyzers: Partial<Record<string, ImageAnalyzer>> = {
  demo: new DemoImageAnalyzer(),
  local: new UnconfiguredImageAnalyzer("local"),
  flora: plantNetAnalyzer,
  fauna: faunaAnalyzer,
};

export type IdentificationMode = "flora" | "fauna";

export const activeIdentificationMode: IdentificationMode = "flora";

export function getImageAnalyzer(
  source: AnalysisSource | IdentificationMode = activeIdentificationMode,
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
  mode: IdentificationMode = activeIdentificationMode,
): Promise<AnalysisResult> {
  return getImageAnalyzer(mode).analyzeImage(input);
}