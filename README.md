
# 🔗 ARC Terminal Auto Claim - Multi Akun

Script otomatis untuk klaim semua misi aktif dari platform [arcterminal.xyz](https://arcterminal.xyz) menggunakan beberapa akun Supabase sekaligus.

---

## ✨ Fitur Utama

- ✅ Mendukung banyak akun (dibaca dari `token.txt`)
- 🔄 Otomatis klaim directive yang belum diklaim
- ⚡ Eksekusi cepat tanpa delay
- 📊 Ringkasan poin total per akun
- 📦 Output terminal rapi dan informatif

---

## 📁 Struktur File

```

arc-auto-claim/
├── auto-claim-multi.js     # Script utama
├── token.txt               # Berisi token Supabase (satu per baris)
└── README.md               # Dokumentasi proyek

````

---

## 📥 Instalasi

1. **Clone repositori:**

```bash
git clone https://github.com/USERNAME/arc-auto-claim.git
cd arc-auto-claim
````

2. **Instal dependensi:**

```bash
npm install axios
```

3. **Siapkan file token:**

Buat file `token.txt` dan isi dengan token Supabase kamu (tanpa `Bearer`), satu per baris:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp...
eyJhbGciOiJIUzI1NiIsImtpZCI6Im1...
```

4. **Edit API Key di script:**

Buka `auto-claim-multi.js`, dan cari:

```js
const apiKey = "ISI_APIKEY_KAMU";
```

Ganti dengan nilai `apikey` yang ada di request header saat klaim directive (via DevTools).

---

## ▶️ Cara Menjalankan

```bash
node auto-claim-multi.js
```

---

## 📊 Contoh Output

```
██╗  ██╗     █████╗     ██╗    ██╗  ██╗     ██████╗ 
██║ ██╔╝    ██╔══██╗    ██║    ██║ ██╔╝    ██╔═══██╗
█████╔╝     ███████║    ██║    █████╔╝     ██║   ██║
██╔═██╗     ██╔══██║    ██║    ██╔═██╗     ██║   ██║
██║  ██╗    ██║  ██║    ██║    ██║  ██╗    ╚██████╔╝
╚═╝  ╚═╝    ╚═╝  ╚═╝    ╚═╝    ╚═╝  ╚═╝     ╚═════╝ 

[🧑‍🚀 Akun 1] Ditemukan 2 directive belum diklaim
[✅ Akun 1] Interlink with our Community → +500 pts
[✅ Akun 1] Interlink with our Community → +150 pts
[🎯 Akun 1] Total poin: 650
```

---

## ⚠️ Catatan

* Token expired tidak bisa digunakan.
* Pastikan `Authorization` dan `apikey` kamu valid.
* Script hanya akan mengeksekusi directive dengan `is_completed_by_user: false`.

---



