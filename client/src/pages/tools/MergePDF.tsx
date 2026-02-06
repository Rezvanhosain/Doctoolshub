import { useState, useRef } from "react";
import { Merge, ChevronLeft } from "lucide-react";
import Layout from "@/components/Layout";
import { Link } from "wouter";
import FileUpload from "@/components/FileUpload";
import ProcessingProgress from "@/components/ProcessingProgress";
import PDFFileArrangement from "@/components/PDFFileArrangement";
import { mergePDFs, downloadFile } from "@/lib/pdf-utils";

export default function MergePDF() {
  const resultRef = useRef<ArrayBuffer | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [arrangedFiles, setArrangedFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "complete" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);
  const [downloadReady, setDownloadReady] = useState(false);

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setArrangedFiles(selectedFiles);
    setError(null);
    setStatus("idle");
    setDownloadReady(false);
  };

  const handleArranged = (arranged: File[]) => {
    setArrangedFiles(arranged);
  };

  const handleMerge = async () => {
    if (arrangedFiles.length === 0) {
      setError("Please select at least one PDF file");
      setStatus("error");
      return;
    }

    try {
      setStatus("processing");
      setError(null);

      const result = await mergePDFs(arrangedFiles);
      resultRef.current = result;
      setStatus("complete");
      setDownloadReady(true);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "An error occurred during merge");
    }
  };

  const handleDownload = () => {
    if (resultRef.current) {
      downloadFile(resultRef.current, "merged.pdf");
    }
  };

  const handleReset = () => {
    setFiles([]);
    setArrangedFiles([]);
    setStatus("idle");
    setError(null);
    setDownloadReady(false);
  };

  return (
    <Layout>
      <div className="container py-12">
        {/* Header */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary hover:text-opacity-90 transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Tools
        </Link>

        <div className="flex items-start gap-4 mb-12">
          <div className="flex-shrink-0 p-4 bg-primary/10 rounded-lg">
            <Merge className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="h2 mb-2 text-foreground">Merge PDF</h1>
            <p className="text-lg text-muted-foreground">
              Combine multiple PDF files into a single document
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upload Section */}
            <section>
              <h2 className="h3 mb-4 text-foreground">Step 1: Select PDF Files</h2>
              <FileUpload
                onFilesSelected={handleFilesSelected}
                accept=".pdf"
                multiple={true}
              />
              {files.length > 0 && (
                <p className="text-sm text-green-600 mt-3">
                  ✓ {files.length} file{files.length !== 1 ? "s" : ""} selected
                </p>
              )}
            </section>

            {/* Arrangement Section */}
            {files.length > 0 && (
              <section>
                <h2 className="h3 mb-4 text-foreground">Step 2: Arrange Files</h2>
                <PDFFileArrangement files={files} onArranged={handleArranged} />
              </section>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {/* Processing Status */}
            {status !== "idle" && (
              <ProcessingProgress
                status={status}
                progress={status === "processing" ? 60 : 100}
                message="Merging PDFs..."
                errorMessage={error || "An error occurred"}
                onReset={handleReset}
              />
            )}

            {/* Action Buttons */}
            {files.length > 0 && status === "idle" && (
              <button
                onClick={handleMerge}
                className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-opacity-90 transition-colors text-lg"
              >
                Merge PDFs
              </button>
            )}

            {downloadReady && (
              <button
                onClick={handleDownload}
                className="w-full px-6 py-4 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors text-lg"
              >
                Download Merged PDF
              </button>
            )}
          </div>

          {/* Right Column - Help */}
          <div className="space-y-6">
            <div className="p-6 bg-secondary rounded-lg border border-border">
              <h3 className="font-semibold text-foreground mb-4">How It Works</h3>
              <div className="text-sm text-muted-foreground space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-1">1. Upload</h4>
                  <p>Select multiple PDF files to merge together.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">2. Arrange</h4>
                  <p>
                    Drag files to reorder them, or use arrow buttons. See thumbnails to
                    verify order.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">3. Merge</h4>
                  <p>Click Merge PDFs to combine them in the selected order.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">4. Download</h4>
                  <p>Download your merged PDF file.</p>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-sm text-blue-900 mb-2">💡 Tips</h4>
              <ul className="text-xs text-blue-800 space-y-2">
                <li>• Drag files by the grip handle to reorder</li>
                <li>• Use ↑ and ↓ buttons for precise ordering</li>
                <li>• Remove unwanted files with the × button</li>
                <li>• See file size and position for each PDF</li>
              </ul>
            </div>

            {/* Privacy Notice */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-sm text-blue-900 mb-2">
                Your Privacy Matters
              </h4>
              <p className="text-xs text-blue-800">
                All processing happens in your browser. Your files are never uploaded to
                our servers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
