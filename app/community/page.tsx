import Link from "next/link";
import { SiteNav } from "@/components/site-nav";

export default function CommunityPage() {
  return (
    <main>
      <section className="section wrap" style={{ paddingTop: "7rem" }}>
        <SiteNav />

        <div className="feature-grid">
          <Link className="feature-card" href="/flora">
            <span className="feature-icon lime">✿</span>
            <h3>Flora Identification</h3>
            <p>Identify plants and explore their ecological role.</p>
            <span className="coming">Open workspace <b>→</b></span>
          </Link>

          <Link className="feature-card" href="/fauna">
            <span className="feature-icon sand">◉</span>
            <h3>Fauna Identification</h3>
            <p>Identify wildlife with safety-focused guidance.</p>
            <span className="coming">Open workspace <b>→</b></span>
          </Link>

          <Link className="feature-card" href="/location">
            <span className="feature-icon blue">⌖</span>
            <h3>Location Intelligence</h3>
            <p>Connect observations with their surrounding location.</p>
            <span className="coming">Open workspace <b>→</b></span>
          </Link>

          <Link className="feature-card" href="/risk">
            <span className="feature-icon rose">◒</span>
            <h3>Risk Assessment</h3>
            <p>Understand the risk associated with an observation.</p>
            <span className="coming">Open workspace <b>→</b></span>
          </Link>
        </div>

        <div style={{ marginTop: "2rem" }}>
          <Link className="button primary" href="/">
            ← Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}