import type { AnalysisResult } from "./types";
import type { LocationContext, RiskAssessment } from "./risk-types";
import { speciesAlertRules } from "./species-alert-rules";
import {
  getGenericRiskText,
  getSpeciesRiskText,
  getLocationRiskText,
} from "./risk-translations";
import type { IdentificationLanguage } from "../identification-translations";

function hasCoordinates(
  location?: LocationContext,
): location is LocationContext & {
  latitude: number;
  longitude: number;
} {
  return (
    location?.latitude !== undefined &&
    location?.longitude !== undefined
  );
}

function getLocationDescription(location?: LocationContext): string {
  if (!location) {
    return "Device location context is available for this assessment.";
  }

  if (hasCoordinates(location)) {
    return (
      `Device location context is available at ` +
      `${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}.`
    );
  }

  return "Location context was provided, but exact coordinates were not available.";
}
function getSpeciesRiskKey(
  observationName: string,
): string | undefined {
  if (
    observationName.includes("elephant") ||
    observationName.includes("elephas maximus")
  ) {
    return "elephant";
  }

  if (
    observationName.includes("wild boar") ||
    observationName.includes("wild pig") ||
    observationName.includes("sus scrofa")
  ) {
    return "wildBoar";
  }

  if (
    observationName.includes("leopard") ||
    observationName.includes("panthera pardus")
  ) {
    return "leopard";
  }

  if (
    observationName.includes("tiger") ||
    observationName.includes("panthera tigris")
  ) {
    return "tiger";
  }

  if (
    observationName.includes("locust") ||
    observationName.includes("schistocerca")
  ) {
    return "locust";
  }

  if (
    observationName.includes("fall armyworm") ||
    observationName.includes("spodoptera frugiperda")
  ) {
    return "fallArmyworm";
  }

  return undefined;
}
export function assessRisk(
  result: AnalysisResult,
  location?: LocationContext,
  language: IdentificationLanguage = "English",
): RiskAssessment {
  const name = result.identifiedName.toLowerCase();
const commonName = result.commonName?.toLowerCase() ?? "";
const scientificName =
  result.scientificName?.toLowerCase() ?? "";

const observationName =
  `${name} ${commonName} ${scientificName}`;
  const matchedAlert = speciesAlertRules.find((rule) =>
    rule.keywords.some((keyword) =>
      observationName.includes(keyword.toLowerCase()),
    ),
  );

  if (matchedAlert) {
  const speciesKey = getSpeciesRiskKey(observationName);
  const localizedSpecies = speciesKey
    ? getSpeciesRiskText(language, speciesKey)
    : undefined;

  return {
    level: matchedAlert.riskLevel,
    title: localizedSpecies?.title ?? matchedAlert.title,
    description:
      `${localizedSpecies?.description ?? matchedAlert.message} ` +
      getLocationRiskText(language, location),
    recommendation:
      localizedSpecies?.recommendation ??
      matchedAlert.recommendation,
    category: matchedAlert.category,
  };
}
  /*
   * AgroBioGuard local rule set.
   *
   * These are conservative demonstration rules.
   * PlantNet identifies the observation; AgroBioGuard applies
   * its own assessment rules separately.
   */

  /*
   * Pepper-family crop rule.
   */
  if (
  observationName.includes("bell pepper") ||
  observationName.includes("capsicum") ||
  observationName.includes("chilli") ||
  observationName.includes("pepper")
) {
  const localized = getGenericRiskText(language, "pepper");

  return {
    level: "low",
    title: localized.title,
    description:
      `${localized.description} ` +
      getLocationRiskText(language, location),
    recommendation: localized.recommendation,
    category: result.category,
  };
}
  /*
   * Weed rule.
   */
  if (result.category === "Weed") {
    const localized = getGenericRiskText(language, "weed");
    return {
      level: "moderate",
      title: "Moderate agricultural risk",
      description:
    `${localized.description} ` +
    getLocationRiskText(language, location),
  recommendation: localized.recommendation,
      category: result.category,
    };
  }

  /*
   * Pest rule.
   */
  if (result.category === "Pest") {
    const localized = getGenericRiskText(language, "pest");
    return {
      level: "high",
      title: "High agricultural monitoring priority",
      description:
    `${localized.description} ` +
    getLocationRiskText(language, location),
  recommendation: localized.recommendation,
     category: result.category,
    };
  }

  /*
   * Insect rule.
   *
   * We do not automatically call every insect harmful.
   */
  if (result.category === "Insect") {
    const localized = getGenericRiskText(language, "insect");
    return {
      level: "moderate",
      title: "Moderate monitoring priority",
      description:
    `${localized.description} ` +
    getLocationRiskText(language, location),
  recommendation: localized.recommendation,
            category: result.category,
    };
  }

  /*
   * Fauna rule.
   *
   * We do not automatically classify an animal as dangerous.
   */
  if (result.category === "Fauna") {
    const localized = getGenericRiskText(language, "fauna");
    return {
      level: "moderate",
      title: "Ecological monitoring required",
      description:
    `${localized.description} ` +
    getLocationRiskText(language, location),
  recommendation: localized.recommendation,
      category: result.category,
    };
  }

  /*
   * If the identification provider already supplied a risk level,
   * preserve it rather than overriding it.
   */
  if (result.riskLevel !== "unknown") {
    return {
      level: result.riskLevel,
      title: `${result.category} risk assessment`,
      description:
        `${result.riskDescription} ${getLocationDescription(location)}`,
      recommendation: result.recommendation,
      category: result.category,
    };
  }

  /*
   * Safe fallback for observations that are not covered by the
   * current AgroBioGuard rule set.
   */
  return {
    level: "unknown",
    title: `${result.category} risk assessment`,
    description:
      "AgroBioGuard does not currently have enough species-specific " +
      "knowledge to determine an agricultural or ecological risk for " +
      "this observation. " +
      getLocationDescription(location),
    recommendation:
      "Review the identification before taking agricultural or ecological action.",
    category: result.category,
  };
}