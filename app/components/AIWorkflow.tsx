"use client";

import { useIsMobile } from "../hooks/useIsMobile";

const tools = [
  {
    name: "Claude Code",
    role: "Arsitektur & reasoning kompleks",
    desc: "Untuk merancang struktur sistem, review logic backend, dan evaluasi trade-off arsitektur. Saya tidak paste output-nya langsung — saya pakai sebagai second opinion teknis.",
    color: "var(--accent)",
  },
  {
    name: "Cursor",
    role: "Coding harian & refactoring",
    desc: "Autocomplete kontekstual yang paham codebase aktif. Sangat berguna untuk refactor komponen besar dan generate boilerplate TypeScript yang konsisten.",
    color: "var(--accent-2)",
  },
  {
    name: "GitHub Copilot",
    role: "In-editor suggestion",
    desc: "Pattern completion untuk kode berulang — query database, handler API, test setup. Efektif untuk mempercepat bagian yang strukturnya sudah jelas.",
    color: "var(--accent)",
  },
];

const principles = [
  {
    label: "Verifikasi selalu",
    desc: "Setiap output AI saya verifikasi sebelum ke production — terutama logic bisnis dan query database.",
  },
  {
    label: "Prompt yang presisi",
    desc: "Saya menulis prompt dengan konteks lengkap: tipe data, constraint sistem, behavior yang diharapkan. Output yang baik dimulai dari prompt yang baik.",
  },
  {
    label: "Tahu batasnya",
    desc: "AI bagus untuk boilerplate, pattern matching, dan brainstorming. Untuk desain sistem dan keputusan arsitektur, saya masih pegang kendali penuh.",
  },
];

export default function AIWorkflow() {
  const isMobile = useIsMobile();
  return (
    <section
      id="ai-workflow"
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "96px 48px",
        borderTop: "1px solid var(--border)",
      }}
    >
      <Label>Alur Kerja AI</Label>

      <p
        style={{
          fontSize: "16px",
          color: "var(--muted)",
          lineHeight: 1.75,
          marginBottom: "40px",
          maxWidth: "560px",
        }}
      >
        AI coding tools bukan shortcut — ini multiplier. Saya menggunakannya setiap hari
        sebagai bagian integral dari workflow, bukan sebagai pelengkap.
      </p>

      {/* Tools */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "48px" }}>
        {tools.map((tool) => (
          <div
            key={tool.name}
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "140px 1fr",
              gap: isMobile ? "8px" : "24px",
              padding: "20px",
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              alignItems: "start",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: tool.color,
                  fontFamily: "var(--font-geist-mono)",
                  marginBottom: "4px",
                }}
              >
                {tool.name}
              </div>
              <div style={{ fontSize: "11px", color: "var(--muted)" }}>{tool.role}</div>
            </div>
            <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.65, margin: 0 }}>
              {tool.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Principles */}
      <div
        style={{
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "8px",
          padding: "24px",
        }}
      >
        <div
          style={{
            fontSize: "11px",
            fontFamily: "var(--font-geist-mono)",
            color: "var(--muted)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: "20px",
          }}
        >
          Prinsip penggunaan
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {principles.map((p) => (
            <div
              key={p.label}
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: "16px",
                alignItems: "start",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "var(--accent)",
                  display: "inline-block",
                  marginTop: "6px",
                  flexShrink: 0,
                }}
              />
              <div>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text)" }}>
                  {p.label}
                </span>
                <span style={{ fontSize: "13px", color: "var(--muted)" }}> — {p.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
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
