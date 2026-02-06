import { useState, useRef } from "react";
import { Eye } from "lucide-react";
import ToolTemplate from "@/components/ToolTemplate";
import { redactPDF, downloadFile } from "@/lib/pdf-utils";

export default function RedactPDF() {
  const resultRef = useRef<ArrayBuffer | null>(null);
  const [downloadReady, setDownloadReady] = useState(false);

  const handleProcess = async (files: File[]) => {
    const result = await redactPDF(files[0]);
    resultRef.current = result;
    setDownloadReady(true);
  };

  const handleDownload = () => {
    if (resultRef.current) {
      downloadFile(resultRef.current, "redacted.pdf");
    }
  };

  const helpContent = (
    <div className="space-y-3">
      <div>
        <h4 className="font-semibold text-foreground mb-1">Upload PDF</h4>
        <p>Select a PDF file to redact.</p>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-1">Redaction</h4>
        <p>Sensitive portions will be covered with black rectangles.</p>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-1">Download</h4>
        <p>Download your redacted PDF file.</p>
      </div>
    </div>
  );

  return (
    <ToolTemplate
      toolName="Redact PDF"
      toolDescription="Redact sensitive information from PDFs"
      toolIcon={<Eye className="w-8 h-8 text-primary" />}
      fileAccept=".pdf"
      fileMultiple={false}
      onProcess={handleProcess}
      onDownload={downloadReady ? handleDownload : undefined}
      helpText={helpContent as any}
    />
  );
}
