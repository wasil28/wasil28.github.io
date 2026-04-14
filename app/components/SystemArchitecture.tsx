const nodes = {
  teams: {
    icon: "🎥",
    title: "Microsoft Teams",
    subtitle: "Sumber data presensi",
    detail: "Meeting online & join logs",
  },
  graphApi: {
    icon: "🔗",
    title: "Microsoft Graph API",
    subtitle: "Integrasi cloud",
    detail: "OAuth 2.0 · REST · Webhooks",
  },
  backend: {
    icon: "⚙️",
    title: "e-Presensi NestJS",
    subtitle: "Core backend sistem",
    detail: "TypeScript · REST API · Scheduler",
  },
  postgres: {
    icon: "🗄️",
    title: "PostgreSQL",
    subtitle: "Penyimpanan utama",
    detail: "Relational · ACID · Queries",
  },
  flutter: {
    icon: "📱",
    title: "Flutter Mobile App",
    subtitle: "Antarmuka tutor",
    detail: "Android · Google Play Store",
  },
};

function NodeCard({
  icon,
  title,
  subtitle,
  detail,
  highlight = false,
}: {
  icon: string;
  title: string;
  subtitle: string;
  detail: string;
  highlight?: boolean;
}) {
  return (
    <div
      style={{
        backgroundColor: "var(--surface)",
        border: `1px solid ${highlight ? "var(--accent)" : "var(--border)"}`,
        borderRadius: "10px",
        padding: "16px 20px",
        minWidth: "148px",
        boxShadow: highlight ? "0 0 16px rgba(14,165,233,0.15)" : "var(--shadow-sm)",
        position: "relative",
      }}
    >
      {highlight && (
        <div
          style={{
            position: "absolute",
            top: "-1px",
            left: "20px",
            right: "20px",
            height: "2px",
            background: "var(--gradient)",
            borderRadius: "0 0 2px 2px",
          }}
        />
      )}
      <div style={{ fontSize: "22px", marginBottom: "8px", lineHeight: 1 }}>{icon}</div>
      <div
        style={{
          fontSize: "13px",
          fontWeight: 600,
          color: "var(--text)",
          marginBottom: "3px",
          lineHeight: 1.3,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: "11px",
          color: highlight ? "var(--accent)" : "var(--muted)",
          marginBottom: "6px",
          lineHeight: 1.4,
        }}
      >
        {subtitle}
      </div>
      <div
        style={{
          fontSize: "10px",
          color: "var(--muted)",
          fontFamily: "var(--font-geist-mono)",
          lineHeight: 1.5,
          opacity: 0.8,
        }}
      >
        {detail}
      </div>
    </div>
  );
}

function Arrow({ vertical = false }: { vertical?: boolean }) {
  if (vertical) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2px",
          padding: "4px 0",
        }}
      >
        <div
          style={{
            width: "1px",
            height: "28px",
            backgroundColor: "var(--accent)",
            opacity: 0.6,
          }}
        />
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          style={{ display: "block" }}
        >
          <path
            d="M0 0 L5 6 L10 0"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.7"
          />
        </svg>
      </div>
    );
  }
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "2px",
        padding: "0 4px",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: "28px",
          height: "1px",
          backgroundColor: "var(--accent)",
          opacity: 0.6,
        }}
      />
      <svg
        width="6"
        height="10"
        viewBox="0 0 6 10"
        style={{ display: "block" }}
      >
        <path
          d="M0 0 L6 5 L0 10"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.7"
        />
      </svg>
    </div>
  );
}

function Badge({
  children,
  color = "var(--accent)",
  bg = "rgba(14,165,233,0.1)",
  dashed = false,
}: {
  children: React.ReactNode;
  color?: string;
  bg?: string;
  dashed?: boolean;
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        padding: "4px 10px",
        backgroundColor: bg,
        border: `1px ${dashed ? "dashed" : "solid"} ${color}`,
        borderRadius: "6px",
        fontSize: "11px",
        fontFamily: "var(--font-geist-mono)",
        color: color,
        lineHeight: 1,
      }}
    >
      {children}
    </div>
  );
}

