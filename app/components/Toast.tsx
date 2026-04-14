"use client";
import { useState, useCallback } from "react";

export type ToastType = "success" | "error" | "info";

interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const show = useCallback((message: string, type: ToastType = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return { toasts, show };
}

const iconMap: Record<ToastType, { symbol: string; color: string }> = {
  success: { symbol: "✓", color: "#22C55E" },
  error: { symbol: "✕", color: "#EF4444" },
  info: { symbol: "ℹ", color: "var(--accent)" },
};

export function ToastContainer({ toasts }: { toasts: ToastItem[] }) {
  return (
    <>
      <style>{`
        @keyframes toastIn {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <div
        style={{
          position: "fixed",
          bottom: "24px",
          left: "24px",
          zIndex: 9000,
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          pointerEvents: "none",
        }}
      >
        {toasts.map((toast) => {
          const icon = iconMap[toast.type];
          return (
            <div
              key={toast.id}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "10px",
                padding: "12px 16px",
                boxShadow: "var(--shadow-md)",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "13px",
                color: "var(--text)",
                minWidth: "200px",
                maxWidth: "320px",
                animation: "toastIn 0.25s ease forwards",
                pointerEvents: "auto",
              }}
            >
              <span
                style={{
                  color: icon.color,
                  fontWeight: 700,
                  fontSize: "15px",
                  lineHeight: 1,
                  flexShrink: 0,
                }}
              >
                {icon.symbol}
              </span>
              <span style={{ lineHeight: 1.4 }}>{toast.message}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}
