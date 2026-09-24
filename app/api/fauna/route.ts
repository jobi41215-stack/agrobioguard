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

    const incomingFormData = await request.formData();
    const image = incomingFormData.get("image");
    const language = incomingFormData.get("language")?.toString() || "English";

    if (!(image instanceof File)) {
      return NextResponse.json(
        { error: "No image file was provided." },
        { status: 400 },
      );
    }

    const bytes = await image.arrayBuffer();
    const base64Image = Buffer.from(bytes).toString("base64");

    const prompt = `
Identify the animal in this image for the AgroBioGuard application.

Respond in ${language}.

Return ONLY valid JSON in this exact structure:

{
  "identifiedName": "animal common name",
  "commonName": "animal common name",
  "scientificName": "scientific name if known",
  "confidence": 0,
  "description": "short factual description"
}

Rules:
- If the image is clearly an animal, identify it as accurately as possible.
- If it is not an animal, use "Unknown animal".
- confidence must be a number from 0 to 100.
- Do not invent a scientific name when uncertain.
- Keep the JSON keys in English, but write the values in the selected language.
- Do not include Markdown or code fences.
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
                {
                  inline_data: {
                    mime_type: image.type,
                    data: base64Image,
                  },
                },
              ],
            },
          ],
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini fauna API error:", data);

      return NextResponse.json(
        {
          error: "Gemini fauna identification failed.",
          details: data,
        },
        { status: response.status },
      );
    }

    const generatedText =
      data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      return NextResponse.json(
        { error: "Gemini returned no fauna identification." },
        { status: 502 },
      );
    }

    const cleanedText = generatedText
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    return NextResponse.json({
      candidates: [
        {
          content: {
            parts: [
              {
                text: cleanedText,
              },
            ],
          },
        },
      ],
    });
  } catch (error) {
    console.error("Fauna API error:", error);

    return NextResponse.json(
      {
        error: "Unable to connect to the fauna identification service.",
      },
      { status: 500 },
    );
  }
}