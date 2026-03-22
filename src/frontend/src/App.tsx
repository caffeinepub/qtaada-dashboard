import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { AnalyticsPage } from "@/pages/AnalyticsPage";
import { CustomersPage } from "@/pages/CustomersPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { LoginPage } from "@/pages/LoginPage";
import { OrdersPage } from "@/pages/OrdersPage";
import { PlaceholderPage } from "@/pages/PlaceholderPage";
import { ProductsPage } from "@/pages/ProductsPage";
import { ReportsPage } from "@/pages/ReportsPage";
import { StorefrontPage } from "@/pages/StorefrontPage";
import { useState } from "react";

const pageLabels: Record<string, string> = {
  analytics: "Analitik",
  orders: "Pesanan",
  products: "Produk",
  customers: "Pelanggan",
  reports: "Laporan",
  settings: "Pengaturan",
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [storefrontMode, setStorefrontMode] = useState(false);

  if (!isLoggedIn) {
    return (
      <>
        <LoginPage onLogin={() => setIsLoggedIn(true)} />
        <Toaster />
      </>
    );
  }

  const sidebarWidth = collapsed ? 64 : 256;

  if (storefrontMode) {
    return (
      <>
        <StorefrontPage onBack={() => setStorefrontMode(false)} />
        <Toaster />
      </>
    );
  }

  const renderPage = () => {
    switch (activeNav) {
      case "dashboard":
        return (
          <DashboardPage onOpenStorefront={() => setStorefrontMode(true)} />
        );
      case "analytics":
        return <AnalyticsPage />;
      case "orders":
        return <OrdersPage isAdmin={isLoggedIn} />;
      case "products":
        return <ProductsPage isAdmin={isLoggedIn} />;
      case "customers":
        return <CustomersPage isAdmin={isLoggedIn} />;
      case "reports":
        return <ReportsPage />;
      default:
        return <PlaceholderPage title={pageLabels[activeNav] ?? "Page"} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        activeNav={activeNav}
        onNavChange={setActiveNav}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((c) => !c)}
      />

      <div
        className="transition-all duration-300 ease-in-out"
        style={{ marginLeft: sidebarWidth }}
      >
        <Header
          activeNav={activeNav}
          onOpenStorefront={() => setStorefrontMode(true)}
          onLogout={() => setIsLoggedIn(false)}
        />

        <main className="pt-16 min-h-screen" data-ocid="dashboard.page">
          <div className="p-6">{renderPage()}</div>
        </main>
      </div>

      <footer
        className={cn(
          "text-center py-4 text-xs text-muted-foreground transition-all duration-300 ease-in-out",
        )}
        style={{ marginLeft: sidebarWidth }}
      >
        © {new Date().getFullYear()}. Built with love using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground transition-colors"
        >
          caffeine.ai
        </a>
      </footer>

      <Toaster />
    </div>
  );
}
