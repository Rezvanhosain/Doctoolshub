import { useState, useRef } from "react";
import { Scissors } from "lucide-react";
import ToolTemplate from "@/components/ToolTemplate";
import { splitPDF, downloadFiles } from "@/lib/pdf-utils";

export default function SplitPDF() {
  const resultRef = useRef<ArrayBuffer[]>([]);
  const [downloadReady, setDownloadReady] = useState(false);
  const [fileCount, setFileCount] = useState(0);

  const handleProcess = async (files: File[]) => {
    const result = await splitPDF(files[0]);
    resultRef.current = result;
    setFileCount(result.length);
    setDownloadReady(true);
  };

  const handleDownload = () => {
    if (resultRef.current.length > 0) {
      downloadFiles(resultRef.current, "split");
    }
  };

  const helpContent = (
    <div className="space-y-3">
      <div>
        <h4 className="font-semibold text-foreground mb-1">Upload PDF</h4>
        <p>Select a single PDF file to split into individual pages.</p>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-1">Split Process</h4>
        <p>Each page will be extracted as a separate PDF file.</p>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-1">Download</h4>
        <p>Download all split PDF files at once.</p>
      </div>
    </div>
  );

  return (
    <ToolTemplate
      toolName="Split PDF"
      toolDescription="Divide a PDF into separate files, one page per file"
      toolIcon={<Scissors className="w-8 h-8 text-primary" />}
      fileAccept=".pdf"
      fileMultiple={false}
      onProcess={handleProcess}
      onDownload={downloadReady ? handleDownload : undefined}
      helpText={helpContent as any}
    >
      {downloadReady && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">
            Successfully split PDF into <strong>{fileCount} files</strong>
          </p>
        </div>
      )}
    </ToolTemplate>
  );
}
