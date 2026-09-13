# DOKUMENTASI TEKNIS LENGKAP — JobReady AI
### Platform Simulasi Wawancara Kerja & Tes Fisik Ishihara untuk Siswa SMK/SMA

> Dibuat untuk keperluan presentasi & pemahaman teknis mendalam
> Mata Kuliah: LIDM | Universitas Negeri Yogyakarta

---

## DAFTAR ISI

1. Gambaran Umum & Masalah yang Diangkat
2. Bahasa Pemrograman yang Digunakan
3. Tech Stack Lengkap
4. Struktur Folder Proyek
5. Fitur: Simulasi Wawancara (Interview)
6. Fitur: Tes Buta Warna Ishihara
7. Fitur: Timer & Efek Suara
8. Fitur: Riwayat Latihan (History)
9. Cara Kerja Sistem Evaluasi Jawaban
10. Alur Data Aplikasi
11. Masalah yang Diangkat & Relevansi Ide
12. Ringkasan Cepat untuk Presentasi

---

## 1. Gambaran Umum & Masalah yang Diangkat

**JobReady AI** adalah platform web interaktif yang dirancang untuk mempersiapkan siswa SMK/SMA menghadapi proses rekrutmen kerja di Dunia Usaha dan Dunia Industri (DUDI).

### Masalah yang Paling Relevan untuk Diangkat

> "Kesenjangan Kesiapan Kerja Siswa Vokasi: Siswa SMK Mahir Praktik, Tapi Gagal di Wawancara dan Seleksi Fisik"

Masalah ini dipilih karena:

| Dimensi Masalah | Fakta |
|---|---|
| Gap Wawancara | Banyak siswa SMK kompeten secara teknis, tapi tidak terbiasa menjawab pertanyaan rekruter secara terstruktur |
| Seleksi Fisik Diabaikan | Industri otomotif, elektronik, pertambangan mensyaratkan tes buta warna — siswa tidak tahu kondisi mereka |
| Tidak Ada Platform Gratis | LinkedIn/Jobstreet tidak menyediakan latihan wawancara kontekstual untuk jurusan SMK |
| Tanpa Login / Privasi | Semua berjalan di browser (100% client-side), tidak perlu mendaftar |
| Akses Mandiri | Siswa bisa berlatih kapanpun tanpa bergantung pada jadwal bimbingan konseling |

### Siapa Penggunanya?
- Siswa SMK kelas XII yang sedang mempersiapkan diri melamar kerja
- Guru BK (Bimbingan Konseling) yang mendampingi siswa
- Siswa SMA yang ingin mempersiapkan diri untuk dunia kerja

---

## 2. Bahasa Pemrograman yang Digunakan

### Bahasa Paling Dominan: TypeScript (TSX)

| Peringkat | Bahasa | Porsi | Digunakan Untuk |
|---|---|---|---|
| 1 - DOMINAN | TypeScript / TSX | ~85% | Seluruh logika aplikasi, komponen UI, tipe data |
| 2 | CSS (via TailwindCSS) | ~10% | Styling/tampilan semua elemen visual |
| 3 | HTML | ~3% | Template dasar (index.html) & struktur JSX |
| 4 | JavaScript (Config) | ~2% | Konfigurasi Vite, PostCSS, Tailwind |

### Penjelasan Setiap Bahasa

#### TypeScript (.ts dan .tsx)

TypeScript adalah JavaScript yang ditingkatkan dengan sistem tipe data. Kamu mendefinisikan "bentuk" data yang dipakai, sehingga kalau ada kesalahan, langsung ketahuan saat coding (bukan saat dijalankan).

Contoh definisi tipe data pertanyaan wawancara:

    export interface InterviewQuestion {
      id: string;               // ID unik pertanyaan
      fieldId: string;          // Bidang kejuruan (otomotif, tkj, dll)
      question: string;         // Teks pertanyaan
      contextTips: string;      // Panduan menjawab untuk siswa
      evaluatedCompetency: string; // Kompetensi yang diuji
      keywords: string[];       // Kata kunci yang dicari evaluator
      sampleIdealAnswer: string; // Contoh jawaban ideal dari praktisi industri
    }

