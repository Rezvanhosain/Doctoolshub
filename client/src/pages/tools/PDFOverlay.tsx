import { useState, useRef } from "react";
import { Layers2 } from "lucide-react";
import ToolTemplate from "@/components/ToolTemplate";
import { overlayPDFs, downloadFile } from "@/lib/pdf-utils";
import FileUpload from "@/components/FileUpload";

export default function PDFOverlay() {
  const resultRef = useRef<ArrayBuffer | null>(null);
  const [downloadReady, setDownloadReady] = useState(false);
  const [basePdf, setBasePdf] = useState<File | null>(null);
  const [overlayPdf, setOverlayPdf] = useState<File | null>(null);

  const handleBaseFileSelect = (files: File[]) => {
    setBasePdf(files[0] || null);
  };

  const handleOverlayFileSelect = (files: File[]) => {
    setOverlayPdf(files[0] || null);
  };

  const handleProcess = async () => {
    if (!basePdf || !overlayPdf) {
      throw new Error("Please select both PDF files");
    }

    const result = await overlayPDFs(basePdf, overlayPdf);
    resultRef.current = result;
    setDownloadReady(true);
  };

  const handleDownload = () => {
    if (resultRef.current) {
      downloadFile(resultRef.current, "overlay.pdf");
    }
  };

  const helpContent = (
    <div className="space-y-3">
      <div>
        <h4 className="font-semibold text-foreground mb-1">Base PDF</h4>
        <p>Select the base PDF file.</p>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-1">Overlay PDF</h4>
        <p>Select the PDF to overlay on top of the base.</p>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-1">Combine</h4>
        <p>Pages from both PDFs will be combined.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="h2 mb-2 text-foreground">PDF Overlay</h1>
          <p className="text-lg text-muted-foreground">
            Overlay one PDF on top of another
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Base PDF Upload */}
            <section>
              <h2 className="h3 mb-4 text-foreground">Step 1: Select Base PDF</h2>
              <FileUpload
                onFilesSelected={handleBaseFileSelect}
                accept=".pdf"
                multiple={false}
              />
              {basePdf && (
                <p className="text-sm text-green-600 mt-2">✓ {basePdf.name}</p>
              )}
            </section>

            {/* Overlay PDF Upload */}
            <section>
              <h2 className="h3 mb-4 text-foreground">Step 2: Select Overlay PDF</h2>
              <FileUpload
                onFilesSelected={handleOverlayFileSelect}
                accept=".pdf"
                multiple={false}
              />
              {overlayPdf && (
                <p className="text-sm text-green-600 mt-2">✓ {overlayPdf.name}</p>
              )}
            </section>

            {/* Process Button */}
            {basePdf && overlayPdf && !downloadReady && (
              <button
                onClick={handleProcess}
                className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-opacity-90 transition-colors text-lg"
              >
                Overlay PDFs
              </button>
            )}

            {/* Download Button */}
            {downloadReady && (
              <button
                onClick={handleDownload}
                className="w-full px-6 py-4 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors text-lg"
              >
                Download Result
              </button>
            )}
          </div>

          {/* Right Column - Help */}
          <div className="space-y-6">
            <div className="p-6 bg-secondary rounded-lg border border-border">
              <div className="flex items-start gap-3 mb-4">
                <h3 className="font-semibold text-foreground">How It Works</h3>
              </div>
              <div className="text-sm text-muted-foreground space-y-3">
                {helpContent}
              </div>
            </div>

            {/* Privacy Notice */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-sm text-blue-900 mb-2">
                Your Privacy Matters
              </h4>
              <p className="text-xs text-blue-800">
                All processing happens in your browser. Your files are never uploaded to our servers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
