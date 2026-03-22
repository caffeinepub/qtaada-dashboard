import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { navItems } from "@/data/mockData";
import { Bell, ChevronDown, Search, Store } from "lucide-react";

interface HeaderProps {
  activeNav: string;
  onOpenStorefront?: () => void;
}

export function Header({ activeNav, onOpenStorefront }: HeaderProps) {
  const currentPage = navItems.find((n) => n.id === activeNav);
  const pageTitle = currentPage?.label ?? "Dasbor";

  return (
    <header className="fixed top-0 right-0 left-0 h-16 bg-card border-b border-border z-30 flex items-center px-6 gap-4">
      {/* Page title */}
      <div className="flex-1 min-w-0">
        <h1 className="font-display font-700 text-xl text-foreground">
          {pageTitle}
        </h1>
        <p className="text-xs text-muted-foreground">
          Selamat datang kembali, wijayakusuma
        </p>
      </div>

      {/* Storefront button */}
      {onOpenStorefront && (
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenStorefront}
          className="gap-2 hidden sm:flex"
          data-ocid="header.storefront.button"
        >
          <Store size={14} /> Lihat Toko
        </Button>
      )}

      {/* Search */}
      <div className="relative hidden md:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          data-ocid="header.search_input"
          placeholder="Cari..."
          className="pl-9 w-56 h-9 bg-background border-border text-sm"
        />
      </div>

      {/* Notifications */}
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          data-ocid="header.notifications.button"
          className="w-9 h-9 text-muted-foreground hover:text-foreground"
        >
          <Bell size={18} />
        </Button>
        <Badge className="absolute -top-1 -right-1 w-4.5 h-4.5 p-0 flex items-center justify-center text-[10px] bg-destructive text-white border-0">
          3
        </Badge>
      </div>

      {/* User */}
      <div
        data-ocid="header.user.button"
        className="flex items-center gap-2.5 cursor-pointer rounded-lg px-2 py-1.5 hover:bg-secondary transition-colors"
      >
        <Avatar className="w-8 h-8">
          <AvatarFallback className="bg-blue-accent text-white text-xs font-600">
            W
          </AvatarFallback>
        </Avatar>
        <div className="hidden sm:block">
          <p className="text-sm font-600 text-foreground leading-none">
            wijayakusuma
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">Administrator</p>
        </div>
        <ChevronDown
          size={14}
          className="text-muted-foreground hidden sm:block"
        />
      </div>
    </header>
  );
}
