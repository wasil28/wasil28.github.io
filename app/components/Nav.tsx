"use client";

import { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";

const links = [
  { label: "Tentang", href: "#tentang" },
  { label: "Stack", href: "#stack" },
  { label: "Proyek", href: "#proyek" },
  { label: "Pengalaman", href: "#pengalaman" },
  { label: "Kontak", href: "#kontak" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @keyframes navPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
          50%       { box-shadow: 0 0 0 4px rgba(34,197,94,0); }
        }
        .cv-btn:hover {
          border-color: var(--accent) !important;
          color: var(--accent) !important;
          background: rgba(14,165,233,0.06) !important;
        }
      `}</style>

      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          backgroundColor: scrolled
            ? theme === "light"
              ? "rgba(244,246,255,0.88)"
              : "rgba(12,11,20,0.88)"
            : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          transition: "all 0.25s ease",
        }}
      >
        <nav
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            padding: "0 24px",
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
          }}
        >
          {/* Logo + open-to-work badge */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
            <a
              href="#"
              className="text-gradient"
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "15px",
                fontWeight: 700,
                textDecoration: "none",
                letterSpacing: "0.02em",
              }}
            >
              wm.
            </a>

            {/* Open-to-work indicator */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "#22C55E",
                  flexShrink: 0,
                  animation: "navPulse 2s infinite",
                }}
              />
              <span
                style={{
                  fontSize: "10px",
                  color: "#22C55E",
                  fontFamily: "var(--font-geist-mono)",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  lineHeight: 1,
                }}
                className="hidden sm:inline"
              >
                Tersedia
              </span>
            </div>
          </div>

          {/* Desktop links */}
          <div
            style={{
              display: "flex",
              gap: "28px",
              alignItems: "center",
              flex: 1,
              justifyContent: "center",
            }}
            className="hidden sm:flex"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontSize: "13px",
                  color: "var(--muted)",
                  textDecoration: "none",
                  transition: "color 0.15s",
                  fontWeight: 500,
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--text)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--muted)")
                }
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
            {/* Download CV button — desktop only */}
            <a
              href="/cv-wasil-mawardi.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="cv-btn hidden sm:inline-flex"
              style={{
                display: "none", // overridden by sm:inline-flex
                alignItems: "center",
                gap: "6px",
                padding: "7px 16px",
                borderRadius: "99px",
                fontSize: "12px",
                fontWeight: 600,
                fontFamily: "var(--font-geist-mono)",
                textDecoration: "none",
                transition: "all 0.2s",
                border: "1.5px solid var(--border-2)",
                color: "var(--muted)",
                background: "transparent",
              }}
            >
              <svg
                width="11"
                height="11"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
                style={{ flexShrink: 0 }}
              >
                <path
                  d="M6 1v6.5M6 7.5L3.5 5M6 7.5L8.5 5M1.5 10h9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              CV
            </a>

            {/* Theme toggle */}
            <button
              onClick={toggle}
              title={theme === "light" ? "Ganti ke mode gelap" : "Ganti ke mode terang"}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                border: "1px solid var(--border)",
                background: "var(--surface)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                transition: "border-color 0.15s, background 0.15s",
                boxShadow: "var(--shadow-sm)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--border)";
              }}
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            {/* CTA */}
            <a
              href="#kontak"
              style={{
                display: "none",
                padding: "8px 18px",
                background: "var(--gradient)",
                color: "#fff",
                borderRadius: "99px",
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: 600,
                boxShadow: "var(--shadow-glow)",
                transition: "opacity 0.15s",
              }}
              className="sm:!inline-block"
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              Hubungi
            </a>

            {/* Mobile burger */}
            <button
              className="sm:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: "none",
                border: "none",
                color: "var(--muted)",
                cursor: "pointer",
                padding: "4px",
                fontSize: "20px",
                lineHeight: 1,
              }}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            style={{
              backgroundColor: "var(--surface)",
              borderBottom: "1px solid var(--border)",
              padding: "12px 24px 20px",
            }}
            className="sm:hidden"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "12px 0",
                  fontSize: "15px",
                  color: "var(--muted)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--border)",
                  fontWeight: 500,
                }}
              >
                {link.label}
              </a>
            ))}

            {/* Download CV in mobile menu */}
            <a
              href="/cv-wasil-mawardi.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "12px 0",
                fontSize: "15px",
                color: "var(--accent)",
                textDecoration: "none",
                fontWeight: 600,
                fontFamily: "var(--font-geist-mono)",
              }}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6 1v6.5M6 7.5L3.5 5M6 7.5L8.5 5M1.5 10h9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Download CV
            </a>
          </div>
        )}
      </header>
    </>
  );
}
