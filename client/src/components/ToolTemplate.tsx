import { useState } from "react";
import { Link } from "wouter";
import { ChevronLeft, Info } from "lucide-react";
import Layout from "@/components/Layout";
import FileUpload from "@/components/FileUpload";
import ProcessingProgress from "@/components/ProcessingProgress";

interface ToolTemplateProps {
  toolName: string;
  toolDescription: string;
  toolIcon: React.ReactNode;
  fileAccept: string;
  fileMultiple?: boolean;
  maxFileSize?: number;
  maxFiles?: number;
  onProcess: (files: File[], options: any) => Promise<void>;
  onDownload?: () => void;
  optionsPanel?: React.ReactNode;
  helpText?: string;
  children?: React.ReactNode;
}

type ProcessingStatus = "idle" | "processing" | "complete" | "error";

export default function ToolTemplate({
  toolName,
  toolDescription,
  toolIcon,
  fileAccept,
  fileMultiple = true,
  maxFileSize = 100 * 1024 * 1024,
  maxFiles = 50,
  onProcess,
  onDownload,
  optionsPanel,
  helpText,
  children,
}: ToolTemplateProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<ProcessingStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<any>({});

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setError(null);
  };

  const handleProcess = async () => {
    if (files.length === 0) {
      setError("Please select at least one file");
      return;
    }

    try {
      setStatus("processing");
      setError(null);
      setProgress(0);

      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + Math.random() * 30;
        });
      }, 300);

      await onProcess(files, options);

      clearInterval(progressInterval);
      setProgress(100);
      setStatus("complete");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const handleReset = () => {
    setFiles([]);
    setStatus("idle");
    setProgress(0);
    setError(null);
    setOptions({});
  };

  return (
    <Layout>
      <div className="container py-12">
        {/* Header */}
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-opacity-90 transition-colors mb-8">
          <ChevronLeft className="w-4 h-4" />
          Back to Tools
        </Link>

        <div className="flex items-start gap-4 mb-12">
          <div className="flex-shrink-0 p-4 bg-primary/10 rounded-lg">
            {toolIcon}
          </div>
          <div>
            <h1 className="h2 mb-2 text-foreground">{toolName}</h1>
            <p className="text-lg text-muted-foreground">{toolDescription}</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Upload and Options */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Upload */}
            <section>
              <h2 className="h3 mb-4 text-foreground">Step 1: Upload Files</h2>
              <FileUpload
                onFilesSelected={handleFilesSelected}
                accept={fileAccept}
                multiple={fileMultiple}
                maxSize={maxFileSize}
                maxFiles={maxFiles}
              />
            </section>

            {/* Step 2: Options */}
            {optionsPanel && files.length > 0 && (
              <section>
                <h2 className="h3 mb-4 text-foreground">Step 2: Configure Options</h2>
                <div className="p-6 bg-secondary rounded-lg border border-border">
                  {optionsPanel}
                </div>
              </section>
            )}

            {/* Step 3: Process */}
            {files.length > 0 && status === "idle" && (
              <button
                onClick={handleProcess}
                className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-opacity-90 transition-colors text-lg"
              >
                Process {files.length} {files.length === 1 ? "File" : "Files"}
              </button>
            )}

            {/* Processing Status */}
            {status !== "idle" && (
              <ProcessingProgress
                status={status}
                progress={progress}
                message={`Processing ${files.length} ${files.length === 1 ? "file" : "files"}...`}
                errorMessage={error || "An error occurred during processing"}
                onReset={handleReset}
              />
            )}

            {/* Download Button */}
            {status === "complete" && onDownload && (
              <button
                onClick={onDownload}
                className="w-full px-6 py-4 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors text-lg"
              >
                Download Result
              </button>
            )}

            {/* Custom Content */}
            {children}
          </div>

          {/* Right Column - Help */}
          <div className="space-y-6">
            {helpText && (
              <div className="p-6 bg-secondary rounded-lg border border-border">
                <div className="flex items-start gap-3 mb-4">
                  <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-foreground">How It Works</h3>
                </div>
                <div className="text-sm text-muted-foreground space-y-3">
                  {helpText}
                </div>
              </div>
            )}

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
    </Layout>
  );
}
