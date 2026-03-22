import { statsCards } from "@/data/mockData";
import {
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

const iconMap: Record<string, React.ElementType> = {
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
};

const colorConfig: Record<string, { bg: string; icon: string; ring: string }> =
  {
    blue: {
      bg: "bg-blue-accent/10",
      icon: "text-blue-accent",
      ring: "ring-blue-accent/20",
    },
    green: {
      bg: "bg-success/10",
      icon: "text-success",
      ring: "ring-success/20",
    },
    purple: {
      bg: "bg-primary/10",
      icon: "text-primary",
      ring: "ring-primary/20",
    },
    orange: {
      bg: "bg-warning/10",
      icon: "text-warning",
      ring: "ring-warning/20",
    },
  };

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {statsCards.map((card, i) => {
        const Icon = iconMap[card.icon];
        const colors = colorConfig[card.color];
        const isUp = card.trend === "up";
        return (
          <motion.div
            key={card.id}
            data-ocid={`stats.${card.id}.card`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.07 }}
            className="bg-card rounded-xl shadow-card p-5 flex flex-col gap-4 hover:shadow-card-hover transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div
                className={`w-10 h-10 rounded-lg ${colors.bg} ${colors.ring} ring-1 flex items-center justify-center`}
              >
                <Icon className={`w-5 h-5 ${colors.icon}`} />
              </div>
              <span
                className={`flex items-center gap-1 text-xs font-600 px-2 py-1 rounded-full ${
                  isUp
                    ? "bg-success/10 text-success"
                    : "bg-destructive/10 text-destructive"
                }`}
              >
                {isUp ? (
                  <ArrowUpRight size={12} />
                ) : (
                  <ArrowDownRight size={12} />
                )}
                {card.change}
              </span>
            </div>
            <div>
              <p className="text-2xl font-display font-700 text-foreground">
                {card.value}
              </p>
              <p className="text-sm text-muted-foreground mt-0.5">
                {card.label}
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              {isUp ? "↑ Dibanding" : "↓ Dibanding"} bulan lalu
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
