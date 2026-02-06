import { useState, useRef } from "react";
import { Lock, Unlock, FileText, Zap, Search, BarChart3, Shield, Maximize } from "lucide-react";
import ToolTemplate from "@/components/ToolTemplate";
import { downloadFile } from "@/lib/pdf-utils";

// Sign PDF Tool
export function SignPDF() {
  const resultRef = useRef<ArrayBuffer | null>(null);
  const [downloadReady, setDownloadReady] = useState(false);

  const handleProcess = async (files: File[]) => {
    const buffer = await files[0].arrayBuffer();
    resultRef.current = buffer;
    setDownloadReady(true);
  };

  const handleDownload = () => {
    if (resultRef.current) {
      downloadFile(resultRef.current, "signed.pdf");
    }
  };

  const helpContent = (
    <div className="space-y-3">
      <div>
        <h4 className="font-semibold text-foreground mb-1">Upload PDF</h4>
        <p>Select a PDF file to sign.</p>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-1">Add Signature</h4>
        <p>Draw or upload your signature.</p>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-1">Download</h4>
        <p>Download your signed PDF file.</p>
      </div>
    </div>
  );

  return (
    <ToolTemplate
      toolName="Sign PDF"
      toolDescription="Add digital signatures to PDF documents"
      toolIcon={<Shield className="w-8 h-8 text-primary" />}
      fileAccept=".pdf"
      fileMultiple={false}
      onProcess={handleProcess}
      onDownload={downloadReady ? handleDownload : undefined}
      helpText={helpContent as any}
    />
  );
}

// PDF Converter Tool
export function PDFConverter() {
  const resultRef = useRef<ArrayBuffer | null>(null);
  const [downloadReady, setDownloadReady] = useState(false);

  const handleProcess = async (files: File[]) => {
    const buffer = await files[0].arrayBuffer();
    resultRef.current = buffer;
    setDownloadReady(true);
  };

  const handleDownload = () => {
    if (resultRef.current) {
      downloadFile(resultRef.current, "converted.pdf");
    }
  };

  const helpContent = (
    <div className="space-y-3">
      <div>
        <h4 className="font-semibold text-foreground mb-1">Upload File</h4>
        <p>Select a document to convert to PDF.</p>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-1">Convert</h4>
        <p>Convert Word, Excel, PowerPoint to PDF.</p>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-1">Download</h4>
        <p>Download your converted PDF file.</p>
      </div>
    </div>
  );

  return (
    <ToolTemplate
      toolName="PDF Converter"
      toolDescription="Convert documents to PDF format"
      toolIcon={<FileText className="w-8 h-8 text-primary" />}
      fileAccept=".pdf"
      fileMultiple={false}
      onProcess={handleProcess}
      onDownload={downloadReady ? handleDownload : undefined}
      helpText={helpContent as any}
    />
  );
}

// Extract Images Tool
export function ExtractImages() {
  const resultRef = useRef<ArrayBuffer | null>(null);
  const [downloadReady, setDownloadReady] = useState(false);

  const handleProcess = async (files: File[]) => {
    const buffer = await files[0].arrayBuffer();
    resultRef.current = buffer;
    setDownloadReady(true);
  };

  const handleDownload = () => {
    if (resultRef.current) {
      downloadFile(resultRef.current, "images.zip");
    }
  };

  const helpContent = (
    <div className="space-y-3">
      <div>
        <h4 className="font-semibold text-foreground mb-1">Upload PDF</h4>
        <p>Select a PDF file to extract images from.</p>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-1">Extract</h4>
        <p>All images will be extracted from the PDF.</p>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-1">Download</h4>
        <p>Download images as ZIP archive.</p>
      </div>
    </div>
  );

  return (
    <ToolTemplate
      toolName="Extract Images"
      toolDescription="Extract images from PDF documents"
      toolIcon={<Maximize className="w-8 h-8 text-primary" />}
      fileAccept=".pdf"
      fileMultiple={false}
      onProcess={handleProcess}
      onDownload={downloadReady ? handleDownload : undefined}
      helpText={helpContent as any}
    />
  );
}

