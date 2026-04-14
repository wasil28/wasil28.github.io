"use client";

import { useEffect, useRef, useState } from "react";

// ── Data ──────────────────────────────────────────────────────────────────────

const milestones = [
  {
    year: "2018",
    title: "SMKN 13 Bandung",
    subtitle: "Rekayasa Perangkat Lunak",
    desc: "Mulai belajar coding serius — dari logika dasar sampai bikin aplikasi desktop pertama. Di sini pondasi teknis terbentuk.",
    type: "education",
    icon: "🎓",
  },
  {
    year: "2020",
    title: "CV. ICOMMITS",
    subtitle: "Backend Developer",
    desc: "Kerja pertama. Belajar langsung: sistem nyata, deadline nyata, user nyata. Backend dari nol.",
    type: "work",
    icon: "💻",
  },
  {
    year: "2021",
    title: "PT. Mitra Sinerji Tekno",
    subtitle: "Fullstack Developer → Tech Leader",
    desc: "Mulai handle proyek pemerintah — BAPENDA Jabar, PUPR, Kemendikbud. Pertama kali pegang arsitektur sistem skala besar.",
    type: "work",
    icon: "🚀",
  },
  {
    year: "2022",
    title: "Proyek Skala Nasional",
    subtitle: "SRS · SAMBARA · ATOS · BRAVO",
    desc: "Setahun yang padat: 4 sistem di 4 instansi berbeda, dari sistem pajak kendaraan Jabar hingga presensi PUPR. Banyak belajar tentang integrasi API dan edge case produksi.",
    type: "milestone",
    icon: "⚡",
  },
  {
    year: "2024",
    title: "Portal MBKM & e-Presensi",
    subtitle: "Universitas Terbuka",
    desc: "Dua sistem besar sekaligus. MBKM butuh integrasi Azure SSO. e-Presensi butuh koneksi ke Microsoft Teams API untuk absensi otomatis — 6.000+ tutor, 10K request/hari.",
    type: "milestone",
    icon: "🔗",
  },
  {
    year: "2025",
    title: "Direktorat Sistem Informasi UT",
    subtitle: "Fullstack Developer — In-house",
    desc: "Masuk langsung ke DSI UT. Kerjanya sama tapi konteksnya beda — lebih dekat ke user, lebih dalam ke sistem inti. Ini yang sekarang.",
    type: "current",
    icon: "📍",
  },
];

// ── Inline useInView hook ─────────────────────────────────────────────────────

function useItemInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "40px",
      }}
    >
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

type MilestoneItemProps = {
  milestone: (typeof milestones)[number];
  index: number;
};

