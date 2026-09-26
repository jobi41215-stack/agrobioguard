import Link from "next/link";
import { RiskDashboard } from "@/components/risk-dashboard";
import { SiteNav } from "@/components/site-nav";
export default function RiskPage() {
  return (
    <main>
    <SiteNav />  

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