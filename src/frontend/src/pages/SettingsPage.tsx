import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { AppSettings } from "@/types/settings";
import { Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface SettingsPageProps {
  settings: AppSettings;
  onSave: (s: AppSettings) => void;
}

const accentOptions: {
  key: AppSettings["accentColor"];
  label: string;
  bg: string;
}[] = [
  { key: "blue", label: "Biru", bg: "#3b82f6" },
  { key: "green", label: "Hijau", bg: "#22c55e" },
  { key: "purple", label: "Ungu", bg: "#a855f7" },
  { key: "orange", label: "Oranye", bg: "#f97316" },
];

export function SettingsPage({ settings, onSave }: SettingsPageProps) {
  const [form, setForm] = useState<AppSettings>({ ...settings });

  const set = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = () => {
    onSave(form);
    toast.success("Pengaturan berhasil disimpan");
  };

  return (
    <div
      className="max-w-3xl mx-auto space-y-6 pb-10"
      data-ocid="settings.page"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-700 text-foreground">
            Pengaturan
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Kelola tampilan dan tata letak dashboard
          </p>
        </div>
        <Button
          onClick={handleSave}
          className="gap-2"
          data-ocid="settings.save_button"
        >
          <Save size={16} />
          Simpan Pengaturan
        </Button>
      </div>

      {/* Branding */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Branding &amp; Identitas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="brandName">Nama Brand</Label>
              <Input
                id="brandName"
                data-ocid="settings.brandName.input"
                value={form.brandName}
                onChange={(e) => set("brandName", e.target.value)}
                placeholder="BUMR tagleni"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="brandSubtitle">Subjudul Brand</Label>
              <Input
                id="brandSubtitle"
                data-ocid="settings.brandSubtitle.input"
                value={form.brandSubtitle}
                onChange={(e) => set("brandSubtitle", e.target.value)}
                placeholder="Badan Usaha Milik Rtik Subang"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="displayName">Nama Tampilan Pengguna</Label>
              <Input
                id="displayName"
                data-ocid="settings.displayName.input"
                value={form.displayName}
                onChange={(e) => set("displayName", e.target.value)}
                placeholder="wijayakusuma"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="welcomeMessage">Pesan Sambutan</Label>
              <Input
                id="welcomeMessage"
                data-ocid="settings.welcomeMessage.input"
                value={form.welcomeMessage}
                onChange={(e) => set("welcomeMessage", e.target.value)}
                placeholder="Selamat datang kembali"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tampilan Header</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-500 text-foreground">
                Tampilkan Pencarian
              </p>
              <p className="text-xs text-muted-foreground">
                Tampilkan kolom pencarian di header
              </p>
            </div>
            <Switch
              data-ocid="settings.showSearch.switch"
              checked={form.showSearch}
              onCheckedChange={(v) => set("showSearch", v)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-500 text-foreground">
                Tampilkan Tombol Lihat Toko
              </p>
              <p className="text-xs text-muted-foreground">
                Tampilkan tombol akses storefront publik
              </p>
            </div>
            <Switch
              data-ocid="settings.showStorefrontButton.switch"
              checked={form.showStorefrontButton}
              onCheckedChange={(v) => set("showStorefrontButton", v)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Layout */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tata Letak</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-500 text-foreground">
                Sidebar Terlipat Default
              </p>
              <p className="text-xs text-muted-foreground">
                Sidebar dimulai dalam keadaan terlipat saat login
              </p>
            </div>
            <Switch
              data-ocid="settings.sidebarCollapsed.switch"
              checked={form.sidebarDefaultCollapsed}
              onCheckedChange={(v) => set("sidebarDefaultCollapsed", v)}
            />
          </div>

          <div className="space-y-2">
            <Label>Warna Aksen</Label>
            <div className="flex gap-3">
              {accentOptions.map((opt) => (
                <button
                  type="button"
                  key={opt.key}
                  data-ocid={`settings.accent.${opt.key}.button`}
                  onClick={() => set("accentColor", opt.key)}
                  className="flex flex-col items-center gap-1.5 group"
                >
                  <div
                    className="w-9 h-9 rounded-full ring-offset-background transition-all"
                    style={{
                      backgroundColor: opt.bg,
                      boxShadow:
                        form.accentColor === opt.key
                          ? `0 0 0 2px var(--background), 0 0 0 4px ${opt.bg}`
                          : "none",
                    }}
                  />
                  <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* General */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Umum</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="appTitle">Judul Aplikasi</Label>
            <Input
              id="appTitle"
              data-ocid="settings.appTitle.input"
              value={form.appTitle}
              onChange={(e) => set("appTitle", e.target.value)}
              placeholder="BUMR tagleni Dashboard"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="footerText">Teks Footer Tambahan</Label>
            <Textarea
              id="footerText"
              data-ocid="settings.footerText.textarea"
              value={form.footerText}
              onChange={(e) => set("footerText", e.target.value)}
              placeholder="Tambahkan teks footer kustom..."
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          className="gap-2"
          data-ocid="settings.save_button"
        >
          <Save size={16} />
          Simpan Pengaturan
        </Button>
      </div>
    </div>
  );
}
