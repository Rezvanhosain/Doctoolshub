import * as pdfjsLib from "pdfjs-dist";

// Initialize PDF.js worker with correct path
let workerInitialized = false;

function initializeWorker() {
  if (workerInitialized) return;

  try {
    // Use the worker from node_modules with absolute path
    pdfjsLib.GlobalWorkerOptions.workerSrc = `/node_modules/pdfjs-dist/build/pdf.worker.min.js`;
    workerInitialized = true;
  } catch (error) {
    console.warn("Failed to set PDF.js worker:", error);
  }
}

/**
 * Generate thumbnail for first page of PDF
 */
export async function generatePDFThumbnail(file: File): Promise<string> {
  try {
    initializeWorker();
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const page = await pdf.getPage(1);

    // Set scale for thumbnail
    const scale = 1.5;
    const viewport = page.getViewport({ scale });

    // Create canvas
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Failed to get canvas context");
    }

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    // Render page to canvas
    await page.render({
      canvasContext: context,
      viewport: viewport,
      canvas: canvas,
    } as any).promise;

    // Convert to data URL
    return canvas.toDataURL("image/png");
  } catch (error) {
    console.error("Error generating thumbnail:", error);
    // Return a placeholder if thumbnail generation fails
    return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='160'%3E%3Crect fill='%23f0f0f0' width='120' height='160'/%3E%3Ctext x='50%25' y='50%25' font-size='12' text-anchor='middle' dominant-baseline='middle' fill='%23999'%3EPDF%3C/text%3E%3C/svg%3E";
  }
}

/**
 * Generate thumbnails for multiple PDF files
 */
export async function generatePDFThumbnails(
  files: File[]
): Promise<{ file: File; thumbnail: string }[]> {
  const results = await Promise.all(
    files.map(async (file) => ({
      file,
      thumbnail: await generatePDFThumbnail(file),
    }))
  );
  return results;
}
