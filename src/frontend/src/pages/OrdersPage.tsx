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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type OrderStatus, recentOrders } from "@/data/mockData";
import { Edit2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

type Order = (typeof recentOrders)[0];

const statusVariant: Record<OrderStatus, string> = {
  Selesai: "bg-green-500/15 text-green-400 border-green-500/30",
  Diproses: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Tertunda: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  Dibatalkan: "bg-red-500/15 text-red-400 border-red-500/30",
};

const PAGE_SIZE = 5;
const STATUS_OPTIONS: OrderStatus[] = [
  "Selesai",
  "Diproses",
  "Tertunda",
  "Dibatalkan",
];

export function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(recentOrders);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("Semua");
  const [page, setPage] = useState(1);
  const [editOrder, setEditOrder] = useState<Order | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState({
    customer: "",
    email: "",
    date: "",
    amount: "",
    status: "Diproses" as OrderStatus,
  });

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase());
    const matchTab = activeTab === "Semua" || o.status === activeTab;
    return matchSearch && matchTab;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleTabChange = (val: string) => {
    setActiveTab(val);
    setPage(1);
  };

  const openAdd = () => {
    setEditOrder(null);
    setForm({
      customer: "",
      email: "",
      date: "",
      amount: "",
      status: "Diproses",
    });
    setDialogOpen(true);
  };

  const openEdit = (o: Order) => {
    setEditOrder(o);
    setForm({
      customer: o.customer,
      email: o.email,
      date: o.date,
      amount: o.amount,
      status: o.status,
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.customer || !form.email || !form.date || !form.amount) return;
    if (editOrder) {
      setOrders((prev) =>
        prev.map((o) => (o.id === editOrder.id ? { ...o, ...form } : o)),
      );
    } else {
      const maxNum = Math.max(
        0,
        ...orders.map((o) => Number.parseInt(o.id.replace("#ORD-", "")) || 0),
      );
      const newId = `#ORD-${maxNum + 1}`;
      setOrders((prev) => [{ id: newId, ...form }, ...prev]);
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
    setDeleteId(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-700 text-foreground">Pesanan</h1>
        <Button
          onClick={openAdd}
          className="gap-2"
          data-ocid="orders.add_button"
        >
          <Plus size={16} /> Tambah Pesanan
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          placeholder="Cari nama pelanggan atau ID pesanan..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="max-w-sm"
          data-ocid="orders.search_input"
        />
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="bg-card border border-border">
          {["Semua", "Selesai", "Diproses", "Tertunda", "Dibatalkan"].map(
            (t) => (
              <TabsTrigger
                key={t}
                value={t}
                data-ocid={`orders.${t.toLowerCase()}.tab`}
              >
                {t}
              </TabsTrigger>
            ),
          )}
        </TabsList>
      </Tabs>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <Table data-ocid="orders.table">
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">
                ID Pesanan
              </TableHead>
              <TableHead className="text-muted-foreground">Pelanggan</TableHead>
              <TableHead className="text-muted-foreground">Tanggal</TableHead>
              <TableHead className="text-muted-foreground">Jumlah</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-muted-foreground text-right">
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((order, i) => (
              <TableRow
                key={order.id}
                className="border-border"
                data-ocid={`orders.item.${i + 1}`}
              >
                <TableCell className="font-mono text-sm text-foreground">
                  {order.id}
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-500 text-foreground text-sm">
                      {order.customer}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {order.email}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {order.date}
                </TableCell>
                <TableCell className="font-600 text-foreground">
                  {order.amount}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-500 border ${statusVariant[order.status]}`}
                  >
                    {order.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      onClick={() => openEdit(order)}
                      data-ocid={`orders.edit_button.${i + 1}`}
                    >
                      <Edit2 size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => setDeleteId(order.id)}
                      data-ocid={`orders.delete_button.${i + 1}`}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Halaman {page} dari {totalPages}
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            data-ocid="orders.pagination_prev"
          >
            Sebelumnya
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            data-ocid="orders.pagination_next"
          >
            Berikutnya
          </Button>
        </div>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className="bg-card border-border"
          data-ocid="orders.dialog"
        >
          <DialogHeader>
            <DialogTitle className="text-foreground">
              {editOrder ? "Edit Pesanan" : "Tambah Pesanan"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">
                Nama Pelanggan
              </Label>
              <Input
                value={form.customer}
                onChange={(e) =>
                  setForm((f) => ({ ...f, customer: e.target.value }))
                }
                placeholder="Nama pelanggan"
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
                Tanggal
              </Label>
              <Input
                value={form.date}
                onChange={(e) =>
                  setForm((f) => ({ ...f, date: e.target.value }))
                }
                placeholder="18 Des 2025"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">
                Jumlah (Rp)
              </Label>
              <Input
                value={form.amount}
                onChange={(e) =>
                  setForm((f) => ({ ...f, amount: e.target.value }))
                }
                placeholder="Rp 100.000"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">
                Status
              </Label>
              <Select
                value={form.status}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, status: v as OrderStatus }))
                }
              >
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleSave}>Simpan</Button>
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
              Hapus Pesanan?
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
