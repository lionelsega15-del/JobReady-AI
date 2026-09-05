# Product Requirements Document (PRD)
# JobReady AI

**Kompetisi:** LIDM VII/2026 — Cabang Inovasi Teknologi Digital Pendidikan (ITDP)
**Subtema:** Teknologi Digital untuk Ekosistem Pendidikan Berdampak dan Berintegritas
**Lingkup Karya:** Mikro (inovasi sistem/teknologi informasi dalam pembelajaran)
**Versi Dokumen:** 2.0 (Diperluas)

---

## Daftar Isi

1. Ringkasan Eksekutif
2. Latar Belakang Masalah
3. Tujuan dan Manfaat
4. Target Pengguna & Persona
5. Lingkup Produk (Scope)
6. User Journey / Alur Pengguna
7. Spesifikasi Fitur Detail
8. Contoh Konten (Bank Soal & Pertanyaan)
9. Kebutuhan Non-Fungsional
10. Arsitektur & Tech Stack
11. Model Data (Data Schema)
12. Desain & Prinsip UI/UX
13. Wireframe Deskriptif (Layout Tiap Halaman)
14. Pemetaan ke Kriteria Penilaian ITDP
15. Rencana Pengujian & Validasi
16. Risiko dan Mitigasi
17. Batasan Produk (Constraints)
18. Rencana Pengembangan Lanjutan
19. Rencana Kerja & Timeline
20. Rencana Video Demo
21. Glosarium

---

## 1. Ringkasan Eksekutif

**Nama Produk:** JobReady AI

**Tagline:** Platform Simulasi Wawancara dan Tes Kesiapan Kerja Berbasis AI untuk Mendukung Bimbingan Karier Siswa SMK/SMA

**Deskripsi Singkat:**
JobReady AI adalah platform web ringan yang membantu siswa SMK/SMA berlatih menghadapi proses seleksi kerja sebelum melamar pekerjaan atau menjalani Praktik Kerja Lapangan (PKL). Produk ini terdiri dari dua modul latihan mandiri — simulasi wawancara kerja dan latihan tes buta warna — yang dirancang untuk digunakan dalam sesi Bimbingan Konseling (BK) atau kegiatan Bursa Kerja Khusus (BKK) di sekolah.

**Masalah yang diselesaikan:** Kesenjangan antara kompetensi teknis yang dimiliki lulusan SMK/SMA dan kesiapan non-teknis (soft skill wawancara, kesiapan administratif) saat menghadapi seleksi kerja.

**Solusi:** Platform latihan mandiri berbasis web, tanpa biaya infrastruktur besar, dapat diakses kapan saja oleh siswa maupun digunakan terpandu oleh guru BK.

---

## 2. Latar Belakang Masalah

- Banyak lulusan SMK/SMA memiliki keterampilan teknis sesuai jurusan, namun belum terbiasa dengan format wawancara kerja formal sehingga kurang percaya diri saat sesi seleksi.
- Tes buta warna merupakan salah satu syarat administratif yang umum disyaratkan perusahaan, terutama pada bidang teknik, otomotif, kelistrikan, dan operator produksi — namun jarang dilatih secara khusus di lingkungan sekolah.
- Guru BK dan pembina BKK sering memiliki keterbatasan waktu dan alat bantu untuk memberikan simulasi wawancara kepada seluruh siswa secara individual.
- Dibutuhkan alat bantu digital yang sederhana, tidak memerlukan biaya berlangganan, dan mudah diakses melalui browser di laboratorium komputer sekolah maupun perangkat pribadi siswa.

---

## 3. Tujuan dan Manfaat

**Tujuan Produk:**
1. Menyediakan sarana latihan simulasi wawancara kerja yang relevan dengan bidang keahlian siswa SMK/SMA.
2. Menyediakan sarana latihan tes buta warna sebagai bagian dari kesiapan tes administratif kerja.
3. Mendukung program bimbingan karier sekolah dengan alat bantu digital yang ringan, gratis diakses, dan mudah digunakan tanpa pelatihan khusus.

**Indikator Pencapaian Tujuan:**
- Siswa dapat menyelesaikan minimal satu sesi simulasi wawancara penuh (seluruh pertanyaan terjawab).
- Siswa dapat menyelesaikan sesi tes buta warna dan memahami hasilnya.
- Guru BK dapat menjalankan sesi demo di kelas tanpa kendala teknis dalam waktu kurang dari 5 menit persiapan.

