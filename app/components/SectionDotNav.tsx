"use client";

import { useEffect, useState } from "react";
import { useIsMobile } from "../hooks/useIsMobile";

const sections = [
  { id: "hero-section", label: "Hero" },
  { id: "tentang", label: "Tentang" },
  { id: "stack", label: "Tech Stack" },
  { id: "proyek", label: "Proyek" },
  { id: "ai-workflow", label: "AI Workflow" },
  { id: "pengalaman", label: "Pengalaman" },
  { id: "kontak", label: "Kontak" },
];

export default function SectionDotNav() {
  const [activeId, setActiveId] = useState<string>(sections[0].id);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return; // skip scroll tracking on mobile — component returns null below
    const updateActive = () => {
      const viewportCenter = window.innerHeight / 2;
      let closestId = sections[0].id;
      let closestDistance = Infinity;

      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const elCenter = rect.top + rect.height / 2;
        const distance = Math.abs(elCenter - viewportCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestId = id;
        }
      }

      setActiveId(closestId);
    };

    window.addEventListener("scroll", updateActive, { passive: true });
    updateActive();

    return () => {
      window.removeEventListener("scroll", updateActive);
    };
  }, [isMobile]);

  // Early return AFTER all hooks are called
  if (isMobile) return null;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      aria-label="Section navigation"
      style={{
        position: "fixed",
        right: "20px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        alignItems: "center",
      }}
    >
      {sections.map(({ id, label }) => {
        const isActive = activeId === id;
        const isHovered = hoveredId === id;

        return (
          <div
            key={id}
            style={{ position: "relative", display: "flex", alignItems: "center" }}
            onMouseEnter={() => setHoveredId(id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Tooltip */}
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                right: "18px",
                whiteSpace: "nowrap",
                fontSize: "11px",
                fontFamily: "var(--font-geist-mono)",
                color: "var(--muted)",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "4px",
                padding: "2px 8px",
                opacity: isHovered ? 1 : 0,
                pointerEvents: "none",
                transition: "opacity 0.15s ease",
              }}
            >
              {label}
            </span>

            {/* Dot */}
            <button
              onClick={() => scrollToSection(id)}
              aria-label={`Scroll to ${label}`}
              style={{
                width: isActive ? "10px" : "8px",
                height: isActive ? "10px" : "8px",
                borderRadius: "50%",
                background: isActive ? "var(--accent)" : "var(--border-2)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.2s ease",
                display: "block",
                flexShrink: 0,
              }}
            />
          </div>
        );
      })}
    </nav>
  );
}