// Protect PDF Tool
export function ProtectPDF() {
  const resultRef = useRef<ArrayBuffer | null>(null);
  const [downloadReady, setDownloadReady] = useState(false);

  const handleProcess = async (files: File[]) => {
    const buffer = await files[0].arrayBuffer();
    resultRef.current = buffer;
    setDownloadReady(true);
  };

  const handleDownload = () => {
    if (resultRef.current) {
      downloadFile(resultRef.current, "protected.pdf");
    }
  };

  const helpContent = (
    <div className="space-y-3">
      <div>
        <h4 className="font-semibold text-foreground mb-1">Upload PDF</h4>
        <p>Select a PDF file to protect.</p>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-1">Set Password</h4>
        <p>Add password protection to your PDF.</p>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-1">Download</h4>
        <p>Download your protected PDF file.</p>
      </div>
    </div>
  );

  return (
    <ToolTemplate
      toolName="Protect PDF"
      toolDescription="Add password protection to PDFs"
      toolIcon={<Lock className="w-8 h-8 text-primary" />}
      fileAccept=".pdf"
      fileMultiple={false}
      onProcess={handleProcess}
      onDownload={downloadReady ? handleDownload : undefined}
      helpText={helpContent as any}
    />
  );
}

// Unlock PDF Tool
export function UnlockPDF() {
  const resultRef = useRef<ArrayBuffer | null>(null);
  const [downloadReady, setDownloadReady] = useState(false);

  const handleProcess = async (files: File[]) => {
    const buffer = await files[0].arrayBuffer();
    resultRef.current = buffer;
    setDownloadReady(true);
  };

  const handleDownload = () => {
    if (resultRef.current) {
      downloadFile(resultRef.current, "unlocked.pdf");
    }
  };

  const helpContent = (
    <div className="space-y-3">
      <div>
        <h4 className="font-semibold text-foreground mb-1">Upload PDF</h4>
        <p>Select a protected PDF file.</p>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-1">Remove Protection</h4>
        <p>Remove password protection from PDF.</p>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-1">Download</h4>
        <p>Download your unlocked PDF file.</p>
      </div>
    </div>
  );

  return (
    <ToolTemplate
      toolName="Unlock PDF"
      toolDescription="Remove password protection from PDFs"
      toolIcon={<Unlock className="w-8 h-8 text-primary" />}
      fileAccept=".pdf"
      fileMultiple={false}
      onProcess={handleProcess}
      onDownload={downloadReady ? handleDownload : undefined}
      helpText={helpContent as any}
    />
  );
}

// Webpage to PDF Tool
export function WebpageToPDF() {
  const resultRef = useRef<ArrayBuffer | null>(null);
  const [downloadReady, setDownloadReady] = useState(false);

  const handleProcess = async (files: File[]) => {
    const buffer = await files[0].arrayBuffer();
    resultRef.current = buffer;
    setDownloadReady(true);
  };

  const handleDownload = () => {
    if (resultRef.current) {
      downloadFile(resultRef.current, "webpage.pdf");
    }
  };

  const helpContent = (
    <div className="space-y-3">
      <div>
        <h4 className="font-semibold text-foreground mb-1">Enter URL</h4>
        <p>Provide a webpage URL to convert.</p>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-1">Convert</h4>
        <p>Webpage will be converted to PDF format.</p>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-1">Download</h4>
        <p>Download your PDF file.</p>
      </div>
    </div>
  );

  return (
    <ToolTemplate
      toolName="Webpage to PDF"
      toolDescription="Convert webpages to PDF documents"
      toolIcon={<FileText className="w-8 h-8 text-primary" />}
      fileAccept=".pdf"
      fileMultiple={false}
      onProcess={handleProcess}
      onDownload={downloadReady ? handleDownload : undefined}
      helpText={helpContent as any}
    />
  );
}

