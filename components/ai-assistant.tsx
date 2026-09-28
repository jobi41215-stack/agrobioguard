"use client";

import Link from "next/link";

export function AIAssistant() {
  return (
    <aside
      className="ai-assistant-float"
      aria-label="AgroBioGuard AI Assistant"
    >
      <div className="ai-assistant-float-icon">🌿</div>

      <div className="ai-assistant-float-content">
        <strong>AgroBioGuard AI</strong>
        <span>Plant Problem Assistant</span>
      </div>

      <Link
        href="/assistant"
        className="ai-assistant-float-button"
      >
        Open Assistant →
      </Link>
    </aside>
  );
}