**Manfaat:**
| Pemangku Kepentingan | Manfaat |
|---|---|
| Siswa | Meningkatkan kepercayaan diri, familiar dengan format wawancara, memahami kesiapan administratif |
| Guru BK / Pembina BKK | Memiliki alat bantu bimbingan karier praktis tanpa biaya operasional besar |
| Sekolah | Mendukung program penyaluran lulusan (BKK) dengan siswa yang lebih siap |
| Dunia industri (tidak langsung) | Menerima kandidat pelamar yang lebih siap secara mental dan administratif |

---

## 4. Target Pengguna & Persona

### Persona 1: Siswa (Pengguna Utama)
- **Nama contoh:** Dimas, 17 tahun, siswa kelas XII SMK jurusan Teknik Kendaraan Ringan
- **Kebutuhan:** Ingin tahu seperti apa pertanyaan wawancara kerja yang biasa ditanyakan, dan ingin memastikan tidak buta warna sebelum melamar ke bengkel/pabrik otomotif.
- **Tantangan:** Belum pernah wawancara kerja sebelumnya, gugup, tidak tahu standar jawaban yang baik.
- **Titik sentuh dengan produk:** Mengakses platform secara mandiri di rumah atau saat sesi BK di sekolah.

### Persona 2: Guru BK / Pembina BKK (Pengguna Pendukung)
- **Nama contoh:** Bu Sari, guru BK SMK
- **Kebutuhan:** Alat bantu praktis untuk sesi bimbingan karier klasikal, tanpa perlu instalasi rumit atau biaya langganan.
- **Tantangan:** Waktu terbatas untuk melatih puluhan siswa secara individual.
- **Titik sentuh dengan produk:** Menampilkan platform di depan kelas / mengarahkan siswa mengakses secara mandiri, lalu membahas hasilnya bersama.

---

## 5. Lingkup Produk (Scope)

### Termasuk dalam scope (MVP):
- Modul Simulasi Wawancara Kerja (multi-bidang)
- Modul Latihan Tes Buta Warna
- Halaman utama (landing) dengan navigasi ke kedua modul
- Tampilan hasil/ringkasan di akhir setiap modul

### Di luar scope (tidak dikerjakan untuk versi ini):
- Sistem akun/login pengguna
- Database/backend server
- Skor gabungan atau dashboard terintegrasi antar modul
- Rekomendasi pekerjaan otomatis berbasis hasil tes
- Analisis AI generatif real-time (LLM API) untuk penilaian wawancara — versi MVP memakai rule-based
- Multi-bahasa (versi awal Bahasa Indonesia saja)

---

## 6. User Journey / Alur Pengguna

### Journey A — Siswa berlatih wawancara secara mandiri
1. Siswa membuka website JobReady AI.
2. Siswa melihat halaman utama dengan dua pilihan modul.
3. Siswa memilih "Simulasi Wawancara Kerja".
4. Siswa memilih bidang/jurusan yang sesuai.
5. Siswa menjawab 3–5 pertanyaan satu per satu.
6. Siswa menerima feedback per jawaban dan ringkasan akhir.
7. Siswa dapat memilih "Coba lagi" atau kembali ke halaman utama.

### Journey B — Siswa berlatih tes buta warna
1. Siswa membuka website JobReady AI.
2. Siswa memilih "Latihan Tes Buta Warna".
3. Siswa membaca instruksi singkat.
4. Siswa menjawab serangkaian soal pola warna satu per satu.
5. Siswa menerima skor akhir beserta keterangan umum dan disclaimer medis.
6. Siswa dapat mengulang tes atau kembali ke halaman utama.

### Journey C — Guru BK memandu sesi kelas
1. Guru membuka platform melalui proyektor kelas.
2. Guru menjelaskan tujuan sesi.
3. Guru mengarahkan siswa membuka platform secara mandiri di perangkat masing-masing (atau bergiliran menggunakan komputer lab).
4. Setelah sesi, guru memandu diskusi reflektif berdasarkan pengalaman siswa menjawab pertanyaan wawancara.

---

## 7. Spesifikasi Fitur Detail

