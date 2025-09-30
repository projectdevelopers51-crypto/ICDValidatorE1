import { CheckCircle2, Upload } from "lucide-react";

interface EmptyStateProps {
  type: "no-violations" | "no-file";
}

export function EmptyState({ type }: EmptyStateProps) {
  if (type === "no-violations") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <CheckCircle2 className="h-20 w-20 text-chart-2 mb-4" />
        <h3 className="text-2xl font-semibold mb-2">No Violations Detected</h3>
        <p className="text-muted-foreground max-w-md">
          All ICD-10 code combinations in the uploaded invoice file comply with
          Excludes 1 rules. Your medical coding is accurate.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Upload className="h-20 w-20 text-muted-foreground mb-4" />
      <h3 className="text-2xl font-semibold mb-2">
        Ready to Validate Invoice Claims
      </h3>
      <p className="text-muted-foreground max-w-md">
        Upload an invoice JSON file to begin validating ICD-10 code combinations
        against Excludes 1 rules.
      </p>
      <p className="text-sm text-muted-foreground mt-4">
        Accepted format: <span className="font-mono">*.json</span>
      </p>
    </div>
  );
}
