import { ChartsSection } from "@/components/ChartsSection";
import { RecentOrders } from "@/components/RecentOrders";
import { StatsCards } from "@/components/StatsCards";
import { TopProducts } from "@/components/TopProducts";
import { Button } from "@/components/ui/button";
import { Store } from "lucide-react";

interface DashboardPageProps {
  onOpenStorefront?: () => void;
}

export function DashboardPage({ onOpenStorefront }: DashboardPageProps) {
  return (
    <div className="space-y-6">
      {onOpenStorefront && (
        <div className="flex justify-end sm:hidden">
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenStorefront}
            className="gap-2"
          >
            <Store size={14} /> Lihat Toko
          </Button>
        </div>
      )}
      <StatsCards />
      <ChartsSection />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <RecentOrders />
        </div>
        <div>
          <TopProducts />
        </div>
      </div>
    </div>
  );
}