File .tsx = TypeScript + JSX (sintaks menulis HTML di dalam TypeScript, dipakai React)

---

## 3. Tech Stack Lengkap

### Framework & Library Utama

| Teknologi | Versi | Fungsi |
|---|---|---|
| React 18 | v18.3.1 | Library UI — membuat komponen reusable |
| TypeScript | v5.6.2 | Bahasa utama — menambahkan tipe data ke JavaScript |
| Vite | v6.0.7 | Build tool — menjalankan & mem-bundle aplikasi |
| TailwindCSS | v3.4.17 | Framework CSS — styling via class HTML |
| Lucide React | v0.475.0 | Library ikon — 1000+ ikon siap pakai |
| clsx + tailwind-merge | v2.x | Utility — class CSS kondisional |

### Web API Browser (Bawaan Browser, Tanpa Library Tambahan)

| API | Digunakan Untuk | Di File Mana |
|---|---|---|
| Web Audio API | Efek suara detak jantung & alarm timer | QuestionCard.tsx |
| Web Speech API | Fitur bicara lewat mikrofon (speech-to-text) | QuestionCard.tsx |
| localStorage | Menyimpan riwayat latihan wawancara | storage.ts |
| Canvas API | Area menggambar alur pada tes buta warna | PathTracingCanvas.tsx |
| SVG | Menggambar titik-titik plat Ishihara | ColorblindPlate.tsx |
| Clipboard API | Tombol "Salin Laporan" | InterviewSummary.tsx |
| window.print() | Tombol "Cetak / PDF" | InterviewSummary.tsx |

---

## 4. Struktur Folder Proyek

    LIDM/                              <- Root proyek
    |-- index.html                     <- File HTML utama (entry point browser)
    |-- package.json                   <- Daftar semua library yang dipakai
    |-- vite.config.ts                 <- Konfigurasi build tool Vite
    |-- tailwind.config.js             <- Konfigurasi warna, animasi TailwindCSS
    |-- tsconfig.json                  <- Konfigurasi TypeScript
    |
    `-- src/                           <- Semua kode sumber ada di sini
        |-- main.tsx                   <- Entry point React
        |-- App.tsx                    <- Navigasi antar halaman
        |-- index.css                  <- CSS global + animasi custom
        |
        |-- types/
        |   `-- index.ts               <- Semua definisi tipe data (interface TypeScript)
        |
        |-- data/                      <- DATA STATIS (bukan dari API/database)
        |   |-- interview-questions.ts <- 35 pertanyaan + 5 bidang kejuruan
        |   `-- colorblind-questions.ts <- 10 plat digit + 5 plat tracing
        |
        |-- lib/                       <- LOGIKA BISNIS (engine pemroses)
        |   |-- feedback-engine.ts     <- Algoritma penilaian jawaban (0-100)
        |   |-- storage.ts             <- Simpan/baca/hapus riwayat dari localStorage
        |   `-- utils.ts               <- Fungsi bantuan umum
        |
        |-- hooks/                     <- CUSTOM REACT HOOKS (logika state reusable)
        |   |-- useInterviewSession.ts <- State management sesi wawancara
        |   `-- useColorblindTest.ts   <- State management sesi tes buta warna
        |
        |-- components/                <- KOMPONEN UI (bagian visual reusable)
        |   |-- Navbar.tsx             <- Bar navigasi atas
        |   |-- Footer.tsx             <- Footer bawah
        |   |-- interview/
        |   |   |-- FieldSelector.tsx  <- Pemilih bidang kejuruan + mode timer
        |   |   |-- QuestionCard.tsx   <- Kartu pertanyaan + timer + mikrofon
        |   |   `-- InterviewSummary.tsx <- Laporan & feedback setelah selesai
        |   `-- colorblind/
        |       |-- ColorblindPlate.tsx    <- Menggambar plat Ishihara (SVG)
        |       |-- PathTracingCanvas.tsx  <- Canvas interaktif tracing alur
        |       |-- AnswerOptions.tsx      <- Pilihan jawaban (tombol 1-4)
        |       `-- ColorblindResult.tsx   <- Halaman hasil tes buta warna
        |
        `-- pages/                     <- HALAMAN UTAMA
            |-- Home.tsx               <- Beranda + preview interaktif
            |-- Interview.tsx          <- Halaman simulasi wawancara
            |-- ColorblindTest.tsx     <- Halaman tes buta warna
            `-- History.tsx            <- Halaman riwayat latihan

