"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "../hooks/useInView";
import { useCountUp } from "../hooks/useCountUp";
import { useIsMobile } from "../hooks/useIsMobile";

const roles = ["Fullstack Developer", "TypeScript Engineer", "System Builder", "API Integrator"];

/* Deterministic pseudo-random — same on server and client, no hydration mismatch */
function sr(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

/* Mini floating particle */
function Particle({ x, y, size, delay, duration }: { x: number; y: number; size: number; delay: number; duration: number }) {
  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        background: "var(--gradient)",
        opacity: 0,
        animationName: "drift",
        animationDuration: `${duration}s`,
        animationTimingFunction: "ease-out",
        animationDelay: `${delay}s`,
        animationIterationCount: "infinite",
      }}
    />
  );
}

/* Particles are decorative — render client-only to avoid SSR/CSR precision mismatches */
function ClientParticles() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  return (
    <>
      {particles.map((p) => (
        <Particle key={p.id} {...p} />
      ))}
    </>
  );
}

const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: sr(i * 3) * 100,
  y: 20 + sr(i * 3 + 1) * 70,
  size: 3 + sr(i * 3 + 2) * 5,
  delay: sr(i * 4) * 5,
  duration: 3 + sr(i * 4 + 1) * 4,
}));

const stats = [
  { num: 4,   suffix: "+",  label: "Tahun pengalaman", icon: "⚡" },
  { num: 400, suffix: "K+", label: "Pengguna aktif",   icon: "👥" },
  { num: 30,  suffix: "+",  label: "Proyek selesai",   icon: "🚀" },
];

