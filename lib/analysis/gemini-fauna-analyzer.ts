import type {
  AnalysisResult,
  ImageAnalysisInput,
  ImageAnalyzer,
} from "./types";

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
};

export class GeminiFaunaImageAnalyzer implements ImageAnalyzer {
  readonly source = "cloud" as const;

  async analyzeImage({
    image,
  }: ImageAnalysisInput): Promise<AnalysisResult> {
    const formData = new FormData();
    formData.append("image", image);

    const response = await fetch("/api/fauna", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Fauna identification failed.");
    }

    const data = (await response.json()) as GeminiResponse;

    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!text) {
      throw new Error("No fauna identification was returned.");
    }

    let parsed: {
      identifiedName?: string;
      commonName?: string;
      scientificName?: string;
      confidence?: number;
      description?: string;
    };

    try {
      parsed = JSON.parse(text);
    } catch {
      throw new Error("Fauna AI returned an invalid identification response.");
    }

    const identifiedName =
      parsed.identifiedName ||
      parsed.commonName ||
      "Unknown animal";

    return {
      category: "Fauna",
      identifiedName,
      commonName: parsed.commonName || identifiedName,
      scientificName: parsed.scientificName,
      confidence:
        typeof parsed.confidence === "number"
          ? parsed.confidence
          : undefined,
      description:
        parsed.description ||
        "This animal identification was generated using the AgroBioGuard fauna AI service.",
      riskLevel: "unknown",
      riskDescription:
        "Agricultural or ecological risk has not yet been assessed.",
      recommendation:
        "Review the identification before taking agricultural or wildlife-related action.",
      locationContext:
        "Location context will be added by AgroBioGuard.",
      analysisSource: "cloud",
      provider: {
        id: "gemini-fauna",
        model: "Gemini",
      },
      status: "complete",
    };
  }
}