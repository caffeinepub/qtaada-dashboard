import { Badge } from "@/components/ui/badge";
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
import { getStorageClient } from "@/config";
import { useActor } from "@/hooks/useActor";
import {
  Edit2,
  ImagePlus,
  Link,
  Loader2,
  Package,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  colorHex: string;
  imageUrl: string;
  demoLink: string;
};

const formatRp = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;

const COLORS = [
  "#3b82f6",
  "#22c55e",
  "#a855f7",
  "#f59e0b",
  "#ef4444",
  "#06b6d4",
];

// Compress & resize image to Uint8Array for blob storage upload
function compressToBytes(file: File): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const MAX_W = 1200;
      const scale = img.width > MAX_W ? MAX_W / img.width : 1;
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("canvas error"));
        return;
      }
      ctx.drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("blob error"));
            return;
          }
          blob.arrayBuffer().then((buf) => resolve(new Uint8Array(buf)));
        },
        "image/jpeg",
        0.85,
      );
    };
    img.onerror = reject;
    img.src = url;
  });
}

interface ProductsPageProps {
  isAdmin?: boolean;
}

export function ProductsPage({ isAdmin }: ProductsPageProps) {
  const { actor, isFetching: actorFetching } = useActor();
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<Product | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageError, setImageError] = useState("");
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    imageUrl: "",
    imagePreview: "",
    demoLink: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadProducts = useCallback(async () => {
    if (!actor) return;
    try {
      const list = await (actor as any).getProducts();
      setItems(
        list.map((p: any) => ({
          id: Number(p.id),
          name: p.name,
          category: p.category,
          price: Number(p.price),
          stock: Number(p.stock),
          colorHex: p.colorHex,
          imageUrl: p.imageUrl ?? "",
          demoLink: p.demoLink ?? "",
        })),
      );
    } finally {
      setLoading(false);
    }
  }, [actor]);

  useEffect(() => {
    if (!actorFetching && actor) {
      loadProducts();
    }
  }, [actor, actorFetching, loadProducts]);

  const filtered = items.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()),
  );

  const openAdd = () => {
    setEditItem(null);
    setImageFile(null);
    setImageError("");
    setForm({
      name: "",
      category: "",
      price: "",
      stock: "",
      imageUrl: "",
      imagePreview: "",
      demoLink: "",
    });
    setDialogOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditItem(p);
    setImageFile(null);
    setImageError("");
    setForm({
      name: p.name,
      category: p.category,
      price: String(p.price),
      stock: String(p.stock),
      imageUrl: p.imageUrl,
      imagePreview: p.imageUrl,
      demoLink: p.demoLink,
    });
    setDialogOpen(true);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageError("");
    if (file.size > 10 * 1024 * 1024) {
      setImageError("Ukuran file maks 10MB");
      return;
    }
    setImageFile(file);

    // Show local preview immediately
    const localPreview = URL.createObjectURL(file);
    setForm((f) => ({ ...f, imagePreview: localPreview, imageUrl: "" }));

    // Upload to blob storage using the shared, correctly configured client
    setUploading(true);
    try {
      const bytes = await compressToBytes(file);
      const client = await getStorageClient();
      const { hash } = await client.putFile(bytes);
      const url = await client.getDirectURL(hash);
      setForm((f) => ({ ...f, imageUrl: url, imagePreview: url }));
    } catch (err) {
      console.error("Upload error:", err);
      setImageError(
        err instanceof Error
          ? `Gagal mengunggah: ${err.message}`
          : "Gagal mengunggah gambar, coba lagi",
      );
      setForm((f) => ({ ...f, imagePreview: "", imageUrl: "" }));
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImageError("");
    setForm((f) => ({ ...f, imageUrl: "", imagePreview: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSave = async () => {
    if (!form.name || !form.category || !form.price || !form.stock || !actor)
      return;
    if (uploading) return; // wait for upload to finish
    setSaving(true);
    try {
      if (editItem) {
        await (actor as any).updateProduct(
          BigInt(editItem.id),
          form.name,
          form.category,
          BigInt(form.price),
          BigInt(form.stock),
          editItem.colorHex,
          form.imageUrl || editItem.imageUrl,
          form.demoLink,
        );
      } else {
        const newIdx = items.length;
        await (actor as any).addProduct(
          form.name,
          form.category,
          BigInt(form.price),
          BigInt(form.stock),
          COLORS[newIdx % COLORS.length],
          form.imageUrl,
          form.demoLink,
        );
      }
      await loadProducts();
      setDialogOpen(false);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!actor) return;
    await (actor as any).deleteProduct(BigInt(id));
    await loadProducts();
    setDeleteId(null);
  };

  if (loading || actorFetching) {
    return (
      <div
        className="flex items-center justify-center h-64"
        data-ocid="products.loading_state"
      >
        <Loader2 className="animate-spin text-muted-foreground" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-700 text-foreground">Produk</h1>
        {isAdmin && (
          <Button
            onClick={openAdd}
            className="gap-2"
            data-ocid="products.open_modal_button"
          >
            <Plus size={16} /> Tambah Produk
          </Button>
        )}
      </div>

      <Input
        placeholder="Cari produk..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
        data-ocid="products.search_input"
      />

      {filtered.length === 0 && (
        <div
          className="flex flex-col items-center justify-center py-20 text-muted-foreground"
          data-ocid="products.empty_state"
        >
          <Package size={40} className="mb-3 opacity-40" />
          <p>Tidak ada produk ditemukan</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((p, i) => (
          <div
            key={p.id}
            className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-card-hover transition-shadow"
            data-ocid={`products.item.${i + 1}`}
          >
            {p.imageUrl ? (
              <div className="h-36 overflow-hidden">
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div
                className="h-36 flex items-center justify-center"
                style={{ backgroundColor: `${p.colorHex}22` }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: p.colorHex }}
                >
                  <Package size={28} className="text-white" />
                </div>
              </div>
            )}
            <div className="p-4 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <p className="font-600 text-foreground text-sm leading-tight">
                  {p.name}
                </p>
              </div>
              <Badge variant="outline" className="text-xs">
                {p.category}
              </Badge>
              <div className="flex items-center justify-between text-sm">
                <span className="font-700 text-foreground">
                  {formatRp(p.price)}
                </span>
                <span className="text-muted-foreground text-xs">
                  Stok: {p.stock}
                </span>
              </div>
              {p.demoLink && (
                <a
                  href={p.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Link size={11} /> Coba Demo
                </a>
              )}
              {isAdmin && (
                <div className="flex gap-2 pt-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-1 text-xs"
                    onClick={() => openEdit(p)}
                    data-ocid={`products.edit_button.${i + 1}`}
                  >
                    <Edit2 size={12} /> Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-1 text-xs text-destructive hover:text-destructive"
                    onClick={() => setDeleteId(p.id)}
                    data-ocid={`products.delete_button.${i + 1}`}
                  >
                    <Trash2 size={12} /> Hapus
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className="bg-card border-border max-h-[90vh] overflow-y-auto"
          data-ocid="products.dialog"
        >
          <DialogHeader>
            <DialogTitle className="text-foreground">
              {editItem ? "Edit Produk" : "Tambah Produk"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">
                Nama Produk
              </Label>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                placeholder="Nama produk"
                data-ocid="products.input"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">
                Kategori
              </Label>
              <Input
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({ ...f, category: e.target.value }))
                }
                placeholder="Kategori"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">
                Harga (Rp)
              </Label>
              <Input
                type="number"
                value={form.price}
                onChange={(e) =>
                  setForm((f) => ({ ...f, price: e.target.value }))
                }
                placeholder="0"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">
                Stok
              </Label>
              <Input
                type="number"
                value={form.stock}
                onChange={(e) =>
                  setForm((f) => ({ ...f, stock: e.target.value }))
                }
                placeholder="0"
              />
            </div>

            {/* Image Upload */}
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">
                Gambar Produk
              </Label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                data-ocid="products.upload_button"
              />
              {imageError && (
                <p className="text-xs text-destructive mb-1.5">{imageError}</p>
              )}
              {form.imagePreview ? (
                <div className="relative w-full h-36 rounded-lg overflow-hidden border border-border">
                  <img
                    src={form.imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  {uploading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-2">
                      <Loader2 size={18} className="animate-spin text-white" />
                      <span className="text-white text-xs">Mengunggah...</span>
                    </div>
                  )}
                  {!uploading && (
                    <>
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1 transition-colors"
                      >
                        <X size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-2 right-2 bg-black/60 hover:bg-black/80 text-white text-xs rounded-md px-2 py-1 flex items-center gap-1 transition-colors"
                      >
                        <ImagePlus size={12} /> Ganti
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-28 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:text-primary transition-colors cursor-pointer"
                  data-ocid="products.dropzone"
                >
                  <ImagePlus size={24} />
                  <span className="text-xs font-medium">Upload Gambar</span>
                  <span className="text-xs opacity-60">
                    {imageFile ? imageFile.name : "JPG, PNG, WEBP — maks 10MB"}
                  </span>
                </button>
              )}
            </div>

            {/* Demo Link */}
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">
                Link Demo{" "}
                <span className="opacity-60">
                  (opsional, untuk produk digital)
                </span>
              </Label>
              <div className="relative">
                <Link
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  value={form.demoLink}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, demoLink: e.target.value }))
                  }
                  placeholder="https://demo.contoh.com"
                  className="pl-9"
                />
              </div>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              data-ocid="products.cancel_button"
            >
              Batal
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving || uploading}
              data-ocid="products.save_button"
            >
              {saving || uploading ? (
                <Loader2 className="animate-spin mr-2" size={14} />
              ) : null}
              {uploading ? "Mengunggah..." : "Simpan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <Dialog
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <DialogContent
          className="bg-card border-border"
          data-ocid="products.modal"
        >
          <DialogHeader>
            <DialogTitle className="text-foreground">Hapus Produk?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Tindakan ini tidak dapat dibatalkan.
          </p>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setDeleteId(null)}
              data-ocid="products.cancel_button"
            >
              Batal
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteId !== null && handleDelete(deleteId)}
              data-ocid="products.confirm_button"
            >
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
