import { useState, useRef } from "react";
import { RotateCw } from "lucide-react";
import ToolTemplate from "@/components/ToolTemplate";
import { rotatePDFPages, downloadFile } from "@/lib/pdf-utils";

export default function RotatePages() {
  const resultRef = useRef<ArrayBuffer | null>(null);
  const [downloadReady, setDownloadReady] = useState(false);
  const [rotation, setRotation] = useState<90 | 180 | 270>(90);

  const handleProcess = async (files: File[]) => {
    const result = await rotatePDFPages(files[0], rotation);
    resultRef.current = result;
    setDownloadReady(true);
  };

  const handleDownload = () => {
    if (resultRef.current) {
      downloadFile(resultRef.current, "rotated.pdf");
    }
  };

  const helpContent = (
    <div className="space-y-3">
      <div>
        <h4 className="font-semibold text-foreground mb-1">Upload PDF</h4>
        <p>Select a PDF file to rotate.</p>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-1">Select Rotation</h4>
        <p>Choose how many degrees to rotate (90, 180, or 270).</p>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-1">Apply</h4>
        <p>All pages will be rotated by the selected amount.</p>
      </div>
    </div>
  );

  const optionsContent = (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          Rotation Angle
        </label>
        <div className="space-y-2">
          {[90, 180, 270].map((angle) => (
            <label key={angle} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                value={angle}
                checked={rotation === angle}
                onChange={(e) => setRotation(Number(e.target.value) as 90 | 180 | 270)}
                className="w-4 h-4"
              />
              <span className="text-foreground">{angle}°</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <ToolTemplate
      toolName="Rotate Pages"
      toolDescription="Rotate PDF pages 90, 180, or 270 degrees"
      toolIcon={<RotateCw className="w-8 h-8 text-primary" />}
      fileAccept=".pdf"
      fileMultiple={false}
      onProcess={handleProcess}
      onDownload={downloadReady ? handleDownload : undefined}
      helpText={helpContent as any}
      optionsPanel={optionsContent}
    />
  );
}
