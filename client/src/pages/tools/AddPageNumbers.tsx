import { useState, useRef } from "react";
import { Hash } from "lucide-react";
import ToolTemplate from "@/components/ToolTemplate";
import { addPageNumbers, downloadFile } from "@/lib/pdf-utils";

export default function AddPageNumbers() {
  const resultRef = useRef<ArrayBuffer | null>(null);
  const [downloadReady, setDownloadReady] = useState(false);

  const handleProcess = async (files: File[]) => {
    const result = await addPageNumbers(files[0]);
    resultRef.current = result;
    setDownloadReady(true);
  };

  const handleDownload = () => {
    if (resultRef.current) {
      downloadFile(resultRef.current, "numbered.pdf");
    }
  };

  const helpContent = (
    <div className="space-y-3">
      <div>
        <h4 className="font-semibold text-foreground mb-1">Upload PDF</h4>
        <p>Select a PDF file to add page numbers to.</p>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-1">Automatic Numbering</h4>
        <p>Page numbers will be automatically added to the bottom left of each page.</p>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-1">Download</h4>
        <p>Download your PDF with page numbers added.</p>
      </div>
    </div>
  );

  return (
    <ToolTemplate
      toolName="Add Page Numbers"
      toolDescription="Automatically add page numbers to your PDF document"
      toolIcon={<Hash className="w-8 h-8 text-primary" />}
      fileAccept=".pdf"
      fileMultiple={false}
      onProcess={handleProcess}
      onDownload={downloadReady ? handleDownload : undefined}
      helpText={helpContent as any}
    />
  );
}
