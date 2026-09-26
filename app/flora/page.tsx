import { IdentificationPageShell } from "@/components/identification-page-shell";

export default function FloraPage() {
  return (
    <IdentificationPageShell
      eyebrow="FLORA IDENTIFICATION"
      title="Identify Plants Around You"
      description="Upload a plant image and AgroBioGuard will identify the flora, provide location context, and assess associated ecological risk."
      mode="flora"
      backHref="/community"
      backLabel="Back to Community"
    />
  );
}