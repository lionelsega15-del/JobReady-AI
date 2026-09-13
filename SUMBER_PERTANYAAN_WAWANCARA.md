# 📚 SUMBER PERTANYAAN WAWANCARA — JobReady AI
> Penjelasan & Verifikasi Sumber untuk Presentasi LIDM | UNY 2026

---

## ⚠️ PENTING: Pertanyaan Dibuat Manual, Bukan dari AI

Pertanyaan wawancara di JobReady AI **TIDAK** diambil dari ChatGPT, API, atau database online.  
Semua dibuat manual oleh pengembang berdasarkan **4 sumber nyata** berikut ini.

---

## Sumber 1: Riset Kurikulum SMK — Kompetensi dari Permendikbud

### Apa maksudnya?
Pertanyaan wawancara disusun sesuai dengan **apa yang diajarkan di SMK** berdasarkan regulasi resmi pemerintah.

### Dasar Hukumnya
| Regulasi | Isi |
|---|---|
| **Permendikbud No. 24 Tahun 2016** | Kompetensi Inti (KI) & Kompetensi Dasar (KD) untuk Kurikulum 2013 |
| **Permendikbud No. 37 Tahun 2018** | Pembaruan KI/KD Kurikulum 2013 |
| **Kurikulum Merdeka (terbaru)** | KI/KD diganti **Capaian Pembelajaran (CP)** per fase |

### Apa yang Dimaksud Kompetensi Inti?
Kompetensi Inti = **kemampuan wajib** yang harus dimiliki siswa SMK sesuai jurusannya.

Contoh untuk jurusan **Otomotif (TKR)**:
- Bisa melakukan servis berkala (ganti oli, cek rem, tune up)
- Paham sistem kelistrikan kendaraan
- Bisa baca diagram/wiring kelistrikan

Maka pertanyaan wawancara seperti:
> *"Ceritakan pengalamanmu saat PKL di industri!"*

...dirancang agar siswa bisa menjawab pakai kompetensi yang sudah diajarkan sesuai kurikulum ini.

