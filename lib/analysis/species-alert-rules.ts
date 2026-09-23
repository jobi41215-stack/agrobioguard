import type { IdentificationCategory, RiskLevel } from "./types";

export interface SpeciesAlertRule {
  keywords: string[];
  category: IdentificationCategory;
  riskLevel: RiskLevel;
  title: string;
  message: string;
  recommendation: string;
}

export const speciesAlertRules: SpeciesAlertRule[] = [
  {
    keywords: ["elephant", "asian elephant", "elephas maximus"],
    category: "Fauna",
    riskLevel: "high",
    title: "Wildlife alert",
    message:
      "An elephant has been identified. Elephants may enter agricultural areas and create safety and crop-damage risks.",
    recommendation:
      "Keep a safe distance and contact the appropriate local wildlife authority if it is near people or crops.",
  },

  {
    keywords: ["wild boar", "wild pig", "sus scrofa"],
    category: "Fauna",
    riskLevel: "high",
    title: "Wildlife alert",
    message:
      "A wild boar has been identified. Wild boar may enter agricultural areas and damage crops.",
    recommendation:
      "Keep a safe distance and notify the appropriate local wildlife or agricultural authority if it is near people or fields.",
  },

  {
    keywords: ["leopard", "panthera pardus"],
    category: "Fauna",
    riskLevel: "high",
    title: "Wildlife alert",
    message:
      "A leopard has been identified. This wildlife observation requires careful safety awareness.",
    recommendation:
      "Do not approach the animal. Move to a safe location and contact the appropriate wildlife authority.",
  },

  {
    keywords: ["tiger", "panthera tigris"],
    category: "Fauna",
    riskLevel: "high",
    title: "Wildlife safety alert",
    message:
      "A tiger has been identified. This observation may represent a serious wildlife safety concern.",
    recommendation:
      "Do not approach or follow the animal. Move to a safe location and contact the appropriate wildlife authority.",
  },

  {
    keywords: ["locust", "locusts", "schistocerca"],
    category: "Insect",
    riskLevel: "high",
    title: "Agricultural pest alert",
    message:
      "A locust has been identified. Locust activity can cause significant agricultural crop damage.",
    recommendation:
      "Inspect nearby crops and report significant activity to the appropriate agricultural authority.",
  },

  {
    keywords: ["fall armyworm", "spodoptera frugiperda"],
    category: "Pest",
    riskLevel: "high",
    title: "Crop pest alert",
    message:
      "A fall armyworm has been identified. This pest can damage agricultural crops.",
    recommendation:
      "Inspect nearby crops for feeding damage and confirm the identification before applying pest-control measures.",
  },
];