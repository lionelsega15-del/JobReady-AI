# 🎯 RINGKASAN PRESENTASI — JobReady AI
> Versi Singkat untuk Presentasi LIDM | UNY 2026

---

## ✅ APA ITU JOBREADY AI?
Platform web simulasi wawancara kerja + tes buta warna untuk siswa SMK/SMA.  
Berjalan 100% di browser — **tanpa login, tanpa server, tanpa internet** setelah pertama buka.

---

## 🔥 MASALAH YANG DIANGKAT
> **"Siswa SMK mahir praktik, tapi gagal di wawancara dan seleksi fisik"**

| Masalah | Fakta |
|---|---|
| Gap wawancara | Siswa kompeten tapi tidak tahu cara menjawab rekruter |
| Seleksi buta warna | Industri otomotif/elektronik wajib, tapi siswa tidak tahu kondisinya |
| Tidak ada platform gratis | LinkedIn/Jobstreet tidak menyediakan latihan kontekstual SMK |
| BPS data | Lulusan SMK = penyumbang pengangguran terbuka tertinggi |

---

## 🛠️ TECH STACK (Jawab Kalau Ditanya)

| Komponen | Teknologi |
|---|---|
| **Bahasa utama** | TypeScript / TSX (~85%) |
| **Framework UI** | React 18 |
| **Build tool** | Vite |
| **Styling** | TailwindCSS |
| **Ikon** | Lucide React |
| **Suara** | Web Audio API (bawaan browser) |
| **Mikrofon** | Web Speech API (bawaan browser) |
| **Penyimpanan** | localStorage (tidak ada server!) |
| **Gambar plat** | SVG + algoritma matematika (tidak ada file gambar!) |

---

## 📋 FITUR UTAMA (3 Fitur Inti)

| Fitur | Poin Penting |
|---|---|
| **1️⃣ Simulasi Wawancara** | 35 soal, 5 bidang SMK, panduan STAR, skor 0–100 otomatis (bukan AI) |
| **2️⃣ Tes Buta Warna Ishihara** | 10 plat digit + 5 plat tracing, gambar di-generate dari kode (SVG), tanpa file gambar |
| **3️⃣ Timer + Efek Tekanan** | Timer 2 menit, suara detak jantung 10 detik terakhir, animasi merah berkedip |

---

## 🧠 CARA KERJA ALGORITMA PENILAIAN
*(TIDAK pakai AI — murni algoritma TypeScript di `feedback-engine.ts`)*

```
Skor = 30 (base)
     + maks 40 poin  → panjang jawaban (makin panjang makin tinggi)
     + maks 40 poin  → kata kunci industri terdeteksi (×10 per kata)
     + 20 poin       → pola STAR terdeteksi / 10 poin jika tidak
     ─────────────────────────────────────────
     = Maksimum 100 poin
```

| Skor | Badge | Arti |
|---|---|---|
| ≥ 80 | 🟢 Sangat Siap Kerja | Terstruktur, relevan, profesional |
| 55–79 | 🟡 Cukup Siap | Perlu diperkaya |
| < 55 | 🔴 Perlu Latihan | Jawaban belum ke inti |

---

## 📁 STRUKTUR FILE PENTING

```
src/
├── data/
│   ├── interview-questions.ts   ← 35 pertanyaan (dibuat manual)
│   └── colorblind-questions.ts  ← 10 plat digit + 5 plat tracing
├── lib/
│   ├── feedback-engine.ts       ← Algoritma skor 0-100 ⭐
│   └── storage.ts               ← Simpan/baca localStorage
├── components/
│   ├── interview/QuestionCard.tsx    ← Timer + mikrofon + Web Audio
│   └── colorblind/ColorblindPlate.tsx ← Generator SVG Ishihara ⭐
└── pages/
    ├── Interview.tsx    ← Halaman wawancara
    ├── ColorblindTest.tsx ← Halaman tes buta warna
    └── History.tsx      ← Riwayat latihan
```

---

## ❓ FAQ PERTANYAAN PENGUJI

| Pertanyaan | Jawaban Singkat |
|---|---|
| Bahasa apa? | TypeScript (TSX) — ~85% kode |
| Gambar Ishihara dari mana? | Di-generate dari kode (SVG + dot matrix + pseudo-random) |
| Pertanyaan wawancara dari mana? | Dibuat manual, riset dari rekrutmen + standar BNSP/LSP |
| Pakai AI untuk evaluasi? | **TIDAK** — murni algoritma: panjang + kata kunci + deteksi STAR |
| Data tersimpan di mana? | localStorage browser — tidak ada server/database |
| Butuh internet? | Tidak, bisa offline setelah pertama dibuka |
| Database? | Tidak ada. Semua data di browser pengguna sendiri |

---

*Dirangkum dari: [DOKUMENTASI_TEKNIS_JOBREADY.md](./DOKUMENTASI_TEKNIS_JOBREADY.md)*  
*Mata Kuliah: LIDM — Universitas Negeri Yogyakarta | September 2026*
