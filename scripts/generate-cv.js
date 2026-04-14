/**
 * Generate CV PDF from HTML template
 * Usage:
 *   node scripts/generate-cv.js
 *
 * Install dependency first (one-time):
 *   npm install puppeteer --save-dev
 */

const path = require("path");
const fs = require("fs");

async function generateCV() {
  let puppeteer;
  try {
    puppeteer = require("puppeteer");
  } catch {
    console.error("Puppeteer tidak ditemukan. Install dulu:\n  npm install puppeteer --save-dev");
    process.exit(1);
  }

  const htmlPath = path.resolve(__dirname, "../public/cv-wasil-mawardi.html");
  const pdfPath  = path.resolve(__dirname, "../public/cv-wasil-mawardi.pdf");

  if (!fs.existsSync(htmlPath)) {
    console.error("HTML tidak ditemukan:", htmlPath);
    process.exit(1);
  }

  console.log("Membuka browser...");
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle0", timeout: 15000 });

  // Tunggu font Google Fonts load
  await new Promise(r => setTimeout(r, 1500));

  await page.pdf({
    path: pdfPath,
    format: "A4",
    printBackground: true,
    margin: { top: "0mm", bottom: "0mm", left: "0mm", right: "0mm" },
  });

  await browser.close();

  const size = (fs.statSync(pdfPath).size / 1024).toFixed(1);
  console.log(`\n✓ CV berhasil dibuat: ${pdfPath}`);
  console.log(`  Ukuran: ${size} KB`);
  console.log(`\nCara pakai foto:`);
  console.log(`  1. Taruh foto di: public/photo-wasil.jpg`);
  console.log(`  2. Di cv-wasil-mawardi.html, uncomment baris <img src="photo-wasil.jpg">`);
  console.log(`  3. Hapus baris <span class="photo-initials">WM</span>`);
  console.log(`  4. Jalankan script ini lagi`);
}

generateCV().catch(console.error);
