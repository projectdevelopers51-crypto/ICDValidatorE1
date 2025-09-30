import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FilterPanelProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onClear: () => void;
}

export function FilterPanel({
  searchTerm,
  onSearchChange,
  onClear,
}: FilterPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Filter & Search</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by Invoice ID or ICD code..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
            data-testid="input-search"
          />
        </div>

        {searchTerm && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Active Filter:</p>
            <Badge
              variant="secondary"
              className="gap-2"
              data-testid="badge-active-filter"
            >
              {searchTerm}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={onClear}
                data-testid="button-clear-filter"
              />
            </Badge>
          </div>
        )}

        <Button
          variant="outline"
          className="w-full"
          onClick={onClear}
          disabled={!searchTerm}
          data-testid="button-clear-all"
        >
          Clear All Filters
        </Button>
      </CardContent>
    </Card>
  );
}
