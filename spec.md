# Qtaada Dashboard

## Current State
Admin dashboard with sidebar, header, stats, charts, orders/products/customers pages, login, and storefront. Settings menu item exists but renders PlaceholderPage.

## Requested Changes (Diff)

### Add
- SettingsPage component with tabs/sections for:
  - **Tampilan Header**: edit judul halaman (pageTitle override per page or global subtitle), welcome message text, show/hide search bar, show/hide storefront button
  - **Branding Sidebar**: edit nama toko (sidebar logo text), subtitle/tagline, username display name
  - **Tata Letak**: toggle sidebar default collapsed/expanded, choose accent color (blue/green/purple/orange presets)
  - **Umum**: app title shown in browser, footer text
- Settings state stored in localStorage so changes persist across sessions
- AppSettings context/state passed down to Header, Sidebar, App so they render dynamically

### Modify
- App.tsx: add settings state (loaded from localStorage), pass to Header and Sidebar
- Header.tsx: accept settings props to render dynamic title, welcome message, show/hide elements
- Sidebar.tsx: accept settings props for logo name and subtitle
- renderPage in App.tsx: render SettingsPage for 'settings' nav item

### Remove
- PlaceholderPage render for 'settings' nav item

## Implementation Plan
1. Create `src/frontend/src/types/settings.ts` with AppSettings interface
2. Create `src/frontend/src/pages/SettingsPage.tsx` with form UI for all settings
3. Update App.tsx to load/save settings from localStorage, pass to Header/Sidebar/SettingsPage
4. Update Header.tsx to use dynamic settings
5. Update Sidebar.tsx to use dynamic settings
