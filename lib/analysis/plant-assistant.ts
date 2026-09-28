export type PlantAssistantResult = {
  reply: string;
  suggestions: string[];
  needsImage: boolean;
  topic:
    | "yellowing"
    | "curling"
    | "spots"
    | "insects"
    | "pest"
    | "general";
};

function normalize(text: string): string {
  return text.toLowerCase().trim();
}

export function analyzePlantQuestion(
  question: string,
): PlantAssistantResult {
  const text = normalize(question);

  if (
    text.includes("yellow") ||
    text.includes("yellowish") ||
    text.includes("yellowing")
  ) {
    return {
      topic: "yellowing",
      reply:
        "🌱 Yellowing tomato leaves can have several possible causes. Watering problems, nutrient deficiencies, root stress, pests, or disease can all produce similar symptoms. I cannot confirm the exact cause from text alone.\n\nLet us narrow it down. Which leaves are becoming yellow?",
      suggestions: [
        "Older / lower leaves",
        "New leaves",
        "Almost the whole plant",
        "I am not sure",
      ],
      needsImage: true,
    };
  }

  if (
    text.includes("curl") ||
    text.includes("curled") ||
    text.includes("curling")
  ) {
    return {
      topic: "curling",
      reply:
        "🍃 Leaf curling can be associated with environmental stress, watering problems, pests, nutrient issues, or disease. The exact cause depends on the crop and the appearance of the leaves.\n\nDoes the plant also have insects, spots, or discoloration?",
      suggestions: [
        "I can see insects",
        "There are spots",
        "The leaves are also yellow",
        "None of these",
      ],
      needsImage: true,
    };
  }

  if (
    text.includes("white spot") ||
    text.includes("white spots") ||
    text.includes("brown spot") ||
    text.includes("brown spots") ||
    text.includes("black spot") ||
    text.includes("black spots") ||
    text.includes("spots on")
  ) {
    return {
      topic: "spots",
      reply:
        "🔎 Leaf spots can have different causes, including fungal or bacterial problems, insect damage, environmental stress, or other plant conditions. A photograph of both the affected leaf and the whole plant would help with further assessment.\n\nWhere are the spots mainly appearing?",
      suggestions: [
        "Only on the leaves",
        "On leaves and stems",
        "On fruits too",
        "I am not sure",
      ],
      needsImage: true,
    };
  }
if (
    text.includes("armyworm") ||
    text.includes("fall armyworm") ||
    text.includes("spodoptera")
  ) {
    return {
      topic: "pest",
      reply:
        "🐛 AgroBioGuard has a local rule for Fall Armyworm (Spodoptera frugiperda). It can damage agricultural crops. The identification should still be confirmed before applying pest-control measures.\n\nInspect nearby plants for feeding damage and upload a clear image if you want to continue the assessment.",
      suggestions: [
        "Upload a photo",
        "Check nearby plants",
        "Tell me the crop",
        "Open Pest & Weed workspace",
      ],
      needsImage: true,
    };
  }
  if (
    text.includes("insect") ||
    text.includes("insects") ||
    text.includes("bug") ||
    text.includes("bugs") ||
    text.includes("worm") ||
    text.includes("worms")
  ) {
    return {
      topic: "insects",
      reply:
        "🐛 Insects can affect crops in different ways. Before choosing any control method, the insect should be identified and the crop damage should be assessed.\n\nIf possible, upload a clear close-up photograph of the insect and the damaged plant part.",
      suggestions: [
        "I will upload a photo",
        "The insect is very small",
        "It is eating the leaves",
        "It is on the underside of leaves",
      ],
      needsImage: true,
    };
  }

  

  return {
    topic: "general",
    reply:
      "🌿 I can help you investigate the plant problem step by step.\n\nTell me the crop name and what you are seeing. For example: yellow leaves, curling leaves, holes, spots, insects, wilting, or unusual growth.\n\nA clear photo can also provide useful information.",
    suggestions: [
      "My leaves are yellow",
      "My leaves are curling",
      "There are spots on my leaves",
      "I can see insects",
    ],
    needsImage: false,
  };
}