---

## 5. Fitur: Simulasi Wawancara (Interview)

### 5a. Metodologi Jawaban Rekruter (Format STAR)

STAR adalah metodologi menjawab wawancara yang diakui secara global dan dipakai HRD/rekruter profesional.

| Huruf | Singkatan | Artinya | Contoh |
|---|---|---|---|
| S | Situation | Konteks/latar belakang kejadian | "Saat PKL di bengkel resmi Toyota..." |
| T | Task | Tanggung jawab kamu saat itu | "Saya bertugas menangani 4-5 unit per hari..." |
| A | Action | Tindakan spesifik yang kamu ambil | "Saya melakukan tune up, cek rem..." |
| R | Result | Hasil/dampak dari tindakanmu | "Hasilnya semua unit selesai tepat waktu" |

Cara STAR diimplementasikan dalam kode (file QuestionCard.tsx):

Tombol "+ Format STAR" menyisipkan template ke kotak jawaban:

    const insertStarTemplate = () => {
      const starTemplate =
        '[Situasi]: Pada saat kegiatan praktik/magang, ...\n' +
        '[Tindakan]: Langkah teknis yang saya lakukan adalah ...\n' +
        '[Hasil]: Hasilnya masalah dapat diselesaikan dan ...';
      setAnswerText(starTemplate);
    };

Cara STAR dideteksi dalam algoritma penilaian (file feedback-engine.ts):

    const starIndicators = [
      'saat', 'ketika',           // mendeteksi Situasi
      'tugas', 'tanggung jawab',  // mendeteksi Tugas
      'langkah', 'kemudian',      // mendeteksi Aksi
      'solusi', 'hasilnya',       // mendeteksi Hasil
    ];
    // Jika >= 2 kata ditemukan = jawaban dianggap berstruktur STAR
    // STAR terdeteksi = bonus 20 poin; tidak = bonus 10 poin
    const hasStarStructure = starIndicators.filter(si =>
      cleanAnswer.toLowerCase().includes(si)
    ).length >= 2;

---

### 5b. 5 Kluster Kejuruan Standar DUDI

| No | ID | Nama Lengkap | Tag Kluster | Soal |
|---|---|---|---|---|
| 1 | otomotif | Teknik Kendaraan Ringan (TKR / Otomotif) | Teknik & Manufaktur | 7 |
| 2 | tkj | Teknik Komputer dan Jaringan (TKJ) | Teknologi Informasi | 7 |
| 3 | tata-boga | Tata Boga / Kuliner | Pariwisata & Jasa | 7 |
| 4 | akl | Akuntansi & Keuangan Lembaga (AKL) | Bisnis & Manajemen | 7 |
| 5 | umum | Umum (Semua Jurusan SMK/SMA) | Kesiapan Dasar / Soft Skills | 7 |

Total: 35 Pertanyaan Wawancara

Setiap bidang didefinisikan sebagai objek TypeScript di interview-questions.ts:

    export const VOCATIONAL_FIELDS: Field[] = [
      {
        id: 'otomotif',
        name: 'Teknik Kendaraan Ringan (TKR / Otomotif)',
        shortName: 'Otomotif / TKR',
        description: 'Fokus pada perawatan mesin, sistem transmisi...',
        icon: 'Wrench',          // nama ikon dari library Lucide React
        tag: 'Teknik & Manufaktur',
      },
      // ... 4 bidang lainnya
    ];

