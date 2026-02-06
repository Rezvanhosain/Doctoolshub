# DocTools Hub - Reference Site Research

## PDF24 UX Patterns & Architecture

### Homepage Layout
- **Grid-based tool cards**: 6 columns on desktop, responsive to mobile
- **Tool cards**: Each card has icon, title, star/favorite toggle, and descriptive text
- **Search functionality**: Prominent search bar to filter tools instantly
- **"All tools" button**: Central CTA to view full tool list
- **Information section**: Below tools with key benefits (Free, Online, No limits, Secure, etc.)

### Tool Detail Page Flow
1. **Upload Step**: Drag-and-drop area with "Choose files" button
   - Accepts multiple files
   - Shows file protection status
   - Links to terms of use
   - Import from cloud storage (Google Drive, Dropbox)
   
2. **Configuration Step**: Tool-specific options panel
   - Varies by tool (merge shows page selection, compress shows quality settings, etc.)
   - Clear labeling and explanations
   
3. **Processing Step**: Progress indicator with cancel option
   - Real-time feedback
   
4. **Download Step**: Result download with "Start over" option

### Navigation & Structure
- **Header**: Logo, "All tools" link, theme toggle, desktop app link
- **Breadcrumbs/Back**: Easy navigation back to tools hub
- **Footer**: About, FAQ, Help, Contact, Legal links
- **Sidebar**: Optional tool selector for quick navigation

### Key UX Patterns
- **Ratings display**: Shows user ratings (e.g., "4.9 (23,403 votes)")
- **Information sections**: Collapsible sections with How it works, Q&A, testimonials
- **Status badges**: "Free", "Online", "No limits", "Secure" displayed prominently
- **Clear CTAs**: Orange/warm-colored primary buttons
- **Error handling**: Clear validation messages and file size warnings

## Tools List (from reference site)

### Core Tools (8 required to implement)
1. Merge PDF
2. Split PDF
3. Compress PDF
4. Images to PDF (JPG/PNG → PDF)
5. PDF to images
6. Extract PDF pages
7. Rotate PDF pages
8. Add page numbers

### Additional Tools (to create as placeholders)
- Edit PDF
- Sign PDF
- PDF Converter
- Extract PDF images
- Protect PDF
- Unlock PDF
- Remove PDF pages
- Rearrange PDF pages
- Webpage to PDF
- PDF OCR
- Add watermark
- PDF Overlay
- Compare PDFs
- Web optimize PDF
- Redact PDF
- Create PDF

## Design Observations
- **Color scheme**: Warm orange/yellow for primary CTAs, green accents for active states, neutral grays
- **Typography**: Clean, modern sans-serif
- **Icons**: Simple, line-based icons for each tool
- **Spacing**: Generous padding and margins for breathing room
- **Cards**: Subtle borders/shadows, hover effects
- **Responsive**: Mobile-first design with clear breakpoints

## Technical Insights
- **Client-side processing**: Files appear to be processed on user's browser for basic operations
- **Server fallback**: Some complex operations may use server processing
- **File handling**: Clear messaging about file deletion after processing
- **No installation**: Entirely browser-based, no downloads required
