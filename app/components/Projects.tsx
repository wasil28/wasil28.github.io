"use client";

import { useState, useEffect } from "react";
import { useIsMobile } from "../hooks/useIsMobile";

const featured = [
  {
    id: "srs",
    name: "SRS — Student Record System",
    org: "Universitas Terbuka",
    period: "Mei 2022 – Sekarang",
    status: "produksi-aktif",
    challenge: "Manajemen data akademik 400.000+ mahasiswa UT tersebar se-Indonesia — jadwal Tutorial Tatap Muka, penugasan tutor, kelas, dan lokasi di 39 UPBJJ yang harus tersinkronisasi real-time.",
    solution: "Fullstack developer utama selama 44 bulan: membangun frontend Vue.js, service-transaksi (core logic), service-referensi, dan service-report dalam arsitektur microservice. Total 8.411 commit, puncak 827 commit/bulan.",
    impact: "8.411 commit · 44 bulan · 400K+ mahasiswa se-Indonesia · 21K kelas · 9.400 tutor aktif",
    tech: ["Vue.js", "NestJS", "PostgreSQL", "Redis", "Microservices", "TypeScript", "Docker"],
    commits: "8.4K", months: "44 bln", scale: "se-Indonesia", link: null,
  },
  {
    id: "kurikulum",
    name: "Sistem Kurikulum UT",
    org: "Universitas Terbuka",
    period: "Okt 2024 – Sekarang",
    status: "produksi-aktif",
    challenge: "Manajemen kurikulum UT masih berbasis spreadsheet — tidak terstruktur, sulit diaudit, dan menjadi hambatan proses akademik seluruh program studi di seluruh Indonesia.",
    solution: "Digitalisasi penuh manajemen kurikulum: frontend Nuxt.js, backend NestJS, PostgreSQL. Dibangun end-to-end dengan sesi UAT langsung bersama staf akademik. Menjadi fondasi data kurikulum untuk seluruh sistem akademik UT.",
    impact: "245 commit · Fondasi kurikulum seluruh program studi UT · Eliminasi dependensi spreadsheet · UAT langsung dengan staf akademik",
    tech: ["NestJS", "Nuxt.js", "PostgreSQL", "TypeScript", "Docker"],
    commits: "245", months: "18 bln", scale: "Fondasi UT", link: null,
  },
  {
    id: "mbkm",
    name: "Portal MBKM — Merdeka Belajar Kampus Merdeka",
    org: "Universitas Terbuka",
    period: "Feb 2024 – Feb 2026",
    status: "produksi-maintenance",
    challenge: "UT butuh platform digital terpadu untuk program MBKM — pendaftaran, administrasi, dan pelaksanaan bagi mahasiswa dan dosen seluruh Indonesia.",
    solution: "Full-stack: frontend Nuxt.js dan backend NestJS. Integrasi Microsoft Azure untuk SSO dan cloud. 2.797 commit selama 22 bulan, puncak 507 commit di Mei 2024.",
    impact: "2.797 commit · 22 bulan aktif · Digunakan mahasiswa & dosen UT seluruh Indonesia",
    tech: ["Nuxt.js", "NestJS", "PostgreSQL", "Microsoft Azure", "TypeScript", "Docker"],
    commits: "2.8K", months: "22 bln", scale: "Nasional", link: null,
  },
  {
    id: "epresensi",
    name: "e-Presensi Tutor UT",
    org: "Universitas Terbuka",
    period: "Jul 2024 – Sekarang",
    status: "produksi-aktif",
    challenge: "Presensi 6.000+ dosen dan tutor masih manual — lambat, rentan kesalahan, sulit diaudit.",
    solution: "API backend terintegrasi langsung dengan Microsoft Teams via Microsoft Graph API. Absensi otomatis dari data rekaman meeting Teams — tanpa input manual. 10.000 request/hari diproses real-time.",
    impact: "6.000+ pengguna aktif · 10K request/hari · Tersedia di Google Play · Eliminasi 100% input manual",
    tech: ["NestJS", "Flutter", "Microsoft Graph API", "PostgreSQL", "TypeScript"],
    commits: "422", months: "10 bln", scale: "10K/hari",
    link: "https://play.google.com/store/apps/details?id=com.epresensi.ut",
  },
];

