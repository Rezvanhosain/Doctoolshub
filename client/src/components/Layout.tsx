import { Link } from "wouter";
import { FileText, Github, Mail } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-white sticky top-0 z-40">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-display text-2xl font-bold text-primary hover:text-opacity-90 transition-colors">
            <FileText className="w-7 h-7" />
            DocTools Hub
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors font-medium">
              All Tools
            </Link>
            <Link href="/privacy" className="text-foreground hover:text-primary transition-colors font-medium">
              Privacy
            </Link>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary mt-16">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="font-display text-lg font-bold mb-4 text-foreground">DocTools Hub</h3>
              <p className="text-muted-foreground text-sm">
                Free, fast, and secure PDF tools for everyone.
              </p>
            </div>

            {/* Tools */}
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Popular Tools</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/tools/merge-pdf" className="text-muted-foreground hover:text-primary transition-colors">Merge PDF</Link></li>
                <li><Link href="/tools/compress-pdf" className="text-muted-foreground hover:text-primary transition-colors">Compress PDF</Link></li>
                <li><Link href="/tools/split-pdf" className="text-muted-foreground hover:text-primary transition-colors">Split PDF</Link></li>
                <li><Link href="/tools/images-to-pdf" className="text-muted-foreground hover:text-primary transition-colors">Images to PDF</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">All Tools</Link></li>
                <li><Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Use</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Contact</h4>
              <a 
                href="mailto:support@doctoolshub.com"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                Get in touch
              </a>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 DocTools Hub. All rights reserved. Made with care for document professionals.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