---

### 5c. Sumber Pertanyaan Wawancara

PENTING: Pertanyaan wawancara dibuat secara manual oleh pengembang — bukan dari API atau database eksternal.

Pertanyaan disusun berdasarkan:
1. Riset kurikulum SMK — Kompetensi inti dari Permendikbud
2. Standar rekrutmen entry-level — Persyaratan di lowongan Jobstreet/LinkedIn untuk posisi fresh graduate SMK
3. Panduan wawancara industri — Referensi rekrutmen bengkel resmi, IT support, dll.
4. Kata kunci kompetensi BNSP/LSP — Terminologi teknis ujian kompetensi per bidang

Setiap pertanyaan memiliki 4 komponen kunci:

    {
      id: 'oto-1',
      fieldId: 'otomotif',
      
      // Teks pertanyaan rekruter
      question: 'Ceritakan pengalamanmu saat PKL di industri!',
      
      // Panduan tersembunyi untuk siswa
      contextTips: 'Gunakan metode STAR. Jelaskan jenis kendaraan yang ditangani.',
      
      // Kompetensi yang diuji
      evaluatedCompetency: 'Pengalaman Praktik & Kesiapan Kerja Nyata',
      
      // Kata kunci yang dicari algoritma evaluasi
      keywords: ['bengkel', 'pkl', 'mesin', 'servis', 'oli', 'rem', 'tune up'],
      
      // Contoh jawaban ideal (ditampilkan setelah tes selesai)
      sampleIdealAnswer: 'Saat PKL di Bengkel Resmi Toyota selama 3 bulan...'
    }

---

### 5d. Pertanyaan yang Sering Diajukan (FAQ)

| Kategori FAQ | Contoh Pertanyaan |
|---|---|
| Pengalaman Praktis (PKL/Magang) | "Ceritakan pengalamanmu saat PKL di industri!" |
| Penanganan Masalah/Kesalahan | "Bagaimana caramu menangani situasi ketika terjadi kesalahan?" |
| Motivasi & Minat Karier | "Mengapa kamu tertarik berkarier di bidang ini?" |
| Prosedur Keselamatan (K3) | "Jelaskan prosedur K3 yang kamu terapkan!" |
| Kerja Tim & Konflik | "Ceritakan saat kamu harus bekerja dalam tekanan waktu!" |
| Teknologi & Adaptasi | "Apa yang kamu lakukan untuk menghadapi perkembangan teknologi?" |
| Visi Karier | "Di mana kamu melihat dirimu dalam 2-3 tahun ke depan?" |

---

### 5e. Sistem Evaluasi & Rincian Feedback Jawaban

Dibuat menggunakan: TypeScript murni (TANPA AI/API eksternal)
File: src/lib/feedback-engine.ts

#### Cara Kerja Algoritma Penilaian (0-100)

Langkah 1: Hitung panjang jawaban (charLength)
- Jika < 20 karakter -> Skor 10-25 (Terlalu Singkat)
- Jika 20-59 karakter -> Skor 40+ (Cukup Singkat)
- Jika >= 60 karakter -> Hitung lengkap:

Rumus skor untuk jawaban panjang:

    // SKOR PANJANG: makin panjang, makin tinggi (max 40 poin)
    const lengthBonus = Math.min(40, Math.floor((charLength / 250) * 40));
    
    // SKOR KATA KUNCI: tiap kata kunci industri ditemukan = 10 poin (max 40)
    const keywordScore = Math.min(40, matchedKeywords.length * 10);
    
    // BONUS STRUKTUR STAR: 20 poin jika terdeteksi, 10 poin jika tidak
    const starBonus = hasStarStructure ? 20 : 10;
    
    // TOTAL SKOR FINAL (maksimum 100)
    score = Math.min(100, 30 + lengthBonus + keywordScore + starBonus);

#### Kategori Hasil & Badge Warna

