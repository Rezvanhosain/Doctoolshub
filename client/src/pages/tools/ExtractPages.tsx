import { useState, useRef } from "react";
import { FileText } from "lucide-react";
import ToolTemplate from "@/components/ToolTemplate";
import { extractPages, downloadFile, getPDFPageCount } from "@/lib/pdf-utils";

export default function ExtractPages() {
  const resultRef = useRef<ArrayBuffer | null>(null);
  const [downloadReady, setDownloadReady] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [selectedPages, setSelectedPages] = useState("");

  const handleProcess = async (files: File[]) => {
    const totalPages = await getPDFPageCount(files[0]);
    setPageCount(totalPages);
  };

  const handleExtract = async (files: File[]) => {
    if (!selectedPages.trim()) {
      throw new Error("Please enter page numbers to extract");
    }

    const pageIndices = selectedPages
      .split(",")
      .map((p) => parseInt(p.trim()))
      .filter((p) => !isNaN(p) && p > 0 && p <= pageCount);

    if (pageIndices.length === 0) {
      throw new Error("No valid page numbers entered");
    }

    const result = await extractPages(files[0], pageIndices);
    resultRef.current = result;
    setDownloadReady(true);
  };

  const handleDownload = () => {
    if (resultRef.current) {
      downloadFile(resultRef.current, "extracted.pdf");
    }
  };

  const helpContent = (
    <div className="space-y-3">
      <div>
        <h4 className="font-semibold text-foreground mb-1">Upload PDF</h4>
        <p>Select a PDF file to extract pages from.</p>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-1">Select Pages</h4>
        <p>Enter page numbers separated by commas (e.g., 1,3,5 or 1-5).</p>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-1">Extract</h4>
        <p>Create a new PDF with only the selected pages.</p>
      </div>
    </div>
  );

  const optionsContent = (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Pages to Extract (Total: {pageCount})
        </label>
        <input
          type="text"
          value={selectedPages}
          onChange={(e) => setSelectedPages(e.target.value)}
          placeholder="e.g., 1,3,5 or 1-5"
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <p className="text-xs text-muted-foreground mt-2">
          Enter page numbers separated by commas or use ranges (1-5)
        </p>
      </div>
    </div>
  );

  return (
    <ToolTemplate
      toolName="Extract Pages"
      toolDescription="Select and extract specific pages from a PDF"
      toolIcon={<FileText className="w-8 h-8 text-primary" />}
      fileAccept=".pdf"
      fileMultiple={false}
      onProcess={handleExtract}
      onDownload={downloadReady ? handleDownload : undefined}
      helpText={helpContent as any}
      optionsPanel={pageCount > 0 ? optionsContent : undefined}
    />
  );
}