const otherProjects = [
  { id:"bimon", name:"BIMON TAPM", org:"Universitas Terbuka", period:"Jul 2024 – Mar 2026",
    desc:"Platform bimbingan online Program Pascasarjana UT. Komunikasi real-time antara dosen dan mahasiswa, manajemen jadwal, pelacakan progres bimbingan.",
    tech:["NestJS","Vue.js","PostgreSQL","TypeScript"], commits:"668", status:"pengembangan" },
  { id:"sipantau", name:"SIPANTAU", org:"Universitas Terbuka", period:"2025 – Sekarang",
    desc:"Sistem pemantauan tutorial nasional — 21.000+ kelas, 9.400+ tutor. e-Presensi QR Code, supervisi, kalender, dashboard, dan pelaporan akreditasi.",
    tech:["NestJS","Vue 3","PostgreSQL","Socket.IO"], commits:"prototype", status:"prototype" },
  { id:"disposisi", name:"DISPOSISI — Ticketing UT", org:"Universitas Terbuka", period:"Mar 2026 – Sekarang",
    desc:"Sistem ticketing dan disposisi surat internal UT. SLA tracking, notifikasi otomatis, daily stats reporting via RabbitMQ queue.",
    tech:["NestJS","Vue.js","PostgreSQL","RabbitMQ"], commits:"46", status:"pengembangan" },
  { id:"disporseni", name:"DISPORSENI", org:"Universitas Terbuka", period:"2025",
    desc:"Platform pendaftaran lomba olahraga & seni antar universitas dan SMA se-Indonesia. Real-time via Socket.IO, Azure AD SSO, MinIO file storage.",
    tech:["NestJS","Nuxt 3","Redis","RabbitMQ","Socket.IO","Azure AD"], commits:"internal", status:"prototype" },
  { id:"sibu", name:"SIBU — Internal UT", org:"Universitas Terbuka", period:"2024",
    desc:"Sistem internal Universitas Terbuka untuk kebutuhan operasional harian. Backend NestJS dengan antarmuka Vue.js yang bersih.",
    tech:["NestJS","Vue.js","PostgreSQL"], commits:"85", status:"produksi-aktif" },
  { id:"panutan", name:"PANUTAN — Document Generator", org:"Universitas Terbuka", period:"2024",
    desc:"Prototype generator dokumen otomatis berbasis template. Memangkas waktu pembuatan dokumen formal dari jam ke menit.",
    tech:["NestJS","Vue.js","TypeScript"], commits:"prototype", status:"prototype" },
  { id:"utalk", name:"UTalk — Password Reset Tool", org:"Universitas Terbuka", period:"2024 – 2025",
    desc:"Tool self-service reset password Azure AD via Microsoft Graph API. Menggantikan proses manual helpdesk dengan antarmuka yang bisa dipakai sendiri oleh user.",
    tech:["Microsoft Graph API","Azure AD","NestJS","Vue.js"], commits:"—", status:"produksi-aktif" },
  { id:"shortlink", name:"Shortlink UT — sl.ut.ac.id", org:"Universitas Terbuka", period:"2024",
    desc:"URL shortener resmi Universitas Terbuka di domain sl.ut.ac.id. Tracking klik, manajemen link, dan redirect cepat untuk kebutuhan komunikasi kampus.",
    tech:["Laravel","PHP","MySQL"], commits:"—", status:"produksi-aktif" },
  { id:"op-report", name:"Operational Report & WhatsApp API", org:"Universitas Terbuka", period:"2024",
    desc:"Sistem laporan operasional harian dengan notifikasi otomatis via WhatsApp API. Dashboard real-time dan pengiriman report terjadwal ke tim manajemen.",
    tech:["NestJS","WhatsApp API","Vue.js","PostgreSQL"], commits:"—", status:"produksi-aktif" },
  { id:"datahub", name:"DATAHUB — SDG Dashboard", org:"Universitas Terbuka", period:"2023",
    desc:"Dashboard visualisasi data SDG (Sustainable Development Goals) UT. HTML/CSS/JS statik, ringan dan cepat, menampilkan progres capaian SDG UT.",
    tech:["HTML","CSS","JavaScript","Chart.js"], commits:"—", status:"produksi-aktif" },
  { id:"srs-api", name:"SRS Data API — Microservice", org:"Universitas Terbuka", period:"Apr 2022 – Sekarang",
    desc:"Microservice API data mahasiswa dalam ekosistem SRS — jadwal TTM, kelas, lokasi, penugasan tutor. Redis caching untuk performa tinggi pada volume besar.",
    tech:["NestJS","Redis","PostgreSQL","TypeScript"], commits:"—", status:"produksi-aktif" },
  { id:"simontila", name:"SIMONTILA", org:"ITJEN KEMENDIKBUD", period:"2022 – 2023",
    desc:"Sistem monitoring tindak lanjut audit ITJEN Kemendikbud. Melacak status dari input SPT hingga laporan final hasil pengawasan.",
    tech:["NestJS","Vue.js","PostgreSQL"], commits:"—", status:"produksi-maintenance" },
  { id:"sambara", name:"SAMBARA", org:"BAPENDA Jawa Barat", period:"Mar – Des 2022",
    desc:"Samsat Mobile Jawa Barat — layanan administrasi kendaraan bermotor dan pembayaran pajak elektronik untuk seluruh warga Jawa Barat.",
    tech:["CodeIgniter","Python","Django REST","PostgreSQL","Docker"], commits:"—", status:"produksi-aktif",
    link:"https://play.google.com/store/apps/details?id=id.go.bapenda.sambara" },
  { id:"kompakan", name:"KOMPAKAN — BPBD Jabar", org:"BPBD Jawa Barat", period:"Jul 2023 – Agu 2024",
    desc:"Aplikasi penanganan bencana dengan sistem informasi terpadu — mapping korban, transparansi data, dan pengelolaan media bencana Jawa Barat.",
    tech:["CodeIgniter","PHP","MySQL","Google Maps API"], commits:"—", status:"produksi-aktif" },
  { id:"atos", name:"ATOS PAMOR", org:"BAPENDA Jawa Barat", period:"Mar – Okt 2022",
    desc:"API untuk mobile & web Samsat Online — pelayanan administrasi mobil dan motor secara elektronik dengan CI/CD pipeline penuh.",
    tech:["Django REST","CodeIgniter","Python","Docker"], commits:"—", status:"produksi-aktif" },
  { id:"sitapak", name:"SITAPAK — BAPENDA Banten", org:"BAPENDA Provinsi Banten", period:"2022",
    desc:"Sistem informasi administrasi pajak kendaraan Banten. Pemrosesan data pajak kendaraan bermotor dan layanan digital wajib pajak.",
    tech:["Laravel","PHP","MySQL","Bootstrap"], commits:"—", status:"produksi-aktif" },
  { id:"spi-bapenda", name:"SPI — BAPENDA Jabar", org:"BAPENDA Jawa Barat", period:"2022",
    desc:"Sistem pengawasan internal BAPENDA Jawa Barat. Dashboard monitoring, audit trail, dan laporan kepatuhan administratif.",
    tech:["Vue.js","NestJS","PostgreSQL"], commits:"—", status:"produksi-maintenance" },
  { id:"bravo", name:"BRAVO PUPR", org:"Kementerian PUPR", period:"Mar – Jun 2022",
    desc:"Aplikasi presensi digital untuk seluruh staf Kementerian PUPR dengan manajemen kehadiran terintegrasi.",
    tech:["Vue.js","PostgreSQL","Quasar Framework"], commits:"—", status:"produksi-aktif" },
  { id:"eptlhp", name:"EPTLHP Web", org:"Setitjen PUPR", period:"Jul – Des 2022",
    desc:"Sistem pemantauan tindak lanjut hasil pengawasan Inspektorat Jenderal PUPR — Audit, Reviu, Evaluasi, dan Pemantauan terintegrasi eSPT.",
    tech:["CodeIgniter","MySQL","PHP"], commits:"—", status:"produksi-aktif" },
  { id:"pupr-arus", name:"PUPR ARUS — Rumah Susun", org:"Kementerian PUPR", period:"2022",
    desc:"Sistem manajemen Rumah Susun Kementerian PUPR. Administrasi penghuni, pengelolaan unit, dan laporan pengelolaan aset rusun.",
    tech:["Laravel","PHP","MySQL"], commits:"—", status:"produksi-aktif" },
  { id:"bgts", name:"Binamarga BGTS", org:"Kementerian PUPR Binamarga", period:"2022",
    desc:"Sistem informasi jalan tol dan jembatan Binamarga. Monitoring kondisi infrastruktur jalan nasional dan laporan teknis terpadu.",
    tech:["Laravel","PHP","MySQL","Bootstrap"], commits:"—", status:"produksi-aktif" },
  { id:"balaibahan", name:"Balai Bahan Jalan", org:"Kementerian PUPR", period:"2022",
    desc:"Sistem informasi pengujian bahan jalan Balai Material Jalan. Manajemen sampel, hasil uji, dan laporan kualitas material infrastruktur.",
    tech:["Laravel","PHP","MySQL"], commits:"—", status:"produksi-aktif" },
  { id:"tte-bssn", name:"TTE BSSN — e-Signature", org:"BSSN / Pemerintah", period:"2023",
    desc:"Integrasi Tanda Tangan Elektronik tersertifikasi BSSN. API layer untuk penandatanganan dokumen digital resmi pemerintah.",
    tech:["NestJS","TypeScript","REST API"], commits:"—", status:"produksi-aktif" },
  { id:"mindmap", name:"MINDMAP DASH", org:"Internal", period:"2023",
    desc:"Dashboard visualisasi mind map interaktif. Tool internal untuk perencanaan proyek dan pemetaan ide berbasis web.",
    tech:["Vue.js","JavaScript","D3.js"], commits:"—", status:"prototype" },
  { id:"poltek-presensi", name:"Presensi Politeknik", org:"Politeknik", period:"2023",
    desc:"Sistem presensi digital untuk lingkungan politeknik. Manajemen kehadiran mahasiswa dan dosen dengan laporan otomatis.",
    tech:["Laravel","Vue.js","MySQL"], commits:"—", status:"produksi-aktif" },
  { id:"smkn5", name:"SMKN 5 Kepahiang — Web", org:"SMKN 5 Kepahiang", period:"2021 – 2022",
    desc:"Situs web sekolah SMKN 5 Kepahiang dengan komponen web kustom. Tampilan modern, profil sekolah, berita, dan informasi akademik.",
    tech:["HTML","CSS","JavaScript","Web Components"], commits:"—", status:"produksi-aktif" },
  { id:"javarent", name:"JavaRent — Rental App", org:"Startup / Freelance", period:"2021",
    desc:"Aplikasi manajemen transaksi bisnis rental. CRUD kendaraan, kontrak sewa, pembayaran, dan laporan keuangan bulanan.",
    tech:["Laravel","PHP","MySQL","Bootstrap"], commits:"—", status:"prototype" },
  { id:"consment", name:"PT CONSMENT — Presensi & TimeSheet", org:"PT CONSMENT", period:"2022",
    desc:"Sistem presensi dan pencatatan waktu kerja karyawan. Manajemen shift, laporan kehadiran harian, dan export timesheet otomatis.",
    tech:["Laravel","Vue.js","MySQL"], commits:"—", status:"produksi-aktif" },
];

