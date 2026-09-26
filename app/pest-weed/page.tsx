import Link from "next/link";
import { PestWeedWorkspace } from "@/components/pest-weed-workspace";

export default function PestWeedPage() {
  return (
    <main>
      <nav
        className="nav wrap"
        aria-label="Pest detection navigation"
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

      <PestWeedWorkspace />

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
