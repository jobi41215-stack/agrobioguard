import Link from "next/link";
import { IdentificationWorkspace } from "@/components/identification-workspace";

export default function FloraPage() {
  return (
    <main>
      <nav
        className="nav wrap"
        aria-label="Flora navigation"
      >
        <a
          className="brand"
          href="/"
          aria-label="AgroBioGuard home"
        >
          <span className="brand-mark">A</span>
          <span>
            Agro<span>Bio</span>Guard
          </span>
        </a>

        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/community">Community</a>
          <a href="/farm">Farming</a>
        </div>
      </nav>

      <section
        className="section wrap"
        style={{ paddingTop: "5rem" }}
      >
        <div className="section-heading">
          <p className="eyebrow">
            <i /> FLORA IDENTIFICATION
          </p>

          <h1>Identify Plants Around You</h1>

          <p>
            Upload a plant image and AgroBioGuard will
            identify the flora, provide location context,
            and assess associated ecological risk.
          </p>
        </div>
      </section>

      <IdentificationWorkspace
        language="English"
        connectivity="online"
        viewMode="Home & Community"
        initialIdentificationMode="flora"
        lockedIdentificationMode="flora"
      />

      <section
        className="section wrap"
        style={{
          paddingTop: "1rem",
          paddingBottom: "5rem",
        }}
      >
        <Link
          className="button outline"
          href="/community"
        >
          ← Back to Community
        </Link>
      </section>
    </main>
  );
}