# JobReady AI 🚀

> **Platform Simulasi Wawancara dan Tes Kesiapan Kerja Berbasis AI untuk Mendukung Bimbingan Karier Siswa SMK/SMA**

Karya Inovasi Teknologi Digital Pendidikan (**LIDM VII / 2026**) — Divisi ITDP  
**Subtema:** *Teknologi Digital untuk Ekosistem Pendidikan Berdampak dan Berintegritas*  
**Lingkup Karya:** Mikro (Inovasi sistem/teknologi informasi dalam pembelajaran mandiri dan pendampingan BKK/BK sekolah)

---

## 📌 Ringkasan Eksekutif

Banyak lulusan SMK/SMA memiliki keterampilan teknis yang baik, namun menghadapi kendala kepercayaan diri dan kesiapan non-teknis saat menghadapi seleksi kerja:
1. **Simulasi Wawancara:** Siswa belum terbiasa dengan pola pertanyaan formal industri dan struktur jawaban terarah (metode STAR).
2. **Tes Buta Warna:** Pemeriksaan buta warna merupakan syarat administratif mutlak pada industri manufaktur, kelistrikan, dan teknik, namun jarang disediakan sarana simulasi latihan di sekolah.

**JobReady AI** hadir sebagai solusi web mandiri (*client-side native SPA*), tanpa backend rumit, tanpa biaya langganan, dan siap pakai di laboratorium komputer sekolah maupun ponsel siswa.

---

## 🌟 Fitur Utama

### 1. Modul Simulasi Wawancara Kerja
- **Pilihan 5 Bidang Kejuruan:**
  - Teknik Kendaraan Ringan (TKR / Otomotif)
  - Teknik Komputer & Jaringan (TKJ)
  - Tata Boga / Kuliner
  - Akuntansi & Keuangan Lembaga (AKL)
  - Umum (Semua Jurusan SMK/SMA)
- **Mesin Evaluasi Otomatis (Rule-Based Engine):**
  - Menganalisis kejelasan, panjang karakter, dan struktur jawaban.
  - Pencocokan kata kunci terminologi industri per pertanyaan.
  - Identifikasi penerapan metode STAR (Situasi, Tugas, Aksi, Hasil).
  - Skor 0–100, apresiasi kelebihan, serta saran pembinaan bagi siswa dan Guru BK.
- **Dukungan Suara (Speech-to-Text):** Siswa dapat melatih kemampuan berbicara secara langsung menggunakan mikrofon.
- **Tolok Ukur Jawaban Ideal:** Menampilkan contoh jawaban praktisi industri sebagai bahan refleksi.
- **Ekspor Laporan:** Salin ringkasan evaluasi teks dengan satu klik.

### 2. Modul Latihan Tes Buta Warna
- **10 Plat Ishihara Prosedural (SVG Murni):** Dibuat mandiri dengan kode SVG/CSS tanpa menggunakan gambar berlisensi/hak cipta pihak ketiga.
- **Interaksi Angka Cepat:** Pilihan ganda responsif dengan dukungan tombol angka keyboard (1–4).
- **Skrining & Rekomendasi Klinis:** Skor instan beserta rincian diagnostik tiap butir soal.
- **Kepatuhan Integritas & Edukasi:** Menyertakan disclaimer medis resmi bahwa aplikasi ini merupakan sarana edukatif dan bukan pengganti diagnosis faskes resmi.

---

## 🛠️ Arsitektur & Tech Stack

| Komponen | Teknologi | Keterangan |
|---|---|---|
| Framework | **React 18** | Native SPA |
| Build Tool | **Vite 6** | Kompilasi ultra-cepat |
| Bahasa | **TypeScript** | Type-safe |
| Styling | **Tailwind CSS** | Clean, anti-AI-slop, estetika profesional |
| Komponen UI | **shadcn/ui style** | Tombol, Card, Progress bar, Accordion |
| Ikon | **Lucide React** | Konsisten dan minimalis |
| Penyimpanan | **Client-side State** | Zero data breach, privasi siswa terjaga |
| CI/CD Pipeline | **GitHub Actions** | Automated lint, build, & deploy to GitHub Pages |

---

## 📂 Struktur Proyek

```
src/
├── components/
│   ├── ui/
│   ├── interview/
│   │   ├── FieldSelector.tsx
│   │   ├── QuestionCard.tsx
│   │   └── InterviewSummary.tsx
│   ├── colorblind/
│   │   ├── ColorblindPlate.tsx
│   │   ├── AnswerOptions.tsx
│   │   └── ColorblindResult.tsx
│   ├── Navbar.tsx
│   └── Footer.tsx
├── data/
│   ├── interview-questions.ts
│   └── colorblind-questions.ts
├── hooks/
│   ├── useInterviewSession.ts
│   └── useColorblindTest.ts
├── lib/
│   ├── feedback-engine.ts
│   └── utils.ts
├── pages/
│   ├── Home.tsx
│   ├── Interview.tsx
│   └── ColorblindTest.tsx
├── types/
│   └── index.ts
├── App.tsx
├── main.tsx
└── index.css
```

---

## 🚀 Panduan Menjalankan Secara Lokal

1. **Clone repositori:**
   ```bash
   git clone https://github.com/lionelsega15-del/JobReady-AI.git
   cd JobReady-AI
   ```

2. **Install dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan server pengembangan:**
   ```bash
   npm run dev
   ```
   Buka browser di `http://localhost:5173`.

4. **Build untuk produksi:**
   ```bash
   npm run build
   ```

---

## ⚙️ CI/CD Pipelines

- **CI Pipeline (`.github/workflows/ci.yml`):** Memverifikasi integritas tipe TypeScript (`tsc --noEmit`) dan build produksi pada setiap `push` dan `pull_request` ke branch `main`.
- **CD Deployment (`.github/workflows/deploy.yml`):** Mempublikasikan aplikasi secara otomatis ke **GitHub Pages** setiap kali branch `main` diperbarui.

---

## 📄 Lisensi & Pernyataan Transparansi

Proyek ini dikembangkan oleh Tim Pengembang **JobReady AI** untuk keperluan kompetisi **LIDM VII / 2026**. Seluruh materi soal dan pola visual dibuat mandiri untuk menjunjung tinggi integritas akademik.
