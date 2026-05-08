import { ListChecks, Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

export default function Tasks() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Tasks</h1>
          <p className="mt-1 text-sm text-muted-foreground">A focused task board can plug into the same shell and data layer.</p>
        </div>
        <Button disabled>
          <Plus />
          New Task
        </Button>
      </div>

      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center gap-3 p-12 text-center">
          <ListChecks className="size-8 text-primary" />
          <h2 className="font-semibold">Task API not connected yet</h2>
          <p className="max-w-md text-sm text-muted-foreground">
            The frontend is ready for TanStack Query task hooks once the backend exposes task endpoints.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
