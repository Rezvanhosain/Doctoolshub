import Layout from "@/components/Layout";
import { Link } from "wouter";

export default function Terms() {
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
          <h1 className="h1 mb-2 text-foreground">Terms of Use</h1>
          <p className="text-muted-foreground mb-8">Last updated: February 2026</p>

          <div className="prose prose-sm max-w-none space-y-6 text-foreground">
            <section>
              <h2 className="h3 mb-4">Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By using DocTools Hub, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="h3 mb-4">Use License</h2>
              <p className="text-muted-foreground">
                We grant you a limited, non-exclusive, non-transferable license to use DocTools Hub for personal, non-commercial purposes. You may not:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>Attempt to decompile or reverse engineer the software</li>
                <li>Remove any copyright or proprietary notations</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </section>

            <section>
              <h2 className="h3 mb-4">Disclaimer</h2>
              <p className="text-muted-foreground">
                The materials on DocTools Hub are provided on an 'as is' basis. DocTools Hub makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="h3 mb-4">Limitations</h2>
              <p className="text-muted-foreground">
                In no event shall DocTools Hub or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on DocTools Hub, even if we or an authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className="h3 mb-4">Accuracy of Materials</h2>
              <p className="text-muted-foreground">
                The materials appearing on DocTools Hub could include technical, typographical, or photographic errors. DocTools Hub does not warrant that any of the materials on its website are accurate, complete, or current. DocTools Hub may make changes to the materials contained on its website at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="h3 mb-4">Links</h2>
              <p className="text-muted-foreground">
                DocTools Hub has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by DocTools Hub of the site. Use of any such linked website is at the user's own risk.
              </p>
            </section>

            <section>
              <h2 className="h3 mb-4">Modifications</h2>
              <p className="text-muted-foreground">
                DocTools Hub may revise these terms of use for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of use.
              </p>
            </section>

            <section>
              <h2 className="h3 mb-4">Governing Law</h2>
              <p className="text-muted-foreground">
                These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which DocTools Hub operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>

            <section>
              <h2 className="h3 mb-4">User Responsibilities</h2>
              <p className="text-muted-foreground">
                You are responsible for:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-2">
                <li>Maintaining the confidentiality of your account information</li>
                <li>All activities that occur under your account</li>
                <li>Ensuring that your use complies with all applicable laws</li>
                <li>Not uploading or processing illegal content</li>
              </ul>
            </section>

            <section>
              <h2 className="h3 mb-4">Prohibited Uses</h2>
              <p className="text-muted-foreground">
                You may not use DocTools Hub to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-2">
                <li>Process copyrighted material without permission</li>
                <li>Process illegal or harmful content</li>
                <li>Violate anyone's privacy or intellectual property rights</li>
                <li>Interfere with or disrupt the service</li>
                <li>Attempt to gain unauthorized access to the system</li>
              </ul>
            </section>

            <section>
              <h2 className="h3 mb-4">Contact Information</h2>
              <p className="text-muted-foreground">
                If you have any questions about these Terms of Use, please contact us at:
              </p>
              <p className="text-muted-foreground mt-4">
                Email: <a href="mailto:legal@doctoolshub.com" className="text-primary hover:underline">legal@doctoolshub.com</a>
              </p>
            </section>
          </div>
        </article>
      </div>
    </Layout>
  );
}
