import Link from "next/link";
import { FarmDashboard } from "@/components/farm-dashboard";
import { SiteNav } from "@/components/site-nav";
export default function FarmPage() {
  return (
    <main>
      <section
        className="section wrap"
        style={{ paddingTop: "7rem" }}
      >
        <SiteNav />
      </section>

      <FarmDashboard />

      <section
        className="section wrap"
        style={{
          paddingTop: "1rem",
          paddingBottom: "5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <Link
            className="button primary"
            href="/cctv"
          >
            Open CCTV Monitoring →
          </Link>

          <Link
            className="button outline"
            href="/pest-weed"
          >
            Open Pest Detection →
          </Link>

          <Link
            className="button outline"
            href="/"
          >
            ← Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}