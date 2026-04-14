"use client";

import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "../hooks/useIsMobile";

const skills = [
  { label: "Frontend", score: 90 },
  { label: "Backend", score: 88 },
  { label: "API Integration", score: 92 },
  { label: "System Design", score: 82 },
  { label: "DevOps/Infra", score: 72 },
  { label: "Analysis & BA", score: 80 },
];

const CX = 180;
const CY = 180;
const RADIUS = 130;
const TOTAL = skills.length;

function polarToXY(angle: number, radius: number, cx: number, cy: number) {
  const rad = (angle - 90) * (Math.PI / 180);
  return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
}

function buildPolygonPoints(scores: number[], maxRadius: number): string {
  return skills
    .map((_, i) => {
      const angle = i * (360 / TOTAL);
      const r = (scores[i] / 100) * maxRadius;
      const { x, y } = polarToXY(angle, r, CX, CY);
      return `${x},${y}`;
    })
    .join(" ");
}

function buildGridPoints(pct: number, maxRadius: number): string {
  return skills
    .map((_, i) => {
      const angle = i * (360 / TOTAL);
      const { x, y } = polarToXY(angle, pct * maxRadius, CX, CY);
      return `${x},${y}`;
    })
    .join(" ");
}

export default function RadarChart() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [animatedScores, setAnimatedScores] = useState<number[]>(
    skills.map(() => 0)
  );
  const isMobile = useIsMobile();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    const duration = 1200;
    const start = performance.now();

    function frame(now: number) {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);

      setAnimatedScores(skills.map((s) => s.score * eased));

      if (t < 1) {
        requestAnimationFrame(frame);
      }
    }

    requestAnimationFrame(frame);
  }, [inView]);

  const dataPoints = skills.map((_, i) => {
    const angle = i * (360 / TOTAL);
    const r = (animatedScores[i] / 100) * RADIUS;
    return polarToXY(angle, r, CX, CY);
  });

  const axisEndpoints = skills.map((_, i) => {
    const angle = i * (360 / TOTAL);
    return polarToXY(angle, RADIUS, CX, CY);
  });

  const labelPositions = skills.map((_, i) => {
    const angle = i * (360 / TOTAL);
    return polarToXY(angle, RADIUS + 22, CX, CY);
  });

  return (
    <section
      id="radar"
      ref={sectionRef}
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "96px 48px",
        borderTop: "1px solid var(--border)",
      }}
    >
      <Label>Profil Kemampuan</Label>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "380px 1fr",
          gap: isMobile ? "32px" : "64px",
          alignItems: "center",
        }}
      >
        {/* SVG Radar */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <svg
            width={isMobile ? "280" : "360"}
            height={isMobile ? "280" : "360"}
            viewBox="0 0 360 360"
            style={{ overflow: "visible", maxWidth: "100%" }}
            aria-label="Radar chart kemampuan teknis"
          >
            {/* Grid polygons at 25%, 50%, 75%, 100% */}
            {[0.25, 0.5, 0.75, 1].map((pct) => (
              <polygon
                key={pct}
                points={buildGridPoints(pct, RADIUS)}
                fill="none"
                stroke="var(--border)"
                strokeWidth="1"
                opacity={pct === 1 ? 0.8 : 0.5}
              />
            ))}

            {/* Axis lines */}
            {axisEndpoints.map((ep, i) => (
              <line
                key={i}
                x1={CX}
                y1={CY}
                x2={ep.x}
                y2={ep.y}
                stroke="var(--border-2)"
                strokeWidth="1"
                opacity="0.5"
              />
            ))}

            {/* Data polygon */}
            <polygon
              points={buildPolygonPoints(animatedScores, RADIUS)}
              fill="rgba(14,165,233,0.12)"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            {/* Data vertex circles and score labels */}
            {dataPoints.map((pt, i) => (
              <g key={i}>
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="4"
                  fill="var(--accent)"
                  stroke="var(--bg)"
                  strokeWidth="1.5"
                />
                {animatedScores[i] > 5 && (
                  <text
                    x={pt.x}
                    y={pt.y - 10}
                    textAnchor="middle"
                    fontSize="10"
                    fontFamily="var(--font-geist-mono)"
                    fill="var(--accent)"
                    fontWeight="600"
                  >
                    {Math.round(animatedScores[i])}
                  </text>
                )}
              </g>
            ))}

            {/* Axis labels */}
            {skills.map((skill, i) => {
              const lp = labelPositions[i];
              // Determine text anchor based on horizontal position
              const angle = i * (360 / TOTAL);
              let anchor: "start" | "middle" | "end" = "middle";
              if (angle > 15 && angle < 165) anchor = "start";
              if (angle > 195 && angle < 345) anchor = "end";

              return (
                <text
                  key={skill.label}
                  x={lp.x}
                  y={lp.y}
                  textAnchor={anchor}
                  dominantBaseline="middle"
                  fontSize="11"
                  fontFamily="var(--font-geist-mono)"
                  fill="var(--muted)"
                  letterSpacing="0.02em"
                >
                  {skill.label}
                </text>
              );
            })}

            {/* Grid pct labels on top axis */}
            {[25, 50, 75, 100].map((pct) => {
              const { y } = polarToXY(0, (pct / 100) * RADIUS, CX, CY);
              return (
                <text
                  key={pct}
                  x={CX + 4}
                  y={y}
                  fontSize="9"
                  fontFamily="var(--font-geist-mono)"
                  fill="var(--muted)"
                  opacity="0.6"
                >
                  {pct}
                </text>
              );
            })}
          </svg>
        </div>

        {/* Skill list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <p
            style={{
              fontSize: "14px",
              color: "var(--muted)",
              lineHeight: 1.7,
              marginBottom: "8px",
            }}
          >
            Penilaian mandiri berdasarkan pengalaman produksi nyata — bukan sertifikasi atau kuis online.
          </p>

          {skills.map((skill, i) => {
            const displayScore = Math.round(animatedScores[i]);
            const barWidth = animatedScores[i];

            return (
              <div key={skill.label}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "6px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "13px",
                      color: "var(--text)",
                      fontWeight: 500,
                    }}
                  >
                    {skill.label}
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      fontFamily: "var(--font-geist-mono)",
                      color: "var(--accent)",
                      fontWeight: 600,
                    }}
                  >
                    {displayScore}
                  </span>
                </div>
                <div
                  style={{
                    height: "4px",
                    borderRadius: "2px",
                    backgroundColor: "var(--border)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${barWidth}%`,
                      borderRadius: "2px",
                      background: "var(--gradient)",
                      transition: "width 0.05s linear",
                    }}
                  />
                </div>
              </div>
            );
          })}

          {/* Catatan */}
          <div
            style={{
              marginTop: "8px",
              padding: "14px 16px",
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              borderLeft: "3px solid var(--accent)",
            }}
          >
            <p
              style={{
                fontSize: "12px",
                color: "var(--muted)",
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              Skor &gt;85 berarti sudah dipakai di production, pernah debug-nya secara mendalam, dan nyaman mengajari orang lain.
            </p>
          </div>
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
