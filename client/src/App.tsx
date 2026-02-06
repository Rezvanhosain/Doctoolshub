import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import MergePDF from "./pages/tools/MergePDF";
import SplitPDF from "./pages/tools/SplitPDF";
import CompressPDF from "./pages/tools/CompressPDF";
import ImagesToPDF from "./pages/tools/ImagesToPDF";
import PDFToImages from "./pages/tools/PDFToImages";
import ExtractPages from "./pages/tools/ExtractPages";
import RotatePages from "./pages/tools/RotatePages";
import AddPageNumbers from "./pages/tools/AddPageNumbers";
import {
  EditPDF,
  SignPDF,
  PDFConverter,
  ExtractImages,
  ProtectPDF,
  UnlockPDF,
  RemovePages,
  RearrangePages,
  WebpageToPDF,
  PDFOCR,
  AddWatermark,
  PDFOverlay,
  ComparePDFs,
  WebOptimize,
  RedactPDF,
  CreatePDF,
} from "./pages/tools/index";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/privacy"} component={Privacy} />
      <Route path={"/terms"} component={Terms} />
      <Route path={"/tools/merge-pdf"} component={MergePDF} />
      <Route path={"/tools/split-pdf"} component={SplitPDF} />
      <Route path={"/tools/compress-pdf"} component={CompressPDF} />
      <Route path={"/tools/images-to-pdf"} component={ImagesToPDF} />
      <Route path={"/tools/pdf-to-images"} component={PDFToImages} />
      <Route path={"/tools/extract-pages"} component={ExtractPages} />
      <Route path={"/tools/rotate-pages"} component={RotatePages} />
      <Route path={"/tools/add-page-numbers"} component={AddPageNumbers} />
      <Route path={"/tools/edit-pdf"} component={EditPDF} />
      <Route path={"/tools/sign-pdf"} component={SignPDF} />
      <Route path={"/tools/pdf-converter"} component={PDFConverter} />
      <Route path={"/tools/extract-images"} component={ExtractImages} />
      <Route path={"/tools/protect-pdf"} component={ProtectPDF} />
      <Route path={"/tools/unlock-pdf"} component={UnlockPDF} />
      <Route path={"/tools/remove-pages"} component={RemovePages} />
      <Route path={"/tools/rearrange-pages"} component={RearrangePages} />
      <Route path={"/tools/webpage-to-pdf"} component={WebpageToPDF} />
      <Route path={"/tools/pdf-ocr"} component={PDFOCR} />
      <Route path={"/tools/add-watermark"} component={AddWatermark} />
      <Route path={"/tools/pdf-overlay"} component={PDFOverlay} />
      <Route path={"/tools/compare-pdfs"} component={ComparePDFs} />
      <Route path={"/tools/web-optimize"} component={WebOptimize} />
      <Route path={"/tools/redact-pdf"} component={RedactPDF} />
      <Route path={"/tools/create-pdf"} component={CreatePDF} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
