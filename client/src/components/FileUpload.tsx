import { useCallback, useState } from "react";
import { Upload, FileJson, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface FileUploadProps {
  onFileUpload: (data: any) => void;
  fileName?: string;
}

export function FileUpload({ onFileUpload, fileName }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      
      const file = e.dataTransfer.files[0];
      if (file && file.type === "application/json") {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target?.result as string);
            onFileUpload(data);
          } catch (error) {
            console.error("Failed to parse JSON:", error);
          }
        };
        reader.readAsText(file);
      }
    },
    [onFileUpload]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target?.result as string);
            onFileUpload(data);
          } catch (error) {
            console.error("Failed to parse JSON:", error);
          }
        };
        reader.readAsText(file);
      }
    },
    [onFileUpload]
  );

  return (
    <Card
      className={`relative border-2 border-dashed transition-colors ${
        isDragging
          ? "border-primary bg-primary/5"
          : fileName
          ? "border-chart-2 bg-chart-2/5"
          : "border-border hover:border-primary/50"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex min-h-64 flex-col items-center justify-center gap-4 p-8 text-center">
        {fileName ? (
          <>
            <CheckCircle2 className="h-16 w-16 text-chart-2" />
            <div className="space-y-1">
              <p className="text-lg font-semibold">File Loaded</p>
              <p className="text-sm text-muted-foreground font-mono">
                {fileName}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => document.getElementById("file-input")?.click()}
              data-testid="button-change-file"
            >
              <Upload className="mr-2 h-4 w-4" />
              Change File
            </Button>
          </>
        ) : (
          <>
            <Upload className="h-16 w-16 text-primary" />
            <div className="space-y-2">
              <p className="text-lg font-semibold">
                Upload Invoice JSON File
              </p>
              <p className="text-sm text-muted-foreground">
                Drag and drop your file here, or click to browse
              </p>
            </div>
            <Button
              onClick={() => document.getElementById("file-input")?.click()}
              data-testid="button-upload"
            >
              <FileJson className="mr-2 h-4 w-4" />
              Select File
            </Button>
          </>
        )}
        <input
          id="file-input"
          type="file"
          accept=".json"
          className="hidden"
          onChange={handleFileSelect}
          data-testid="input-file"
        />
      </div>
    </Card>
  );
}
