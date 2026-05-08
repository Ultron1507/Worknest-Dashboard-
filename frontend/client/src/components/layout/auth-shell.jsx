import { Monitor, Moon, Sun } from "lucide-react";
import girl from "../../assets/girl.png";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useTheme } from "../../hooks/use-theme";

const themeOptions = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

export function AuthShell({ children, eyebrow, title, description }) {
  const { theme, setTheme } = useTheme();
  const ActiveThemeIcon =
    themeOptions.find((option) => option.value === theme)?.icon || Monitor;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="grid min-h-screen lg:grid-cols-[1.08fr_0.92fr]">
        <section className="relative hidden overflow-hidden border-r border-border bg-card lg:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,hsl(var(--primary)/0.16),transparent_28%),radial-gradient(circle_at_80%_10%,hsl(173_80%_40%/0.12),transparent_26%),linear-gradient(180deg,hsl(var(--card)),hsl(var(--background)))]" />
          <div className="relative flex min-h-screen flex-col justify-between p-10">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-sm">
                W
              </div>
              <div>
                <p className="font-semibold">Worknest</p>
                <p className="text-xs text-muted-foreground">Productivity simplified</p>
              </div>
            </div>

            <div className="mx-auto flex w-full max-w-xl flex-col items-center text-center">
              <img
                src={girl}
                alt="Worknest workspace illustration"
                className="w-full max-w-[520px] object-contain drop-shadow-2xl"
              />
              <div className="mt-8 max-w-md">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
                  {eyebrow}
                </p>
                <h1 className="mt-3 text-4xl font-semibold tracking-tight">
                  {title}
                </h1>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-sm">
              {["Projects", "Tasks", "Focus"].map((item) => (
                <div key={item} className="rounded-xl border bg-background/70 p-3 shadow-sm">
                  <p className="font-medium">{item}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Organized</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
          <div className="absolute right-4 top-4 sm:right-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Change theme">
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
          </div>

          <div className="w-full max-w-md">
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <div className="grid size-10 place-items-center rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-sm">
                W
              </div>
              <div>
                <p className="font-semibold">Worknest</p>
                <p className="text-xs text-muted-foreground">Productivity simplified</p>
              </div>
            </div>
            {children}
          </div>
        </section>
      </div>
    </div>
  );
}
