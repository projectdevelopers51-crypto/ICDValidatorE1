import { AlertCircle, FileCheck, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatisticsCardsProps {
  totalViolations: number;
  validatedClaims: number;
  errorRate: number;
}

export function StatisticsCards({
  totalViolations,
  validatedClaims,
  errorRate,
}: StatisticsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="border-l-4 border-l-destructive">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Violations
          </CardTitle>
          <AlertCircle className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold" data-testid="text-total-violations">
            {totalViolations}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Code exclusion conflicts detected
          </p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-primary">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Validated Claims
          </CardTitle>
          <FileCheck className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold" data-testid="text-validated-claims">
            {validatedClaims}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Invoice claims processed
          </p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-chart-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
          <TrendingUp className="h-4 w-4 text-chart-3" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold" data-testid="text-error-rate">
            {errorRate.toFixed(1)}%
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Claims with violations
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
