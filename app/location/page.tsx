import Link from "next/link";
import { LocationDashboard } from "@/components/location-dashboard";
import { SiteNav } from "@/components/site-nav";

export default function LocationPage() {
  return (
    <main>
      <SiteNav />

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