### Bisa Dicek di Mana?
- 🔗 Permendikbud: [peraturan.go.id](https://peraturan.go.id)
- 🔗 Kurikulum Merdeka: [kurikulum.kemdikbud.go.id](https://kurikulum.kemdikbud.go.id)
- 🔗 Pusat Kurikulum Kemendikbudristek: [kemendikdasmen.go.id](https://kemendikdasmen.go.id)

---

## Sumber 2: Standar Rekrutmen Entry-Level — Jobstreet & LinkedIn

### Apa maksudnya?
Pengembang melihat **lowongan kerja nyata** di internet untuk tahu pertanyaan apa yang biasanya ditanyakan rekruter kepada lulusan SMK.

### Contoh Yang Dicari
Buka [jobstreet.co.id](https://www.jobstreet.co.id) → cari:
- `"Mekanik SMK"` atau `"Teknisi Otomotif Fresh Graduate"`
- `"IT Support SMK TKJ"`
- `"Cook Helper / Juru Masak SMK Tata Boga"`

### Apa Yang Ditemukan?
Dari lowongan nyata, rekruter biasanya menanyakan:

| Pertanyaan Rekruter Nyata | Jenis Pertanyaan di JobReady AI |
|---|---|
| "Apa pengalaman PKL kamu?" | Pengalaman Praktis |
| "Jelaskan prosedur K3 yang kamu tahu" | Keselamatan Kerja |
| "Kenapa kamu mau kerja di bidang ini?" | Motivasi Karier |
| "Pernah kerja tim? Ceritakan!" | Kerja Tim & Konflik |
| "Di mana kamu ingin 3 tahun lagi?" | Visi Karier |

### Cara Verifikasi Sendiri
1. Buka **jobstreet.co.id**
2. Ketik jurusan SMK yang ingin dicek (contoh: `Otomotif SMK` atau `TKJ fresh graduate`)
3. Buka 5–10 lowongan
4. Lihat bagian **"Kualifikasi"** dan **"Deskripsi Pekerjaan"**
5. Dari situ bisa dilihat kata kunci dan kompetensi apa yang diminta industri

---

## Sumber 3: Panduan Wawancara Industri

### Apa maksudnya?
Selain lowongan kerja, pengembang juga melihat **panduan rekrutmen** dari perusahaan dan bengkel resmi.

### Contoh Referensi yang Digunakan
| Industri | Sumber Panduan |
|---|---|
| Otomotif | Prosedur rekrutmen bengkel resmi (Toyota, Honda, Yamaha authorized) |
| IT/TKJ | Panduan seleksi teknisi IT support entry-level |
| Tata Boga | Standar operasional dapur hotel & restoran |
| AKL | Standar penerimaan staf keuangan entry-level perbankan/BPR |

### Kenapa Penting?
Karena **cara bengkel resmi merekrut teknisi** berbeda dengan cara perusahaan umum merekrut. Industri otomotif misalnya sangat menekankan:
- Keselamatan Kerja (K3)
- Prosedur SOP perawatan kendaraan
- Kemampuan menggunakan alat ukur

Semua itu masuk ke dalam **kata kunci** yang dideteksi algoritma penilaian.

---

## Sumber 4: Kata Kunci Kompetensi BNSP/LSP

### Apa itu BNSP dan LSP?

| Singkatan | Kepanjangan | Fungsi |
|---|---|---|
| **BNSP** | Badan Nasional Sertifikasi Profesi | Lembaga pemerintah yang menetapkan standar kompetensi kerja nasional (SKKNI) |
| **LSP** | Lembaga Sertifikasi Profesi | Pelaksana ujian kompetensi yang sudah dapat lisensi dari BNSP |
| **LSP-P1** | LSP Pihak Kesatu | LSP yang ada di dalam SMK sendiri |
| **SKKNI** | Standar Kompetensi Kerja Nasional Indonesia | Daftar resmi kemampuan apa yang harus dikuasai per profesi |

### Alur Singkat Sertifikasi SMK
```
Siswa SMK → Daftar ke LSP sekolah → Uji Kompetensi di TUK → Lulus → 
Dapat Sertifikat Kompetensi dari BNSP ✅
```

### Kenapa Relevan dengan Pertanyaan Wawancara?
BNSP menetapkan kata kunci teknis resmi per profesi dalam dokumen **SKKNI**.  
Contoh untuk Otomotif:
- "servis berkala", "tune up", "rem", "oli", "transmisi" → dari SKKNI Otomotif
- "jaringan", "IP address", "server", "troubleshoot" → dari SKKNI TKJ
- "FIFO", "mise en place", "higienitas", "resep standar" → dari SKKNI Tata Boga

Kata kunci inilah yang dipakai **algoritma feedback-engine.ts** untuk menilai jawaban siswa!

### Bisa Dicek di Mana?
- 🔗 Website resmi BNSP: [bnsp.go.id](https://bnsp.go.id)
- 🔗 Dokumen SKKNI bisa diunduh di: [Sistem Informasi SKKNI Kemnaker](https://skkni.kemnaker.go.id)

---

## 🎯 Jawaban Siap Pakai Jika Ditanya Penguji

**Q: "Pertanyaan wawancaranya dari mana? Apa tidak asal-asalan?"**

> *"Pertanyaan dibuat berdasarkan 4 sumber yang bisa diverifikasi:*
> *Pertama, kurikulum SMK dari Permendikbud yang menentukan kompetensi apa yang harus dikuasai per jurusan. Kedua, lowongan kerja nyata di Jobstreet untuk fresh graduate SMK. Ketiga, panduan rekrutmen bengkel resmi dan industri terkait. Keempat, dokumen SKKNI dari BNSP yang memuat terminologi teknis resmi per profesi. Jadi bukan asal buat — semua berbasis standar resmi yang bisa dicek."*

**Q: "Kenapa tidak pakai AI untuk buat pertanyaannya?"**

> *"Karena pertanyaan yang dibuat manual lebih kontekstual dan relevan untuk siswa SMK Indonesia. AI generik tidak tahu standar BNSP atau kurikulum Permendikbud secara spesifik. Dengan membuat manual berdasarkan sumber-sumber nyata, kualitas pertanyaannya bisa dijamin sesuai dengan kondisi dunia kerja di Indonesia."*

---

## 📋 Ringkasan 4 Sumber

| No | Sumber | Cek di |
|---|---|---|
| 1 | Kurikulum SMK (Permendikbud) | peraturan.go.id / kemendikdasmen.go.id |
| 2 | Lowongan kerja entry-level SMK | jobstreet.co.id / linkedin.com/jobs |
| 3 | Panduan rekrutmen industri | Website bengkel resmi, asosiasi industri |
| 4 | SKKNI dari BNSP/LSP | bnsp.go.id / skkni.kemnaker.go.id |

---

*Dibuat untuk keperluan pemahaman & verifikasi presentasi LIDM*
*Mata Kuliah: LIDM — Universitas Negeri Yogyakarta | September 2026*
