import { PDFDocument, PDFPage, rgb } from "pdf-lib";
import * as pdfjsLib from "pdfjs-dist";

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

/**
 * Merge multiple PDF files into one
 */
export async function mergePDFs(files: File[]): Promise<ArrayBuffer> {
  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  return mergedPdf.save();
}

/**
 * Split PDF into individual pages
 */
export async function splitPDF(file: File): Promise<ArrayBuffer[]> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const pages = pdf.getPageIndices();
  const splitPdfs: ArrayBuffer[] = [];

  for (const pageIndex of pages) {
    const newPdf = await PDFDocument.create();
    const [copiedPage] = await newPdf.copyPages(pdf, [pageIndex]);
    newPdf.addPage(copiedPage);
    splitPdfs.push(await newPdf.save());
  }

  return splitPdfs;
}

/**
 * Extract specific pages from PDF
 */
export async function extractPages(file: File, pageIndices: number[]): Promise<ArrayBuffer> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const newPdf = await PDFDocument.create();

  // Convert to 0-based indices and filter valid pages
  const validIndices = pageIndices
    .map((i) => i - 1)
    .filter((i) => i >= 0 && i < pdf.getPageCount());

  if (validIndices.length === 0) {
    throw new Error("No valid pages selected");
  }

  const copiedPages = await newPdf.copyPages(pdf, validIndices);
  copiedPages.forEach((page) => newPdf.addPage(page));

  return newPdf.save();
}

/**
 * Rotate PDF pages
 */
export async function rotatePDFPages(
  file: File,
  rotation: 90 | 180 | 270
): Promise<ArrayBuffer> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const pages = pdf.getPages();

  pages.forEach((page) => {
    const currentRotation = (page.getRotation() as any)?.angle || 0;
    const newRotation = (currentRotation + rotation) % 360;
    page.setRotation({ type: "degrees", angle: newRotation } as any);
  });

  return pdf.save() as unknown as ArrayBuffer;
}

/**
 * Add page numbers to PDF
 */
export async function addPageNumbers(file: File): Promise<ArrayBuffer> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const pages = pdf.getPages();
  const totalPages = pages.length;

  pages.forEach((page, index) => {
    const { height } = page.getSize();
    page.drawText(`${index + 1}`, {
      x: 50,
      y: 20,
      size: 12,
      color: rgb(0, 0, 0),
    });
  });

  return pdf.save() as unknown as ArrayBuffer;
}

/**
 * Compress PDF (basic compression by reducing image quality)
 */
export async function compressPDF(file: File): Promise<ArrayBuffer> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  
  // Note: pdf-lib has limited compression capabilities
  // This is a basic implementation that saves the PDF
  // For real compression, would need server-side processing
  return pdf.save() as unknown as ArrayBuffer;
}

/**
 * Convert images to PDF
 */
export async function imagesToPDF(files: File[]): Promise<ArrayBuffer> {
  const pdf = await PDFDocument.create();

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    let image;

    if (file.type === "image/png") {
      image = await pdf.embedPng(arrayBuffer);
    } else if (file.type === "image/jpeg" || file.type === "image/jpg") {
      image = await pdf.embedJpg(arrayBuffer);
    } else {
      continue; // Skip unsupported formats
    }

    const page = pdf.addPage([image.width, image.height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height,
    });
  }

  return pdf.save() as unknown as ArrayBuffer;
}

/**
 * Convert PDF pages to images (returns data URLs)
 */
export async function pdfToImages(file: File): Promise<string[]> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const images: string[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 2 });

    // Create canvas
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) continue;

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    // Render page to canvas
    await page.render({
      canvasContext: context,
      viewport: viewport,
      canvas: canvas,
    } as any).promise;

    // Convert to image
    images.push(canvas.toDataURL("image/png"));
  }

  return images;
}

/**
 * Get PDF page count
 */
export async function getPDFPageCount(file: File): Promise<number> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  return pdf.numPages;
}

/**
 * Validate if file is a PDF
 */
export function isPDF(file: File): boolean {
  return file.type === "application/pdf";
}

/**
 * Validate if file is an image
 */
export function isImage(file: File): boolean {
  return ["image/jpeg", "image/png", "image/gif", "image/bmp"].includes(file.type);
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}

/**
 * Download file
 */