| Skor | Badge | Warna | Keterangan |
|---|---|---|---|
| >= 80 | "Sangat Siap Kerja" | HIJAU | Jawaban terstruktur, relevan, profesional |
| 55-79 | "Cukup Siap (Perlu Pemantapan)" | KUNING | Konsep baik, perlu diperkaya |
| < 55 | "Perlu Latihan Tambahan" | MERAH | Jawaban ringkas/belum ke inti |

#### Komponen Feedback yang Ditampilkan (InterviewSummary.tsx)

1. Skor total rata-rata (contoh: 40/100)
2. Badge kesiapan kerja (warna sesuai skor)
3. Rincian per-pertanyaan (expand/collapse accordion):
   - Kata kunci teknis yang teridentifikasi
   - Kelebihan jawaban
   - Saran pembinaan untuk siswa & guru BK
   - Tolok ukur jawaban praktisi industri
4. Waktu menjawab per pertanyaan
5. Tombol aksi: Salin Laporan, Cetak/PDF, Riwayat, Ulangi, Lanjut Tes Buta Warna

---

## 6. Fitur: Tes Buta Warna Ishihara

### 6a. Gambar Plat Ishihara Dari Mana?

JAWABAN KUNCI: Gambar plat Ishihara TIDAK diambil dari internet. Tidak ada file gambar (JPG/PNG) yang didownload.

Gambar plat Ishihara dalam aplikasi ini dibuat 100% secara programatik menggunakan SVG dan algoritma matematika langsung di browser.

Artinya tidak ada gambar eksternal sama sekali. Setiap titik, warna, dan bentuknya dihitung ulang setiap kali halaman dibuka oleh kode TypeScript.

---

### 6b. Cara Membuat Gambar Plat Ishihara

Teknologi: SVG (Scalable Vector Graphics)
File: src/components/colorblind/ColorblindPlate.tsx

#### Langkah 1: Definisikan Bentuk Digit (Dot Matrix)

Setiap angka 0-9 didefinisikan sebagai matriks 7 baris x 5 kolom.
Angka 1 = titik aktif, angka 0 = tidak ada titik.

Contoh matriks untuk angka '8':

    '8': [
      [1, 1, 1, 1, 1],  // baris 1
      [1, 0, 0, 0, 1],  // baris 2
      [1, 0, 0, 0, 1],  // baris 3
      [0, 1, 1, 1, 0],  // baris 4 (tengah)
      [1, 0, 0, 0, 1],  // baris 5
      [1, 0, 0, 0, 1],  // baris 6
      [1, 1, 1, 1, 1],  // baris 7
    ],

#### Langkah 2: Tentukan Palet Warna

Setiap plat punya palet warna berbeda untuk menguji jenis buta warna berbeda:

    const PALETTES = {
      'orange-green': {
        target: ['#e05338', '#eb6841', '#ed8240'],      // Warna angka (oranye-merah)
        background: ['#739845', '#88aa52', '#5d8033'],  // Warna latar (hijau)
      },
      'red-green': {
        target: ['#cc3333', '#d64545', '#bf2626'],      // Warna angka (merah)
        background: ['#598a4e', '#6fa363', '#49753f'],  // Warna latar (hijau)
      },
      'yellow-blue': {
        target: ['#e5a93b', '#d9992b'],                 // Warna angka (kuning)
        background: ['#507a9e', '#3f6789'],             // Warna latar (biru)
      },
    };

#### Langkah 3: Generate Ribuan Titik (Dots)

