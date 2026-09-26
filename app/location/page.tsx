import Link from "next/link";
import { LocationDashboard } from "@/components/location-dashboard";

export default function LocationPage() {
  return (
    <main>
      <nav
        className="nav wrap"
        aria-label="Location navigation"
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
          <a href="/community">Community</a>
          <a href="/farm">Farming</a>
        </div>
      </nav>

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
          ← Back to Home
        </Link>
      </section>
    </main>
  );
}
