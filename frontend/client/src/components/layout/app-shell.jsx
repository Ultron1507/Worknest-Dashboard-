import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { useUiStore } from "../../store/ui-store";
import { cn } from "../../lib/utils";

export function AppShell() {
  const collapsed = useUiStore((state) => state.sidebarCollapsed);
  const mobileSidebarOpen = useUiStore((state) => state.mobileSidebarOpen);
  const setMobileSidebarOpen = useUiStore((state) => state.setMobileSidebarOpen);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="fixed inset-y-0 left-0 z-40 hidden lg:block">
        <Sidebar />
      </div>

      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button className="absolute inset-0 bg-black/45" onClick={() => setMobileSidebarOpen(false)} aria-label="Close navigation" />
          <div className="relative h-full w-[280px]">
            <Sidebar mobile />
          </div>
        </div>
      )}

      <div className={cn("min-h-screen transition-[padding] duration-300", collapsed ? "lg:pl-[84px]" : "lg:pl-[264px]")}>
        <Topbar />
        <main className="mx-auto w-full max-w-[1440px] px-4 py-5 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
