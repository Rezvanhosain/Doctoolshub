import Layout from "@/components/Layout";
import { Link } from "wouter";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <Layout>
      <div className="container py-24 flex flex-col items-center justify-center min-h-[60vh]">
        <AlertCircle className="w-16 h-16 text-destructive mb-6" />
        <h1 className="h1 mb-4 text-foreground">Page Not Found</h1>
        <p className="text-lg text-muted-foreground mb-8 text-center max-w-md">
          Sorry, the page you're looking for doesn't exist. It may have been moved or deleted.
        </p>
        <Link href="/" className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-opacity-90 transition-colors inline-block">
          Back to Home
        </Link>
      </div>
    </Layout>
  );
}
