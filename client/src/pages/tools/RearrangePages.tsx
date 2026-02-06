import { useState, useRef } from "react";
import { Layers } from "lucide-react";
import ToolTemplate from "@/components/ToolTemplate";
import { rearrangePages, downloadFile, getPDFPageCount } from "@/lib/pdf-utils";

export default function RearrangePages() {
  const resultRef = useRef<ArrayBuffer | null>(null);
  const [downloadReady, setDownloadReady] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [newOrder, setNewOrder] = useState("");

  const handleProcess = async (files: File[]) => {
    const totalPages = await getPDFPageCount(files[0]);
    setPageCount(totalPages);
  };

  const handleRearrange = async (files: File[]) => {
    if (!newOrder.trim()) {
      throw new Error("Please enter the new page order");
    }

    const pageIndices = newOrder
      .split(",")
      .map((p) => parseInt(p.trim()))
      .filter((p) => !isNaN(p) && p > 0 && p <= pageCount);

    if (pageIndices.length === 0) {
      throw new Error("No valid page numbers entered");
    }

    const result = await rearrangePages(files[0], pageIndices);
    resultRef.current = result;
    setDownloadReady(true);
  };

  const handleDownload = () => {
    if (resultRef.current) {
      downloadFile(resultRef.current, "rearranged.pdf");
    }
  };

  const helpContent = (
    <div className="space-y-3">
      <div>
        <h4 className="font-semibold text-foreground mb-1">Upload PDF</h4>
        <p>Select a PDF file to rearrange pages.</p>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-1">New Order</h4>
        <p>Enter page numbers in the desired order (e.g., 3,1,2).</p>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-1">Rearrange</h4>
        <p>Create a new PDF with pages in the specified order.</p>
      </div>
    </div>
  );

  const optionsContent = (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          New Page Order (Total: {pageCount})
        </label>
        <input
          type="text"
          value={newOrder}
          onChange={(e) => setNewOrder(e.target.value)}
          placeholder="e.g., 3,1,2 or 5,4,3,2,1"
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <p className="text-xs text-muted-foreground mt-2">
          Enter page numbers in desired order separated by commas
        </p>
      </div>
    </div>
  );

  return (
    <ToolTemplate
      toolName="Rearrange Pages"
      toolDescription="Reorder pages in your PDF document"
      toolIcon={<Layers className="w-8 h-8 text-primary" />}
      fileAccept=".pdf"
      fileMultiple={false}
      onProcess={handleRearrange}
      onDownload={downloadReady ? handleDownload : undefined}
      helpText={helpContent as any}
      optionsPanel={pageCount > 0 ? optionsContent : undefined}
    />
  );
}
