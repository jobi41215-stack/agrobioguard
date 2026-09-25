import type {
  AnalysisResult,
  ImageAnalysisInput,
  ImageAnalyzer,
} from "./types";
import {
  getIdentificationTranslations,
  type IdentificationLanguage,
} from "@/lib/identification-translations";

type OfflineMode = "flora" | "fauna";

export class OfflineDemoImageAnalyzer
  implements ImageAnalyzer
{
  readonly source = "local" as const;

  constructor(private readonly mode: OfflineMode) {}

  async analyzeImage({
    language,
  }: ImageAnalysisInput): Promise<AnalysisResult> {
    const t = getIdentificationTranslations(
      language as IdentificationLanguage,
    );

    if (this.mode === "fauna") {
      const faunaNames: Record<
        IdentificationLanguage,
        string
      > = {
        English: "Asian elephant",
        Tamil: "யானை",
        Telugu: "ఏనుగు",
        Hindi: "हाथी",
        Kannada: "ಆನೆ",
        Malayalam: "ആന",
      };

      return {
        category: "Fauna",
        identifiedName:
          faunaNames[
            language as IdentificationLanguage
          ] ?? faunaNames.English,
        commonName:
          faunaNames[
            language as IdentificationLanguage
          ] ?? faunaNames.English,
        scientificName: "Elephas maximus",
        confidence: 95,
        description:
          `${t.faunaNote} ` +
          "This is an AgroBioGuard offline demo result.",
        riskLevel: "unknown",
        riskDescription:
          "Risk will be assessed locally by AgroBioGuard.",
        recommendation:
          "Review the local safety alert before approaching wildlife.",
        locationContext:
          "Offline demo mode does not use cloud location services.",
        analysisSource: "local",
        provider: {
          id: "agrobioguard-offline-demo",
          model: "Local Demo",
        },
        status: "complete",
      };
    }

    const floraNames: Record<
      IdentificationLanguage,
      string
    > = {
      English: "Neem",
      Tamil: "வேம்பு",
      Telugu: "వేప",
      Hindi: "नीम",
      Kannada: "ಬೇವು",
      Malayalam: "വേപ്പ്",
    };

    return {
      category: "Flora",
      identifiedName:
        floraNames[
          language as IdentificationLanguage
        ] ?? floraNames.English,
      commonName:
        floraNames[
          language as IdentificationLanguage
        ] ?? floraNames.English,
      scientificName: "Azadirachta indica",
      confidence: 92,
      description:
        `${t.floraNote} ` +
        "This is an AgroBioGuard offline demo result.",
      riskLevel: "unknown",
      riskDescription:
        "Risk will be assessed locally by AgroBioGuard.",
      recommendation:
        "Record the observation and continue routine monitoring.",
      locationContext:
        "Offline demo mode does not use cloud location services.",
      analysisSource: "local",
      provider: {
        id: "agrobioguard-offline-demo",
        model: "Local Demo",
      },
      status: "complete",
    };
  }
}