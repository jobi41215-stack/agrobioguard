import type { AnalysisResult } from "./types";
import type { LocationContext, RiskAssessment } from "./risk-types";

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

export function assessRisk(
  result: AnalysisResult,
  location?: LocationContext,
): RiskAssessment {
  const name = result.identifiedName.toLowerCase();
  const commonName = result.commonName?.toLowerCase() ?? "";

  const observationName = `${name} ${commonName}`;

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
    return {
      level: "low",
      title: "Low agricultural risk",
      description:
        "AgroBioGuard identified this observation as a pepper-family plant. " +
        "The current local rule set does not classify the identified plant " +
        "itself as an immediate agricultural or ecological threat. " +
        getLocationDescription(location),
      recommendation:
        "Continue normal crop monitoring and inspect the plant for visible signs of pests, disease, or abnormal growth.",
      category: result.category,
    };
  }

  /*
   * Weed rule.
   */
  if (result.category === "Weed") {
    return {
      level: "moderate",
      title: "Moderate agricultural risk",
      description:
        "The observation has been classified as a weed. " +
        "Weeds can compete with crops for water, nutrients, sunlight, and space. " +
        getLocationDescription(location),
      recommendation:
        "Inspect the surrounding crop area and consider appropriate weed-management practices before taking action.",
      category: result.category,
    };
  }

  /*
   * Pest rule.
   */
  if (result.category === "Pest") {
    return {
      level: "high",
      title: "High agricultural monitoring priority",
      description:
        "The observation has been classified as a pest. " +
        "Pest observations may affect nearby agricultural plants and therefore require closer monitoring. " +
        getLocationDescription(location),
      recommendation:
        "Inspect nearby plants for signs of damage and confirm the identification before applying any pest-control measure.",
      category: result.category,
    };
  }

  /*
   * Insect rule.
   *
   * We do not automatically call every insect harmful.
   */
  if (result.category === "Insect") {
    return {
      level: "moderate",
      title: "Moderate monitoring priority",
      description:
        "The observation has been classified as an insect. " +
        "The current AgroBioGuard rule set does not determine whether this insect is beneficial or harmful at species level. " +
        getLocationDescription(location),
      recommendation:
        "Review the identification and inspect nearby crops before taking control measures.",
      category: result.category,
    };
  }

  /*
   * Fauna rule.
   *
   * We do not automatically classify an animal as dangerous.
   */
  if (result.category === "Fauna") {
    return {
      level: "moderate",
      title: "Ecological monitoring required",
      description:
        "The observation has been classified as fauna. " +
        "The current rule set does not automatically classify the animal as an agricultural or ecological threat. " +
        getLocationDescription(location),
      recommendation:
        "Observe from a safe distance and review the identification before taking agricultural or wildlife-related action.",
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