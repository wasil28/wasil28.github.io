// No interactivity — no "use client" needed.

// ── Data ──────────────────────────────────────────────────────────────────────

const quote = {
  text: "Dia tidak hanya mengerjakan yang diminta — dia selalu coba pahami kenapa sistem itu perlu ada, baru mulai coding. Itu yang bikin hasilnya beda.",
  name: "Rekan kerja, Direktorat Sistem Informasi UT",
  initials: "DS",
};

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

// ── Main component ────────────────────────────────────────────────────────────

export default function Testimonials() {
  return (
    <section
      id="testimoni"
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "96px 48px",
        borderTop: "1px solid var(--border)",
      }}
    >
      <Label>Kata Rekan Kerja</Label>

      {/* Centered quote card */}
      <div
        style={{
          maxWidth: "640px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "16px",
            padding: "40px",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          {/* Opening quote mark */}
          <div
            style={{
              fontSize: "64px",
              lineHeight: "0.5",
              color: "var(--accent)",
              opacity: 0.3,
              fontFamily: "Georgia, serif",
              marginBottom: "24px",
              userSelect: "none",
            }}
            aria-hidden="true"
          >
            &ldquo;
          </div>

          {/* Quote text block with left accent line */}
          <blockquote
            style={{
              borderLeft: "3px solid var(--accent)",
              paddingLeft: "24px",
              margin: 0,
            }}
          >
            <p
              style={{
                fontSize: "17px",
                lineHeight: 1.8,
                color: "var(--text)",
                fontStyle: "italic",
                margin: 0,
              }}
            >
              {quote.text}
            </p>
          </blockquote>

          {/* Attribution */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginTop: "28px",
              paddingLeft: "27px", // aligns with quote text (3px border + 24px padding)
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "var(--gradient)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                color: "#fff",
                fontSize: "14px",
                fontWeight: 600,
              }}
              aria-hidden="true"
            >
              {quote.initials}
            </div>

            {/* Name */}
            <span
              style={{
                fontSize: "12px",
                color: "var(--muted)",
                fontFamily: "var(--font-geist-mono)",
                lineHeight: 1.5,
              }}
            >
              {quote.name}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
