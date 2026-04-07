import { ChartsSection } from "@/components/ChartsSection";
import { RecentOrders } from "@/components/RecentOrders";
import { StatsCards } from "@/components/StatsCards";
import { TopProducts } from "@/components/TopProducts";
import { Button } from "@/components/ui/button";
import { useActor } from "@/hooks/useActor";
import type { AppSettings } from "@/types/settings";
import { Store } from "lucide-react";
import { useEffect, useState } from "react";

interface DashboardPageProps {
  onOpenStorefront?: () => void;
  settings?: AppSettings;
  isAdmin?: boolean;
}

export function DashboardPage({
  onOpenStorefront,
  settings,
  isAdmin,
}: DashboardPageProps) {
  const { actor, isFetching } = useActor();
  const [totalOrders, setTotalOrders] = useState<number | undefined>(undefined);
  const [totalProducts, setTotalProducts] = useState<number | undefined>(
    undefined,
  );
  const [totalCustomers, setTotalCustomers] = useState<number | undefined>(
    undefined,
  );

  const displayName = settings?.displayName ?? "wijayakusuma";
  const welcomeMessage = settings?.welcomeMessage ?? "Selamat datang kembali";

  useEffect(() => {
    if (!actor || isFetching) return;

    const fetchCounts = async () => {
      try {
        const [orders, products, customers] = await Promise.all([
          actor.getOrders(),
          actor.getProducts(),
          actor.getCustomers(),
        ]);
        setTotalOrders(orders.length);
        setTotalProducts(products.length);
        setTotalCustomers(customers.length);
      } catch {
        // silently keep undefined (fallback to mock data)
      }
    };

    fetchCounts();
  }, [actor, isFetching]);

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-display font-700 text-foreground">
            {welcomeMessage},{" "}
            <span className="text-blue-accent">{displayName}</span> 👋
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {isAdmin
              ? "Anda masuk sebagai Administrator — akses penuh ke semua data."
              : "Berikut ringkasan aktivitas terkini."}
          </p>
        </div>
        {onOpenStorefront && (
          <div className="flex sm:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenStorefront}
              className="gap-2"
              data-ocid="dashboard.storefront.button"
            >
              <Store size={14} /> Lihat Toko
            </Button>
          </div>
        )}
      </div>

      <StatsCards
        totalOrders={totalOrders}
        totalProducts={totalProducts}
        totalCustomers={totalCustomers}
      />
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
