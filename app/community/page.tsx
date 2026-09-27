"use client";

import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { useLanguage } from "@/components/language-provider";
import { getTranslations } from "@/lib/translations";

export default function CommunityPage() {
  const { language } = useLanguage();
  const t = getTranslations(language);

  return (
    <main>
      <section className="section wrap" style={{ paddingTop: "7rem" }}>
        <SiteNav />

        <div className="feature-grid">
          <Link className="feature-card" href="/flora">
            <span className="feature-icon lime">✿</span>
            <h3>{t.featureFloraTitle}</h3>
            <p>{t.featureFloraText}</p>
            <span className="coming">
              {t.openWorkspace} <b>→</b>
            </span>
          </Link>

          <Link className="feature-card" href="/fauna">
            <span className="feature-icon sand">◉</span>
            <h3>{t.featureFaunaTitle}</h3>
            <p>{t.featureFaunaText}</p>
            <span className="coming">
              {t.openWorkspace} <b>→</b>
            </span>
          </Link>

          <Link className="feature-card" href="/location">
            <span className="feature-icon blue">⌖</span>
            <h3>{t.featureLocationTitle}</h3>
            <p>{t.featureLocationText}</p>
            <span className="coming">
              {t.openWorkspace} <b>→</b>
            </span>
          </Link>

          <Link className="feature-card" href="/risk">
            <span className="feature-icon rose">◒</span>
            <h3>{t.featureRiskTitle}</h3>
            <p>{t.featureRiskText}</p>
            <span className="coming">
              {t.openWorkspace} <b>→</b>
            </span>
          </Link>
        </div>

        <div style={{ marginTop: "2rem" }}>
          <Link className="button primary" href="/">
            ← {t.navHome}
          </Link>
        </div>
      </section>
    </main>
  );
}