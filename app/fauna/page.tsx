import { IdentificationPageShell } from "@/components/identification-page-shell";

export default function FaunaPage() {
  return (
    <IdentificationPageShell
      eyebrow="FAUNA IDENTIFICATION"
      title="Identify Wildlife Safely"
      description="Upload a wildlife image and AgroBioGuard can identify the animal, use location context, and generate a safety-oriented risk assessment."
      mode="fauna"
      backHref="/community"
      backLabel="Back to Community"
    />
  );
}