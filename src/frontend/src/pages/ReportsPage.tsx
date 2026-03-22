import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { revenueData } from "@/data/mockData";
import { Download, TrendingUp } from "lucide-react";

const formatRp = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;

const totalRevenue = revenueData.reduce((s, d) => s + d.revenue, 0);
const totalOrders = revenueData.reduce((s, d) => s + d.orders, 0);
const avgOrder = Math.round(totalRevenue / totalOrders);

export function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-700 text-foreground">Laporan</h1>
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => window.print()}
          data-ocid="reports.primary_button"
        >
          <Download size={16} /> Cetak Laporan
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-400">
              Total Pendapatan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-700 text-foreground">
              {formatRp(totalRevenue)}
            </p>
            <p className="text-xs text-green-400 flex items-center gap-1 mt-1">
              <TrendingUp size={12} /> +12.5% vs tahun lalu
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-400">
              Total Pesanan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-700 text-foreground">
              {totalOrders.toLocaleString("id-ID")}
            </p>
            <p className="text-xs text-green-400 flex items-center gap-1 mt-1">
              <TrendingUp size={12} /> +8.2% vs tahun lalu
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-400">
              Rata-rata Pesanan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-700 text-foreground">
              {formatRp(avgOrder)}
            </p>
            <p className="text-xs text-green-400 flex items-center gap-1 mt-1">
              <TrendingUp size={12} /> +3.8% vs tahun lalu
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="font-600 text-foreground">Pendapatan Bulanan 2025</h2>
        </div>
        <Table data-ocid="reports.table">
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">Bulan</TableHead>
              <TableHead className="text-muted-foreground">
                Pendapatan
              </TableHead>
              <TableHead className="text-muted-foreground">Pesanan</TableHead>
              <TableHead className="text-muted-foreground">
                Rata-rata / Pesanan
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {revenueData.map((row, i) => (
              <TableRow
                key={row.month}
                className="border-border"
                data-ocid={`reports.item.${i + 1}`}
              >
                <TableCell className="font-500 text-foreground">
                  {row.month}
                </TableCell>
                <TableCell className="font-600 text-foreground">
                  {formatRp(row.revenue)}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {row.orders}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatRp(Math.round(row.revenue / row.orders))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
