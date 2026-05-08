import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/query-client";
import { useTheme } from "../hooks/use-theme";
import { ErrorBoundary } from "./error-boundary";

function ThemeBoot() {
  useTheme();
  return null;
}

export function AppProviders({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeBoot />
      <ErrorBoundary>{children}</ErrorBoundary>
    </QueryClientProvider>
  );
}