const statusStyle: Record<string, { bg: string; color: string; label: string }> = {
  "produksi-aktif":       { bg:"rgba(34,197,94,0.10)",   color:"#22C55E", label:"Produksi" },
  "produksi-maintenance": { bg:"rgba(14,165,233,0.10)",  color:"#0EA5E9", label:"Maintenance" },
  "pengembangan":         { bg:"rgba(251,191,36,0.10)",  color:"#FBBF24", label:"Dev" },
  "prototype":            { bg:"rgba(156,163,175,0.12)", color:"#9CA3AF", label:"Prototype" },
};

const categories = ["Semua", "Universitas Terbuka", "Pemerintah", "Startup / Freelance"];
const techFilters = ["Semua Tech", "Vue.js", "NestJS", "Laravel", "PostgreSQL", "TypeScript", "Docker", "Microsoft Graph API"];

const PEMERINTAH_KEYWORDS = ["BAPENDA", "PUPR", "KEMENDIKBUD", "ITJEN", "BPBD", "BSSN", "Politeknik", "SMKN", "CONSMENT"];

function getProjectCategory(p: typeof otherProjects[0]): string {
  if (p.org.includes("Universitas Terbuka")) return "Universitas Terbuka";
  if (p.org.includes("Startup") || p.org.includes("Freelance") || p.id === "javarent") return "Startup / Freelance";
  if (PEMERINTAH_KEYWORDS.some((kw) => p.org.includes(kw))) return "Pemerintah";
  return "Semua";
}

