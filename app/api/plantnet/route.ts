import { NextResponse } from "next/server";

const PLANTNET_API_URL =
  "https://my-api.plantnet.org/v2/identify/all";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.PLANTNET_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error: "Pl@ntNet API key is not configured.",
        },
        { status: 500 },
      );
    }

    const incomingFormData = await request.formData();
    const image = incomingFormData.get("image");

    if (!(image instanceof File)) {
      return NextResponse.json(
        {
          error: "No image file was provided.",
        },
        { status: 400 },
      );
    }

    const formData = new FormData();

    formData.append("images", image);
    formData.append("organs", "auto");

    const response = await fetch(
      `${PLANTNET_API_URL}?api-key=${encodeURIComponent(apiKey)}`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Pl@ntNet identification failed.",
          details: data,
        },
        { status: response.status },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Pl@ntNet API error:", error);

    return NextResponse.json(
      {
        error: "Unable to connect to the plant identification service.",
      },
      { status: 500 },
    );
  }
}