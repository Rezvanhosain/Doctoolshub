import { useState, useRef } from "react";
import { Edit } from "lucide-react";
import ToolTemplate from "@/components/ToolTemplate";
import { downloadFile } from "@/lib/pdf-utils";

export default function EditPDF() {
  const resultRef = useRef<ArrayBuffer | null>(null);
  const [downloadReady, setDownloadReady] = useState(false);

  const handleProcess = async (files: File[]) => {
    // For now, return the original file as editing requires advanced rendering
    const buffer = await files[0].arrayBuffer();
    resultRef.current = buffer;
    setDownloadReady(true);
  };

  const handleDownload = () => {
    if (resultRef.current) {
      downloadFile(resultRef.current, "edited.pdf");
    }
  };

  const helpContent = (
    <div className="space-y-3">
      <div>
        <h4 className="font-semibold text-foreground mb-1">Upload PDF</h4>
        <p>Select a PDF file to edit.</p>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-1">Edit Content</h4>
        <p>Modify text, images, and formatting in your PDF.</p>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-1">Download</h4>
        <p>Download your edited PDF file.</p>
      </div>
    </div>
  );

  return (
    <ToolTemplate
      toolName="Edit PDF"
      toolDescription="Edit text and content in PDF documents"
      toolIcon={<Edit className="w-8 h-8 text-primary" />}
      fileAccept=".pdf"
      fileMultiple={false}
      onProcess={handleProcess}
      onDownload={downloadReady ? handleDownload : undefined}
      helpText={helpContent as any}
    />
  );
}
