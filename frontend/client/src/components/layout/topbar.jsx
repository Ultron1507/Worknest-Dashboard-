import { Link } from "react-router-dom";
import { Bell, Menu, Monitor, Moon, Search, Sun, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { useAuthUser } from "../../hooks/use-auth-user";
import { useTheme } from "../../hooks/use-theme";
import { absoluteUploadUrl, getInitials } from "../../lib/utils";
import { useUiStore } from "../../store/ui-store";

const themeOptions = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

export function Topbar() {
  const setMobileSidebarOpen = useUiStore((state) => state.setMobileSidebarOpen);
  const { data: user } = useAuthUser();
  const { theme, setTheme } = useTheme();
  const ActiveThemeIcon = themeOptions.find((option) => option.value === theme)?.icon || Monitor;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/85 px-4 backdrop-blur-xl lg:px-6">
      <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileSidebarOpen(true)}>
        <Menu />
      </Button>

      <div className="relative hidden min-w-0 flex-1 sm:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input aria-label="Search workspace" placeholder="Search projects, tasks, people..." className="h-10 max-w-xl rounded-full bg-card pl-9" />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell />
          <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-destructive ring-2 ring-background" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <ActiveThemeIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Theme</DropdownMenuLabel>
            {themeOptions.map((option) => {
              const Icon = option.icon;
              return (
                <DropdownMenuItem key={option.value} onClick={() => setTheme(option.value)}>
                  <Icon />
                  {option.label}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-full outline-none transition focus-visible:ring-2 focus-visible:ring-ring">
              <Avatar>
                <AvatarImage src={absoluteUploadUrl(user?.profileImage)} alt={user?.name || "User"} />
                <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              <span className="block text-sm text-foreground">{user?.name || "Worknest user"}</span>
              <span className="block truncate text-xs">{user?.email || "Signed in"}</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/profile">
                <User />
                Profile
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
