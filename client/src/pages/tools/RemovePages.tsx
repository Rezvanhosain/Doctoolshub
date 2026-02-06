import { useState, useRef } from "react";
import { Trash2 } from "lucide-react";
import ToolTemplate from "@/components/ToolTemplate";
import { removePages, downloadFile, getPDFPageCount } from "@/lib/pdf-utils";

export default function RemovePages() {
  const resultRef = useRef<ArrayBuffer | null>(null);
  const [downloadReady, setDownloadReady] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [pagesToRemove, setPageToRemove] = useState("");

  const handleProcess = async (files: File[]) => {
    const totalPages = await getPDFPageCount(files[0]);
    setPageCount(totalPages);
  };

  const handleRemove = async (files: File[]) => {
    if (!pagesToRemove.trim()) {
      throw new Error("Please enter page numbers to remove");
    }

    const pageIndices = pagesToRemove
      .split(",")
      .map((p) => parseInt(p.trim()))
      .filter((p) => !isNaN(p) && p > 0 && p <= pageCount);

    if (pageIndices.length === 0) {
      throw new Error("No valid page numbers entered");
    }

    const result = await removePages(files[0], pageIndices);
    resultRef.current = result;
    setDownloadReady(true);
  };

  const handleDownload = () => {
    if (resultRef.current) {
      downloadFile(resultRef.current, "removed.pdf");
    }
  };

  const helpContent = (
    <div className="space-y-3">
      <div>
        <h4 className="font-semibold text-foreground mb-1">Upload PDF</h4>
        <p>Select a PDF file to remove pages from.</p>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-1">Select Pages</h4>
        <p>Enter page numbers separated by commas (e.g., 2,4,6).</p>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-1">Remove</h4>
        <p>Create a new PDF with selected pages removed.</p>
      </div>
    </div>
  );

  const optionsContent = (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Pages to Remove (Total: {pageCount})
        </label>
        <input
          type="text"
          value={pagesToRemove}
          onChange={(e) => setPageToRemove(e.target.value)}
          placeholder="e.g., 2,4,6"
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <p className="text-xs text-muted-foreground mt-2">
          Enter page numbers separated by commas
        </p>
      </div>
    </div>
  );

  return (
    <ToolTemplate
      toolName="Remove Pages"
      toolDescription="Delete specific pages from a PDF"
      toolIcon={<Trash2 className="w-8 h-8 text-primary" />}
      fileAccept=".pdf"
      fileMultiple={false}
      onProcess={handleRemove}
      onDownload={downloadReady ? handleDownload : undefined}
      helpText={helpContent as any}
      optionsPanel={pageCount > 0 ? optionsContent : undefined}
    />
  );
}
