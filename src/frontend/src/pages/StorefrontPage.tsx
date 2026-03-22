import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { products } from "@/data/mockData";
import { ArrowLeft, Package, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Product = (typeof products)[0];

const formatRp = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;

interface StorefrontPageProps {
  onBack: () => void;
}

export function StorefrontPage({ onBack }: StorefrontPageProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [form, setForm] = useState({ qty: "1", nama: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleOrder = () => {
    if (!form.nama || !form.phone || !form.qty) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSelectedProduct(null);
      setForm({ qty: "1", nama: "", phone: "" });
      toast.success("Pesanan berhasil dikirim!");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-accent flex items-center justify-center">
              <ShoppingBag size={16} className="text-white" />
            </div>
            <div>
              <p className="font-700 text-foreground text-sm leading-tight">
                Katalog Produk
              </p>
              <p className="text-xs text-muted-foreground leading-tight">
                BUMR tagleni
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onBack}
            className="gap-2"
            data-ocid="storefront.secondary_button"
          >
            <ArrowLeft size={14} /> Kembali ke Admin
          </Button>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-accent/10 to-transparent border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 text-center">
          <h1 className="text-3xl sm:text-4xl font-700 text-foreground mb-3">
            Katalog Produk BUMR tagleni
          </h1>
          <p className="text-muted-foreground">
            Pilih produk dan klik untuk memesan dengan mudah
          </p>
        </div>
      </div>

      {/* Product Grid */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((p, i) => (
            <button
              type="button"
              key={p.id}
              className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-card-hover hover:border-blue-accent/50 transition-all duration-200 text-left group"
              onClick={() => {
                setSelectedProduct(p);
                setForm({ qty: "1", nama: "", phone: "" });
              }}
              data-ocid={`storefront.item.${i + 1}`}
            >
              <div
                className="h-40 flex items-center justify-center transition-transform group-hover:scale-[1.02]"
                style={{ backgroundColor: `${p.colorHex}22` }}
              >
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: p.colorHex }}
                >
                  <Package size={32} className="text-white" />
                </div>
              </div>
              <div className="p-4 space-y-2">
                <p className="font-600 text-foreground text-sm leading-tight">
                  {p.name}
                </p>
                <p className="text-xs text-muted-foreground">{p.category}</p>
                <div className="flex items-center justify-between">
                  <span className="font-700 text-foreground">
                    {formatRp(p.price)}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${p.stock > 20 ? "bg-green-500/15 text-green-400" : p.stock > 0 ? "bg-yellow-500/15 text-yellow-400" : "bg-red-500/15 text-red-400"}`}
                  >
                    Stok: {p.stock}
                  </span>
                </div>
                <div className="mt-2 w-full py-2 rounded-lg bg-blue-accent/10 text-blue-accent text-xs font-600 text-center group-hover:bg-blue-accent group-hover:text-white transition-colors">
                  Pesan Sekarang
                </div>
              </div>
            </button>
          ))}
        </div>
      </main>

      <footer className="text-center py-6 text-xs text-muted-foreground border-t border-border mt-8">
        © {new Date().getFullYear()}. Built with love using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground transition-colors"
        >
          caffeine.ai
        </a>
      </footer>

      {/* Order Dialog */}
      <Dialog
        open={!!selectedProduct}
        onOpenChange={(open) => !open && setSelectedProduct(null)}
      >
        <DialogContent
          className="bg-card border-border"
          data-ocid="storefront.dialog"
        >
          <DialogHeader>
            <DialogTitle className="text-foreground">Form Pesanan</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: selectedProduct.colorHex }}
                >
                  <Package size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-600 text-foreground text-sm">
                    {selectedProduct.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatRp(selectedProduct.price)}
                  </p>
                </div>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">
                  Nama Produk
                </Label>
                <Input
                  value={selectedProduct.name}
                  readOnly
                  className="bg-muted/20"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">
                  Jumlah (Qty)
                </Label>
                <Input
                  type="number"
                  min="1"
                  max={selectedProduct.stock}
                  value={form.qty}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, qty: e.target.value }))
                  }
                  data-ocid="storefront.input"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">
                  Nama Pemesan
                </Label>
                <Input
                  placeholder="Masukkan nama lengkap"
                  value={form.nama}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, nama: e.target.value }))
                  }
                  data-ocid="storefront.input"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">
                  No. Telepon
                </Label>
                <Input
                  placeholder="08xx-xxxx-xxxx"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, phone: e.target.value }))
                  }
                  data-ocid="storefront.input"
                />
              </div>

              {form.nama && form.phone && form.qty && (
                <div className="bg-blue-accent/10 rounded-lg p-3 text-sm">
                  <p className="text-muted-foreground text-xs mb-1">
                    Total Pembayaran
                  </p>
                  <p className="font-700 text-foreground">
                    {formatRp(selectedProduct.price * Number(form.qty))}
                  </p>
                </div>
              )}
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setSelectedProduct(null)}
              data-ocid="storefront.cancel_button"
            >
              Batal
            </Button>
            <Button
              onClick={handleOrder}
              disabled={submitting || !form.nama || !form.phone || !form.qty}
              data-ocid="storefront.submit_button"
            >
              {submitting ? "Mengirim..." : "Kirim Pesanan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
