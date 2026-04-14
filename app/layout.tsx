import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "./components/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wasil Mawardi — Fullstack Developer",
  description:
    "Fullstack Developer spesialis TypeScript, NestJS, Vue/Nuxt, dan integrasi API enterprise. 4+ tahun membangun sistem digital untuk instansi pemerintah dan pendidikan tinggi.",
  openGraph: {
    title: "Wasil Mawardi — Fullstack Developer",
    description:
      "Membangun sistem digital yang benar-benar dipakai. 6.000+ pengguna aktif, integrasi Microsoft Teams, sistem rekam data mahasiswa skala nasional.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
