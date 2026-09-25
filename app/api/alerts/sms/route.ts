import { NextResponse } from "next/server";

const MSG91_API_URL = "https://control.msg91.com/api/v5/flow";

const templateEnvironmentKeys: Record<string, string> = {
  English: "MSG91_SMS_TEMPLATE_ENGLISH",
  Tamil: "MSG91_SMS_TEMPLATE_TAMIL",
  Telugu: "MSG91_SMS_TEMPLATE_TELUGU",
  Hindi: "MSG91_SMS_TEMPLATE_HINDI",
  Kannada: "MSG91_SMS_TEMPLATE_KANNADA",
  Malayalam: "MSG91_SMS_TEMPLATE_MALAYALAM",
};

function normalizeIndianMobileNumber(
  phoneNumber: string,
): string | null {
  const digits = phoneNumber.replace(/\D/g, "");

  if (digits.length === 10) {
    return `91${digits}`;
  }

  if (digits.length === 12 && digits.startsWith("91")) {
    return digits;
  }

  return null;
}

export async function POST(request: Request) {
  try {
    const authKey = process.env.MSG91_AUTH_KEY;

    if (!authKey) {
      return NextResponse.json(
        {
          error: "MSG91 SMS service is not configured.",
        },
        { status: 503 },
      );
    }

    const body = await request.json();

    const phoneNumber = body?.phoneNumber?.toString() ?? "";
    const language = body?.language?.toString() || "English";
    const species = body?.species?.toString().trim() || "Wildlife";
    const location = body?.location?.toString().trim() || "Monitored area";

    const mobile = normalizeIndianMobileNumber(phoneNumber);

    if (!mobile) {
      return NextResponse.json(
        {
          error:
            "Enter a valid 10-digit Indian mobile number.",
        },
        { status: 400 },
      );
    }

    const environmentKey =
      templateEnvironmentKeys[language] ??
      templateEnvironmentKeys.English;

    const templateId =
      process.env[environmentKey];

    if (!templateId) {
      return NextResponse.json(
        {
          error:
            `MSG91 SMS template is not configured for ${language}.`,
        },
        { status: 503 },
      );
    }

    const response = await fetch(
      MSG91_API_URL,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          authkey: authKey,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          template_id: templateId,
          short_url: "0",
          realTimeResponse: "1",
          recipients: [
            {
              mobiles: mobile,
              VAR1: species,
              VAR2: location,
            },
          ],
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("MSG91 SMS API error:", data);

      return NextResponse.json(
        {
          error: "SMS delivery failed.",
          details: data,
        },
        { status: response.status },
      );
    }

    return NextResponse.json({
      success: true,
      message: "SMS request accepted by MSG91.",
      providerResponse: data,
    });
  } catch (error) {
    console.error("SMS route error:", error);

    return NextResponse.json(
      {
        error: "Unable to connect to the SMS service.",
      },
      { status: 500 },
    );
  }
}