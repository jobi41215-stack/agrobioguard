import type { AnalysisErrorCode } from "./types";

export class AnalysisProviderError extends Error {
  constructor(
    readonly code: AnalysisErrorCode,
    message: string,
  ) {
    super(message);
    this.name = "AnalysisProviderError";
  }
}

export function getSafeAnalysisErrorMessage(error: unknown): string {
  if (error instanceof AnalysisProviderError) {
    switch (error.code) {
      case "unsupported_image":
        return "This image format is not supported for analysis.";
      case "image_too_large":
        return "This image is too large to analyze.";
      case "provider_unavailable":
      case "unsupported_provider":
        return "The selected analysis service is not available yet.";
      case "network_failure":
        return "The analysis service could not be reached. Please try again later.";
      default:
        return "The image analysis could not be completed. Please try again.";
    }
  }

  return "The image analysis could not be completed. Please try again.";
}
