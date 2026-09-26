import Link from "next/link";
import { CctvDemo } from "@/components/cctv-demo";
import { SiteNav } from "@/components/site-nav";

export default function CctvPage() {
  return (
    <main>
      <SiteNav />

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