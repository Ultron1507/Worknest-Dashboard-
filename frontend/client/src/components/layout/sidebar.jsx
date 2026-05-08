import { NavLink, useNavigate } from "react-router-dom";
import { ChevronLeft, FolderKanban, LayoutDashboard, ListChecks, LogOut, PanelLeftClose, User, Users, X } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { useUiStore } from "../../store/ui-store";

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Projects", path: "/projects", icon: FolderKanban },
  { label: "Tasks", path: "/tasks", icon: ListChecks },
  { label: "Profile", path: "/profile", icon: User },
];

export function Sidebar({ mobile = false }) {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const collapsed = useUiStore((state) => state.sidebarCollapsed);
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);
  const setMobileSidebarOpen = useUiStore((state) => state.setMobileSidebarOpen);
  const isCollapsed = collapsed && !mobile;
  const items = role === "admin" ? [...navItems, { label: "Users", path: "/admin/users", icon: Users }] : navItems;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    navigate("/", { replace: true });
  };

  return (
    <aside className={cn("flex h-full flex-col border-r border-border bg-card/90 text-card-foreground backdrop-blur-xl transition-all duration-300", isCollapsed ? "w-[84px]" : "w-[264px]")}>
      <div className="flex h-16 items-center justify-between px-4">
        <NavLink to="/dashboard" className="flex min-w-0 items-center gap-3">
          <div className="grid size-9 place-items-center rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-sm">W</div>
          {!isCollapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">Worknest</p>
              <p className="truncate text-xs text-muted-foreground">Task command center</p>
            </div>
          )}
        </NavLink>
        {mobile ? (
          <Button variant="ghost" size="icon" onClick={() => setMobileSidebarOpen(false)}>
            <X />
          </Button>
        ) : (
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            {isCollapsed ? <ChevronLeft className="rotate-180" /> : <PanelLeftClose />}
          </Button>
        )}
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => mobile && setMobileSidebarOpen(false)}
              title={isCollapsed ? item.label : undefined}
              className={({ isActive }) =>
                cn(
                  "flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium text-muted-foreground transition-all hover:bg-accent hover:text-foreground",
                  isActive && "bg-primary/10 text-primary shadow-sm dark:bg-primary/15",
                  isCollapsed && "justify-center px-0",
                )
              }
            >
              <Icon className="size-4 shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-border p-3">
        <Button variant="ghost" className={cn("w-full justify-start text-muted-foreground hover:text-destructive", isCollapsed && "justify-center px-0")} onClick={handleLogout}>
          <LogOut />
          {!isCollapsed && "Logout"}
        </Button>
      </div>
    </aside>
  );
}
