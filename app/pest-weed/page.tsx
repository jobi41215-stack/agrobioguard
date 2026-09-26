import Link from "next/link";
import { PestWeedWorkspace } from "@/components/pest-weed-workspace";
import { SiteNav } from "@/components/site-nav";
export default function PestWeedPage() {
  return (
    <main>
      <SiteNav />

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
