"use client";

export default function About() {
  return (
    <section
      id="tentang"
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "96px 48px",
      }}
    >
      <Label>Tentang</Label>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "48px" }}>
        <div>
          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.75,
              color: "var(--text)",
              marginBottom: "20px",
            }}
          >
            Saya adalah seorang{" "}
            <span style={{ color: "var(--accent)" }}>Fullstack Developer</span> dengan
            pengalaman 4+ tahun membangun sistem digital yang benar-benar dipakai — bukan
            hanya prototype. Dari aplikasi presensi untuk 6.000+ dosen dan tutor hingga
            sistem rekam data mahasiswa skala nasional di Universitas Terbuka.
          </p>
          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.75,
              color: "var(--muted)",
              marginBottom: "20px",
            }}
          >
            Spesialisasi saya ada di ekosistem TypeScript modern — NestJS di backend,
            Vue/Nuxt di frontend, PostgreSQL + Redis untuk data. Saya terbiasa kerja
            langsung dengan pengguna, mulai dari analisis kebutuhan, UAT, sampai iterasi
            desain yang berpusat pada pengguna nyata.
          </p>
          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.75,
              color: "var(--muted)",
            }}
          >
            Sehari-hari saya menggunakan AI coding tools — Claude Code, Cursor, GitHub
            Copilot — bukan sebagai shortcut, tapi sebagai multiplier. Saya tahu kapan
            output AI bisa dipercaya dan kapan harus ditulis ulang dari awal.
          </p>
        </div>

        {/* Highlights */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "16px",
          }}
        >
          {[
            {
              icon: "⚡",
              title: "Enterprise-ready",
              desc: "Integrasi Microsoft Teams, Google API, REST API skala produksi",
            },
            {
              icon: "🏗️",
              title: "Full-stack",
              desc: "Backend NestJS + frontend Vue/Nuxt, satu orang dari database sampai UI",
            },
            {
              icon: "👥",
              title: "User-centric",
              desc: "Kolaborasi langsung dengan pengguna akhir, UAT, iterasi berbasis feedback nyata",
            },
            {
              icon: "🤖",
              title: "AI-augmented",
              desc: "Claude Code, Cursor, Copilot sebagai bagian workflow harian",
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                padding: "20px",
                transition: "border-color 0.15s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor = "rgba(14,165,233,0.25)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")
              }
            >
              <div style={{ fontSize: "20px", marginBottom: "8px" }}>{item.icon}</div>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "var(--text)",
                  marginBottom: "6px",
                }}
              >
                {item.title}
              </div>
              <div style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.6 }}>
                {item.desc}
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