Algoritma melakukan "grid scan" di dalam area lingkaran. Setiap titik dicek: apakah posisinya jatuh di dalam bentuk angka atau tidak?

    // Pseudo-random deterministik -> plat selalu sama tiap render
    let seed = question.plateNumber * 777 + 12345;
    const pseudoRandom = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    
    // Scan grid dengan interval 10.5px
    for (let y = center - plateRadius; y <= center + plateRadius; y += 10.5) {
      for (let x = center - plateRadius; x <= center + plateRadius; x += 10.5) {
        
        // Tambahkan sedikit "jitter" agar tidak terlihat seperti grid
        const jitterX = (pseudoRandom() - 0.5) * 4.5;
        const jitterY = (pseudoRandom() - 0.5) * 4.5;
        const cx = x + jitterX;
        const cy = y + jitterY;
    
        // Hanya titik di dalam lingkaran
        if (Math.hypot(cx - 150, cy - 150) < plateRadius - 3) {
          const inTarget = isPointInsideDigits(cx, cy); // CEK: di dalam angka?
          const colorPool = inTarget ? palette.target : palette.background;
          const r = 3.6 + pseudoRandom() * 4.2; // Ukuran titik acak
          list.push({ cx, cy, r, color: colorPool[random] });
        }
      }
    }

#### Langkah 4: Render ke SVG

Setiap titik dirender sebagai elemen circle di dalam SVG:

    <svg viewBox="0 0 300 300">
      <circle cx="150" cy="150" r="147" fill="#f8fafc" />  {/* Lingkaran luar */}
      
      {/* Render semua titik yang di-generate kode */}
      {dots.map((dot) => (
        <circle
          key={dot.id}
          cx={dot.cx}       // posisi X
          cy={dot.cy}       // posisi Y
          r={dot.r}         // ukuran radius titik
          fill={dot.color}  // warna titik
        />
      ))}
    </svg>

Hasil akhir: Ribuan lingkaran kecil SVG yang membentuk gambar persis seperti plat Ishihara asli!

#### Jenis Plat yang Dibuat

| Tipe Plat | Keterangan | Contoh |
|---|---|---|
| demonstration | Semua orang bisa membacanya (pemanasan) | Plat #1: angka 12 |
| transformation | Normal lihat A, buta warna lihat B | Plat #2: normal=8, buta=3 |
| vanishing | Normal lihat angkanya, buta warna tidak bisa | Plat #6: normal=6, buta=tidak terlihat |

---

### 6c. Mode Tracing / Penelusuran Alur Berkelok

Mode kedua tes buta warna: menelusuri jalur berkelok dari titik A ke titik B di atas plat.

Teknologi: HTML5 Canvas API
File: src/components/colorblind/PathTracingCanvas.tsx

Pengguna menggambar dengan mouse/jari di atas kanvas transparan yang diletakkan di atas SVG plat Ishihara.

Cara kerja event handler kanvas:

    // Saat mouse/jari mulai menyentuh kanvas
    const handlePointerDown = (e) => {
      setIsDrawing(true);
      currentStrokeRef.current = [getCanvasCoords(e)]; // Simpan titik awal
    };
    
    // Saat mouse/jari bergerak
    const handlePointerMove = (e) => {
      if (!isDrawing) return;
      currentStrokeRef.current.push(getCanvasCoords(e)); // Kumpulkan titik
      redrawCanvas(); // Gambar ulang garis
    };
    
    // Saat mouse/jari dilepas
    const handlePointerUp = (e) => {
      setIsDrawing(false);
      strokesRef.current.push([...currentStrokeRef.current]);
      setHasDrawn(true); // Aktifkan tombol jawab
    };

Cara menggambar garis di kanvas (Canvas 2D API):

    const redrawCanvas = () => {
      const ctx = canvas.getContext('2d'); // Ambil konteks 2D kanvas
      
      allStrokes.forEach((stroke) => {
        ctx.beginPath();
        ctx.moveTo(stroke[0].x, stroke[0].y);
        
        for (let i = 1; i < stroke.length; i++) {
          ctx.lineTo(stroke[i].x, stroke[i].y); // Sambungkan titik-titik
        }
        
        ctx.strokeStyle = '#0284c7'; // Warna garis = biru langit
        ctx.lineWidth = 4.5;
        ctx.lineCap = 'round';       // Ujung garis membulat
        ctx.shadowBlur = 6;          // Efek glow
        ctx.stroke();                // Gambar garis ke layar
      });
    };

---

## 7. Fitur: Timer & Efek Suara

