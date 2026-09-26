import Link from "next/link";
import { IdentificationWorkspace } from "@/components/identification-workspace";

export default function FaunaPage() {
  return (
    <main>
      <nav
        className="nav wrap"
        aria-label="Fauna navigation"
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
            <i /> FAUNA IDENTIFICATION
          </p>

          <h1>Identify Wildlife Safely</h1>

          <p>
            Upload a wildlife image and AgroBioGuard
            can identify the animal, use location context,
            and generate a safety-oriented risk assessment.
          </p>
        </div>
      </section>

      <IdentificationWorkspace
        language="English"
        connectivity="online"
        viewMode="Home & Community"
        initialIdentificationMode="fauna"
        lockedIdentificationMode="fauna"
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