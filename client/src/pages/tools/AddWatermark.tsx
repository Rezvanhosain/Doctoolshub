import { useState, useRef } from "react";
import { Droplet } from "lucide-react";
import ToolTemplate from "@/components/ToolTemplate";
import { addWatermarkText, downloadFile } from "@/lib/pdf-utils";

export default function AddWatermark() {
  const resultRef = useRef<ArrayBuffer | null>(null);
  const [downloadReady, setDownloadReady] = useState(false);
  const [watermarkText, setWatermarkText] = useState("CONFIDENTIAL");

  const handleProcess = async (files: File[]) => {
    const result = await addWatermarkText(files[0], watermarkText);
    resultRef.current = result;
    setDownloadReady(true);
  };

  const handleDownload = () => {
    if (resultRef.current) {
      downloadFile(resultRef.current, "watermarked.pdf");
    }
  };

  const helpContent = (
    <div className="space-y-3">
      <div>
        <h4 className="font-semibold text-foreground mb-1">Upload PDF</h4>
        <p>Select a PDF file to add watermark to.</p>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-1">Watermark Text</h4>
        <p>Enter the text to display as watermark (e.g., CONFIDENTIAL, DRAFT).</p>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-1">Apply</h4>
        <p>Watermark will be added to all pages in semi-transparent text.</p>
      </div>
    </div>
  );

  const optionsContent = (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Watermark Text
        </label>
        <input
          type="text"
          value={watermarkText}
          onChange={(e) => setWatermarkText(e.target.value)}
          placeholder="e.g., CONFIDENTIAL"
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <p className="text-xs text-muted-foreground mt-2">
          Text will appear diagonally across all pages
        </p>
      </div>
    </div>
  );

  return (
    <ToolTemplate
      toolName="Add Watermark"
      toolDescription="Add text watermarks to PDF pages"
      toolIcon={<Droplet className="w-8 h-8 text-primary" />}
      fileAccept=".pdf"
      fileMultiple={false}
      onProcess={handleProcess}
      onDownload={downloadReady ? handleDownload : undefined}
      helpText={helpContent as any}
      optionsPanel={optionsContent}
    />
  );
}