### 7.1 Modul 1: Simulasi Wawancara Kerja

**Fungsi utama:**
- Pemilihan bidang keahlian
- Sesi tanya-jawab bertahap (satu pertanyaan tampil pada satu waktu)
- Feedback otomatis per jawaban
- Ringkasan akhir sesi

**Detail interaksi:**
- Pertanyaan ditampilkan dalam kartu (card), dengan area teks (textarea) untuk jawaban siswa.
- Tombol "Lanjut" aktif setelah siswa mengisi minimal beberapa karakter (validasi ringan agar tidak dikosongkan).
- Indikator progres (misal "Pertanyaan 2 dari 5") ditampilkan di bagian atas.
- Setelah menjawab seluruh pertanyaan, sistem menampilkan halaman ringkasan berisi seluruh pertanyaan + jawaban siswa + feedback otomatis per jawaban.

**Logika feedback (rule-based, tanpa API eksternal):**
- Jika jawaban terlalu pendek (< 20 karakter) → beri catatan "Jawaban terlalu singkat, coba jelaskan lebih detail dengan contoh."
- Jika jawaban tidak mengandung kata kunci relevan dengan pertanyaan (daftar kata kunci per pertanyaan disiapkan di data) → beri catatan "Coba kaitkan jawaban dengan pengalaman atau keahlianmu."
- Jika jawaban cukup panjang dan mengandung kata kunci relevan → beri catatan positif "Jawaban sudah cukup baik dan relevan."

### 7.2 Modul 2: Latihan Tes Buta Warna

**Fungsi utama:**
- Menampilkan soal bergaya Ishihara (dibuat dengan pola SVG/CSS titik-titik berwarna, bukan gambar berlisensi pihak ketiga)
- Pilihan jawaban berupa angka
- Pencocokan otomatis ke kunci jawaban
- Skor akhir dan interpretasi umum

**Detail interaksi:**
- Setiap soal menampilkan satu pola warna dan 4 pilihan angka.
- Siswa memilih satu jawaban, tombol "Lanjut" muncul setelah memilih.
- Di akhir sesi: tampilkan skor (contoh: 8/10), dengan kategori sederhana:
  - Skor tinggi → "Kemungkinan penglihatan warna normal"
  - Skor rendah → "Disarankan melakukan pemeriksaan lebih lanjut ke dokter/optometris"
- **Disclaimer wajib ditampilkan jelas:** "Tes ini adalah simulasi latihan dan BUKAN alat diagnosis medis resmi. Untuk hasil akurat, lakukan pemeriksaan di fasilitas kesehatan."

---

## 8. Contoh Konten (Bank Soal & Pertanyaan)

### 8.1 Contoh Pertanyaan Wawancara per Bidang

**Bidang: Teknik Kendaraan Ringan / Otomotif**
1. Ceritakan pengalamanmu saat praktik kerja di bengkel atau PKL.
2. Bagaimana caramu menangani kesalahan saat bekerja dengan mesin/alat berat?
3. Mengapa kamu tertarik bekerja di bidang otomotif?

**Bidang: Tata Boga**
1. Ceritakan pengalaman memasak atau mengelola dapur yang pernah kamu lakukan.
2. Bagaimana caramu menjaga kebersihan dan keamanan pangan saat bekerja?
3. Apa yang membuatmu tertarik bekerja di industri kuliner?

**Bidang: Teknik Komputer dan Jaringan (TKJ)**
1. Ceritakan pengalamanmu menangani masalah jaringan atau perangkat komputer.
2. Bagaimana caramu belajar teknologi baru yang belum pernah kamu pelajari di sekolah?
3. Mengapa kamu ingin bekerja di bidang IT?

**Bidang Umum (semua jurusan)**
1. Ceritakan tentang dirimu secara singkat.
2. Apa kelebihan dan kekuranganmu?
3. Mengapa perusahaan harus menerimamu?

### 8.2 Contoh Struktur Soal Tes Buta Warna
- Soal 1: Pola dengan angka "12" tersembunyi dalam titik hijau-oranye → pilihan: 12, 17, 8, tidak terlihat
- Soal 2: Pola dengan angka "8" tersembunyi dalam titik merah-hijau → pilihan: 3, 8, 6, tidak terlihat
- (Pola dibuat sendiri menggunakan SVG, bukan reproduksi gambar Ishihara asli berlisensi, untuk menghindari isu hak cipta)

