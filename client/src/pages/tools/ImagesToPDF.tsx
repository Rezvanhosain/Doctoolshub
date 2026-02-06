import { useState, useRef } from "react";
import { Image } from "lucide-react";
import ToolTemplate from "@/components/ToolTemplate";
import { imagesToPDF, downloadFile } from "@/lib/pdf-utils";

export default function ImagesToPDF() {
  const resultRef = useRef<ArrayBuffer | null>(null);
  const [downloadReady, setDownloadReady] = useState(false);

  const handleProcess = async (files: File[]) => {
    const result = await imagesToPDF(files);
    resultRef.current = result;
    setDownloadReady(true);
  };

  const handleDownload = () => {
    if (resultRef.current) {
      downloadFile(resultRef.current, "images.pdf");
    }
  };

  const helpContent = (
    <div className="space-y-3">
      <div>
        <h4 className="font-semibold text-foreground mb-1">Supported Formats</h4>
        <p>JPG, PNG, GIF, and BMP images are supported.</p>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-1">Upload Images</h4>
        <p>Select multiple images to combine into a single PDF.</p>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-1">Order Matters</h4>
        <p>Images will appear in the PDF in the order you select them.</p>
      </div>
    </div>
  );

  return (
    <ToolTemplate
      toolName="Images to PDF"
      toolDescription="Convert JPG, PNG, and other images into a PDF document"
      toolIcon={<Image className="w-8 h-8 text-primary" />}
      fileAccept=".jpg,.jpeg,.png,.gif,.bmp"
      fileMultiple={true}
      onProcess={handleProcess}
      onDownload={downloadReady ? handleDownload : undefined}
      helpText={helpContent as any}
    />
  );
}
