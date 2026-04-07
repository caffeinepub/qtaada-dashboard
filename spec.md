# Qtaada Dashboard

## Current State
- Dashboard (DashboardPage.tsx) tidak menerima props `settings` sehingga tidak menampilkan nama admin yang diinput di pengaturan
- Header.tsx dan Sidebar.tsx sudah menerima `settings` dan menampilkan nama dari settings dengan benar
- StatsCards.tsx menggunakan data statis dari mockData, tidak dari backend
- DashboardPage tidak menampilkan sambutan dengan nama yang sesuai dari settings
- Halaman Pesanan, Produk, dan Pelanggan sudah memiliki props `isAdmin` dan fungsi tambah/edit/hapus sudah ada
- App.tsx sudah mengoper `isLoggedIn` sebagai `isAdmin` ke semua halaman
- Semua data tersimpan di backend (persistent)

## Requested Changes (Diff)

### Add
- DashboardPage perlu menerima prop `settings` agar bisa menampilkan nama admin yang diinput di pengaturan
- Dashboard perlu menampilkan greeting/sambutan dengan nama dari settings (sesuai dengan yang diinput di menu Pengaturan)
- Tambahkan statistik live di dashboard: hitung total pesanan, total produk, dan total pelanggan langsung dari backend

### Modify
- DashboardPage.tsx: tambah prop `settings?: AppSettings` dan tampilkan greeting "Selamat datang kembali, {displayName}" di bagian atas dashboard
- DashboardPage.tsx: gunakan useActor untuk load data live dari backend (getOrders, getProducts, getCustomers) dan tampilkan jumlah di stats cards yang relevan (Total Pesanan, Total Produk, Total Pelanggan)
- App.tsx: teruskan `settings` ke DashboardPage
- StatsCards.tsx: terima props `liveData` opsional untuk menampilkan angka live dari backend (total pesanan, total produk, total pelanggan), jika ada gunakan angka live, jika tidak gunakan mock data
- Sidebar.tsx: Pastikan logout button di sidebar berfungsi (saat ini tidak ada handler onLogout)
- App.tsx: Tambahkan onLogout handler ke Sidebar

### Remove
- Tidak ada yang dihapus

## Implementation Plan
1. Update DashboardPage.tsx:
   - Tambah prop `settings?: AppSettings`
   - Tambah prop `isAdmin?: boolean`
   - Tampilkan greeting dengan `displayName` dari settings di bagian atas halaman
   - Gunakan useActor untuk fetch data live (getOrders, getProducts, getCustomers)
   - Hitung total pesanan, total produk, total pelanggan
   - Kirim data live ke StatsCards

2. Update StatsCards.tsx:
   - Tambah optional props `totalOrders`, `totalProducts`, `totalCustomers` (number)
   - Jika props hadir, tampilkan angka live; jika tidak, gunakan mock data

3. Update App.tsx:
   - Teruskan `settings` ke DashboardPage
   - Teruskan `onLogout` handler ke Sidebar

4. Update Sidebar.tsx:
   - Tambah prop `onLogout?: () => void`
   - Sambungkan logout button di sidebar ke handler ini
