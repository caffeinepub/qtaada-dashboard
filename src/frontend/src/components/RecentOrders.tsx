import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type OrderStatus, recentOrders } from "@/data/mockData";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const statusConfig: Record<OrderStatus, { label: string; className: string }> =
  {
    Selesai: {
      label: "Selesai",
      className:
        "bg-success/10 text-success border-success/20 hover:bg-success/10",
    },
    Diproses: {
      label: "Diproses",
      className: "bg-info/10 text-info border-info/20 hover:bg-info/10",
    },
    Tertunda: {
      label: "Tertunda",
      className:
        "bg-warning/10 text-warning border-warning/20 hover:bg-warning/10",
    },
    Dibatalkan: {
      label: "Dibatalkan",
      className:
        "bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/10",
    },
  };

const PAGE_SIZE = 5;

export function RecentOrders() {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(recentOrders.length / PAGE_SIZE);
  const pageData = recentOrders.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.5 }}
      className="bg-card rounded-xl shadow-card overflow-hidden"
      data-ocid="orders.table"
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div>
          <h3 className="font-display font-700 text-base text-foreground">
            Pesanan Terbaru
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {recentOrders.length} total pesanan
          </p>
        </div>
        <Button variant="outline" size="sm" className="text-xs h-8">
          Lihat Semua
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-background/60 hover:bg-background/60">
              <TableHead className="text-xs font-600 text-muted-foreground">
                ID Pesanan
              </TableHead>
              <TableHead className="text-xs font-600 text-muted-foreground">
                Pelanggan
              </TableHead>
              <TableHead className="text-xs font-600 text-muted-foreground hidden md:table-cell">
                Tanggal
              </TableHead>
              <TableHead className="text-xs font-600 text-muted-foreground">
                Jumlah
              </TableHead>
              <TableHead className="text-xs font-600 text-muted-foreground">
                Status
              </TableHead>
              <TableHead className="text-xs font-600 text-muted-foreground text-right">
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageData.map((order, i) => {
              const status = statusConfig[order.status];
              const globalIndex = page * PAGE_SIZE + i + 1;
              return (
                <TableRow
                  key={order.id}
                  data-ocid={`orders.item.${globalIndex}`}
                  className="hover:bg-background/40 transition-colors"
                >
                  <TableCell className="font-600 text-sm text-foreground">
                    {order.id}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm font-600 text-foreground">
                        {order.customer}
                      </p>
                      <p className="text-xs text-muted-foreground hidden sm:block">
                        {order.email}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground hidden md:table-cell">
                    {order.date}
                  </TableCell>
                  <TableCell className="font-700 text-sm text-foreground">
                    {order.amount}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`text-xs ${status.className}`}
                    >
                      {status.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 text-muted-foreground hover:text-foreground"
                      data-ocid={`orders.edit_button.${globalIndex}`}
                    >
                      <Eye size={14} />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Menampilkan {page * PAGE_SIZE + 1}–
          {Math.min((page + 1) * PAGE_SIZE, recentOrders.length)} dari{" "}
          {recentOrders.length}
        </p>
        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="icon"
            className="w-7 h-7"
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
            data-ocid="orders.pagination_prev"
          >
            <ChevronLeft size={12} />
          </Button>
          {pageNumbers.map((pn) => (
            <Button
              key={pn}
              variant={page === pn ? "default" : "outline"}
              size="icon"
              className="w-7 h-7 text-xs"
              onClick={() => setPage(pn)}
            >
              {pn + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            size="icon"
            className="w-7 h-7"
            disabled={page === totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
            data-ocid="orders.pagination_next"
          >
            <ChevronRight size={12} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
