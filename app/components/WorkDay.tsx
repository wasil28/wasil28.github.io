"use client";

import { useState } from "react";
import { useIsMobile } from "../hooks/useIsMobile";

const activities = [
  {
    label: "Coding & Implementasi",
    pct: 35,
    color: "var(--accent)",
    desc: "Feature baru, bugfix, refactor. Bagian terbesar — tapi bukan satu-satunya.",
  },
  {
    label: "Analisis & Debugging",
    pct: 20,
    color: "var(--accent-2)",
    desc: "Baca kode yang sudah ada, trace bug, cari root cause sebelum mulai nulis satu baris pun.",
  },
  {
    label: "Interaksi Langsung User",
    pct: 20,
    color: "var(--accent-3)",
    desc: "UAT bersama staf akademik, klarifikasi kebutuhan, demo ke stakeholder.",
  },
  {
    label: "Arsitektur & Review",
    pct: 15,
    color: "#7DD3FC",
    desc: "Desain sistem, code review, evaluate tradeoff sebelum commit ke pendekatan tertentu.",
  },
  {
    label: "Eksplorasi Teknis",
    pct: 10,
    color: "#BAE6FD",
    desc: "Coba pendekatan baru, proof of concept, baca dokumentasi API yang belum pernah dipakai.",
  },
];

export default function WorkDay() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isMobile = useIsMobile();

  return (
    <section
      id="work-day"
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "96px 48px",
        borderTop: "1px solid var(--border)",
      }}
    >
      <Label>Satu Hari Kerja Saya</Label>

      <p
        style={{
          fontSize: "14px",
          color: "var(--muted)",
          fontFamily: "var(--font-geist-mono)",
          marginBottom: "40px",
          letterSpacing: "0.02em",
        }}
      >
        Estimasi kasar — tergantung sprint dan fase proyek.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? "32px" : "48px",
          alignItems: "start",
        }}
      >
        {/* Left: stacked bar */}
        <div>
          <div
            style={{
              fontSize: "11px",
              fontFamily: "var(--font-geist-mono)",
              color: "var(--muted)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            Distribusi Waktu
          </div>

          {/* Bar chart */}
          <div
            style={{
              height: "24px",
              borderRadius: "12px",
              overflow: "hidden",
              display: "flex",
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            {activities.map((act, i) => (
              <div
                key={act.label}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                title={`${act.label} — ${act.pct}%`}
                style={{
                  width: `${act.pct}%`,
                  backgroundColor: act.color,
                  opacity:
                    hoveredIndex === null || hoveredIndex === i ? 1 : 0.35,
                  transition: "opacity 0.2s ease",
                  cursor: "pointer",
                  position: "relative",
                }}
              />
            ))}
          </div>

          {/* Percentage scale */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "8px",
              paddingLeft: "2px",
              paddingRight: "2px",
            }}
          >
            {[0, 25, 50, 75, 100].map((v) => (
              <span
                key={v}
                style={{
                  fontSize: "10px",
                  color: "var(--muted)",
                  fontFamily: "var(--font-geist-mono)",
                }}
              >
                {v}%
              </span>
            ))}
          </div>

          {/* Segment breakdown list below bar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "28px" }}>
            {activities.map((act, i) => (
              <div
                key={act.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  opacity:
                    hoveredIndex === null || hoveredIndex === i ? 1 : 0.4,
                  transition: "opacity 0.2s ease",
                }}
              >
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: act.color,
                    flexShrink: 0,
                    boxShadow:
                      hoveredIndex === i
                        ? `0 0 8px ${act.color}`
                        : "none",
                    transition: "box-shadow 0.2s ease",
                  }}
                />
                <span
                  style={{
                    fontSize: "12px",
                    color: "var(--muted)",
                    flex: 1,
                  }}
                >
                  {act.label}
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    fontFamily: "var(--font-geist-mono)",
                    color: act.color,
                    fontWeight: 600,
                  }}
                >
                  {act.pct}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: legend cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {activities.map((act, i) => (
            <div
              key={act.label}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                backgroundColor:
                  hoveredIndex === i
                    ? "var(--surface-2)"
                    : "var(--surface)",
                border: `1px solid ${
                  hoveredIndex === i ? act.color : "var(--border)"
                }`,
                borderRadius: "8px",
                padding: "16px 18px",
                cursor: "default",
                transition:
                  "background-color 0.2s ease, border-color 0.2s ease, opacity 0.2s ease",
                opacity:
                  hoveredIndex === null || hoveredIndex === i ? 1 : 0.45,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "6px",
                }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: act.color,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "var(--text)",
                    flex: 1,
                  }}
                >
                  {act.label}
                </span>
                <span
                  style={{
                    fontSize: "13px",
                    fontFamily: "var(--font-geist-mono)",
                    color: act.color,
                    fontWeight: 700,
                  }}
                >
                  {act.pct}%
                </span>
              </div>
              <p
                style={{
                  fontSize: "12px",
                  color: "var(--muted)",
                  lineHeight: 1.6,
                  margin: 0,
                  paddingLeft: "18px",
                }}
              >
                {act.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
      <div
        style={{
          flex: 1,
          height: "1px",
          backgroundColor: "var(--border)",
        }}
      />
    </div>
  );
}
