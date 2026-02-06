import { Link } from "wouter";
import { Clock } from "lucide-react";
import Layout from "@/components/Layout";

interface PlaceholderProps {
  toolName: string;
  toolDescription: string;
  toolIcon: React.ReactNode;
}

export default function Placeholder({ toolName, toolDescription, toolIcon }: PlaceholderProps) {
  return (
    <Layout>
      <div className="container py-12">
        {/* Header */}
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-opacity-90 transition-colors mb-8">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
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

        {/* Coming Soon Content */}
        <div className="max-w-2xl mx-auto">
          <div className="p-12 bg-secondary rounded-lg border border-border text-center">
            <Clock className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="h2 mb-4 text-foreground">Coming Soon</h2>
            <p className="text-lg text-muted-foreground mb-8">
              This tool is currently in development. We're working hard to bring it to you soon!
            </p>

            <div className="space-y-4 text-left max-w-md mx-auto mb-8">
              <div className="p-4 bg-white rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-2">What to Expect</h3>
                <p className="text-sm text-muted-foreground">
                  This tool will provide the same fast, secure, browser-based processing as our other tools.
                </p>
              </div>

              <div className="p-4 bg-white rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-2">Your Privacy</h3>
                <p className="text-sm text-muted-foreground">
                  Like all our tools, processing will happen entirely in your browser with no server uploads.
                </p>
              </div>

              <div className="p-4 bg-white rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-2">Always Free</h3>
                <p className="text-sm text-muted-foreground">
                  When released, this tool will be completely free to use, just like all our other tools.
                </p>
              </div>
            </div>

            <Link href="/" className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-opacity-90 transition-colors">
              Explore Other Tools
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
