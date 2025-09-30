import { useState, useEffect, useMemo } from "react";
import { Download } from "lucide-react";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { FileUpload } from "@/components/FileUpload";
import { StatisticsCards } from "@/components/StatisticsCards";
import { FilterPanel } from "@/components/FilterPanel";
import { ViolationsTable } from "@/components/ViolationsTable";
import { EmptyState } from "@/components/EmptyState";
import { validateInvoice } from "@/lib/validator";
import type { InvoiceData, ExcludesRules, Violation } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [fileName, setFileName] = useState<string>();
  const [rules, setRules] = useState<ExcludesRules | null>(null);
  const [violations, setViolations] = useState<Violation[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  // Load rules on mount
  useEffect(() => {
    fetch("/enhanced_excludes_1_rules.json")
      .then((res) => res.json())
      .then((data) => setRules(data))
      .catch((err) => {
        console.error("Failed to load rules:", err);
        toast({
          title: "Error",
          description: "Failed to load validation rules",
          variant: "destructive",
        });
      });
  }, [toast]);

  // Validate when invoice data changes
  useEffect(() => {
    if (invoiceData && rules) {
      const foundViolations = validateInvoice(invoiceData, rules);
      setViolations(foundViolations);
      
      if (foundViolations.length > 0) {
        toast({
          title: "Validation Complete",
          description: `Found ${foundViolations.length} violation${foundViolations.length > 1 ? 's' : ''}`,
        });
      } else {
        toast({
          title: "Validation Complete",
          description: "No violations detected",
        });
      }
    }
  }, [invoiceData, rules, toast]);

  const handleFileUpload = (data: InvoiceData) => {
    setInvoiceData(data);
    setFileName("invoice_data.json");
  };

  const filteredViolations = useMemo(() => {
    if (!searchTerm) return violations;
    
    const search = searchTerm.toLowerCase();
    return violations.filter(
      (v) =>
        v.invoiceId.toLowerCase().includes(search) ||
        v.icdCodes[0].toLowerCase().includes(search) ||
        v.icdCodes[1].toLowerCase().includes(search)
    );
  }, [violations, searchTerm]);

  const statistics = useMemo(() => {
    const totalClaims = invoiceData?.Submission?.Claim?.length || 0;
    const violatedClaims = new Set(violations.map(v => v.invoiceId)).size;
    const errorRate = totalClaims > 0 ? (violatedClaims / totalClaims) * 100 : 0;

    return {
      totalViolations: violations.length,
      validatedClaims: totalClaims,
      errorRate,
    };
  }, [invoiceData, violations]);

  const handleExport = () => {
    if (violations.length === 0) return;

    const worksheetData = violations.map((v) => ({
      "Invoice ID": v.invoiceId,
      "ICD Code 1": v.icdCodes[0],
      "ICD Code 2": v.icdCodes[1],
      Rule: v.rule,
      Explanation: v.explanation,
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Violations");

    // Auto-size columns
    const maxWidth = 100;
    const colWidths = Object.keys(worksheetData[0] || {}).map((key) => {
      const maxLength = Math.max(
        key.length,
        ...worksheetData.map((row) => String(row[key as keyof typeof row] || "").length)
      );
      return { wch: Math.min(maxLength + 2, maxWidth) };
    });
    worksheet["!cols"] = colWidths;

    XLSX.writeFile(workbook, "icd_excludes1_violations.xlsx");
    
    toast({
      title: "Export Complete",
      description: "Violations exported to Excel file",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 md:px-8">
        <div className="space-y-8">
          {/* Upload Section */}
          <section>
            <FileUpload onFileUpload={handleFileUpload} fileName={fileName} />
          </section>

          {/* Statistics Section */}
          {invoiceData && (
            <section>
              <StatisticsCards {...statistics} />
            </section>
          )}

          {/* Results Section */}
          {invoiceData && violations.length > 0 && (
            <section className="grid gap-6 lg:grid-cols-[300px_1fr]">
              {/* Filter Panel */}
              <aside>
                <FilterPanel
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  onClear={() => setSearchTerm("")}
                />
              </aside>

              {/* Violations Table */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold">
                      Validation Results
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {filteredViolations.length} violation
                      {filteredViolations.length !== 1 ? "s" : ""} found
                    </p>
                  </div>
                  <Button onClick={handleExport} data-testid="button-export">
                    <Download className="mr-2 h-4 w-4" />
                    Export to Excel
                  </Button>
                </div>
                <ViolationsTable violations={filteredViolations} />
              </div>
            </section>
          )}

          {/* Empty States */}
          {!invoiceData && <EmptyState type="no-file" />}
          {invoiceData && violations.length === 0 && (
            <EmptyState type="no-violations" />
          )}
        </div>
      </main>
    </div>
  );
}
