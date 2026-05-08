import { Component } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

export class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error("Worknest UI crashed", error);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen bg-background p-6 text-foreground">
        <Card className="mx-auto mt-20 max-w-lg">
          <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
            <div className="rounded-full bg-destructive/10 p-3 text-destructive">
              <AlertTriangle className="size-7" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Something broke</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Refresh the page and try again. The rest of your workspace data is safe.
              </p>
            </div>
            <Button onClick={() => window.location.reload()}>Reload app</Button>
          </CardContent>
        </Card>
      </div>
    );
  }
}
