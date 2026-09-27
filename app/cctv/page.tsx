"use client";

import Link from "next/link";
import { CctvDemo } from "@/components/cctv-demo";
import { SiteNav } from "@/components/site-nav";
import {
  getTranslations,
} from "@/lib/translations";
import { useLanguage } from "@/components/language-provider";

export default function CctvPage() {
  const { language } = useLanguage();
  const t = getTranslations(language);

  return (
    <main>
      <SiteNav />

      <CctvDemo />

      <section
        className="section wrap"
        style={{
          paddingTop: "1rem",
          paddingBottom: "5rem",
        }}
      >
        <Link
          className="button outline"
          href="/farm"
        >
          ← {t.smartAgriculture}
        </Link>
      </section>
    </main>
  );
}
