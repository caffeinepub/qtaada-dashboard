# Qtaada Dashboard

## Current State
Admin dashboard dengan backend Motoko dan frontend React. Memiliki halaman Produk, Pesanan, Pelanggan, dan Pengaturan. Backend sudah mendukung `demoLink` dan `imageUrl` pada Product, namun IDL factory (`backend.did.js`) dan interface (`backend.ts`, `backend.d.ts`) masih menggunakan definisi lama tanpa `demoLink`.

## Requested Changes (Diff)

### Add
- Tidak ada penambahan fitur baru.

### Modify
- `src/frontend/src/declarations/backend.did.js`: Tambahkan field `demoLink` ke IDL Product record dan argumen `addProduct`/`updateProduct`.
- `src/frontend/src/backend.ts`: Update interface dan implementasi `addProduct`/`updateProduct` agar menyertakan `demoLink`.
- `src/frontend/src/backend.d.ts`: Update type `backendInterface` agar menyertakan `demoLink`.
- `src/frontend/backend.d.ts`: Update `_SERVICE` Product type agar menyertakan `demoLink`.

### Remove
- Tidak ada penghapusan.

## Implementation Plan
1. Update `backend.did.js` IDL factory -- tambahkan `demoLink: IDL.Text` ke Product record dan `IDL.Text` ke argumen addProduct/updateProduct.
2. Update `backend.ts` -- tambahkan `demoLink` ke interface dan class method addProduct/updateProduct.
3. Update `backend.d.ts` (kedua file) -- sinkronkan type definitions.
4. Validasi build.
