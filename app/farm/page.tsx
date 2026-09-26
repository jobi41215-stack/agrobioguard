import Link from "next/link";
import { FarmDashboard } from "@/components/farm-dashboard";

export default function FarmPage() {
  return (
    <main>
      <section
        className="section wrap"
        style={{ paddingTop: "7rem" }}
      >
        <div className="section-heading">
          <p className="eyebrow">
            <i /> SMART AGRICULTURE
          </p>

          <h1>
            Farm Intelligence &amp; Monitoring
          </h1>

          <p>
            Monitor agricultural conditions, wildlife
            activity, location context, risk, and future
            camera-based alerts from one workspace.
          </p>
        </div>
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