Dibuat menggunakan: Web Audio API (bawaan browser, tanpa library)
File: src/components/interview/QuestionCard.tsx

### Timer Countdown

    useEffect(() => {
      if (mode === 'timed') {
        const interval = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              setIsTimeUp(true); // Tandai waktu habis
              return 0;
            }
            return prev - 1; // Kurangi 1 setiap detik
          });
        }, 1000); // Interval: 1000ms = 1 detik
        return () => clearInterval(interval);
      }
    }, [mode, isPaused, timeLeft]);

### Efek Suara Detak Jantung (10 Detik Terakhir)

Web Audio API digunakan untuk membuat suara detak jantung (lub-dub):

    const playHeartbeatSound = (isUrgent: boolean = false) => {
      const ctx = new AudioContext();
      const now = ctx.currentTime;
      
      // 1. Detak "lub" = nada bass rendah
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(isUrgent ? 120 : 95, now);
      osc1.frequency.exponentialRampToValueAtTime(35, now + 0.09);
      // ...
      
      // 2. Detak "dub" = 120ms setelah "lub"
      const t2 = now + 0.12;
      const osc2 = ctx.createOscillator();
      osc2.frequency.setValueAtTime(isUrgent ? 105 : 80, t2);
      // ...
    };

### Perubahan Visual Saat Timer Kritis (<= 10 detik)

Animasi CSS di index.css yang aktif saat kritis:
- Kartu pertanyaan berkedip merah
- Ikon jam berdenyut
- Vignette merah di tepi layar (efek penyempitan pandangan)
- Teks waktu berubah dari biru ke merah

---

## 8. Fitur: Riwayat Latihan (History)

Semua hasil latihan disimpan otomatis tanpa server menggunakan localStorage browser.

Teknologi: Web Storage API (localStorage)
File: src/lib/storage.ts

    // SIMPAN sesi wawancara yang baru selesai
    export function saveInterviewSession(session) {
      const current = getInterviewHistory();
      const updated = [session, ...current]; // Terbaru di depan
      localStorage.setItem('jobready_interview_history', JSON.stringify(updated));
    }
    
    // BACA semua riwayat (diurutkan dari yang terbaru)
    export function getInterviewHistory() {
      const raw = localStorage.getItem('jobready_interview_history');
      return JSON.parse(raw).sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }

Yang tersimpan: ID sesi, tanggal, bidang kejuruan, mode, skor, semua jawaban + feedback, durasi total.

---

## 9. Cara Kerja Sistem Evaluasi Jawaban (Alur Lengkap)

    Langkah 1: Siswa mengetik/bicara jawaban di QuestionCard.tsx
    
    Langkah 2: Saat tombol "Kirim Jawaban" ditekan
    
    Langkah 3: useInterviewSession.ts -> submitAnswer()
               - Catat waktu menjawab (timeSpent)
    
    Langkah 4: feedback-engine.ts -> evaluateInterviewAnswer()
               - Hitung panjang jawaban (charLength)
               - Tokenisasi kata-kata (split by spasi)
               - Cocokkan dengan keywords per pertanyaan
               - Deteksi pola STAR (kata indikator)
               - Hitung skor (0-100)
               - Tentukan badge (merah/kuning/hijau)
               - Generate teks critique + strengths + suggestions
    
    Langkah 5: Return objek AnswerFeedback ke useInterviewSession
    
    Langkah 6: Jika masih ada pertanyaan -> currentQuestionIndex++
               Jika selesai semua -> saveInterviewSession() -> localStorage
    
    Langkah 7: InterviewSummary.tsx menampilkan laporan lengkap kepada pengguna

---