export default function SystemArchitecture() {
  return (
    <section
      id="arsitektur"
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "96px 48px",
        borderTop: "1px solid var(--border)",
      }}
    >
      <Label>Arsitektur Sistem</Label>

      <p
        style={{
          fontSize: "14px",
          color: "var(--muted)",
          lineHeight: 1.7,
          marginBottom: "48px",
          maxWidth: "560px",
        }}
      >
        Studi kasus: e-Presensi Tutor UT — dari Microsoft Teams ke mobile app.
      </p>

      {/* Main flow diagram */}
      <div
        style={{
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "14px",
          padding: "40px 36px",
          boxShadow: "var(--shadow-sm)",
          overflowX: "auto",
          WebkitOverflowScrolling: "touch" as React.CSSProperties["WebkitOverflowScrolling"],
        }}
      >
        {/* Top annotation row */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            marginBottom: "28px",
            flexWrap: "wrap",
          }}
        >
          <Badge dashed>🔒 OAuth 2.0</Badge>
          <Badge color="#22C55E" bg="rgba(34,197,94,0.08)">
            ✓ 10K req/hari
          </Badge>
          <Badge color="var(--accent-3)" bg="rgba(6,182,212,0.08)">
            ⚡ Redis Cache
          </Badge>
          <Badge color="var(--muted)" bg="var(--surface-2)" dashed>
            🐳 Docker · Nginx
          </Badge>
        </div>

        {/* Horizontal flow: Teams → Graph API → NestJS → PostgreSQL */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "nowrap",
            gap: "0",
            marginBottom: "0",
            minWidth: "560px",
          }}
        >
          {/* Teams */}
          <NodeCard
            icon={nodes.teams.icon}
            title={nodes.teams.title}
            subtitle={nodes.teams.subtitle}
            detail={nodes.teams.detail}
          />

          <Arrow />

          {/* Graph API */}
          <NodeCard
            icon={nodes.graphApi.icon}
            title={nodes.graphApi.title}
            subtitle={nodes.graphApi.subtitle}
            detail={nodes.graphApi.detail}
          />

          <Arrow />

          {/* NestJS Backend — highlighted as core */}
          <div style={{ position: "relative" }}>
            <NodeCard
              icon={nodes.backend.icon}
              title={nodes.backend.title}
              subtitle={nodes.backend.subtitle}
              detail={nodes.backend.detail}
              highlight
            />

            {/* Dashed vertical connector down to Flutter — positioned absolutely */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "100%",
                transform: "translateX(-50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "1px",
                  height: "32px",
                  borderLeft: "1px dashed var(--accent-3)",
                  opacity: 0.6,
                }}
              />
              <svg width="10" height="6" viewBox="0 0 10 6">
                <path
                  d="M0 0 L5 6 L10 0"
                  fill="none"
                  stroke="var(--accent-3)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.7"
                />
              </svg>
            </div>
          </div>

          <Arrow />

          {/* PostgreSQL */}
          <NodeCard
            icon={nodes.postgres.icon}
            title={nodes.postgres.title}
            subtitle={nodes.postgres.subtitle}
            detail={nodes.postgres.detail}
          />
        </div>

        {/* Bottom row: Flutter (aligned under NestJS) */}
        <div
          style={{
            marginTop: "40px",
            display: "flex",
          }}
        >
          {/*
            Spacer to push Flutter under NestJS.
            Teams (≈148px) + Arrow (≈40px) + GraphAPI (≈148px) + Arrow (≈40px) = ~376px
          */}
          <div style={{ width: "376px", flexShrink: 0 }} />

          <NodeCard
            icon={nodes.flutter.icon}
            title={nodes.flutter.title}
            subtitle={nodes.flutter.subtitle}
            detail={nodes.flutter.detail}
          />
        </div>

        {/* Legend / notes */}
        <div
          style={{
            marginTop: "36px",
            paddingTop: "24px",
            borderTop: "1px solid var(--border)",
            display: "flex",
            gap: "32px",
            flexWrap: "wrap",
          }}
        >
          {[
            { dot: "var(--accent)", label: "Alur data utama" },
            { dot: "var(--accent-3)", label: "Alur ke mobile (dashed)", dashed: true },
            { dot: "#22C55E", label: "Sistem aktif produksi" },
          ].map((item) => (
            <div
              key={item.label}
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              {item.dashed ? (
                <div
                  style={{
                    width: "18px",
                    height: "1px",
                    borderBottom: `1px dashed ${item.dot}`,
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "18px",
                    height: "1px",
                    backgroundColor: item.dot,
                    opacity: 0.7,
                  }}
                />
              )}
              <span
                style={{
                  fontSize: "11px",
                  color: "var(--muted)",
                  fontFamily: "var(--font-geist-mono)",
                }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Supplementary tech notes */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "16px",
          marginTop: "24px",
        }}
      >
        {[
          {
            title: "Scheduling & Cron",
            desc: "Job otomatis untuk sync data presensi dari Graph API setiap interval — tanpa intervensi manual.",
            color: "var(--accent)",
          },
          {
            title: "Redis Caching",
            desc: "Response API di-cache untuk mengurangi beban ke Microsoft Graph dan mempercepat query mobile.",
            color: "var(--accent-3)",
          },
          {
            title: "Audit Trail",
            desc: "Setiap perubahan data presensi dicatat — untuk kebutuhan rekonsiliasi dan akuntabilitas akademik.",
            color: "var(--accent-2)",
          },
        ].map((note) => (
          <div
            key={note.title}
            style={{
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
              borderLeft: `3px solid ${note.color}`,
              borderRadius: "8px",
              padding: "16px 18px",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--text)",
                marginBottom: "6px",
              }}
            >
              {note.title}
            </div>
            <p
              style={{
                fontSize: "12px",
                color: "var(--muted)",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {note.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Mobile responsive styles injected via style tag */}
      <style>{`
        @media (max-width: 640px) {
          #arsitektur [data-flow] {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
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
