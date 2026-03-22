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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useActor } from "@/hooks/useActor";
import { Edit2, Loader2, Plus, Trash2, Users } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: string;
  joinDate: string;
};

interface CustomersPageProps {
  isAdmin?: boolean;
}

export function CustomersPage({ isAdmin }: CustomersPageProps) {
  const { actor, isFetching: actorFetching } = useActor();
  const [items, setItems] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<Customer | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    totalOrders: "",
    totalSpent: "",
    joinDate: "",
  });

  const loadCustomers = useCallback(async () => {
    if (!actor) return;
    try {
      const list = await (actor as any).getCustomers();
      setItems(
        list.map((c: any) => ({
          id: Number(c.id),
          name: c.name,
          email: c.email,
          phone: c.phone,
          totalOrders: Number(c.totalOrders),
          totalSpent: c.totalSpent,
          joinDate: c.joinDate,
        })),
      );
    } finally {
      setLoading(false);
    }
  }, [actor]);

  useEffect(() => {
    if (!actorFetching && actor) {
      loadCustomers();
    }
  }, [actor, actorFetching, loadCustomers]);

  const filtered = items.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()),
  );

  const openAdd = () => {
    setEditItem(null);
    setForm({
      name: "",
      email: "",
      phone: "",
      totalOrders: "0",
      totalSpent: "Rp 0",
      joinDate: "",
    });
    setDialogOpen(true);
  };

  const openEdit = (c: Customer) => {
    setEditItem(c);
    setForm({
      name: c.name,
      email: c.email,
      phone: c.phone,
      totalOrders: String(c.totalOrders),
      totalSpent: c.totalSpent,
      joinDate: c.joinDate,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.email || !actor) return;
    setSaving(true);
    try {
      if (editItem) {
        await (actor as any).updateCustomer(
          BigInt(editItem.id),
          form.name,
          form.email,
          form.phone,
          BigInt(form.totalOrders || "0"),
          form.totalSpent,
          form.joinDate,
        );
      } else {
        await (actor as any).addCustomer(
          form.name,
          form.email,
          form.phone,
          BigInt(form.totalOrders || "0"),
          form.totalSpent,
          form.joinDate,
        );
      }
      await loadCustomers();
      setDialogOpen(false);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!actor) return;
    await (actor as any).deleteCustomer(BigInt(id));
    await loadCustomers();
    setDeleteId(null);
  };

  if (loading || actorFetching) {
    return (
      <div
        className="flex items-center justify-center h-64"
        data-ocid="customers.loading_state"
      >
        <Loader2 className="animate-spin text-muted-foreground" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-700 text-foreground">Pelanggan</h1>
        {isAdmin && (
          <Button
            onClick={openAdd}
            className="gap-2"
            data-ocid="customers.add_button"
          >
            <Plus size={16} /> Tambah Pelanggan
          </Button>
        )}
      </div>

      <div className="flex items-center gap-3">
        <Input
          placeholder="Cari nama atau email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
          data-ocid="customers.search_input"
        />
        <span className="text-sm text-muted-foreground">
          {filtered.length} pelanggan
        </span>
      </div>

      {filtered.length === 0 && (
        <div
          className="flex flex-col items-center justify-center py-20 text-muted-foreground"
          data-ocid="customers.empty_state"
        >
          <Users size={40} className="mb-3 opacity-40" />
          <p>Tidak ada pelanggan ditemukan</p>
        </div>
      )}

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <Table data-ocid="customers.table">
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">Nama</TableHead>
              <TableHead className="text-muted-foreground">
                No. Telepon
              </TableHead>
              <TableHead className="text-muted-foreground">
                Total Pesanan
              </TableHead>
              <TableHead className="text-muted-foreground">
                Total Belanja
              </TableHead>
              <TableHead className="text-muted-foreground">Bergabung</TableHead>
              {isAdmin && (
                <TableHead className="text-muted-foreground text-right">
                  Aksi
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((c, i) => (
              <TableRow
                key={c.id}
                className="border-border"
                data-ocid={`customers.item.${i + 1}`}
              >
                <TableCell>
                  <div>
                    <p className="font-500 text-foreground text-sm">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.email}</p>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {c.phone}
                </TableCell>
                <TableCell className="text-center font-600 text-foreground">
                  {c.totalOrders}
                </TableCell>
                <TableCell className="font-600 text-foreground">
                  {c.totalSpent}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {c.joinDate}
                </TableCell>
                {isAdmin && (
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        onClick={() => openEdit(c)}
                        data-ocid={`customers.edit_button.${i + 1}`}
                      >
                        <Edit2 size={14} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => setDeleteId(c.id)}
                        data-ocid={`customers.delete_button.${i + 1}`}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className="bg-card border-border"
          data-ocid="customers.dialog"
        >
          <DialogHeader>
            <DialogTitle className="text-foreground">
              {editItem ? "Edit Pelanggan" : "Tambah Pelanggan"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">
                Nama
              </Label>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                placeholder="Nama lengkap"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">
                Email
              </Label>
              <Input
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                placeholder="email@contoh.com"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">
                No. Telepon
              </Label>
              <Input
                value={form.phone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, phone: e.target.value }))
                }
                placeholder="08xxxxxxxxxx"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">
                  Total Pesanan
                </Label>
                <Input
                  type="number"
                  value={form.totalOrders}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, totalOrders: e.target.value }))
                  }
                  placeholder="0"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">
                  Total Belanja
                </Label>
                <Input
                  value={form.totalSpent}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, totalSpent: e.target.value }))
                  }
                  placeholder="Rp 0"
                />
              </div>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">
                Tanggal Bergabung
              </Label>
              <Input
                value={form.joinDate}
                onChange={(e) =>
                  setForm((f) => ({ ...f, joinDate: e.target.value }))
                }
                placeholder="12 Jan 2025"
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? (
                <Loader2 className="animate-spin mr-2" size={14} />
              ) : null}
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
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              Hapus Pelanggan?
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Tindakan ini tidak dapat dibatalkan.
          </p>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Batal
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteId !== null && handleDelete(deleteId)}
            >
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