## 10. Alur Data Aplikasi (End-to-End)

    BROWSER (Client Only - Tidak Ada Server)
    
    index.html -> main.tsx -> App.tsx
                                  |
                        Navigasi antar halaman:
                        - Home (Beranda)
                        - Interview (Simulasi Wawancara)
                        - ColorblindTest (Tes Buta Warna)
                        - History (Riwayat Latihan)
                              |
              +---------------+---------------+
              |                               |
        Interview.tsx                   History.tsx
              |                               |
        useInterviewSession            getInterviewHistory
              |                         (dari localStorage)
              |
        feedback-engine.ts
        (algoritma penilaian)
              |
        localStorage
        (riwayat sesi tersimpan)
    
    TIDAK ADA SERVER. TIDAK ADA DATABASE EKSTERNAL.
    Semua data tersimpan di browser pengguna sendiri.

---

## 11. Masalah yang Diangkat & Relevansi Ide

### Judul Masalah yang Paling Cocok (untuk Presentasi)

Pilihan 1 (Formal/Akademis):
"Kesenjangan Literasi Rekrutmen dan Ketidaksiapan Fisik Verifikasi Industri pada Siswa Vokasi di Era Transisi Pendidikan ke Dunia Kerja"

Pilihan 2 (Ringkas & Kuat):
"Siswa SMK Siap Teknis, Tidak Siap Wawancara: Platform Latihan Mandiri sebagai Jembatan Kesiapan Kerja Berbasis Standar DUDI"

### Mengapa Masalah Ini Relevan?

| Aspek | Data / Fakta |
|---|---|
| Pengangguran SMK | BPS: lulusan SMK menyumbang angka pengangguran terbuka tertinggi |
| Gap Wawancara | Banyak siswa gugur bukan karena tidak kompeten, tapi tidak tahu cara menjawab rekruter |
| Seleksi Fisik | Industri otomotif/elektronik mensyaratkan tes buta warna — tidak ada alat screening gratis |
| Ketergantungan Guru BK | Bimbingan wawancara terbatas pada sesi bersama guru BK |
| Akses Offline | Platform berjalan tanpa API key, tanpa login, bisa offline setelah pertama dibuka |

### Solusi yang Ditawarkan JobReady AI

| Masalah | Solusi di Aplikasi |
|---|---|
| Tidak tahu cara menjawab wawancara | Simulasi 35 pertanyaan nyata + panduan STAR per pertanyaan |
| Tidak ada feedback langsung | Algoritma evaluasi instan: skor, kata kunci, kelebihan, saran |
| Tidak tahu kondisi penglihatan warna | 10 plat digit + 5 plat tracing Ishihara prosedural |
| Latihan tidak bisa diulang | Riwayat tersimpan otomatis di localStorage |
| Tidak bisa latihan mandiri | 100% browser-based, tanpa login, tanpa server |
| Latihan tidak menegangkan | Timer 2 menit + efek suara + visual kritis = simulasi nyata |

---

## 12. Ringkasan Cepat untuk Presentasi

| Pertanyaan | Jawaban Singkat |
|---|---|
| Bahasa apa? | TypeScript (TSX) sebagai bahasa utama ~85%, CSS via Tailwind ~10%, HTML minimal |
| Framework? | React 18 + Vite (build tool) |
| Gambar plat Ishihara dari mana? | Di-generate algoritma dari kode — ribuan lingkaran SVG berdasarkan dot-matrix angka dan pseudo-random deterministik |
| Pertanyaan wawancara dari mana? | Dibuat manual berdasarkan riset rekrutmen entry-level, standar BNSP/LSP, dan lowongan kerja nyata |
| Evaluasi jawaban pakai AI? | TIDAK — murni algoritma TypeScript: hitung panjang + cocokkan kata kunci + deteksi pola STAR |
| Data tersimpan di mana? | localStorage browser — tidak ada server/database |
| Butuh internet? | Tidak, setelah pertama kali dibuka bisa jalan offline |
| Masalah yang diangkat? | Kesenjangan kesiapan rekrutmen siswa SMK: tidak siap wawancara + tidak tahu kondisi buta warna |

---

Dokumen ini dibuat untuk keperluan presentasi akademis.
Versi: 1.0 | September 2026 | Mata Kuliah: LIDM - Universitas Negeri Yogyakarta
