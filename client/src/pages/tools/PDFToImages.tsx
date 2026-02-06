import { useState, useRef } from "react";
import { FileImage } from "lucide-react";
import ToolTemplate from "@/components/ToolTemplate";
import { pdfToImages, downloadImage } from "@/lib/pdf-utils";

export default function PDFToImages() {
  const resultRef = useRef<string[]>([]);
  const [downloadReady, setDownloadReady] = useState(false);
  const [imageCount, setImageCount] = useState(0);

  const handleProcess = async (files: File[]) => {
    const result = await pdfToImages(files[0]);
    resultRef.current = result;
    setImageCount(result.length);
    setDownloadReady(true);
  };

  const handleDownload = () => {
    if (resultRef.current.length > 0) {
      resultRef.current.forEach((dataUrl, index) => {
        downloadImage(dataUrl, `page-${index + 1}.png`);
      });
    }
  };

  const helpContent = (
    <div className="space-y-3">
      <div>
        <h4 className="font-semibold text-foreground mb-1">Upload PDF</h4>
        <p>Select a PDF file to convert to images.</p>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-1">Conversion</h4>
        <p>Each page will be converted to a separate PNG image.</p>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-1">Download</h4>
        <p>Download all images at once.</p>
      </div>
    </div>
  );

  return (
    <ToolTemplate
      toolName="PDF to Images"
      toolDescription="Convert PDF pages into individual image files"
      toolIcon={<FileImage className="w-8 h-8 text-primary" />}
      fileAccept=".pdf"
      fileMultiple={false}
      onProcess={handleProcess}
      onDownload={downloadReady ? handleDownload : undefined}
      helpText={helpContent as any}
    >
      {downloadReady && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">
            Successfully converted PDF to <strong>{imageCount} images</strong>
          </p>
        </div>
      )}
    </ToolTemplate>
  );
}
