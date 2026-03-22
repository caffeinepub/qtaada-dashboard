import { revenueData } from "@/data/mockData";
import { motion } from "motion/react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function formatCurrency(value: number) {
  if (value >= 1000000) return `Rp ${(value / 1000000).toFixed(0)}jt`;
  if (value >= 1000) return `Rp ${(value / 1000).toFixed(0)}rb`;
  return `Rp ${value}`;
}

const CustomTooltipRevenue = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-lg shadow-card p-3">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-sm font-700 text-foreground">
        {formatCurrency(payload[0].value)}
      </p>
    </div>
  );
};

const CustomTooltipOrders = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-lg shadow-card p-3">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-sm font-700 text-foreground">
        {payload[0].value} pesanan
      </p>
    </div>
  );
};

export function ChartsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Revenue Area Chart */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.3 }}
        className="bg-card rounded-xl shadow-card p-5"
      >
        <div className="mb-5">
          <h3 className="font-display font-700 text-base text-foreground">
            Pendapatan dari Waktu ke Waktu
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Pendapatan bulanan tahun 2025
          </p>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart
            data={revenueData}
            margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="oklch(0.565 0.22 263)"
                  stopOpacity={0.25}
                />
                <stop
                  offset="95%"
                  stopColor="oklch(0.565 0.22 263)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="oklch(0.905 0.01 250)"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "oklch(0.52 0.02 255)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={formatCurrency}
              tick={{ fontSize: 10, fill: "oklch(0.52 0.02 255)" }}
              axisLine={false}
              tickLine={false}
              width={60}
            />
            <Tooltip
              content={<CustomTooltipRevenue />}
              cursor={{ stroke: "oklch(0.905 0.01 250)", strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="oklch(0.565 0.22 263)"
              strokeWidth={2.5}
              fill="url(#revenueGrad)"
              dot={false}
              activeDot={{
                r: 4,
                fill: "oklch(0.565 0.22 263)",
                strokeWidth: 0,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Orders Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.4 }}
        className="bg-card rounded-xl shadow-card p-5"
      >
        <div className="mb-5">
          <h3 className="font-display font-700 text-base text-foreground">
            Pesanan per Bulan
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Volume pesanan bulanan tahun 2025
          </p>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart
            data={revenueData}
            margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="oklch(0.905 0.01 250)"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "oklch(0.52 0.02 255)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "oklch(0.52 0.02 255)" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={<CustomTooltipOrders />}
              cursor={{ fill: "oklch(0.94 0.01 240)" }}
            />
            <Bar
              dataKey="orders"
              fill="oklch(0.565 0.22 263)"
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
