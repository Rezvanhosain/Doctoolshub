import { useState, useRef } from "react";
import { Zap } from "lucide-react";
import ToolTemplate from "@/components/ToolTemplate";
import { compressPDF, downloadFile } from "@/lib/pdf-utils";

export default function CompressPDF() {
  const resultRef = useRef<ArrayBuffer | null>(null);
  const [downloadReady, setDownloadReady] = useState(false);

  const handleProcess = async (files: File[]) => {
    const result = await compressPDF(files[0]);
    resultRef.current = result;
    setDownloadReady(true);
  };

  const handleDownload = () => {
    if (resultRef.current) {
      downloadFile(resultRef.current, "compressed.pdf");
    }
  };

  const helpContent = (
    <div className="space-y-3">
      <div>
        <h4 className="font-semibold text-foreground mb-1">Upload PDF</h4>
        <p>Select a PDF file you want to compress.</p>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-1">Compression</h4>
        <p>The PDF will be optimized to reduce file size while maintaining quality.</p>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-1">Note</h4>
        <p>For best results with large files, consider using server-side compression.</p>
      </div>
    </div>
  );

  return (
    <ToolTemplate
      toolName="Compress PDF"
      toolDescription="Reduce PDF file size while maintaining quality"
      toolIcon={<Zap className="w-8 h-8 text-primary" />}
      fileAccept=".pdf"
      fileMultiple={false}
      onProcess={handleProcess}
      onDownload={downloadReady ? handleDownload : undefined}
      helpText={helpContent as any}
    />
  );
}
