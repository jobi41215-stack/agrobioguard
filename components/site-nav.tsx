import Link from "next/link";

export function SiteNav() {
  return (
    <nav
      className="nav wrap"
      aria-label="Main navigation"
    >
      <Link
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
      </Link>

      <div className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/community">
          Community
        </Link>
        <Link href="/farm">
          Farming
        </Link>
        <Link href="/flora">
          Flora
        </Link>
        <Link href="/fauna">
          Fauna
        </Link>
        <Link href="/pest-weed">
          Pest &amp; Weed
        </Link>
        <Link href="/risk">
          Risk
        </Link>
        <Link href="/location">
          Location
        </Link>
        <Link href="/cctv">
          CCTV
        </Link>
      </div>
    </nav>
  );
}