function MilestoneItem({ milestone, index }: MilestoneItemProps) {
  const { ref, inView } = useItemInView(0.15);
  const isLeft = index % 2 === 0;
  const isCurrent = milestone.type === "current";

  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        // Desktop: two equal columns with center gutter; mobile overridden via inline media approach
        gridTemplateColumns: "1fr 40px 1fr",
        alignItems: "start",
        gap: "0",
        marginBottom: "40px",
        opacity: inView ? 1 : 0,
        transform: inView
          ? "translateX(0)"
          : isLeft
          ? "translateX(-24px)"
          : "translateX(24px)",
        transition: "opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1)",
        transitionDelay: `${index * 60}ms`,
      }}
    >
      {/* Left column */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          paddingRight: "20px",
          paddingTop: "6px",
        }}
      >
        {isLeft ? (
          <MilestoneCard milestone={milestone} />
        ) : (
          // Spacer on left for right-aligned cards
          <div />
        )}
      </div>

      {/* Center line + dot */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Dot */}
        <div
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            backgroundColor: isCurrent ? "var(--accent)" : "var(--border-2)",
            boxShadow: isCurrent
              ? "0 0 12px rgba(14,165,233,0.5)"
              : "none",
            flexShrink: 0,
            marginTop: "10px",
            zIndex: 1,
          }}
        />
        {/* Connecting line downward */}
        <div
          style={{
            width: "2px",
            flex: 1,
            minHeight: "40px",
            backgroundColor: "var(--border)",
            marginTop: "4px",
          }}
        />
      </div>

      {/* Right column */}
      <div
        style={{
          paddingLeft: "20px",
          paddingTop: "6px",
        }}
      >
        {!isLeft ? (
          <MilestoneCard milestone={milestone} />
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

function MilestoneCard({ milestone }: { milestone: (typeof milestones)[number] }) {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        padding: "20px 24px",
        maxWidth: "400px",
        width: "100%",
      }}
    >
      {/* Year badge */}
      <div style={{ marginBottom: "10px" }}>
        <span
          style={{
            background: "var(--gradient)",
            color: "#fff",
            fontFamily: "var(--font-geist-mono)",
            fontSize: "12px",
            borderRadius: "99px",
            padding: "4px 12px",
            display: "inline-block",
          }}
        >
          {milestone.year}
        </span>
      </div>

      {/* Icon + Title */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "4px",
        }}
      >
        <span style={{ fontSize: "18px", lineHeight: 1 }}>{milestone.icon}</span>
        <h3
          style={{
            fontSize: "15px",
            fontWeight: 600,
            color: "var(--text)",
            margin: 0,
          }}
        >
          {milestone.title}
        </h3>
      </div>

      {/* Subtitle */}
      <p
        style={{
          fontSize: "12px",
          fontFamily: "var(--font-geist-mono)",
          color: "var(--accent)",
          margin: "0 0 10px",
          lineHeight: 1.4,
        }}
      >
        {milestone.subtitle}
      </p>

      {/* Description */}
      <p
        style={{
          fontSize: "13px",
          color: "var(--muted)",
          lineHeight: 1.65,
          margin: 0,
        }}
      >
        {milestone.desc}
      </p>
    </div>
  );
}

// ── Mobile fallback: single-column layout ─────────────────────────────────────

function MilestoneItemMobile({ milestone, index }: MilestoneItemProps) {
  const { ref, inView } = useItemInView(0.1);

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        gap: "16px",
        marginBottom: "32px",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : "translateX(-24px)",
        transition: "opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1)",
        transitionDelay: `${index * 60}ms`,
      }}
    >
      {/* Left: dot + line */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: milestone.type === "current" ? "var(--accent)" : "var(--border-2)",
            boxShadow:
              milestone.type === "current" ? "0 0 12px rgba(14,165,233,0.5)" : "none",
            marginTop: "8px",
            flexShrink: 0,
          }}
        />
        <div
          style={{
            width: "2px",
            flex: 1,
            minHeight: "24px",
            backgroundColor: "var(--border)",
            marginTop: "4px",
          }}
        />
      </div>

      {/* Card */}
      <div style={{ flex: 1, paddingBottom: "8px" }}>
        <MilestoneCard milestone={milestone} />
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function Timeline() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <section
      id="perjalanan"
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "96px 48px",
        borderTop: "1px solid var(--border)",
      }}
    >
      <Label>Perjalanan</Label>

      <div style={{ marginBottom: "16px" }}>
        <h2
          style={{
            fontSize: "clamp(24px, 4vw, 36px)",
            fontWeight: 700,
            color: "var(--text)",
            marginBottom: "12px",
            lineHeight: 1.2,
          }}
        >
          Dari Bangku SMK{" "}
          <span
            style={{
              background: "var(--gradient-text)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            ke Sistem Nasional
          </span>
        </h2>
        <p
          style={{
            fontSize: "15px",
            color: "var(--muted)",
            lineHeight: 1.7,
            maxWidth: "520px",
          }}
        >
          Enam titik yang membentuk cara saya berpikir tentang software dan sistem.
        </p>
      </div>

      {/* Timeline */}
      <div
        style={{
          position: "relative",
          marginTop: "56px",
        }}
      >
        {/* Center vertical line — desktop only */}
        {!isMobile && (
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: "2px",
              backgroundColor: "var(--border)",
              transform: "translateX(-50%)",
              zIndex: 0,
            }}
          />
        )}

        {milestones.map((m, i) =>
          isMobile ? (
            <MilestoneItemMobile key={m.year + m.title} milestone={m} index={i} />
          ) : (
            <MilestoneItem key={m.year + m.title} milestone={m} index={i} />
          )
        )}
      </div>
    </section>
  );
}