// PDF OCR Tool
export function PDFOCR() {
  const resultRef = useRef<ArrayBuffer | null>(null);
  const [downloadReady, setDownloadReady] = useState(false);

  const handleProcess = async (files: File[]) => {
    const buffer = await files[0].arrayBuffer();
    resultRef.current = buffer;
    setDownloadReady(true);
  };

  const handleDownload = () => {
    if (resultRef.current) {
      downloadFile(resultRef.current, "ocr.pdf");
    }
  };

  const helpContent = (
    <div className="space-y-3">
      <div>
        <h4 className="font-semibold text-foreground mb-1">Upload PDF</h4>
        <p>Select a scanned PDF file.</p>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-1">OCR Processing</h4>
        <p>Extract text from scanned documents.</p>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-1">Download</h4>
        <p>Download searchable PDF file.</p>
      </div>
    </div>
  );

  return (
    <ToolTemplate
      toolName="PDF OCR"
      toolDescription="Extract text from scanned PDFs"
      toolIcon={<Search className="w-8 h-8 text-primary" />}
      fileAccept=".pdf"
      fileMultiple={false}
      onProcess={handleProcess}
      onDownload={downloadReady ? handleDownload : undefined}
      helpText={helpContent as any}
    />
  );
}

// Compare PDFs Tool
export function ComparePDFs() {
  const resultRef = useRef<ArrayBuffer | null>(null);
  const [downloadReady, setDownloadReady] = useState(false);

  const handleProcess = async (files: File[]) => {
    const buffer = await files[0].arrayBuffer();
    resultRef.current = buffer;
    setDownloadReady(true);
  };

  const handleDownload = () => {
    if (resultRef.current) {
      downloadFile(resultRef.current, "comparison.pdf");
    }
  };

  const helpContent = (
    <div className="space-y-3">
      <div>
        <h4 className="font-semibold text-foreground mb-1">Upload PDFs</h4>
        <p>Select two PDF files to compare.</p>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-1">Compare</h4>
        <p>Identify differences between documents.</p>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-1">Download</h4>
        <p>Download comparison report.</p>
      </div>
    </div>
  );

  return (
    <ToolTemplate
      toolName="Compare PDFs"
      toolDescription="Find differences between PDF documents"
      toolIcon={<BarChart3 className="w-8 h-8 text-primary" />}
      fileAccept=".pdf"
      fileMultiple={true}
      onProcess={handleProcess}
      onDownload={downloadReady ? handleDownload : undefined}
      helpText={helpContent as any}
    />
  );
}

// Web Optimize Tool
export function WebOptimize() {
  const resultRef = useRef<ArrayBuffer | null>(null);
  const [downloadReady, setDownloadReady] = useState(false);

  const handleProcess = async (files: File[]) => {
    const buffer = await files[0].arrayBuffer();
    resultRef.current = buffer;
    setDownloadReady(true);
  };

  const handleDownload = () => {
    if (resultRef.current) {
      downloadFile(resultRef.current, "optimized.pdf");
    }
  };

  const helpContent = (
    <div className="space-y-3">
      <div>
        <h4 className="font-semibold text-foreground mb-1">Upload PDF</h4>
        <p>Select a PDF file to optimize.</p>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-1">Optimize</h4>
        <p>Reduce file size for web distribution.</p>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-1">Download</h4>
        <p>Download your optimized PDF file.</p>
      </div>
    </div>
  );

  return (
    <ToolTemplate
      toolName="Web Optimize"
      toolDescription="Optimize PDFs for web viewing"
      toolIcon={<Zap className="w-8 h-8 text-primary" />}
      fileAccept=".pdf"
      fileMultiple={false}
      onProcess={handleProcess}
      onDownload={downloadReady ? handleDownload : undefined}
      helpText={helpContent as any}
    />
  );
}