---

## 9. Kebutuhan Non-Fungsional

| Aspek | Kebutuhan |
|---|---|
| Performa | Halaman termuat cepat (< 2 detik) karena tidak ada pemanggilan API/data eksternal untuk konten |
| Kompatibilitas | Dapat diakses di browser umum (Chrome, Firefox, Edge) versi desktop maupun mobile |
| Aksesibilitas | Kontras warna teks memadai, ukuran font terbaca jelas, navigasi dapat diakses dengan keyboard dasar |
| Keamanan | Tidak ada data pribadi siswa yang disimpan/dikirim ke server manapun (privasi terjaga karena tanpa backend) |
| Skalabilitas | Karena data statis, penambahan bidang/pertanyaan baru cukup dilakukan dengan menambah entri di file data |

---

## 10. Arsitektur & Tech Stack

| Bagian | Teknologi |
|---|---|
| Framework | React |
| Build tool | Vite |
| Arsitektur | SPA (Single Page Application) / Client-side |
| Bahasa | TypeScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| Icons | Lucide React |
| State Management | React state + custom hooks |
| Persistensi | Tidak wajib; opsional localStorage untuk menyimpan progres sesi sementara |
| Data Konten | Static data di source code (folder `data/`) |
| Deployment | Vercel |
| Tooling Pengembangan | Antigravity, Context7 (dokumentasi library aktual), Ponytail (efisiensi coding) |

**Prinsip arsitektur:**
- Data konten (pertanyaan wawancara, soal tes buta warna, kunci jawaban) dipisahkan rapi di folder `data/`, tidak dicampur ke komponen tampilan.
- Tidak ada fetch/API call untuk data konten — seluruh materi dibaca langsung dari source code, sehingga tidak ada delay loading atau risiko error jaringan.
- Komponen dibuat reusable dan modular (contoh: komponen kartu pertanyaan dapat dipakai ulang di kedua modul dengan data berbeda).

**Struktur folder:**
```
src/
├── components/
│   ├── ui/                    (komponen shadcn: button, card, dialog, toast, progress)
│   ├── interview/
│   │   ├── FieldSelector.tsx
│   │   ├── QuestionCard.tsx
│   │   └── InterviewSummary.tsx
│   └── colorblind/
│       ├── ColorblindPlate.tsx
│       ├── AnswerOptions.tsx
│       └── ColorblindResult.tsx
├── data/
│   ├── interview-questions.ts
│   └── colorblind-questions.ts
├── hooks/
│   ├── useInterviewSession.ts
│   └── useColorblindTest.ts
├── lib/
│   ├── feedback-engine.ts     (logika rule-based feedback jawaban wawancara)
│   └── utils.ts
├── pages/
│   ├── Home.tsx
│   ├── Interview.tsx
│   └── ColorblindTest.tsx
├── App.tsx
└── main.tsx
```

---

## 11. Model Data (Data Schema)

Karena tanpa database, berikut struktur data statis yang digunakan:

```ts
// interview-questions.ts
interface InterviewQuestion {
  id: string;
  fieldId: string;          // contoh: "otomotif", "tata-boga"
  question: string;
  keywords: string[];       // kata kunci untuk logika feedback
}

interface Field {
  id: string;
  name: string;             // contoh: "Teknik Kendaraan Ringan"
}
```

```ts
// colorblind-questions.ts
interface ColorblindQuestion {
  id: string;
  pattern: string;          // referensi ke komponen SVG pola
  options: number[];
  correctAnswer: number;
}
```

```ts
// Struktur sesi (state di memory, TIDAK disimpan permanen)
interface InterviewSessionState {
  fieldId: string;
  currentQuestionIndex: number;
  answers: { questionId: string; answerText: string; feedback: string }[];
}

interface ColorblindSessionState {
  currentQuestionIndex: number;
  answers: { questionId: string; selected: number; correct: boolean }[];
}
```

---

## 12. Desain & Prinsip UI/UX

