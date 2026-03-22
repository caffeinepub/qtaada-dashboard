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
import { products as initialProducts } from "@/data/mockData";
import { Edit2, Package, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

type Product = (typeof initialProducts)[0];

const formatRp = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;

const COLORS = [
  "#3b82f6",
  "#22c55e",
  "#a855f7",
  "#f59e0b",
  "#ef4444",
  "#06b6d4",
];

export function ProductsPage() {
  const [items, setItems] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<Product | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });

  const filtered = items.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()),
  );

  const openAdd = () => {
    setEditItem(null);
    setForm({ name: "", category: "", price: "", stock: "" });
    setDialogOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditItem(p);
    setForm({
      name: p.name,
      category: p.category,
      price: String(p.price),
      stock: String(p.stock),
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.name || !form.category || !form.price || !form.stock) return;
    if (editItem) {
      setItems((prev) =>
        prev.map((p) =>
          p.id === editItem.id
            ? {
                ...p,
                name: form.name,
                category: form.category,
                price: Number(form.price),
                stock: Number(form.stock),
              }
            : p,
        ),
      );
    } else {
      const newId = Math.max(0, ...items.map((p) => p.id)) + 1;
      setItems((prev) => [
        ...prev,
        {
          id: newId,
          name: form.name,
          category: form.category,
          price: Number(form.price),
          stock: Number(form.stock),
          colorHex: COLORS[newId % COLORS.length],
        },
      ]);
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: number) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
    setDeleteId(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-700 text-foreground">Produk</h1>
        <Button
          onClick={openAdd}
          className="gap-2"
          data-ocid="products.open_modal_button"
        >
          <Plus size={16} /> Tambah Produk
        </Button>
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
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className="bg-card border-border"
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
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              data-ocid="products.cancel_button"
            >
              Batal
            </Button>
            <Button onClick={handleSave} data-ocid="products.save_button">
              Simpan
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
