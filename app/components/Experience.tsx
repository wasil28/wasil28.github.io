const experiences = [
  {
    company: "Universitas Terbuka — Direktorat Sistem Informasi",
    roles: ["Fullstack Developer"],
    period: "Jan 2025 – Sekarang",
    current: true,
    highlights: [
      "Fullstack development untuk sistem-sistem internal UT: frontend, backend, database, dan integrasi API — semuanya end-to-end.",
      "Terlibat langsung dengan user di lapangan: ikut sesi analisis, UAT bersama staf akademik, dan debugging di tempat kalau ada kendala.",
      "Sering eksplorasi teknis mandiri — salah satunya membangun sistem transfer data antar database dengan volume jutaan record yang perlu akurat dan tidak mengganggu operasional.",
      "Masuk ke DSI karena atasan di sini tertarik dengan hasil kerja sebelumnya di proyek-proyek UT.",
    ],
  },
  {
    company: "PT. Mitra Sinerji Tekno",
    roles: ["Tech Leader", "Business Analyst & Developer", "Fullstack Developer"],
    period: "2021 – 2024",
    current: false,
    highlights: [
      "Memimpin tim teknis dalam merancang dan mengimplementasikan solusi untuk klien pemerintah dan pendidikan tinggi.",
      "Berinteraksi langsung dengan klien (kementerian, universitas) untuk analisis kebutuhan dan penerjemahan ke solusi teknis.",
      "Mengembangkan 10+ aplikasi web skala produksi — dari BAPENDA Jabar, PUPR, Kemendikbud, hingga Universitas Terbuka.",
      "Penghargaan Presensi Karyawan Terbaik 2022.",
    ],
  },
  {
    company: "Program 1001 Startup",
    roles: ["Pendiri & Developer"],
    period: "2021",
    current: false,
    highlights: [
      "Mendirikan dan mengembangkan startup, bertanggung jawab atas pengembangan produk dan pengelolaan infrastruktur.",
    ],
  },
  {
    company: "CV. ICOMMITS",
    roles: ["Backend Developer"],
    period: "2020 – 2021",
    current: false,
    highlights: [
      "Mengembangkan dan mengelola sistem backend untuk mendukung performa dan skalabilitas aplikasi.",
    ],
  },
];

const education = [
  {
    institution: "Universitas Terbuka",
    degree: "S1 Sistem Informasi",
    period: "2023 – 2027",
    note: "Sedang berjalan",
  },
  {
    institution: "SMKN 13 Bandung",
    degree: "Rekayasa Perangkat Lunak",
    period: "2018 – 2021",
    note: "IPK: A",
  },
];

export default function Experience() {
  return (
    <section
      id="pengalaman"
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "96px 48px",
        borderTop: "1px solid var(--border)",
      }}
    >
      <Label>Pengalaman</Label>

      {/* Work */}
      <div style={{ position: "relative", marginBottom: "64px" }}>
        {experiences.map((exp, i) => (
          <div
            key={exp.company}
            style={{
              display: "grid",
              gridTemplateColumns: "1px 1fr",
              gap: "0 24px",
              marginBottom: i < experiences.length - 1 ? "0" : "0",
            }}
          >
            {/* Timeline line */}
            <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: exp.current ? "var(--accent)" : "var(--surface-2)",
                  border: `2px solid ${exp.current ? "rgba(167,139,250,0.6)" : "var(--border)"}`,
                  boxShadow: exp.current ? "0 0 10px rgba(167,139,250,0.5)" : "none",
                  position: "absolute",
                  top: "4px",
                  left: "-3px",
                  zIndex: 1,
                }}
              />
              {i < experiences.length - 1 && (
                <div
                  style={{
                    width: "1px",
                    flex: 1,
                    backgroundColor: "var(--border)",
                    marginTop: "16px",
                  }}
                />
              )}
            </div>

            {/* Content */}
            <div style={{ paddingBottom: "40px", paddingLeft: "16px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                  flexWrap: "wrap",
                  gap: "8px",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: "15px",
                      fontWeight: 600,
                      color: "var(--text)",
                      margin: "0 0 4px",
                    }}
                  >
                    {exp.company}
                  </h3>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {exp.roles.map((role) => (
                      <span
                        key={role}
                        style={{
                          fontSize: "11px",
                          color: exp.current ? "var(--accent)" : "var(--muted)",
                          fontFamily: "var(--font-geist-mono)",
                        }}
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "var(--muted)",
                    fontFamily: "var(--font-geist-mono)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {exp.period}
                </div>
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                {exp.highlights.map((h) => (
                  <li
                    key={h}
                    style={{
                      fontSize: "13px",
                      color: "var(--muted)",
                      lineHeight: 1.65,
                      paddingLeft: "16px",
                      position: "relative",
                      marginBottom: "6px",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        color: "var(--accent)",
                        fontFamily: "var(--font-geist-mono)",
                      }}
                    >
                      ›
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Education */}
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
        Pendidikan
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {education.map((edu) => (
          <div
            key={edu.institution}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 20px",
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            <div>
              <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--text)" }}>
                {edu.institution}
              </div>
              <div style={{ fontSize: "12px", color: "var(--muted)" }}>{edu.degree}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  fontSize: "12px",
                  color: "var(--muted)",
                  fontFamily: "var(--font-geist-mono)",
                }}
              >
                {edu.period}
              </div>
              <div style={{ fontSize: "11px", color: "var(--accent)" }}>{edu.note}</div>
            </div>
          </div>
        ))}
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
