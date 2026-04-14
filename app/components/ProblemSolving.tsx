"use client";

import { useState } from "react";

// ── Data ──────────────────────────────────────────────────────────────────────

const challenges = [
  {
    id: "transfer-db",
    label: "Data Transfer",
    problem:
      "Perlu migrasi jutaan record antar database tanpa downtime dan tanpa kehilangan data — sistem tidak boleh berhenti karena masih dipakai user.",
    solution:
      "Buat sistem transfer batch dengan checksum validasi per-chunk, rollback mechanism, dan progress tracking. Jalankan di luar jam kerja dengan monitoring real-time. Zero data loss.",
    impact: "Jutaan record · Zero downtime · Validasi otomatis",
    tags: ["PostgreSQL", "NestJS", "Batch Processing"],
  },
  {
    id: "epresensi-load",
    label: "10K req/hari",
    problem:
      "e-Presensi perlu memproses 10.000 request/hari dari Microsoft Teams API — validasi absensi, parsing data meeting, dan sync ke database — tanpa bottleneck.",
    solution:
      "Implementasi queue-based processing dengan prioritas, Redis caching untuk data meeting yang sering diakses, dan retry mechanism untuk request yang gagal dari Teams API.",
    impact: "10K request/hari · Eliminasi input manual · 6K+ users",
    tags: ["Microsoft Graph API", "Redis", "NestJS", "Queue"],
  },
  {
    id: "srs-scale",
    label: "Skala 400K+",
    problem:
      "SRS harus serve 400.000+ mahasiswa se-Indonesia secara real-time — jadwal TTM, data kelas, penugasan tutor — dengan latency rendah.",
    solution:
      "Arsitektur microservice: service-transaksi, service-referensi, service-report terpisah. Redis caching agresif untuk data yang sering dibaca. 39 UPBJJ, satu sistem.",
    impact: "400K+ mahasiswa · 39 UPBJJ · 8.411 commit",
    tags: ["Microservices", "Redis", "PostgreSQL", "Vue.js"],
  },
  {
    id: "kurikulum-uat",
    label: "Zero Spreadsheet",
    problem:
      "Sistem kurikulum UT masih di spreadsheet — data tidak konsisten, audit sulit, dan proses perubahan kurikulum butuh koordinasi manual lintas unit.",
    solution:
      "Digitalisasi penuh dengan UAT langsung bersama staf akademik. Bangun struktur data yang fleksibel untuk berbagai jenis mata kuliah, SKS, dan jalur studi. Sekarang jadi fondasi data seluruh sistem akademik UT.",
    impact: "Eliminasi spreadsheet · UAT langsung user · Fondasi data UT",
    tags: ["NestJS", "Nuxt.js", "PostgreSQL", "UAT"],
  },
];

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

type ChallengeCardProps = {
  challenge: (typeof challenges)[number];
};

function ChallengeCard({ challenge }: ChallengeCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--surface)",
        border: `1px solid ${hovered ? "var(--border-2)" : "var(--border)"}`,
        borderRadius: "12px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        boxShadow: hovered ? "var(--shadow-md)" : "none",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
      }}
    >
      {/* Label pill */}
      <div>
        <span
          style={{
            display: "inline-block",
            background: "var(--accent-dim)",
            color: "var(--accent)",
            fontFamily: "var(--font-geist-mono)",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            borderRadius: "99px",
            padding: "3px 12px",
          }}
        >
          {challenge.label}
        </span>
      </div>

      {/* Problem */}
      <div>
        <div
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: "10px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--muted-2)",
            marginBottom: "6px",
          }}
        >
          PROBLEM:
        </div>
        <p
          style={{
            fontSize: "14px",
            color: "var(--muted)",
            lineHeight: 1.65,
            margin: 0,
          }}
        >
          {challenge.problem}
        </p>
      </div>

      {/* Solution */}
      <div>
        <div
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: "10px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--muted-2)",
            marginBottom: "6px",
          }}
        >
          SOLUSI:
        </div>
        <p
          style={{
            fontSize: "14px",
            color: "var(--text)",
            lineHeight: 1.65,
            margin: 0,
          }}
        >
          {challenge.solution}
        </p>
      </div>

      {/* Impact */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "6px",
        }}
      >
        <span
          style={{
            color: "var(--accent)",
            fontSize: "12px",
            flexShrink: 0,
            marginTop: "1px",
          }}
        >
          ✦
        </span>
        <span
          style={{
            fontSize: "13px",
            color: "var(--accent)",
            fontWeight: 500,
            lineHeight: 1.5,
          }}
        >
          {challenge.impact}
        </span>
      </div>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "auto" }}>
        {challenge.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: "11px",
              color: "var(--muted)",
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
              borderRadius: "4px",
              padding: "2px 8px",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ProblemSolving() {
  return (
    <section
      id="problem-solving"
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "96px 48px",
        borderTop: "1px solid var(--border)",
      }}
    >
      <Label>Problem Solving</Label>

      {/* Section heading */}
      <div style={{ marginBottom: "56px" }}>
        <h2
          style={{
            fontSize: "clamp(22px, 4vw, 34px)",
            fontWeight: 700,
            color: "var(--text)",
            marginBottom: "12px",
            lineHeight: 1.2,
          }}
        >
          Masalah yang Pernah{" "}
          <span
            style={{
              background: "var(--gradient-text)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Saya Solve
          </span>
        </h2>
        <p
          style={{
            fontSize: "15px",
            color: "var(--muted)",
            lineHeight: 1.7,
            maxWidth: "480px",
            margin: 0,
          }}
        >
          Bukan semua challenge menarik. Tapi ini yang bikin saya belajar paling banyak.
        </p>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 460px), 1fr))",
          gap: "20px",
        }}
      >
        {challenges.map((c) => (
          <ChallengeCard key={c.id} challenge={c} />
        ))}
      </div>
    </section>
  );
}
