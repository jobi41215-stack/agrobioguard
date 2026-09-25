import type {
  AnalysisResult,
  ImageAnalysisInput,
  ImageAnalyzer,
} from "./types";
import {
  getIdentificationTranslations,
  type IdentificationLanguage,
} from "@/lib/identification-translations";

type PlantNetResult = {
  species?: {
    scientificNameWithoutAuthor?: string;
    commonNames?: string[];
  };
  score?: number;
};

type PlantNetResponse = {
  results?: PlantNetResult[];
};

export class PlantNetImageAnalyzer implements ImageAnalyzer {
  readonly source = "cloud" as const;

 async analyzeImage({
    image,
    language,
  }: ImageAnalysisInput): Promise<AnalysisResult> {
const t = getIdentificationTranslations(
  language as IdentificationLanguage,
);
    const formData = new FormData();
formData.append("image", image);

    const response = await fetch("/api/plantnet", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
  const errorData = await response.json().catch(() => null);

  console.error("PlantNet API error:", errorData);

  throw new Error(
    errorData?.details?.message ||
      errorData?.error ||
      "Pl@ntNet identification failed.",
  );
}

    const data = (await response.json()) as PlantNetResponse;
    const topResult = data.results?.[0];

    if (!topResult?.species) {
      throw new Error("No plant identification was returned.");
    }

    const scientificName =
      topResult.species.scientificNameWithoutAuthor ?? "Unknown species";

    const commonName =
      topResult.species.commonNames?.[0] ?? scientificName;
let localizedName = commonName;

if (language && language !== "English") {
  try {
    const translationResponse = await fetch(
      "/api/plant-translate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          commonName,
          scientificName,
          language,
        }),
      },
    );

    if (translationResponse.ok) {
      const translationData =
        (await translationResponse.json()) as {
          translatedName?: string;
        };

      if (translationData.translatedName?.trim()) {
        localizedName = translationData.translatedName.trim();
      }
    } else {
      console.warn(
        "Plant name translation failed; using PlantNet name.",
      );
    }
  } catch (translationError) {
    console.warn(
      "Plant name translation unavailable; using PlantNet name.",
      translationError,
    );
  }
}

    const confidence =
      typeof topResult.score === "number"
        ? Math.round(topResult.score * 100)
        : undefined;

    return {
      category: "Flora",
      identifiedName: localizedName,
      commonName: localizedName,
      scientificName,
      confidence,
      description: t.floraNote,
      riskLevel: "unknown",
      riskDescription:
        "Agricultural or ecological risk has not yet been assessed.",
      recommendation:
        "Review the identification before taking agricultural action.",
      locationContext: "Location context will be added in a later phase.",
      analysisSource: "cloud",
      provider: {
        id: "plantnet",
        model: "Pl@ntNet",
      },
      status: "complete",
    };
  }
}