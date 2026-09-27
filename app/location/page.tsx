"use client";

import Link from "next/link";
import { LocationDashboard } from "@/components/location-dashboard";
import { getTranslations } from "@/lib/translations";
import { useLanguage } from "@/components/language-provider";

export default function LocationPage() {
  const { language } = useLanguage();
  const t = getTranslations(language);

  return (
    <main>
      <LocationDashboard />

      <section
        className="section wrap"
        style={{
          paddingTop: "1rem",
          paddingBottom: "5rem",
        }}
      >
        <Link
          className="button outline"
          href="/"
        >
          ← {t.navHome}
        </Link>
      </section>
    </main>
  );
}