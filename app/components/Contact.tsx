"use client";

import { useState, useRef, useCallback } from "react";

// ─── Confetti ────────────────────────────────────────────────────────────────

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
}

const CONFETTI_COLORS = [
  "#0EA5E9",
  "#38BDF8",
  "#06B6D4",
  "#7DD3FC",
  "#22C55E",
  "#FBBF24",
];

function spawnParticles(originX: number, originY: number): Particle[] {
  return Array.from({ length: 80 }, () => {
    // Fan upward: angles between -160° and -20° (in radians)
    const angle = (Math.random() * 140 - 160) * (Math.PI / 180);
    const speed = Math.random() * 5 + 3;
    return {
      x: originX,
      y: originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      size: Math.random() * 6 + 4,
      opacity: 1,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 8,
    };
  });
}

function useConfetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  const fire = useCallback((originX: number, originY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Cancel any running animation
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = spawnParticles(originX, originY);

    function tick() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles = particles
        .map((p) => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vy: p.vy + 0.3,
          vx: p.vx * 0.99,
          opacity: p.opacity - 0.012,
          rotation: p.rotation + p.rotationSpeed,
        }))
        .filter((p) => p.opacity > 0);

      for (const p of particles) {
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.55);
        ctx.restore();
      }

      if (particles.length > 0) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        rafRef.current = null;
      }
    }

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  return { canvasRef, fire };
}

// ─── Local inline toast ───────────────────────────────────────────────────────

function InlineToast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <>
      <style>{`
        @keyframes inlineToastIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div
        style={{
          position: "fixed",
          bottom: "24px",
          left: "24px",
          zIndex: 9000,
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "10px",
          padding: "12px 16px",
          boxShadow: "var(--shadow-md)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontSize: "13px",
          color: "var(--text)",
          minWidth: "200px",
          maxWidth: "320px",
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
          transition: "opacity 0.25s ease",
          animation: visible ? "inlineToastIn 0.25s ease forwards" : "none",
        }}
      >
        <span style={{ color: "#22C55E", fontWeight: 700, fontSize: "15px", lineHeight: 1, flexShrink: 0 }}>
          ✓
        </span>
        <span style={{ lineHeight: 1.4 }}>{message}</span>
      </div>
    </>
  );
}

// ─── Contact ─────────────────────────────────────────────────────────────────

const EMAIL = "wasilmawardi0@gmail.com";

export default function Contact() {
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { canvasRef, fire } = useConfetti();

  const handleEmailClick = useCallback(
    async (e: React.MouseEvent<HTMLAnchorElement>) => {
      // Still allow the mailto to open normally; also copy to clipboard
      try {
        await navigator.clipboard.writeText(EMAIL);
        if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
        setToastVisible(true);
        toastTimerRef.current = setTimeout(() => setToastVisible(false), 3000);
      } catch {
        // clipboard unavailable — mailto still works fine
      }
    },
    []
  );

  const handleHubungiClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const originX = rect.left + rect.width / 2;
      const originY = rect.top + rect.height / 2;
      fire(originX, originY);
    },
    [fire]
  );

  return (
    <>
      {/* Full-screen confetti canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 8000,
        }}
      />

      {/* Clipboard toast */}
      <InlineToast message="Email disalin ke clipboard! ✓" visible={toastVisible} />

      <section
        id="kontak"
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "96px 48px 128px",
          borderTop: "1px solid var(--border)",
        }}
      >
        <Label>Kontak</Label>

        <div style={{ maxWidth: "480px" }}>
          <h2
            style={{
              fontSize: "clamp(24px, 5vw, 36px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "var(--text)",
              marginBottom: "16px",
              lineHeight: 1.2,
            }}
          >
            Mari mengobrol.
          </h2>
          <p
            style={{
              fontSize: "15px",
              color: "var(--muted)",
              lineHeight: 1.75,
              marginBottom: "40px",
            }}
          >
            Terbuka untuk peluang baru, diskusi teknis, atau sekadar ngobrol soal
            stack dan sistem. Balas biasanya dalam 24 jam.
          </p>

          {/* Contact links */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "48px" }}>
            <ContactLink
              href={`mailto:${EMAIL}`}
              label="Email"
              value={EMAIL}
              onClickOverride={handleEmailClick}
            />
            <ContactLink
              href="https://linkedin.com/in/wasil-astor"
              label="LinkedIn"
              value="linkedin.com/in/wasil-astor"
              external
            />
            <ContactLink
              href="https://instagram.com/wasil_astor"
              label="Instagram"
              value="@wasil_astor"
              external
            />
          </div>

          {/* Hubungi saya CTA */}
          <a
            href="#kontak"
            onClick={handleHubungiClick}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 28px",
              background: "var(--gradient)",
              color: "#fff",
              borderRadius: "99px",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 600,
              boxShadow: "var(--shadow-glow)",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
          >
            Hubungi saya
            <span style={{ fontSize: "16px" }}>→</span>
          </a>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: "64px",
            paddingTop: "32px",
            borderTop: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              color: "var(--muted)",
              fontFamily: "var(--font-geist-mono)",
            }}
          >
            © 2025 Wasil Mawardi
          </span>
          <span
            style={{
              fontSize: "12px",
              color: "var(--muted)",
              fontFamily: "var(--font-geist-mono)",
            }}
          >
            Dibangun dengan Next.js + TypeScript
          </span>
        </div>
      </section>
    </>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ContactLink({
  href,
  label,
  value,
  external,
  onClickOverride,
}: {
  href: string;
  label: string;
  value: string;
  external?: boolean;
  onClickOverride?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onClick={onClickOverride}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 20px",
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "8px",
        textDecoration: "none",
        transition: "border-color 0.15s, background-color 0.15s",
        gap: "16px",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(14,165,233,0.25)";
        el.style.backgroundColor = "var(--accent-dim)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--border)";
        el.style.backgroundColor = "var(--surface)";
      }}
    >
      <span
        style={{
          fontSize: "11px",
          fontFamily: "var(--font-geist-mono)",
          color: "var(--muted)",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          minWidth: "70px",
        }}
      >
        {label}
      </span>
      <span style={{ fontSize: "14px", color: "var(--text)" }}>{value}</span>
      <span style={{ fontSize: "16px", color: "var(--accent)", marginLeft: "auto" }}>→</span>
    </a>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "40px" }}>
      <span
        style={{
          fontSize: "11px",
          fontFamily: "var(--font-geist-mono)",
          color: "var(--accent)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        {children}
      </span>
      <div style={{ flex: 1, height: "1px", backgroundColor: "var(--border)" }} />
    </div>
  );
}
