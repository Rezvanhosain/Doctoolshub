import { useState, useRef } from "react";
import { Plus } from "lucide-react";
import Layout from "@/components/Layout";
import { Link } from "wouter";
import { ChevronLeft } from "lucide-react";
import { createPDFFromText, downloadFile } from "@/lib/pdf-utils";
import ProcessingProgress from "@/components/ProcessingProgress";

export default function CreatePDF() {
  const resultRef = useRef<ArrayBuffer | null>(null);
  const [downloadReady, setDownloadReady] = useState(false);
  const [title, setTitle] = useState("My Document");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"idle" | "processing" | "complete" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async () => {
    if (!content.trim()) {
      setError("Please enter some content");
      return;
    }

    try {
      setStatus("processing");
      setError(null);

      const result = await createPDFFromText(content, title);
      resultRef.current = result;
      setStatus("complete");
      setDownloadReady(true);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const handleDownload = () => {
    if (resultRef.current) {
      downloadFile(resultRef.current, `${title.toLowerCase().replace(/\s+/g, "-")}.pdf`);
    }
  };

  const handleReset = () => {
    setTitle("My Document");
    setContent("");
    setStatus("idle");
    setError(null);
    setDownloadReady(false);
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
            <Plus className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="h2 mb-2 text-foreground">Create PDF</h1>
            <p className="text-lg text-muted-foreground">Create PDF from text or documents</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title */}
            <section>
              <h2 className="h3 mb-4 text-foreground">Step 1: Document Title</h2>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter document title"
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </section>

            {/* Content */}
            <section>
              <h2 className="h3 mb-4 text-foreground">Step 2: Document Content</h2>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter your document content here..."
                rows={12}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Tip: Use line breaks to separate paragraphs
              </p>
            </section>

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
                progress={status === "processing" ? 50 : 100}
                message="Creating PDF..."
                errorMessage={error || "An error occurred"}
                onReset={handleReset}
              />
            )}

            {/* Create Button */}
            {status === "idle" && (
              <button
                onClick={handleCreate}
                className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-opacity-90 transition-colors text-lg"
              >
                Create PDF
              </button>
            )}

            {/* Download Button */}
            {downloadReady && (
              <button
                onClick={handleDownload}
                className="w-full px-6 py-4 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors text-lg"
              >
                Download PDF
              </button>
            )}
          </div>

          {/* Right Column - Help */}
          <div className="space-y-6">
            <div className="p-6 bg-secondary rounded-lg border border-border">
              <h3 className="font-semibold text-foreground mb-4">How It Works</h3>
              <div className="text-sm text-muted-foreground space-y-3">
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Add Title</h4>
                  <p>Enter a title for your document.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Write Content</h4>
                  <p>Type or paste your document content.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Generate</h4>
                  <p>Click Create PDF to generate your document.</p>
                </div>
              </div>
            </div>

            {/* Privacy Notice */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-sm text-blue-900 mb-2">
                Your Privacy Matters
              </h4>
              <p className="text-xs text-blue-800">
                All processing happens in your browser. Your documents are never uploaded to our servers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
