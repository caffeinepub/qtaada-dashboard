import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { navItems } from "@/data/mockData";
import { cn } from "@/lib/utils";
import type { AppSettings } from "@/types/settings";
import {
  BarChart2,
  ChevronLeft,
  ChevronRight,
  FileText,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  ShoppingCart,
  Users,
  Zap,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  BarChart2,
  ShoppingCart,
  Package,
  Users,
  FileText,
  Settings,
};

interface SidebarProps {
  activeNav: string;
  onNavChange: (id: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  settings?: AppSettings;
  onLogout?: () => void;
}

export function Sidebar({
  activeNav,
  onNavChange,
  collapsed,
  onToggleCollapse,
  settings,
  onLogout,
}: SidebarProps) {
  const brandName = settings?.brandName ?? "BUMR tagleni";
  const brandSubtitle =
    settings?.brandSubtitle ?? "Badan Usaha Milik Rtik Subang";
  const displayName = settings?.displayName ?? "wijayakusuma";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex flex-col bg-sidebar transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64",
      )}
      style={{ borderRight: "1px solid oklch(var(--sidebar-border))" }}
    >
      {/* Logo */}
      <div
        className={cn(
          "flex items-center h-16 px-4 shrink-0",
          collapsed ? "justify-center" : "gap-3",
        )}
        style={{ borderBottom: "1px solid oklch(var(--sidebar-border))" }}
      >
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-accent shrink-0">
          <Zap className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="font-display font-700 text-lg text-sidebar-foreground tracking-tight leading-tight">
              {brandName}
            </span>
            <span className="text-xs text-sidebar-foreground/50 leading-tight">
              {brandSubtitle}
            </span>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
        {!collapsed && (
          <p className="text-xs font-600 uppercase tracking-widest text-sidebar-foreground/40 px-3 pb-2 pt-1">
            Menu
          </p>
        )}
        {navItems.map((item) => {
          const Icon = iconMap[item.icon];
          const isActive = activeNav === item.id;
          return (
            <button
              type="button"
              key={item.id}
              data-ocid={`nav.${item.id}.link`}
              onClick={() => onNavChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-500 transition-all duration-150",
                collapsed ? "justify-center" : "",
                isActive
                  ? "bg-blue-accent text-white shadow-sm"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="w-4.5 h-4.5 shrink-0" size={18} />
              {!collapsed && (
                <span className="flex-1 text-left">{item.label}</span>
              )}
              {!collapsed && item.badge && (
                <Badge
                  variant="secondary"
                  className="ml-auto text-xs px-1.5 py-0 h-5 bg-blue-accent/20 text-blue-accent border-0"
                >
                  {item.badge}
                </Badge>
              )}
            </button>
          );
        })}
      </nav>

      {/* User */}
      <div
        className="p-3 shrink-0"
        style={{ borderTop: "1px solid oklch(var(--sidebar-border))" }}
      >
        {!collapsed ? (
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-sidebar-accent transition-colors cursor-pointer">
            <Avatar className="w-8 h-8 shrink-0">
              <AvatarFallback className="bg-blue-accent text-white text-xs font-600">
                {initial}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-600 text-sidebar-foreground truncate">
                {displayName}
              </p>
              <p className="text-xs text-sidebar-foreground/50 truncate">
                Admin
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="w-7 h-7 text-sidebar-foreground/50 hover:text-destructive hover:bg-destructive/10"
              data-ocid="logout.button"
              onClick={onLogout}
              title="Keluar"
            >
              <LogOut size={14} />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-blue-accent text-white text-xs font-600">
                {initial}
              </AvatarFallback>
            </Avatar>
            {onLogout && (
              <Button
                variant="ghost"
                size="icon"
                className="w-7 h-7 text-sidebar-foreground/50 hover:text-destructive hover:bg-destructive/10"
                data-ocid="logout.button"
                onClick={onLogout}
                title="Keluar"
              >
                <LogOut size={12} />
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Collapse toggle */}
      <button
        type="button"
        data-ocid="sidebar.toggle"
        onClick={onToggleCollapse}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center shadow-card hover:shadow-card-hover transition-shadow cursor-pointer z-50"
      >
        {collapsed ? (
          <ChevronRight size={12} className="text-muted-foreground" />
        ) : (
          <ChevronLeft size={12} className="text-muted-foreground" />
        )}
      </button>
    </aside>
  );
}
