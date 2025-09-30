import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import type { Violation } from "@/lib/types";

interface ViolationsTableProps {
  violations: Violation[];
}

export function ViolationsTable({ violations }: ViolationsTableProps) {
  if (violations.length === 0) {
    return null;
  }

  return (
    <Card>
      <div className="relative overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold w-[15%]">
                Invoice ID
              </TableHead>
              <TableHead className="font-semibold w-[20%]">
                ICD Code Pair
              </TableHead>
              <TableHead className="font-semibold w-[25%]">Rule</TableHead>
              <TableHead className="font-semibold w-[40%]">
                Explanation
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {violations.map((violation, index) => (
              <TableRow 
                key={index} 
                className="hover-elevate"
                data-testid={`row-violation-${index}`}
              >
                <TableCell className="font-medium font-mono text-sm">
                  {violation.invoiceId}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="font-mono">
                      {violation.icdCodes[0]}
                    </Badge>
                    <Badge variant="outline" className="font-mono">
                      {violation.icdCodes[1]}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="font-medium text-sm">
                  {violation.rule}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {violation.explanation}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