/* Stat card sub-component — owns its own useCountUp hook */
function StatCard({
  num,
  suffix,
  label,
  icon,
  active,
}: {
  num: number;
  suffix: string;
  label: string;
  icon: string;
  active: boolean;
}) {
  const count = useCountUp(num, 1600, active);

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.75)",
        backdropFilter: "blur(12px)",
        border: "1px solid var(--border)",
        borderRadius: "16px",
        padding: "20px 24px",
        boxShadow: "var(--shadow-sm)",
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateX(-4px)";
        el.style.boxShadow = "var(--shadow-md)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateX(0)";
        el.style.boxShadow = "var(--shadow-sm)";
      }}
    >
      <div style={{ fontSize: "22px", marginBottom: "6px" }}>{icon}</div>
      <div
        className="text-gradient"
        style={{
          fontSize: "34px",
          fontWeight: 800,
          fontFamily: "var(--font-geist-mono)",
          lineHeight: 1,
        }}
      >
        {count}{suffix}
      </div>
      <div style={{ fontSize: "12px", color: "var(--muted)", marginTop: "6px" }}>
        {label}
      </div>
    </div>
  );
}

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const isMobile = useIsMobile();

  /* Blob refs for parallax */
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);

  /* Stats container in-view detection */
  const { ref: statsRef, inView: statsInView } = useInView(0.2);

  /* Typewriter effect */
  useEffect(() => {
    const current = roles[roleIndex];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < current.length)
      t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 65);
    else if (!deleting && displayed.length === current.length)
      t = setTimeout(() => setDeleting(true), 2400);
    else if (deleting && displayed.length > 0)
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 38);
    else { setDeleting(false); setRoleIndex((i) => (i + 1) % roles.length); }
    return () => clearTimeout(t);
  }, [displayed, deleting, roleIndex]);

  /* Mouse parallax on blobs */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth;   // 0 → 1
      const ny = e.clientY / window.innerHeight;  // 0 → 1

      // Offset is opposite to mouse direction (parallax)
      const ox1 = (0.5 - nx) * 40;  // ±20px
      const oy1 = (0.5 - ny) * 40;
      const ox2 = (0.5 - nx) * 30;  // ±15px
      const oy2 = (0.5 - ny) * 30;
      const ox3 = (0.5 - nx) * 20;  // ±10px
      const oy3 = (0.5 - ny) * 20;

      if (blob1Ref.current)
        blob1Ref.current.style.transform = `translate(${ox1}px, ${oy1}px)`;
      if (blob2Ref.current)
        blob2Ref.current.style.transform = `translate(${ox2}px, ${oy2}px)`;
      if (blob3Ref.current)
        blob3Ref.current.style.transform = `translate(${ox3}px, ${oy3}px)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      className="mesh-bg"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        width: "100%",
      }}
    >
      {/* Animated blobs — refs for parallax, transition for smoothness */}
      <div
        ref={blob1Ref}
        className="blob blob-1"
        style={{ width: 700, height: 700, top: -200, left: -200, transition: "transform 0.1s ease-out" }}
      />
      <div
        ref={blob2Ref}
        className="blob blob-2"
        style={{ width: 600, height: 600, top: 100, right: -200, transition: "transform 0.1s ease-out" }}
      />
      <div
        ref={blob3Ref}
        className="blob blob-3"
        style={{ width: 500, height: 500, bottom: -100, left: "35%", transition: "transform 0.1s ease-out" }}
      />

      {/* Floating particles — client-only to avoid SSR precision mismatch */}
      <ClientParticles />

      {/* Animated dot grid */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(14,165,233,0.35) 1.5px, transparent 1.5px)",
          backgroundSize: "36px 36px",
          opacity: 0.4,
          maskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      {/* Glow ring behind name */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-60%)",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: isMobile ? "90px 20px 60px" : "110px 48px 80px",
          position: "relative",
          zIndex: 1,
          width: "100%",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr auto",
          gap: isMobile ? "32px" : "48px",
          alignItems: "center",
        }}
      >
        {/* Left: main content */}
        <div>
          {/* Badge */}
          <div className="animate-fade-in-up" style={{ marginBottom: "28px" }}>
            <span className="label-pill">
              <span style={{
                width: 7, height: 7, borderRadius: "50%",
                background: "#22C55E",
                display: "inline-block",
                boxShadow: "0 0 8px rgba(34,197,94,0.8)",
              }} />
              Terbuka untuk peluang baru
            </span>
          </div>

          {/* Name */}
          <h1
            className="animate-fade-in-up text-gradient delay-100"
            style={{
              fontSize: "clamp(48px, 7vw, 88px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.0,
              marginBottom: "20px",
            }}
          >
            Wasil<br />Mawardi
          </h1>

          {/* Typewriter */}
          <div
            className="animate-fade-in-up delay-200"
            style={{
              fontSize: "clamp(14px, 2vw, 18px)",
              fontFamily: "var(--font-geist-mono)",
              color: "var(--muted)",
              marginBottom: "24px",
              minHeight: "28px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span style={{ color: "var(--accent-3)" }}>{">"}</span>
            <span style={{ color: "var(--accent)" }}>whoami</span>
            <span style={{ color: "var(--muted-2)" }}>—</span>
            <span style={{ color: "var(--text)", fontWeight: 500 }}>{displayed}</span>
            <span
              className="cursor-blink"
              style={{
                display: "inline-block", width: 2, height: "1.1em",
                background: "var(--gradient)", borderRadius: 1,
              }}
            />
          </div>

          {/* Description */}
          <p
            className="animate-fade-in-up delay-300"
            style={{
              fontSize: "16px",
              color: "var(--muted)",
              lineHeight: 1.8,
              maxWidth: "540px",
              marginBottom: "44px",
            }}
          >
            Saya membangun sistem digital skala penuh — dari antarmuka ribuan pengguna
            hingga backend yang mengintegrasikan API enterprise.{" "}
            <strong style={{ color: "var(--text)", fontWeight: 600 }}>4+ tahun</strong> bersama
            instansi pemerintah dan universitas nasional.
          </p>

          {/* CTAs */}
          <div className="animate-fade-in-up delay-400" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a
              href="#proyek"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "13px 32px",
                background: "var(--gradient)", color: "#fff",
                borderRadius: "99px", textDecoration: "none",
                fontSize: "15px", fontWeight: 600,
                boxShadow: "var(--shadow-glow)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(-3px)";
                el.style.boxShadow = "0 16px 48px rgba(14,165,233,0.40)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "var(--shadow-glow)";
              }}
            >
              Lihat proyek ↓
            </a>
            <a
              href="#kontak"
              style={{
                display: "inline-flex", alignItems: "center",
                padding: "13px 32px",
                border: "1.5px solid var(--border-2)", color: "var(--muted)",
                borderRadius: "99px", textDecoration: "none",
                fontSize: "15px", fontWeight: 500,
                background: "var(--surface)",
                boxShadow: "var(--shadow-sm)",
                transition: "border-color 0.2s, color 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--accent)";
                el.style.color = "var(--accent)";
                el.style.boxShadow = "0 0 0 3px rgba(14,165,233,0.12)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--border-2)";
                el.style.color = "var(--muted)";
                el.style.boxShadow = "var(--shadow-sm)";
              }}
            >
              Hubungi saya
            </a>
          </div>
        </div>

        {/* Right: stats cards — useInView attached here */}
        <div
          ref={statsRef as React.RefObject<HTMLDivElement>}
          className="animate-fade-in-up delay-500"
          style={{
            display: "flex",
            flexDirection: isMobile ? "row" : "column",
            flexWrap: isMobile ? "wrap" : "nowrap",
            gap: "12px",
            minWidth: isMobile ? "unset" : "200px",
          }}
        >
          {stats.map((stat) => (
            <div key={stat.label} style={{ flex: isMobile ? "1 1 calc(33% - 8px)" : "unset", minWidth: isMobile ? "90px" : "unset" }}>
              <StatCard
                num={stat.num}
                suffix={stat.suffix}
                label={stat.label}
                icon={stat.icon}
                active={statsInView}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: "120px",
          background: "linear-gradient(transparent, var(--bg))",
          pointerEvents: "none",
        }}
      />
    </section>
  );
}