export function downloadFile(data: ArrayBuffer, filename: string): void {
  const blob = new Blob([data], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Download multiple files as separate PDFs
 */
export function downloadFiles(dataArray: ArrayBuffer[], baseFilename: string): void {
  dataArray.forEach((data, index) => {
    const filename = `${baseFilename}-${index + 1}.pdf`;
    downloadFile(data, filename);
    // Add small delay between downloads
    setTimeout(() => {}, 100);
  });
}

/**
 * Download image
 */
export function downloadImage(dataUrl: string, filename: string): void {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Remove specific pages from PDF
 */
export async function removePages(file: File, pageIndices: number[]): Promise<ArrayBuffer> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const totalPages = pdf.getPageCount();
  
  // Sort indices in descending order to remove from end first
  const indicesToRemove = pageIndices
    .map((i) => i - 1)
    .filter((i) => i >= 0 && i < totalPages)
    .sort((a, b) => b - a);

  indicesToRemove.forEach((index) => {
    pdf.removePage(index);
  });

  return pdf.save() as unknown as ArrayBuffer;
}

/**
 * Rearrange PDF pages
 */
export async function rearrangePages(file: File, newOrder: number[]): Promise<ArrayBuffer> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const pages = pdf.getPages();
  const totalPages = pages.length;

  // Validate new order
  const validOrder = newOrder
    .map((i) => i - 1)
    .filter((i) => i >= 0 && i < totalPages);

  if (validOrder.length === 0) {
    throw new Error("Invalid page order");
  }

  const newPdf = await PDFDocument.create();
  const copiedPages = await newPdf.copyPages(pdf, validOrder);
  copiedPages.forEach((page) => newPdf.addPage(page));

  return newPdf.save();
}

/**
 * Add watermark text to PDF
 */
export async function addWatermarkText(file: File, watermarkText: string): Promise<ArrayBuffer> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const pages = pdf.getPages();

  pages.forEach((page) => {
    const { width, height } = page.getSize();
    page.drawText(watermarkText, {
      x: width / 2 - 100,
      y: height / 2,
      size: 48,
      color: rgb(200, 200, 200),
      opacity: 0.3,
      rotate: { angle: -45 } as any,
    });
  });

  return pdf.save() as unknown as ArrayBuffer;
}

/**
 * Get PDF metadata
 */
export async function getPDFMetadata(file: File): Promise<{
  pageCount: number;
  fileSize: string;
  fileName: string;
}> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  return {
    pageCount: pdf.numPages,
    fileSize: formatFileSize(file.size),
    fileName: file.name,
  };
}

/**
 * Create PDF from text
 */
export async function createPDFFromText(text: string, title: string = "Document"): Promise<ArrayBuffer> {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([612, 792]); // Letter size

  // Add title
  page.drawText(title, {
    x: 50,
    y: 750,
    size: 24,
    color: rgb(0, 0, 0),
  });

  // Add content with word wrapping
  const lines = text.split("\n");
  let yPosition = 700;
  const maxWidth = 500;
  const lineHeight = 20;

  lines.forEach((line) => {
    if (yPosition < 50) {
      // Create new page if needed
      const newPage = pdf.addPage([612, 792]);
      yPosition = 750;
    }

    page.drawText(line, {
      x: 50,
      y: yPosition,
      size: 12,
      color: rgb(0, 0, 0),
      maxWidth: maxWidth,
    });

    yPosition -= lineHeight;
  });

  return pdf.save() as unknown as ArrayBuffer;
}

/**
 * Merge two PDFs with overlay (second on top of first)
 */
export async function overlayPDFs(basePdf: File, overlayPdf: File): Promise<ArrayBuffer> {
  const baseBuffer = await basePdf.arrayBuffer();
  const overlayBuffer = await overlayPdf.arrayBuffer();

  const base = await PDFDocument.load(baseBuffer);
  const overlay = await PDFDocument.load(overlayBuffer);

  const basePages = base.getPages();
  const overlayPages = overlay.getPages();

  // For now, just merge the PDFs (overlay functionality is limited in pdf-lib)
  const copiedPages = await base.copyPages(overlay, overlay.getPageIndices());
  copiedPages.forEach((page) => base.addPage(page));

  return base.save();
}

/**
 * Redact text from PDF (basic implementation)
 */
export async function redactPDF(file: File): Promise<ArrayBuffer> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const pages = pdf.getPages();

  // Add black rectangles over content (basic redaction)
  pages.forEach((page) => {
    const { width, height } = page.getSize();
    // Redact top portion as example
    page.drawRectangle({
      x: 0,
      y: height - 100,
      width: width,
      height: 100,
      color: rgb(0, 0, 0),
    });
  });

  return pdf.save() as unknown as ArrayBuffer;
}
