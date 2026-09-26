import Link from "next/link";
import { CctvDemo } from "@/components/cctv-demo";

export default function CctvPage() {
  return (
    <main>
      <nav
        className="nav wrap"
        aria-label="CCTV navigation"
      >
        <a
          className="brand"
          href="/"
          aria-label="AgroBioGuard home"
        >
          <span className="brand-mark">
            A
          </span>

          <span>
            Agro<span>Bio</span>Guard
          </span>
        </a>

        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/community">
            Community
          </a>
          <a href="/farm">Farming</a>
        </div>
      </nav>

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
          ← Back to Smart Agriculture
        </Link>
      </section>
    </main>
  );
}