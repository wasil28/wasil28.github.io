"use client";

import { useState } from "react";
import { useIsMobile } from "../hooks/useIsMobile";

const stackData = [
  {
    category: "Frontend",
    items: [
      { name: "Vue.js / Nuxt.js", level: "expert" },
      { name: "TypeScript", level: "expert" },
      { name: "React / Next.js", level: "proficient" },
      { name: "HTML5, CSS3, SASS", level: "expert" },
      { name: "Tailwind CSS", level: "expert" },
      { name: "Bootstrap, Quasar", level: "proficient" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "NestJS", level: "expert" },
      { name: "Node.js", level: "expert" },
      { name: "Laravel / CodeIgniter", level: "proficient" },
      { name: "Django / Django REST", level: "proficient" },
      { name: "PHP", level: "proficient" },
      { name: "Python", level: "familiar" },
    ],
  },
  {
    category: "Database & Infrastruktur",
    items: [
      { name: "PostgreSQL", level: "expert" },
      { name: "MySQL", level: "expert" },
      { name: "Redis", level: "proficient" },
      { name: "Docker", level: "proficient" },
      { name: "Nginx, CI/CD", level: "proficient" },
      { name: "Informix", level: "familiar" },
    ],
  },
  {
    category: "Integrasi & API",
    items: [
      { name: "Microsoft Graph API", level: "expert" },
      { name: "REST API", level: "expert" },
      { name: "RabbitMQ", level: "proficient" },
      { name: "GraphQL", level: "familiar" },
      { name: "Google API", level: "proficient" },
      { name: "Microsoft Azure", level: "familiar" },
    ],
  },
  {
    category: "Perkakas & AI",
    items: [
      { name: "Claude Code", level: "expert" },
      { name: "Cursor", level: "proficient" },
      { name: "GitHub Copilot", level: "proficient" },
      { name: "Git", level: "expert" },
      { name: "Figma", level: "familiar" },
      { name: "Flutter", level: "familiar" },
    ],
  },
];

const levelColor: Record<string, string> = {
  expert: "var(--accent)",   /* lavender */
  proficient: "var(--accent-2)",
  familiar: "var(--muted)",
};

const levelLabel: Record<string, string> = {
  expert: "Expert",
  proficient: "Proficient",
  familiar: "Familiar",
};

/* ── Mobile collapsible group ── */
function MobileAccordion({
  group,
  open,
  onToggle,
}: {
  group: (typeof stackData)[number];
  open: boolean;
  onToggle: () => void;
}) {
  const expertCount = group.items.filter((i) => i.level === "expert").length;

  return (
    <div
      style={{
        backgroundColor: "var(--surface)",
        border: `1px solid ${open ? "var(--border-2)" : "var(--border)"}`,
        borderRadius: "10px",
        overflow: "hidden",
        transition: "border-color 0.2s",
      }}
    >
      {/* Header row — always visible */}
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 18px",
          background: "none",
          border: "none",
          cursor: "pointer",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1, minWidth: 0 }}>
          <span
            style={{
              fontSize: "12px",
              fontFamily: "var(--font-geist-mono)",
              color: open ? "var(--accent)" : "var(--muted)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontWeight: 600,
              transition: "color 0.2s",
            }}
          >
            {group.category}
          </span>
          <span
            style={{
              fontSize: "11px",
              color: "var(--muted)",
              fontFamily: "var(--font-geist-mono)",
            }}
          >
            {group.items.length} item{expertCount > 0 ? ` · ${expertCount} expert` : ""}
          </span>
        </div>
        <span
          style={{
            fontSize: "16px",
            color: "var(--accent)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.25s cubic-bezier(0.16,1,0.3,1)",
            flexShrink: 0,
            lineHeight: 1,
          }}
        >
          ↓
        </span>
      </button>

      {/* Expandable items */}
      <div
        style={{
          maxHeight: open ? `${group.items.length * 48}px` : "0px",
          overflow: "hidden",
          transition: "max-height 0.3s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0",
            borderTop: "1px solid var(--border)",
            padding: "8px 0",
          }}
        >
          {group.items.map((item) => (
            <div
              key={item.name}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 18px",
              }}
            >
              <span style={{ fontSize: "13px", color: "var(--text)" }}>{item.name}</span>
              <span
                style={{
                  fontSize: "11px",
                  color: levelColor[item.level],
                  fontFamily: "var(--font-geist-mono)",
                  flexShrink: 0,
                }}
              >
                {levelLabel[item.level]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Stack() {
  const isMobile = useIsMobile();
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleCategory = (cat: string) =>
    setOpenCategory((prev) => (prev === cat ? null : cat));

  return (
    <section
      id="stack"
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "96px 48px",
        borderTop: "1px solid var(--border)",
      }}
    >
      <Label>Tech Stack</Label>

      {isMobile ? (
        /* Mobile: accordion */
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {stackData.map((group) => (
            <MobileAccordion
              key={group.category}
              group={group}
              open={openCategory === group.category}
              onToggle={() => toggleCategory(group.category)}
            />
          ))}
        </div>
      ) : (
        /* Desktop: card grid */
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {stackData.map((group) => (
            <div
              key={group.category}
              style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                padding: "20px",
              }}
            >
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
                {group.category}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {group.items.map((item) => (
                  <div
                    key={item.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span style={{ fontSize: "13px", color: "var(--text)" }}>{item.name}</span>
                    <span
                      style={{
                        fontSize: "11px",
                        color: levelColor[item.level],
                        fontFamily: "var(--font-geist-mono)",
                      }}
                    >
                      {levelLabel[item.level]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Legend */}
      <div
        style={{
          display: "flex",
          gap: "24px",
          marginTop: "24px",
          flexWrap: "wrap",
        }}
      >
        {Object.entries(levelLabel).map(([key, label]) => (
          <div
            key={key}
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: levelColor[key],
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontSize: "12px",
                color: "var(--muted)",
                fontFamily: "var(--font-geist-mono)",
              }}
            >
              {label}
            </span>
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
