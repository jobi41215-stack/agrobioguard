import Link from "next/link";
import { IdentificationWorkspace } from "@/components/identification-workspace";
import { SiteNav } from "@/components/site-nav";
export default function FaunaPage() {
  return (
    <main>
      <SiteNav />

      <section
        className="section wrap"
        style={{ paddingTop: "5rem" }}
      >
        <div className="section-heading">
          <p className="eyebrow">
            <i /> FAUNA IDENTIFICATION
          </p>

          <h1>Identify Wildlife Safely</h1>

          <p>
            Upload a wildlife image and AgroBioGuard
            can identify the animal, use location context,
            and generate a safety-oriented risk assessment.
          </p>
        </div>
      </section>

      <IdentificationWorkspace
        language="English"
        connectivity="online"
        viewMode="Home & Community"
        initialIdentificationMode="fauna"
        lockedIdentificationMode="fauna"
      />

      <section
        className="section wrap"
        style={{
          paddingTop: "1rem",
          paddingBottom: "5rem",
        }}
      >
        <Link
          className="button outline"
          href="/community"
        >
          ← Back to Community
        </Link>
      </section>
    </main>
  );
}