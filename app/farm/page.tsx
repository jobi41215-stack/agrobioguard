import Link from "next/link";

export default function FarmPage() {
  return (
    <main>
      <section className="section wrap" style={{ paddingTop: "7rem" }}>
        <div className="section-heading">
          <p className="eyebrow">
            <i /> SMART AGRICULTURE
          </p>

          <h1>Farm Intelligence &amp; Monitoring</h1>

          <p>
            AgroBioGuard brings together field observations, agricultural
            risk assessment, wildlife monitoring, location intelligence,
            and camera-based alert demonstrations.
          </p>
        </div>

        <div className="feature-grid">
          <Link className="feature-card" href="/pest-weed">
            <span className="feature-icon gold">⌁</span>
            <h3>Pest &amp; Weed Detection</h3>
            <p>Analyse agricultural pests, insects, and invasive plants.</p>
            <span className="coming">
              Open workspace <b>→</b>
            </span>
          </Link>

          <Link className="feature-card" href="/risk">
            <span className="feature-icon rose">◒</span>
            <h3>Risk Assessment</h3>
            <p>
              Convert observations into practical agricultural warnings.
            </p>
            <span className="coming">
              Open workspace <b>→</b>
            </span>
          </Link>

          <Link className="feature-card" href="/location">
            <span className="feature-icon blue">⌖</span>
            <h3>Location Intelligence</h3>
            <p>
              Use location context when assessing farm and wildlife risk.
            </p>
            <span className="coming">
              Open workspace <b>→</b>
            </span>
          </Link>

          <Link className="feature-card" href="/cctv">
            <span className="feature-icon violet">▣</span>
            <h3>Camera &amp; CCTV Monitoring</h3>
            <p>
              Demonstrate wildlife detection, alert generation, and camera
              monitoring.
            </p>
            <span className="coming">
              Open workspace <b>→</b>
            </span>
          </Link>
        </div>

        <div
          style={{
            marginTop: "2rem",
            padding: "1.5rem",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "18px",
          }}
        >
          <strong>Smart Agriculture Demo</strong>

          <p>
            The detailed farm dashboard and live observation connections
            will be moved into this page in the next checkpoint.
          </p>
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
