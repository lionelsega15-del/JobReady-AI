# Hasil Brainstorming & Tech Stack
# JobReady AI — LIDM VII/2026 (ITDP)

---

## 1. Hasil Brainstorming

### 1.1 Ide & Topik Produk
**JobReady AI** — platform latihan kesiapan kerja berbasis web untuk membantu siswa SMK/SMA mempersiapkan diri menghadapi seleksi kerja, mencakup simulasi wawancara kerja dan latihan tes buta warna.

### 1.2 Target Pengguna
- **Utama:** Siswa SMK/SMA (khususnya kelas XII yang akan menghadapi PKL atau melamar kerja)
- **Pendukung:** Guru Bimbingan Konseling (BK) dan pembina Bursa Kerja Khusus (BKK) di sekolah

### 1.3 Positioning terhadap Pendidikan Formal
JobReady AI diposisikan sebagai **alat bantu BKK/BK di SMK/SMA** untuk mendukung kegiatan bimbingan karier siswa — bukan sekadar aplikasi rekrutmen/HR-tech, melainkan bagian dari proses pembelajaran dan pendampingan siswa sebelum memasuki dunia kerja atau PKL.

### 1.4 Lingkup ITDP
Karya ini termasuk lingkup **Mikro** — inovasi sistem/teknologi informasi dalam pembelajaran individual siswa (bukan sistem manajemen/administrasi institusi berskala makro).

### 1.5 Fitur Utama (2 Modul Seimbang)

| Modul | Deskripsi | Kompleksitas |
|---|---|---|
| **Simulasi Wawancara Kerja** | Siswa memilih bidang keahlian, menjawab pertanyaan wawancara satu per satu, menerima feedback otomatis (rule-based) | Sedang |
| **Latihan Tes Buta Warna** | Siswa mengerjakan soal pola warna bergaya Ishihara (dibuat sendiri via SVG/CSS), dicocokkan ke kunci jawaban | Rendah |

Kedua modul **berdiri sendiri (independen)** — tidak saling terhubung dan tidak ada skor gabungan, agar pengembangan tetap sederhana sesuai keterbatasan waktu.

### 1.6 Judul Produk (Revisi Final)
> **"JobReady AI: Platform Simulasi Wawancara dan Tes Kesiapan Kerja Berbasis AI untuk Mendukung Bimbingan Karier Siswa SMK/SMA"**

### 1.7 Batasan yang Disepakati
- Tanpa database — semua materi (soal, pertanyaan) disimpan langsung di source code
- Tanpa sistem akun/login pengguna
- Tanpa skor gabungan antar modul
- Feedback wawancara menggunakan logika rule-based sederhana (bukan API AI eksternal), supaya tidak butuh API key dan tetap ringan

### 1.8 Rencana Kerja (Roadmap 3 Hari)

| Hari | Aktivitas |
|---|---|
| Hari 1 | Bangun prototipe 2 modul di Antigravity + mulai tulis latar belakang & tujuan proposal |
| Hari 2 | Selesaikan proposal (metode, analisis, desain) + rekam video demo (maksimal 3 menit) |
| Hari 3 | Cek similaritas, siapkan surat pernyataan transparansi AI, submit |

### 1.9 Konteks Presentasi
Produk ini akan dipresentasikan di depan kelas bersama satu rekan tim.

---

## 2. Tech Stack

### 2.1 Keputusan Teknologi

| Bagian | Teknologi | Keterangan |
|---|---|---|
| Framework | **React (native SPA)** | Tanpa framework tambahan seperti Next.js |
| Build tool | **Vite** | Build cepat, cocok untuk timeline singkat |
| Arsitektur | **SPA (Single Page Application) / Client-side** | Tidak perlu server-side rendering |
| Deployment | **Vercel** | Deploy cepat langsung dari repo |
| Database | **Tidak digunakan** | Semua materi web disimpan langsung di source code |
| Penyimpanan sementara | **Memory lokal browser (React state)** | Data progres tidak permanen, cukup untuk demo |
| UI Components | **shadcn/ui** | Digunakan untuk toast, dialog, tombol, card, dan komponen interaktif lainnya |
| Icons | **Lucide** | Konsisten, tidak perlu membuat ikon custom |
| Kualitas Desain | **Pendekatan "taste skill" / anti-AI-slop** | Menghindari desain generik AI (gradient berlebihan, rounded card di semua elemen, ikon emoji bertebaran) |
| Tooling Pengembangan (Antigravity) | **Context7** | Agar kode yang dihasilkan mengacu ke dokumentasi library versi terbaru, bukan pengetahuan lama |
| Tooling Pengembangan (Antigravity) | **Ponytail** | Digunakan untuk efisiensi proses coding (generate/inspect/refactor) |

### 2.2 Prinsip Arsitektur Kode

Meskipun tanpa database, arsitektur tetap dijaga rapi agar **pemanggilan data tidak lag dan tidak error**:

- **Data konten dipisahkan dari komponen tampilan** — seluruh pertanyaan wawancara dan soal tes buta warna diletakkan di folder `data/`, bukan ditulis langsung di dalam komponen.
- **Tidak ada fetch/API call untuk data konten** — karena semua materi statis, data langsung dibaca dari source code tanpa proses loading atau risiko galat jaringan.
- **Komponen dibuat reusable** — misalnya komponen kartu pertanyaan dapat dipakai ulang untuk kedua modul dengan data yang berbeda.
- **Logika dipisahkan lewat custom hooks** — agar komponen tampilan tetap bersih dan mudah dirawat.

### 2.3 Gambaran Struktur Folder

```
src/
├── components/
│   ├── ui/            (komponen shadcn: button, card, dialog, toast)
│   ├── interview/      (komponen modul simulasi wawancara)
│   └── colorblind/     (komponen modul tes buta warna)
├── data/
│   ├── interview-questions.ts
│   └── colorblind-questions.ts
├── hooks/
│   ├── useInterviewSession.ts
│   └── useColorblindTest.ts
├── lib/
│   └── utils.ts
├── pages/
│   ├── Home.tsx
│   ├── Interview.tsx
│   └── ColorblindTest.tsx
├── App.tsx
└── main.tsx
```

### 2.4 Prinsip Desain UI

- **Clean, bukan "AI slop"** — hindari gradient ungu berlebihan, glassmorphism di semua elemen, ikon emoji bertebaran, dan rounded card yang dipakai tanpa alasan jelas.
- **Whitespace cukup, tipografi kuat, hierarchy jelas** — fokus pada keterbacaan dan kemudahan penggunaan bagi siswa SMK/SMA.
- **Warna tidak berlebihan** — warna aksen hanya digunakan untuk elemen penting (tombol utama, indikator hasil).
- **Konsistensi komponen** — seluruh elemen interaktif (tombol, dialog, notifikasi) memakai shadcn/ui, seluruh ikon memakai Lucide.

---

*Dokumen ini merangkum hasil brainstorming ide, fitur, dan keputusan teknologi untuk pengembangan JobReady AI, sebagai pelengkap PRD utama.*