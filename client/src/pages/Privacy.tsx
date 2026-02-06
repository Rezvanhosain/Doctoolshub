import Layout from "@/components/Layout";
import { Link } from "wouter";

export default function Privacy() {
  return (
    <Layout>
      <div className="container py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-opacity-90 transition-colors mb-8">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        <article className="max-w-3xl">
          <h1 className="h1 mb-2 text-foreground">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: February 2026</p>

          <div className="prose prose-sm max-w-none space-y-6 text-foreground">
            <section>
              <h2 className="h3 mb-4">Overview</h2>
              <p className="text-muted-foreground">
                DocTools Hub is committed to protecting your privacy. This Privacy Policy explains how we handle your information when you use our PDF tools.
              </p>
            </section>

            <section>
              <h2 className="h3 mb-4">How We Process Your Files</h2>
              <p className="text-muted-foreground">
                <strong>Client-Side Processing:</strong> All PDF processing happens directly in your web browser. Your files are never uploaded to our servers. When you use tools like merge, split, compress, or convert, the processing occurs entirely on your device.
              </p>
              <p className="text-muted-foreground mt-4">
                <strong>No File Storage:</strong> We do not store, access, or retain any of your PDF files or documents. Once you close your browser or refresh the page, all data is cleared from memory.
              </p>
            </section>

            <section>
              <h2 className="h3 mb-4">Data We Collect</h2>
              <p className="text-muted-foreground">
                We may collect minimal analytics data such as:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-2">
                <li>Which tools are most frequently used</li>
                <li>General usage patterns and page views</li>
                <li>Browser type and operating system information</li>
                <li>Referral sources</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                This data is collected anonymously and does not identify you personally.
              </p>
            </section>

            <section>
              <h2 className="h3 mb-4">Cookies</h2>
              <p className="text-muted-foreground">
                We use minimal cookies only for:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-2">
                <li>Session management</li>
                <li>User preferences (if applicable)</li>
                <li>Analytics tracking</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                You can disable cookies in your browser settings at any time.
              </p>
            </section>

            <section>
              <h2 className="h3 mb-4">Third-Party Services</h2>
              <p className="text-muted-foreground">
                We may use third-party services for analytics and monitoring. These services operate under their own privacy policies. We recommend reviewing their privacy statements.
              </p>
            </section>

            <section>
              <h2 className="h3 mb-4">Your Rights</h2>
              <p className="text-muted-foreground">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-2">
                <li>Access any personal data we hold about you</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of analytics tracking</li>
                <li>Contact us with privacy concerns</li>
              </ul>
            </section>

            <section>
              <h2 className="h3 mb-4">Security</h2>
              <p className="text-muted-foreground">
                We take security seriously. All data transmission uses HTTPS encryption. Since processing happens in your browser, your files are protected by your device's security measures.
              </p>
            </section>

            <section>
              <h2 className="h3 mb-4">Changes to This Policy</h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. We will notify you of significant changes by updating the "Last updated" date at the top of this page.
              </p>
            </section>

            <section>
              <h2 className="h3 mb-4">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have questions about this Privacy Policy or our privacy practices, please contact us at:
              </p>
              <p className="text-muted-foreground mt-4">
                Email: <a href="mailto:privacy@doctoolshub.com" className="text-primary hover:underline">privacy@doctoolshub.com</a>
              </p>
            </section>
          </div>
        </article>
      </div>
    </Layout>
  );
}
