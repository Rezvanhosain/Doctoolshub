# DocTools Hub - Free Online PDF Tools

A production-ready, browser-based PDF tools hub with original design and branding. All processing happens locally in your browser for maximum privacy and security.

## Project Overview

DocTools Hub provides a collection of free, easy-to-use PDF manipulation tools. The application follows the UX patterns of leading PDF tools platforms while maintaining a distinct visual identity and original implementation.

**Live Demo:** [Available at deployment URL]

## Features

### Fully Implemented Tools (8)

1. **Merge PDF** - Combine multiple PDF files into a single document
2. **Split PDF** - Divide a PDF into separate files (one page per file)
3. **Compress PDF** - Reduce PDF file size while maintaining quality
4. **Images to PDF** - Convert JPG, PNG, GIF, and BMP images to PDF
5. **PDF to Images** - Extract PDF pages as individual PNG images
6. **Extract Pages** - Select and extract specific pages from a PDF
7. **Rotate Pages** - Rotate PDF pages 90°, 180°, or 270°
8. **Add Page Numbers** - Automatically add page numbers to PDF pages

### Coming Soon (16 Placeholder Tools)

- Edit PDF, Sign PDF, PDF Converter, Extract Images
- Protect PDF, Unlock PDF, Remove Pages, Rearrange Pages
- Webpage to PDF, PDF OCR, Add Watermark, PDF Overlay
- Compare PDFs, Web Optimize, Redact PDF, Create PDF

## Technology Stack

### Frontend
- **Framework:** React 19 with TypeScript
- **Routing:** Wouter (lightweight client-side router)
- **Styling:** Tailwind CSS 4 + shadcn/ui components
- **PDF Processing:** pdf-lib (client-side PDF manipulation)
- **PDF Rendering:** PDF.js (page-to-image conversion)
- **Icons:** Lucide React (open-source icon library)
- **Build Tool:** Vite

### Development
- **Package Manager:** pnpm
- **TypeScript:** 5.6.3
- **Linting:** ESLint (via template)
- **Formatting:** Prettier

## Architecture

### File Structure

```
client/
├── src/
│   ├── pages/
│   │   ├── Home.tsx              # Tools hub with search & filtering
│   │   ├── Privacy.tsx           # Privacy policy page
│   │   ├── Terms.tsx             # Terms of service page
│   │   ├── NotFound.tsx          # 404 error page
│   │   └── tools/
│   │       ├── MergePDF.tsx      # Merge tool implementation
│   │       ├── SplitPDF.tsx      # Split tool implementation
│   │       ├── CompressPDF.tsx   # Compress tool implementation
│   │       ├── ImagesToPDF.tsx   # Images to PDF implementation
│   │       ├── PDFToImages.tsx   # PDF to images implementation
│   │       ├── ExtractPages.tsx  # Extract pages implementation
│   │       ├── RotatePages.tsx   # Rotate pages implementation
│   │       ├── AddPageNumbers.tsx # Add page numbers implementation
│   │       ├── Placeholder.tsx   # Coming soon template
│   │       └── index.tsx         # Placeholder tool exports
│   ├── components/
│   │   ├── Layout.tsx            # Main layout with header/footer
│   │   ├── ToolCard.tsx          # Tool grid card component
│   │   ├── ToolTemplate.tsx      # Reusable tool page template
│   │   ├── FileUpload.tsx        # Drag-and-drop file upload
│   │   └── ProcessingProgress.tsx # Progress indicator
│   ├── lib/
│   │   └── pdf-utils.ts          # PDF processing utilities
│   ├── App.tsx                   # Route configuration
│   ├── main.tsx                  # React entry point
│   └── index.css                 # Global styles & design tokens
├── public/                       # Static assets
└── index.html                    # HTML template

shared/
└── const.ts                      # Shared constants (tools, categories)

server/
└── index.ts                      # Express server (static hosting)
```

### Design System

