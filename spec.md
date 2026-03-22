# Qtaada Dashboard - Admin Login

## Current State
Dashboard lengkap dengan backend Motoko untuk Produk, Pesanan, dan Pelanggan. Semua pengguna bisa mengakses dan mengelola data tanpa autentikasi.

## Requested Changes (Diff)

### Add
- Halaman login admin dengan username & password
- Proteksi semua halaman manajemen data (hanya admin yang bisa add/edit/delete)
- State autentikasi di frontend
- Tombol logout di header

### Modify
- App.tsx: tambah state `isLoggedIn`, tampilkan LoginPage jika belum login
- Header: tambah tombol logout
- Semua halaman data (Produk, Pesanan, Pelanggan): sembunyikan tombol tambah/edit/hapus jika bukan admin

### Remove
- Tidak ada

## Implementation Plan
1. Buat komponen LoginPage dengan form username + password
2. Kredensial admin: username `wijayakusuma`, password disimpan sebagai konstanta di frontend
3. Tambah state `isLoggedIn` di App.tsx, tampilkan LoginPage jika belum login
4. Teruskan prop `isAdmin` ke semua halaman data
5. Tampilkan/sembunyikan tombol aksi berdasarkan prop `isAdmin`
6. Tambah tombol Logout di Header
