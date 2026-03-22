import { Progress } from "@/components/ui/progress";
import { topProducts } from "@/data/mockData";
import { motion } from "motion/react";

const categoryColors: Record<string, string> = {
  Elektronik: "bg-blue-accent/10 text-blue-accent",
  Furnitur: "bg-success/10 text-success",
  Wearable: "bg-primary/10 text-primary",
  "Makanan & Minuman": "bg-warning/10 text-warning",
};

export function TopProducts() {
  const maxSales = topProducts[0].maxSales;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.6 }}
      className="bg-card rounded-xl shadow-card overflow-hidden"
      data-ocid="products.list"
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div>
          <h3 className="font-display font-700 text-base text-foreground">
            Produk Terlaris
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Performa terbaik bulan ini
          </p>
        </div>
      </div>

      <div className="divide-y divide-border">
        {topProducts.map((product, i) => {
          const percent = Math.round((product.sales / maxSales) * 100);
          const catColor =
            categoryColors[product.category] ??
            "bg-muted text-muted-foreground";
          return (
            <div
              key={product.name}
              data-ocid={`products.item.${i + 1}`}
              className="px-5 py-4 hover:bg-background/40 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-6 h-6 rounded-full bg-background flex items-center justify-center text-xs font-700 text-muted-foreground shrink-0">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-600 text-foreground truncate">
                      {product.name}
                    </p>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-500 ${catColor}`}
                    >
                      {product.category}
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0 ml-3">
                  <p className="text-sm font-700 text-foreground">
                    {product.revenue}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {product.sales.toLocaleString()} penjualan
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Progress value={percent} className="flex-1 h-1.5" />
                <span className="text-xs text-muted-foreground w-8 text-right">
                  {percent}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