**Colors:**
- Primary: Teal (#0891b2) - Main CTAs and highlights
- Background: White (#ffffff) - Clean, professional
- Text: Deep Slate (#0f172a) - High contrast
- Accents: Cyan (#06b6d4) - Secondary actions

**Typography:**
- Display: Geist (bold) - Headings
- Body: Inter (regular) - Content and UI

**Components:**
- Cards with hover effects and smooth transitions
- Responsive grid layout (1 col mobile, 2 col tablet, 3 col desktop)
- Consistent button styles (primary, secondary, ghost)
- Professional footer with navigation links

## Processing Architecture

### Client-Side Processing

All PDF operations are performed entirely in the browser using:

1. **pdf-lib** - For PDF creation, modification, and manipulation
   - Merge PDFs
   - Split PDFs
   - Extract pages
   - Rotate pages
   - Add page numbers
   - Compress PDFs (basic)

2. **PDF.js** - For PDF rendering and page extraction
   - PDF to images conversion
   - Page rendering to canvas
   - Image export

3. **Native File APIs**
   - File upload handling
   - Blob creation and download
   - ArrayBuffer processing

### Privacy & Security

- **No Server Upload:** Files never leave your device
- **No Storage:** Files are not stored or cached
- **HTTPS Only:** All data transmission is encrypted
- **Session Isolation:** Each session is independent
- **No Tracking:** Minimal analytics, no personal data collection

## Getting Started

### Prerequisites

- Node.js 18+ (with pnpm package manager)
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Development

The development server runs on `http://localhost:3000` with hot module reloading.

```bash
# Format code
pnpm format

# Type check
pnpm check
```

## Usage

### Using Implemented Tools

1. **Navigate** to the tool from the home page
2. **Upload** your file(s) using drag-and-drop or file picker
3. **Configure** options if applicable
4. **Process** the file(s)
5. **Download** the result

### Example: Merge PDFs

```typescript
import { mergePDFs, downloadFile } from "@/lib/pdf-utils";

const files = [file1, file2, file3]; // File[] array
const merged = await mergePDFs(files);
downloadFile(merged, "merged.pdf");
```

### Example: Convert Images to PDF

```typescript
import { imagesToPDF, downloadFile } from "@/lib/pdf-utils";

const imageFiles = [image1, image2]; // File[] array
const pdf = await imagesToPDF(imageFiles);
downloadFile(pdf, "images.pdf");
```

## Limitations & Known Issues

### Browser Limitations

1. **File Size:** Large files (>100MB) may cause browser memory issues
2. **PDF Complexity:** Complex PDFs with advanced features may not process correctly
3. **Image Quality:** PDF to images conversion quality depends on browser rendering

### Tool Limitations

1. **Compression:** Basic compression only - for advanced compression, use server-side processing
2. **OCR:** Not implemented (requires server-side processing)
3. **Password Protection:** Not implemented (requires encryption libraries)
4. **Advanced Editing:** Text editing not supported (requires PDF rendering engine)

### Workarounds

For production use with large files or advanced features:
- Implement server-side processing for heavy operations
- Add file size warnings and limits
- Provide fallback options for unsupported features
- Consider using specialized PDF libraries (PDFKit, iText, etc.)

## Deployment

### Quick Start

The application is production-ready with pre-configured deployment files for multiple platforms:

- **Vercel**: Uses `vercel.json` (recommended for quickest deployment)
- **Netlify**: Uses `netlify.toml` (great for static hosting)
- **Docker**: Uses `Dockerfile` (for containerized deployment)

See `deployment_walkthrough.md` in the project artifacts for detailed step-by-step instructions.

### Static Hosting

The application is optimized for static hosting platforms:

- **Vercel**: `pnpm build` → Auto-deploy via GitHub integration
- **Netlify**: Connect GitHub repo, auto-reads `netlify.toml`
- **GitHub Pages**: Upload `dist/public/` to gh-pages branch
- **AWS S3 + CloudFront**: Upload `dist/public/` to S3 bucket
- **Docker**: `docker build -t doctoolshub .` → Deploy to any container platform

### Environment Variables

**For basic deployment (PDF tools only): No environment variables required.**

The application works entirely client-side. For advanced features (user accounts, cloud storage), see `.env.example`:

```bash
# Copy example file
cp .env.example .env

# Configure optional variables:
# - DATABASE_URL: For user management (optional)
# - JWT_SECRET: For authentication (optional)
# - AWS_*: For cloud storage (optional)
```

For analytics or monitoring:
- Add your analytics provider script to `client/index.html`
- Configure in `vite.config.ts` if needed

## Performance Optimization

### Current Optimizations

- Code splitting via Vite
- Lazy loading of tool pages
- Efficient PDF.js worker setup
- Optimized image rendering
- Minimal dependencies

### Future Optimizations

- Service Worker for offline support
- Web Workers for heavy processing
- IndexedDB for temporary file storage
- Streaming downloads for large files

## Testing

### Manual Testing Checklist

- [ ] Home page loads with all tools visible
- [ ] Search functionality filters tools correctly
- [ ] Category filters work as expected
- [ ] Each tool page loads without errors
- [ ] File upload works with drag-and-drop
- [ ] File upload works with file picker
- [ ] Processing completes successfully
- [ ] Download functionality works
- [ ] Privacy policy page is accessible
- [ ] Terms page is accessible
- [ ] 404 page displays for invalid routes
- [ ] Responsive design works on mobile
- [ ] All links navigate correctly

### Automated Testing

```bash
# Run type checking
pnpm check

# Run linting (if configured)
pnpm lint
```

## Browser Support

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

To add new tools or features:

1. Create a new tool page in `client/src/pages/tools/`
2. Implement PDF processing utilities in `client/src/lib/pdf-utils.ts`
3. Add tool metadata to `shared/const.ts`
4. Add route to `client/src/App.tsx`
5. Test thoroughly before deployment

## Assumptions

- Users have modern browsers with JavaScript enabled
- Users have sufficient disk space for file downloads
- Users understand PDF format limitations
- File sizes are typically under 100MB
- Users accept browser-based processing limitations

## Future Roadmap

### Phase 2: Advanced Features
- [ ] Batch processing for multiple files
- [ ] Preset configurations for common tasks
- [ ] File history/undo functionality
- [ ] Cloud storage integration (Google Drive, Dropbox)

### Phase 3: Server-Side Processing
- [ ] Advanced compression (server-side)
- [ ] OCR functionality
- [ ] Password protection
- [ ] Advanced PDF editing

### Phase 4: Community & Monetization
- [ ] User accounts and saved presets
- [ ] Premium features
- [ ] API for third-party integration
- [ ] Browser extensions

## License

MIT License - See LICENSE file for details

## Support

For issues, feature requests, or questions:
- Email: support@doctoolshub.com
- GitHub Issues: [Project repository]
- Documentation: [Help center]

## Credits

- Built with React, Tailwind CSS, and open-source libraries
- Icons from Lucide React
- PDF processing via pdf-lib and PDF.js
- Design inspired by leading PDF tools platforms

---

**Last Updated:** February 2026  
**Version:** 1.0.0  
**Status:** Production Ready
