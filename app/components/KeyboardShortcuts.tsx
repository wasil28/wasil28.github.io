"use client";

import { useEffect, useRef, useState } from "react";

const shortcuts = [
  { keys: ["g", "h"], label: "Go to Hero (top)" },
  { keys: ["g", "p"], label: "Go to Proyek" },
  { keys: ["g", "s"], label: "Go to Tech Stack" },
  { keys: ["g", "e"], label: "Go to Pengalaman" },
  { keys: ["g", "c"], label: "Go to Kontak" },
  { keys: ["?"], label: "Show this help" },
];

const sectionMap: Record<string, string | null> = {
  h: null,       // scroll to top
  p: "proyek",
  s: "stack",
  e: "pengalaman",
  c: "kontak",
};

export default function KeyboardShortcuts() {
  const [showModal, setShowModal] = useState(false);
  const lastKeyRef = useRef<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore when typing in inputs
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      const key = e.key;

      // Show help modal
      if (key === "?") {
        setShowModal((prev) => !prev);
        return;
      }

      // Close modal on Escape
      if (key === "Escape") {
        setShowModal(false);
        lastKeyRef.current = null;
        return;
      }

      // "g then X" pattern
      if (lastKeyRef.current === "g") {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        lastKeyRef.current = null;

        if (key in sectionMap) {
          const sectionId = sectionMap[key];
          if (sectionId === null) {
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            const el = document.getElementById(sectionId);
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }
        }
        return;
      }

      if (key === "g") {
        lastKeyRef.current = "g";
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          lastKeyRef.current = null;
        }, 800);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Close on overlay click
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      setShowModal(false);
    }
  };

  if (!showModal) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Keyboard Shortcuts"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          padding: "28px",
          boxShadow: "var(--shadow-md)",
          minWidth: "320px",
          maxWidth: "420px",
          width: "90vw",
        }}
      >
        <h2
          style={{
            margin: "0 0 20px 0",
            fontSize: "18px",
            fontWeight: 600,
            color: "var(--text)",
          }}
        >
          Keyboard Shortcuts
        </h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontFamily: "var(--font-geist-mono)",
            fontSize: "13px",
          }}
        >
          <tbody>
            {shortcuts.map(({ keys, label }) => (
              <tr key={keys.join("+")}>
                <td
                  style={{
                    padding: "6px 12px 6px 0",
                    color: "var(--accent)",
                    whiteSpace: "nowrap",
                    verticalAlign: "middle",
                  }}
                >
                  {keys.map((k, i) => (
                    <span key={k}>
                      <kbd
                        style={{
                          display: "inline-block",
                          background: "var(--surface-2)",
                          border: "1px solid var(--border-2)",
                          borderRadius: "4px",
                          padding: "1px 6px",
                          fontSize: "12px",
                          color: "var(--text)",
                        }}
                      >
                        {k}
                      </kbd>
                      {i < keys.length - 1 && (
                        <span style={{ color: "var(--muted)", margin: "0 3px" }}>
                          then
                        </span>
                      )}
                    </span>
                  ))}
                </td>
                <td
                  style={{
                    padding: "6px 0",
                    color: "var(--muted)",
                    verticalAlign: "middle",
                  }}
                >
                  {label}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p
          style={{
            margin: "16px 0 0",
            fontSize: "11px",
            color: "var(--muted-2)",
            fontFamily: "var(--font-geist-mono)",
          }}
        >
          Press <kbd
            style={{
              background: "var(--surface-2)",
              border: "1px solid var(--border-2)",
              borderRadius: "3px",
              padding: "0 4px",
              fontSize: "11px",
            }}
          >Esc</kbd> or click outside to close
        </p>
      </div>
    </div>
  );
}