- **Gaya visual:** clean, whitespace cukup, tipografi tegas dengan hierarchy jelas, warna tidak berlebihan.
- **Menghindari "AI slop":** tidak menggunakan gradient ungu berlebihan, glassmorphism berlebihan, ikon emoji bertebaran, atau rounded card di semua elemen tanpa alasan.
- **Palet warna:** warna dasar netral hangat (off-white), warna primer yang tenang dan profesional (misal biru tua/hijau tua), warna aksen digunakan terbatas untuk tombol utama dan indikator hasil.
- **Komponen interaktif:** menggunakan shadcn/ui untuk tombol, dialog konfirmasi (misal saat siswa ingin mengulang tes), toast notifikasi (misal saat jawaban tersimpan), progress bar (indikator sesi).
- **Ikon:** menggunakan Lucide React secara konsisten (contoh: `ArrowRight`, `CheckCircle`, `RotateCcw`, `User`, `Briefcase`, `Eye`).
- **Animasi:** dibatasi hanya untuk transisi antar pertanyaan dan feedback hasil, tidak berlebihan.

---

## 13. Wireframe Deskriptif (Layout Tiap Halaman)

### Halaman Utama (Home)
- Header: Judul "JobReady AI" + deskripsi singkat satu kalimat
- Dua kartu besar sejajar (atau bertumpuk di mobile):
  - Kartu 1: "Simulasi Wawancara Kerja" + ikon `Briefcase` + tombol "Mulai"
  - Kartu 2: "Latihan Tes Buta Warna" + ikon `Eye` + tombol "Mulai"
- Footer sederhana: keterangan bahwa ini produk edukasi, bukan alat resmi seleksi kerja

### Halaman Modul Wawancara
- Bagian atas: indikator progres ("Pertanyaan 2 dari 5") + tombol kembali ke Home
- Tengah: kartu pertanyaan + area jawaban (textarea)
- Bawah: tombol "Lanjut"
- Halaman ringkasan: daftar pertanyaan-jawaban-feedback dalam bentuk accordion/list, tombol "Coba Lagi" dan "Kembali ke Beranda"

### Halaman Modul Tes Buta Warna
- Bagian atas: indikator progres + tombol kembali ke Home
- Tengah: pola warna (SVG) + pilihan jawaban dalam bentuk tombol angka
- Bawah: tombol "Lanjut"
- Halaman hasil: skor akhir + keterangan + disclaimer + tombol "Coba Lagi" dan "Kembali ke Beranda"

---

## 14. Pemetaan ke Kriteria Penilaian ITDP

| Kriteria Penilaian (Bobot) | Bagaimana JobReady AI Menjawabnya |
|---|---|
| Dampak terhadap ekosistem pendidikan (20) | Mendukung evaluasi kompetensi siswa (kesiapan kerja) sebagai bagian dari pembelajaran/bimbingan karier di sekolah |
| Aspek permasalahan & kebutuhan teknologi (20) | Menjawab kesenjangan nyata: siswa SMK/SMA kurang latihan wawancara & tes administratif sebelum kerja |
| Idea — keunikan & kecerdasan (25) | Kombinasi simulasi wawancara dengan feedback otomatis + latihan tes buta warna dalam satu platform ringan tanpa biaya infrastruktur besar |
| Pengembangan produk teknologi (25) | Arsitektur rapi (data terpisah dari komponen), stack modern (React, Vite, shadcn), tanpa ketergantungan database yang rumit |
| Validasi terhadap pengguna (10) | Rencana uji coba langsung dengan siswa SMK/SMA dan guru BK (lihat bagian 15) |

---

## 15. Rencana Pengujian & Validasi

- **Uji fungsional internal:** memastikan seluruh alur (pemilihan bidang, menjawab pertanyaan, menerima feedback, mengulang sesi) berjalan tanpa error di berbagai ukuran layar.
- **Uji coba terbatas dengan pengguna nyata:** meminta beberapa siswa SMK/SMA (bisa teman sekolah/adik kelas) mencoba kedua modul, kemudian mengisi masukan singkat (mudah/tidak, relevan/tidak, saran perbaikan).
- **Indikator keberhasilan validasi:**
  - Siswa dapat menyelesaikan sesi tanpa bantuan/penjelasan tambahan dari pengembang.
  - Siswa menyatakan pertanyaan/soal terasa relevan dengan bidang mereka.

---

## 16. Risiko dan Mitigasi

