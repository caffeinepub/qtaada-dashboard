import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { revenueData } from "@/data/mockData";
import {
  ArrowUp,
  BarChart3,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const kpis = [
  {
    label: "Pertumbuhan Pendapatan",
    value: "+12.5%",
    sub: "vs bulan lalu",
    icon: TrendingUp,
    color: "text-green-400",
  },
  {
    label: "Pengguna Baru",
    value: "+847",
    sub: "bulan ini",
    icon: Users,
    color: "text-blue-400",
  },
  {
    label: "Pesanan Selesai",
    value: "94.2%",
    sub: "tingkat keberhasilan",
    icon: ShoppingCart,
    color: "text-purple-400",
  },
  {
    label: "Pendapatan Harian",
    value: "Rp 2.8jt",
    sub: "rata-rata",
    icon: BarChart3,
    color: "text-orange-400",
  },
];

const categoryData = [
  { name: "Elektronik", value: 35, fill: "#3b82f6" },
  { name: "Furnitur", value: 28, fill: "#22c55e" },
  { name: "Wearable", value: 20, fill: "#a855f7" },
  { name: "Makanan", value: 17, fill: "#f59e0b" },
];

export function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-700 text-foreground">Analitik</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <Card
            key={kpi.label}
            className="bg-card border-border"
            data-ocid={`analytics.card.${i + 1}`}
          >
            <CardContent className="pt-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    {kpi.label}
                  </p>
                  <p className={`text-2xl font-700 ${kpi.color}`}>
                    {kpi.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <ArrowUp size={10} className="text-green-400" />
                    {kpi.sub}
                  </p>
                </div>
                <kpi.icon size={20} className={`${kpi.color} opacity-60`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Bar chart: orders per month */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-sm font-600 text-foreground">
              Pesanan per Bulan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={revenueData}
                margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.05)"
                />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#888", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#888", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "#1e2535",
                    border: "1px solid #2a3448",
                    borderRadius: 8,
                    color: "#fff",
                  }}
                  formatter={(val: number) => [val, "Pesanan"]}
                />
                <Bar dataKey="orders" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie chart: sales by category */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-sm font-600 text-foreground">
              Penjualan per Kategori
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {categoryData.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#1e2535",
                    border: "1px solid #2a3448",
                    borderRadius: 8,
                    color: "#fff",
                  }}
                  formatter={(val: number) => [`${val}%`, "Porsi"]}
                />
                <Legend
                  formatter={(value) => (
                    <span style={{ color: "#888", fontSize: 11 }}>{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Line chart: revenue trend */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-sm font-600 text-foreground">
            Tren Pendapatan 2025
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart
              data={revenueData}
              margin={{ top: 0, right: 16, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.05)"
              />
              <XAxis
                dataKey="month"
                tick={{ fill: "#888", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#888", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => `${(v / 1000000).toFixed(0)}jt`}
              />
              <Tooltip
                contentStyle={{
                  background: "#1e2535",
                  border: "1px solid #2a3448",
                  borderRadius: 8,
                  color: "#fff",
                }}
                formatter={(val: number) => [
                  `Rp ${(val / 1000000).toFixed(1)}jt`,
                  "Pendapatan",
                ]}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#22c55e"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