export default function Projects() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [activeTech, setActiveTech] = useState("Semua Tech");
  const [selectedProject, setSelectedProject] = useState<typeof otherProjects[0] | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!selectedProject) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedProject]);

  const filteredProjects = otherProjects.filter((p) => {
    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchDesc = p.desc.toLowerCase().includes(q);
      const matchTech = p.tech.some((t) => t.toLowerCase().includes(q));
      const matchOrg = p.org.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchTech && !matchOrg) return false;
    }
    // Category filter
    if (activeCategory !== "Semua") {
      if (getProjectCategory(p) !== activeCategory) return false;
    }
    // Tech filter
    if (activeTech !== "Semua Tech") {
      if (!p.tech.some((t) => t === activeTech)) return false;
    }
    return true;
  });

  return (
    <section id="proyek" style={{ maxWidth:"1100px", margin:"0 auto", padding:"96px 48px", borderTop:"1px solid var(--border)" }}>
      {/* Inline keyframe animation */}
      <style>{`
        @keyframes livePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom:"48px" }}>
        <span className="label-pill">Proyek</span>
        <h2 style={{ fontSize:"clamp(28px,4vw,40px)", fontWeight:800, letterSpacing:"-0.03em", color:"var(--text)", marginBottom:"12px", lineHeight:1.1 }}>
          ~12K commit,{" "}
          <span className="text-gradient">30+ aplikasi,</span>{" "}
          4 tahun.
        </h2>
        <p style={{ fontSize:"15px", color:"var(--muted)", maxWidth:"560px", lineHeight:1.7 }}>
          PIC backend/API di Universitas Terbuka dan berbagai instansi pemerintah —
          dari sistem skala nasional hingga aplikasi mobile di Play Store.
        </p>
      </div>

      {/* Featured */}
      <div style={{ display:"flex", flexDirection:"column", gap:"20px", marginBottom:"48px" }}>
        {featured.map((p) => {
          const st = statusStyle[p.status];
          return (
            <article key={p.id}
              style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:"16px", padding: isMobile ? "20px" : "28px 32px", display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr auto", gap:"28px", alignItems:"start", boxShadow:"var(--shadow-sm)", transition:"all 0.25s" }}
              onMouseEnter={(e) => { const el=e.currentTarget as HTMLElement; el.style.boxShadow="var(--shadow-md)"; el.style.borderColor="var(--border-2)"; el.style.transform="translateY(-2px)"; }}
              onMouseLeave={(e) => { const el=e.currentTarget as HTMLElement; el.style.boxShadow="var(--shadow-sm)"; el.style.borderColor="var(--border)"; el.style.transform="translateY(0)"; }}
            >
              <div style={{ minWidth:0 }}>
                <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"10px", flexWrap:"wrap" }}>
                  <span style={{ fontSize:"10px", fontFamily:"var(--font-geist-mono)", background:st.bg, color:st.color, borderRadius:"99px", padding:"3px 10px" }}>{st.label}</span>
                  {p.status === "produksi-aktif" && (
                    <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#22C55E", display:"inline-block", animation:"livePulse 1.5s ease-in-out infinite", flexShrink:0 }} />
                  )}
                  <span style={{ fontSize:"12px", color:"var(--muted-2)", fontFamily:"var(--font-geist-mono)" }}>{p.org} · {p.period}</span>
                  {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ fontSize:"12px", color:"var(--accent)", textDecoration:"none", marginLeft:"auto" }}>Lihat →</a>}
                </div>
                <h3 style={{ fontSize:"18px", fontWeight:700, color:"var(--text)", marginBottom:"10px", lineHeight:1.3 }}>{p.name}</h3>
                <p style={{ fontSize:"13px", color:"var(--muted)", lineHeight:1.7, marginBottom:"6px" }}>
                  <span style={{ color:"var(--muted-2)", fontFamily:"var(--font-geist-mono)", fontSize:"11px" }}>TANTANGAN — </span>{p.challenge}
                </p>
                <p style={{ fontSize:"13px", color:"var(--text)", lineHeight:1.7, marginBottom:"12px" }}>
                  <span style={{ color:"var(--muted-2)", fontFamily:"var(--font-geist-mono)", fontSize:"11px" }}>SOLUSI — </span>{p.solution}
                </p>
                <p style={{ fontSize:"13px", color:"var(--accent)", fontWeight:500, marginBottom:"16px" }}>✦ {p.impact}</p>
                <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
                  {p.tech.map((t) => (
                    <span key={t} style={{ fontSize:"11px", fontFamily:"var(--font-geist-mono)", color:"var(--muted)", background:"var(--surface-2)", border:"1px solid var(--border)", borderRadius:"4px", padding:"3px 8px" }}>{t}</span>
                  ))}
                </div>
              </div>
              {/* Stats */}
              <div style={{ display:"flex", flexDirection: isMobile ? "row" : "column", gap:"8px", flexShrink:0, flexWrap:"wrap" }}>
                {[{label:"Commits",value:p.commits},{label:"Durasi",value:p.months},{label:"Skala",value:p.scale}].map((s) => (
                  <div key={s.label} style={{ background:"var(--surface-2)", border:"1px solid var(--border)", borderRadius:"10px", padding:"12px 16px", textAlign:"center", minWidth: isMobile ? "auto" : "88px", flex: isMobile ? "1" : "unset" }}>
                    <div className="text-gradient" style={{ fontSize:"20px", fontWeight:800, fontFamily:"var(--font-geist-mono)", lineHeight:1 }}>{s.value}</div>
                    <div style={{ fontSize:"10px", color:"var(--muted)", marginTop:"4px", fontFamily:"var(--font-geist-mono)" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </div>

      {/* Mobile: collapsed "see more" button */}
      {isMobile && !showAllProjects && (
        <button
          onClick={() => setShowAllProjects(true)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            width: "100%",
            padding: "14px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            color: "var(--accent)",
            fontSize: "14px",
            fontWeight: 600,
            fontFamily: "var(--font-geist-mono)",
            cursor: "pointer",
            marginBottom: "16px",
            transition: "border-color 0.2s, background 0.2s",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.borderColor = "var(--accent)";
            el.style.background = "var(--accent-dim)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.borderColor = "var(--border)";
            el.style.background = "var(--surface)";
          }}
        >
          <span>Lihat {otherProjects.length}+ proyek lainnya</span>
          <span style={{ fontSize: "16px" }}>↓</span>
        </button>
      )}

      {/* Divider + search + grid — hidden on mobile until expanded */}
      {(!isMobile || showAllProjects) && <>

      {/* Divider */}
      <div style={{ display:"flex", alignItems:"center", gap:"16px", marginBottom:"28px" }}>
        <div style={{ flex:1, height:"1px", background:"var(--border)" }} />
        <span style={{ fontSize:"11px", fontFamily:"var(--font-geist-mono)", color:"var(--muted)", letterSpacing:"0.08em", textTransform:"uppercase", whiteSpace:"nowrap" }}>Proyek lainnya</span>
        <div style={{ flex:1, height:"1px", background:"var(--border)" }} />
      </div>

      {/* Search */}
      <div style={{ display:"flex", justifyContent:"center", marginBottom:"16px" }}>
        <input
          type="text"
          placeholder="Cari proyek atau teknologi..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          style={{
            width:"100%",
            maxWidth:"480px",
            background:"var(--surface)",
            border:`1px solid ${searchFocused ? "var(--accent)" : "var(--border)"}`,
            borderRadius:"10px",
            padding:"12px 16px",
            fontSize:"14px",
            color:"var(--text)",
            outline:"none",
            boxShadow: searchFocused ? "0 0 0 3px rgba(14,165,233,0.12)" : "none",
            transition:"border-color 0.2s, box-shadow 0.2s",
          }}
        />
      </div>

      {/* Filter chips — Category */}
      <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", marginBottom:"10px", justifyContent:"center" }}>
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                fontSize:"12px",
                fontFamily:"var(--font-geist-mono)",
                borderRadius:"99px",
                padding:"6px 14px",
                border:`1px solid ${isActive ? "var(--accent)" : "var(--border)"}`,
                cursor:"pointer",
                transition:"all 0.2s",
                background: isActive ? "var(--accent)" : "var(--surface)",
                color: isActive ? "white" : "var(--muted)",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.borderColor = "var(--accent)";
                  el.style.color = "var(--accent)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.borderColor = "var(--border)";
                  el.style.color = "var(--muted)";
                }
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Filter chips — Tech */}
      <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", marginBottom:"16px", justifyContent:"center" }}>
        {techFilters.map((tech) => {
          const isActive = activeTech === tech;
          return (
            <button
              key={tech}
              onClick={() => setActiveTech(tech)}
              style={{
                fontSize:"12px",
                fontFamily:"var(--font-geist-mono)",
                borderRadius:"99px",
                padding:"6px 14px",
                border:`1px solid ${isActive ? "var(--accent)" : "var(--border)"}`,
                cursor:"pointer",
                transition:"all 0.2s",
                background: isActive ? "var(--accent)" : "var(--surface)",
                color: isActive ? "white" : "var(--muted)",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.borderColor = "var(--accent)";
                  el.style.color = "var(--accent)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.borderColor = "var(--border)";
                  el.style.color = "var(--muted)";
                }
              }}
            >
              {tech}
            </button>
          );
        })}
      </div>

      {/* Result count */}
      <div style={{ textAlign:"center", fontSize:"12px", fontFamily:"var(--font-geist-mono)", color:"var(--muted)", marginBottom:"20px" }}>
        Menampilkan {filteredProjects.length} dari {otherProjects.length} proyek
      </div>

      {/* Grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(270px, 1fr))", gap:"14px" }}>
        {filteredProjects.map((p) => {
          const st = statusStyle[p.status] ?? statusStyle["prototype"];
          const isHovered = hoveredCard === p.id;
          return (
            <div key={p.id}
              onClick={() => setSelectedProject(p)}
              onMouseEnter={() => setHoveredCard(p.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background:"var(--surface)",
                border:"1px solid var(--border)",
                borderRadius:"12px",
                padding:"20px",
                display:"flex",
                flexDirection:"column",
                gap:"10px",
                boxShadow: isHovered ? "var(--shadow-md)" : "var(--shadow-sm)",
                borderColor: isHovered ? "var(--border-2)" : "var(--border)",
                transform: isHovered ? "translateY(-3px) scale(1.005)" : "translateY(0) scale(1)",
                transition:"all 0.2s",
                cursor:"pointer",
                position:"relative",
              }}
            >
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:"8px" }}>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:"14px", fontWeight:700, color:"var(--text)", marginBottom:"2px" }}>{p.name}</div>
                  <div style={{ fontSize:"11px", color:"var(--muted-2)", fontFamily:"var(--font-geist-mono)" }}>{p.org} · {p.period}</div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:"6px", flexShrink:0 }}>
                  {p.status === "produksi-aktif" && (
                    <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#22C55E", display:"inline-block", animation:"livePulse 1.5s ease-in-out infinite" }} />
                  )}
                  <span style={{ fontSize:"10px", fontFamily:"var(--font-geist-mono)", background:st.bg, color:st.color, borderRadius:"99px", padding:"2px 8px" }}>{st.label}</span>
                </div>
              </div>
              <p style={{ fontSize:"12px", color:"var(--muted)", lineHeight:1.65, flex:1 }}>{p.desc}</p>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"6px" }}>
                <div style={{ display:"flex", gap:"5px", flexWrap:"wrap" }}>
                  {p.tech.slice(0,3).map((t) => (
                    <span key={t} style={{ fontSize:"10px", fontFamily:"var(--font-geist-mono)", color:"var(--muted-2)", background:"var(--surface-2)", border:"1px solid var(--border)", borderRadius:"3px", padding:"2px 6px" }}>{t}</span>
                  ))}
                  {p.tech.length > 3 && <span style={{ fontSize:"10px", color:"var(--muted)" }}>+{p.tech.length-3}</span>}
                </div>
                {(p as any).link
                  ? <a href={(p as any).link} target="_blank" rel="noopener noreferrer" style={{ fontSize:"11px", color:"var(--accent)", textDecoration:"none" }}>Lihat →</a>
                  : p.commits !== "—" && p.commits !== "prototype" && p.commits !== "internal"
                    ? <span style={{ fontSize:"10px", fontFamily:"var(--font-geist-mono)", color:"var(--accent)", opacity:0.8 }}>{p.commits} commits</span>
                    : null
                }
              </div>
              {/* "Lihat detail" hint — appears on hover */}
              <div style={{
                fontSize:"11px",
                color:"var(--accent)",
                textAlign:"right",
                opacity: isHovered ? 1 : 0,
                transition:"opacity 0.2s",
                marginTop:"-4px",
              }}>
                Lihat detail ↗
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile: collapse button at the bottom */}
      {isMobile && showAllProjects && (
        <button
          onClick={() => { setShowAllProjects(false); document.getElementById("proyek")?.scrollIntoView({ behavior: "smooth" }); }}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            width: "100%", padding: "12px",
            background: "transparent", border: "1px solid var(--border)",
            borderRadius: "10px", color: "var(--muted)", fontSize: "13px",
            fontFamily: "var(--font-geist-mono)", cursor: "pointer", marginTop: "8px",
          }}
        >
          ↑ Sembunyikan
        </button>
      )}

      </>}

      {/* Modal */}
      {selectedProject && (
        <div
          onClick={() => setSelectedProject(null)}
          style={{
            position:"fixed",
            inset:0,
            background:"rgba(0,0,0,0.5)",
            zIndex:1000,
            display:"flex",
            alignItems: isMobile ? "flex-end" : "center",
            justifyContent:"center",
            padding: isMobile ? "0" : "24px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="modal-card"
            style={{
              background:"var(--surface)",
              border:"1px solid var(--border)",
              borderRadius:"20px",
              padding:"32px",
              maxWidth:"560px",
              width:"100%",
              boxShadow:"var(--shadow-md)",
              position:"relative",
              maxHeight:"90vh",
              overflowY:"auto",
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedProject(null)}
              style={{
                position:"absolute",
                top:"16px",
                right:"16px",
                background:"var(--surface-2)",
                border:"1px solid var(--border)",
                borderRadius:"50%",
                width:"32px",
                height:"32px",
                cursor:"pointer",
                fontSize:"16px",
                color:"var(--muted)",
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
                lineHeight:1,
              }}
            >
              ×
            </button>

            {/* Modal header row: status + org + period */}
            {(() => {
              const st = statusStyle[selectedProject.status] ?? statusStyle["prototype"];
              return (
                <>
                  <div style={{ display:"flex", alignItems:"center", gap:"8px", flexWrap:"wrap", marginBottom:"12px" }}>
                    <span style={{ fontSize:"10px", fontFamily:"var(--font-geist-mono)", background:st.bg, color:st.color, borderRadius:"99px", padding:"3px 10px" }}>{st.label}</span>
                    {selectedProject.status === "produksi-aktif" && (
                      <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#22C55E", display:"inline-block", animation:"livePulse 1.5s ease-in-out infinite" }} />
                    )}
                    <span style={{ fontSize:"12px", color:"var(--muted-2)", fontFamily:"var(--font-geist-mono)" }}>
                      {selectedProject.org} · {selectedProject.period}
                    </span>
                  </div>

                  {/* Project name */}
                  <h3 style={{ fontSize:"20px", fontWeight:700, color:"var(--text)", marginBottom:"12px", lineHeight:1.3, paddingRight:"40px" }}>
                    {selectedProject.name}
                  </h3>

                  {/* Description */}
                  <p style={{ fontSize:"14px", color:"var(--muted)", lineHeight:1.75, marginBottom:"16px" }}>
                    {selectedProject.desc}
                  </p>

                  {/* Full tech stack */}
                  <div style={{ display:"flex", gap:"6px", flexWrap:"wrap", marginBottom:"16px" }}>
                    {selectedProject.tech.map((t) => (
                      <span key={t} style={{ fontSize:"11px", fontFamily:"var(--font-geist-mono)", color:"var(--muted)", background:"var(--surface-2)", border:"1px solid var(--border)", borderRadius:"4px", padding:"3px 8px" }}>{t}</span>
                    ))}
                  </div>

                  {/* Commits */}
                  {selectedProject.commits && selectedProject.commits !== "—" && selectedProject.commits !== "prototype" && selectedProject.commits !== "internal" && (
                    <div style={{ fontSize:"12px", fontFamily:"var(--font-geist-mono)", color:"var(--muted)", marginBottom:"16px" }}>
                      <span style={{ color:"var(--accent)", fontWeight:600 }}>{selectedProject.commits}</span> commits
                    </div>
                  )}

                  {/* Play Store link */}
                  {(selectedProject as any).link && (
                    <a
                      href={(selectedProject as any).link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display:"inline-block",
                        background:"var(--gradient)",
                        color:"white",
                        fontSize:"13px",
                        fontWeight:600,
                        padding:"10px 20px",
                        borderRadius:"8px",
                        textDecoration:"none",
                      }}
                    >
                      Lihat di Play Store →
                    </a>
                  )}
                </>
              );
            })()}
          </div>
        </div>
      )}
    </section>
  );
}
