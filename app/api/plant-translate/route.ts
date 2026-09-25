import { NextResponse } from "next/server";

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key is not configured." },
        { status: 500 },
      );
    }

    const body = await request.json();

    const commonName = body?.commonName?.toString().trim();
    const scientificName = body?.scientificName?.toString().trim();
    const language = body?.language?.toString().trim() || "English";

    if (!commonName) {
      return NextResponse.json(
        { error: "No plant common name was provided." },
        { status: 400 },
      );
    }

    if (language === "English") {
      return NextResponse.json({
        translatedName: commonName,
      });
    }

    const prompt = `
Translate the plant's common name into ${language}.

Plant common name:
${commonName}

Scientific name:
${scientificName || "Unknown"}

Return ONLY valid JSON in this exact structure:

{
  "translatedName": "translated plant common name"
}

Rules:
- Translate only the common name.
- Use the natural, commonly understood name in ${language}.
- Do not translate the scientific name.
- Do not invent a different plant.
- Do not add explanations.
- Do not use Markdown or code fences.
`;

    const response = await fetch(
      `${GEMINI_API_URL}?key=${encodeURIComponent(apiKey)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Plant translation API error:", data);

      return NextResponse.json(
        {
          error: "Plant name translation failed.",
          details: data,
        },
        { status: response.status },
      );
    }

    const generatedText =
      data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      return NextResponse.json(
        { error: "Gemini returned no plant translation." },
        { status: 502 },
      );
    }

    const cleanedText = generatedText
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    let parsed: {
      translatedName?: string;
    };

    try {
      parsed = JSON.parse(cleanedText);
    } catch {
      return NextResponse.json(
        { error: "Plant translation returned invalid JSON." },
        { status: 502 },
      );
    }

    const translatedName =
      parsed.translatedName?.trim() || commonName;

    return NextResponse.json({
      translatedName,
    });
  } catch (error) {
    console.error("Plant translation error:", error);

    return NextResponse.json(
      {
        error: "Unable to translate the plant name.",
      },
      { status: 500 },
    );
  }
}