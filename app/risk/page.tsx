import Link from "next/link";
import { RiskDashboard } from "@/components/risk-dashboard";

export default function RiskPage() {
  return (
    <main>
      <nav
        className="nav wrap"
        aria-label="Risk navigation"
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

      <RiskDashboard />

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
          ← Back to Home
        </Link>
      </section>
    </main>
  );
}