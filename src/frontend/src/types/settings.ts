export interface AppSettings {
  brandName: string;
  brandSubtitle: string;
  displayName: string;
  welcomeMessage: string;
  showSearch: boolean;
  showStorefrontButton: boolean;
  sidebarDefaultCollapsed: boolean;
  accentColor: "blue" | "green" | "purple" | "orange";
  appTitle: string;
  footerText: string;
}

export const DEFAULT_SETTINGS: AppSettings = {
  brandName: "BUMR tagleni",
  brandSubtitle: "Badan Usaha Milik Rtik Subang",
  displayName: "wijayakusuma",
  welcomeMessage: "Selamat datang kembali",
  showSearch: true,
  showStorefrontButton: true,
  sidebarDefaultCollapsed: false,
  accentColor: "blue",
  appTitle: "BUMR tagleni Dashboard",
  footerText: "",
};
