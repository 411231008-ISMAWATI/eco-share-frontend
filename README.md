# EcoShare Frontend

## Summary

EcoShare Frontend is a web-based rental management application developed using Vue 3 and integrated with the EcoShare REST API. The application allows administrators to manage rental items and enables users to browse, rent, and view their rental history through a responsive web interface.

---

## Technology Stack

### Frontend
- Vue 3
- Vite
- Vue Router
- Pinia
- Axios
- Bootstrap 5
- Bootstrap Icons

### Backend API
- Node.js
- Express.js
- REST API
- JWT Authentication

### Database
- MySQL

### AI Recommendation
- Not implemented

---

## Flow Aplikasi

1. Pengguna melakukan login menggunakan email dan password.
2. Frontend mengirimkan permintaan autentikasi ke Backend REST API menggunakan JWT.
3. Setelah login berhasil, sistem menampilkan menu sesuai dengan hak akses pengguna (Admin atau User).
4. Admin dapat mengelola data barang (tambah, ubah, hapus), memantau transaksi peminjaman, serta melihat riwayat transaksi.
5. User dapat melihat daftar barang, melakukan peminjaman, dan melihat riwayat peminjamannya sendiri.
6. Setiap transaksi peminjaman akan secara otomatis memperbarui stok barang melalui Backend API.
7. Frontend menampilkan pesan berhasil maupun gagal secara konsisten berdasarkan respons dari Backend API.

---

## Project Structure

```text
src/
├── api/
├── assets/
├── components/
├── layouts/
├── router/
├── stores/
└── views/
```

---

## Installation

Clone repository

```bash
git clone https://github.com/411231008-ISMAWATI/eco-share-frontend.git
```

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

Build production

```bash
npm run build
```

---

## Author

**Ismawati (411231008)**  
Universitas Dian Nusantara
