# 🧠 PENJELASAN TEKNOLOGI — JobReady AI
> Penjelasan sederhana untuk presentasi LIDM | UNY 2026

---

## 1. TypeScript (.ts dan .tsx) — Bahasa Utama

### Apa itu TypeScript?
TypeScript itu **JavaScript yang lebih canggih dan aman**.

Ibarat nulis resep masak:
- **JavaScript biasa** = nulis bahan-bahan tanpa takaran → bisa salah nggak ketahuan
- **TypeScript** = nulis bahan + takarannya → kalau salah, langsung ketahuan SEBELUM dimasak

```
JavaScript biasa:
let nama = "Budi"
nama = 123  ← bisa, tapi salah! (nama harusnya teks, bukan angka)

TypeScript:
let nama: string = "Budi"
nama = 123  ← LANGSUNG ERROR saat coding, bukan saat dijalankan!
```

### Bedanya .ts dan .tsx?
| Ekstensi | Isi | Contoh File |
|---|---|---|
| `.ts` | Kode logika murni (tanpa tampilan) | `feedback-engine.ts`, `storage.ts` |
| `.tsx` | Kode logika + tampilan HTML (JSX) | `Interview.tsx`, `QuestionCard.tsx` |

> **Analogi .tsx:** Seperti nulis dokumen Word yang bisa menghitung otomatis — ada teks tampilan + ada rumus/logika di dalamnya.

---

## 2. Vite & vite.config.ts — Alat Pembangun

### Apa itu Vite?
Vite adalah **alat yang menjalankan dan membangun aplikasi** kita di komputer.

Analogi sederhana:
- Vite = **dapur** yang memasak semua bahan (kode TypeScript, CSS, gambar) menjadi hidangan jadi (website siap pakai)
- Tanpa Vite, browser tidak bisa langsung membaca file TypeScript

### Apa itu vite.config.ts?
File pengaturan dapur itu. Isinya instruksi seperti:
- "Hasil masakan taruh di folder mana?"
- "Bahan apa saja yang perlu disiapkan?"
- "Port berapa yang dipakai saat testing?"

```
// vite.config.ts = pengaturan sederhana
export default {
  plugins: [react()],   // "gunakan plugin React"
  server: { port: 5173 } // "jalankan di port 5173"
}
```

**Saat presentasi ditanya:** *"Vite itu seperti kompor dan panci — alat memasaknya. Kodenya bahan mentahnya. Vite yang mengubah bahan mentah jadi website yang bisa dibuka browser."*

---

## 3. File .d.ts — File Definisi Tipe

### Apa itu file .d.ts?
File `.d.ts` = **kamus/glosarium** untuk TypeScript.

Isinya bukan kode yang dijalankan, tapi **daftar "bentuk" data** yang ada di sebuah library.

Analogi:
- Kamu pakai library `lucide-react` untuk ikon
- File `.d.ts`-nya berisi: "library ini punya komponen `<Wrench>`, `<Monitor>`, dst."
- TypeScript baca file `.d.ts` itu → tahu kamu pakai ikon yang benar

```
// Contoh isi file .d.ts (bukan kode kita, tapi bawaan library)
export declare const Wrench: React.FC<IconProps>;  // "ada ikon Wrench"
export declare const Monitor: React.FC<IconProps>; // "ada ikon Monitor"
```

**Intinya:** File `.d.ts` tidak perlu kamu tulis sendiri — otomatis ada saat install library.

---

## 4. SVG (Scalable Vector Graphics) — Gambar Plat Ishihara

### Apa itu SVG?
SVG = **gambar yang dibuat dari kode matematika**, bukan dari piksel.

| Gambar Biasa (JPG/PNG) | SVG |
|---|---|
| Tersimpan sebagai titik-titik warna (piksel) | Tersimpan sebagai instruksi matematika |
| Kalau diperbesar → pecah/blur | Kalau diperbesar → tetap tajam |
| File besar | File kecil |
| Tidak bisa diubah lewat kode | Bisa diubah/dibuat dari kode TypeScript ✅ |

### Kenapa Ishihara pakai SVG?
Karena kita **membuat gambarnya dari kode**, bukan mengunduh gambar!

```
<!-- SVG = instruksi gambar berbasis teks -->
<svg>
  <circle cx="150" cy="100" r="15" fill="#e05338" />  ← lingkaran merah
  <circle cx="170" cy="120" r="12" fill="#739845" />  ← lingkaran hijau
  <!-- ribuan lingkaran seperti ini = plat Ishihara! -->
</svg>
```

**Saat ditanya penguji:** *"Kami tidak mengunduh gambar plat Ishihara dari internet. Setiap gambar dibuat ulang dari nol setiap kali halaman dibuka, menggunakan ribuan perintah SVG yang dihitung oleh algoritma TypeScript."*

---

## 5. TailwindCSS — Cara Mengatur Tampilan

### Apa itu CSS?
CSS = **aturan tampilan** website. Warna, ukuran font, jarak, posisi — semua diatur CSS.

```
/* CSS biasa */
.tombol {
  background-color: blue;
  padding: 10px 20px;
  border-radius: 8px;
}
```

### Apa itu TailwindCSS?
TailwindCSS = **CSS siap pakai dalam bentuk nama kelas**.

Daripada nulis aturan CSS panjang, cukup tulis nama kelasnya langsung di HTML:

```
<!-- CSS biasa: harus nulis di file terpisah -->
<button class="tombol">Kirim</button>

<!-- TailwindCSS: langsung di sini, tanpa file CSS terpisah -->
<button class="bg-blue-500 px-5 py-2 rounded-lg text-white">Kirim</button>
```

### Perbandingan Singkat
| | CSS Biasa | TailwindCSS |
|---|---|---|
| Cara styling | Tulis di file .css terpisah | Tulis langsung di elemen HTML |
| Kecepatan | Lebih lambat (2 file) | Lebih cepat (1 tempat) |
| Konsistensi | Harus atur sendiri | Sudah ada skala warna/ukuran baku |

**Analogi:** TailwindCSS itu seperti stiker template — kamu tinggal pilih dan tempel, nggak perlu menggambar dari nol.

---

## 6. Ringkasan "Jawab Cepat" Jika Ditanya

| Teknologi | Jawab Singkat |
|---|---|
| **TypeScript** | JavaScript + sistem tipe data → error ketahuan saat coding, bukan saat dijalankan |
| **.tsx** | File TypeScript yang berisi tampilan HTML (JSX) — untuk komponen React |
| **.ts** | File TypeScript murni — untuk logika/algoritma tanpa tampilan |
| **.d.ts** | Kamus tipe data dari library — tidak perlu ditulis manual |
| **Vite** | Alat yang menjalankan aplikasi di komputer untuk testing & build |
| **vite.config.ts** | File pengaturan Vite |
| **SVG** | Format gambar berbasis kode matematika — bisa dibuat/diubah dari TypeScript |
| **TailwindCSS** | Framework CSS — styling cepat dengan nama kelas langsung di HTML |

---

*Dibuat untuk keperluan pemahaman teknis presentasi LIDM*
*Mata Kuliah: LIDM — Universitas Negeri Yogyakarta | September 2026*