| Risiko | Mitigasi |
|---|---|
| Waktu pengembangan sangat terbatas (2-3 hari) | Membatasi fitur MVP seketat mungkin, menunda fitur kompleks ke "Rencana Pengembangan Lanjutan" |
| Feedback rule-based dianggap terlalu sederhana oleh juri | Menjelaskan secara eksplisit di proposal bahwa ini adalah versi MVP dan rencana pengembangan mencakup integrasi AI generatif |
| Soal tes buta warna dianggap kurang valid secara medis | Mencantumkan disclaimer jelas bahwa ini alat latihan/edukasi, bukan alat diagnosis resmi |
| Data statis kurang fleksibel untuk skala besar | Untuk MVP tidak masalah; dijelaskan sebagai bagian dari roadmap penambahan database di pengembangan lanjutan |

---

## 17. Batasan Produk (Constraints)

- Tidak menggunakan database — seluruh materi tersimpan di source code.
- Tidak ada sistem login/akun pengguna pada versi ini.
- Progres pengguna (jika disimpan) hanya bertahan selama sesi berlangsung di perangkat yang sama.
- Feedback wawancara bersifat rule-based, bukan analisis AI generatif mendalam.
- Waktu pengembangan terbatas (2–3 hari efektif), sehingga fitur dijaga seminimal mungkin namun tetap fungsional.

---

## 18. Rencana Pengembangan Lanjutan (Future Work)

- Integrasi API AI (model bahasa) untuk analisis jawaban wawancara yang lebih mendalam dan personal.
- Penambahan modul tes kesiapan kerja lain (misalnya tes kepribadian kerja, tes logika dasar, simulasi psikotes sederhana).
- Sistem akun siswa dan database agar guru BK/BKK dapat memantau progres siswa secara berkelanjutan dari waktu ke waktu.
- Dashboard skor gabungan sebagai laporan kesiapan kerja menyeluruh per siswa, dapat diakses oleh guru BK.
- Perluasan bank pertanyaan wawancara untuk lebih banyak bidang/jurusan SMK.

---

## 19. Rencana Kerja & Timeline

| Hari | Aktivitas |
|---|---|
| Hari 1 | Membangun prototipe 2 modul di Antigravity (struktur folder, komponen dasar, data statis) + menulis latar belakang & tujuan proposal |
| Hari 2 | Menyelesaikan seluruh isi proposal (metode pengembangan, analisis fungsional, desain produk) + merekam video demo (maksimal 3 menit, mencakup intro dan subtitle) |
| Hari 3 | Mengecek similaritas dokumen proposal, menyiapkan surat pernyataan transparansi penggunaan AI, submit ke aplikasi lomba |

---

## 20. Rencana Video Demo (≤ 3 Menit)

Sesuai ketentuan LIDM, video harus menggambarkan proses pengembangan dengan pencapaian minimal 50%, mencantumkan intro dan subtitle, format MP4 720p.

**Struktur saran:**
1. Intro (5–10 detik): judul karya + logo tim/sekolah/kampus
2. Penjelasan masalah singkat (20–30 detik): kesenjangan kesiapan kerja siswa SMK/SMA
3. Demo Modul 1 — Simulasi Wawancara (45–60 detik): tunjukkan alur dari pemilihan bidang sampai feedback
4. Demo Modul 2 — Tes Buta Warna (30–45 detik): tunjukkan alur soal sampai hasil
5. Penutup (10–15 detik): ringkasan manfaat + ajakan/kesimpulan

---

## 21. Glosarium

- **BKK:** Bursa Kerja Khusus, unit di SMK yang bertugas menyalurkan lulusan ke dunia kerja.
- **BK:** Bimbingan Konseling, layanan pendampingan siswa di sekolah termasuk bimbingan karier.
- **PKL:** Praktik Kerja Lapangan, program magang wajib bagi siswa SMK.
- **Rule-based feedback:** Sistem pemberian umpan balik berdasarkan aturan logika sederhana (bukan model AI generatif).
- **SPA (Single Page Application):** Arsitektur aplikasi web yang berjalan dalam satu halaman tanpa reload penuh saat berpindah tampilan.

---

*Dokumen ini adalah blueprint kerja lengkap untuk pengembangan prototipe JobReady AI dan penyusunan proposal LIDM VII/2026 cabang ITDP.*