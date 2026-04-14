"use client";
import { useState, useEffect } from "react";

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const threshold = document.body.scrollHeight * 0.5;
      setVisible(window.scrollY > threshold);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (dismissed) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 500,
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        padding: "12px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 -4px 24px rgba(14,165,233,0.08)",
        transform: visible ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.3s ease",
        gap: "12px",
      }}
    >
      {/* Left text */}
      <span
        style={{
          fontSize: "14px",
          fontWeight: 500,
          color: "var(--text)",
          flexShrink: 0,
          whiteSpace: "nowrap",
        }}
      >
        Tertarik bekerja sama?
      </span>

      {/* Buttons */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          flexShrink: 0,
        }}
      >
        {/* "Lihat proyek" — hidden on mobile */}
        <a
          href="#proyek"
          className="sticky-cta-ghost"
          style={{
            borderRadius: "99px",
            padding: "8px 20px",
            fontSize: "13px",
            fontWeight: 600,
            textDecoration: "none",
            border: "1.5px solid var(--border-2)",
            color: "var(--muted)",
            background: "transparent",
            transition: "all 0.2s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.borderColor = "var(--accent)";
            el.style.color = "var(--accent)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.borderColor = "var(--border-2)";
            el.style.color = "var(--muted)";
          }}
        >
          Lihat proyek dulu →
        </a>

        {/* "Hubungi saya" — always visible */}
        <a
          href="#kontak"
          style={{
            borderRadius: "99px",
            padding: "8px 20px",
            fontSize: "13px",
            fontWeight: 600,
            textDecoration: "none",
            background: "var(--gradient)",
            color: "white",
            boxShadow: "var(--shadow-glow)",
            transition: "opacity 0.2s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
          }}
        >
          Hubungi saya →
        </a>

        {/* Dismiss button */}
        <button
          onClick={() => setDismissed(true)}
          title="Tutup"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--muted)",
            fontSize: "16px",
            lineHeight: 1,
            padding: "4px 6px",
            borderRadius: "6px",
            transition: "color 0.15s",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "var(--text)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "var(--muted)";
          }}
        >
          ×
        </button>
      </div>

      {/* Responsive style for hiding ghost button on mobile */}
      <style>{`
        @media (max-width: 639px) {
          .sticky-cta-ghost {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
