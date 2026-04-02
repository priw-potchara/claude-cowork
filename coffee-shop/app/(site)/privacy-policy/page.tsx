import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Our privacy policy explains how Bloom Coffee collects, uses, and protects your information.',
}

export default function PrivacyPolicyPage() {
  const lastUpdated = 'January 1, 2025'

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-4xl text-text-dark mb-4">Privacy Policy</h1>
        <p className="text-text-dark/60 font-body text-sm mb-10">Last updated: {lastUpdated}</p>

        <div className="prose prose-sm max-w-none font-body text-text-dark/80 space-y-8">
          <section>
            <h2 className="font-heading text-2xl text-text-dark mb-3">1. Introduction</h2>
            <p className="leading-relaxed">
              Welcome to Bloom Coffee (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or contact us.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-text-dark mb-3">2. Information We Collect</h2>
            <p className="leading-relaxed mb-3">We may collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Personal Information:</strong> Name, email address, and phone number when you submit our contact form.</li>
              <li><strong>Usage Data:</strong> Information about how you interact with our website, including pages visited, time spent, and links clicked.</li>
              <li><strong>Device Information:</strong> Browser type, operating system, and IP address collected automatically when you visit our site.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-text-dark mb-3">3. How We Use Your Information</h2>
            <p className="leading-relaxed mb-3">We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Respond to your inquiries and contact form submissions.</li>
              <li>Improve our website and services.</li>
              <li>Analyze usage patterns to enhance user experience.</li>
              <li>Comply with legal obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-text-dark mb-3">4. Cookies</h2>
            <p className="leading-relaxed">
              We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are small data files stored on your device. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, some parts of our site may not function properly.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-text-dark mb-3">5. Third-Party Services</h2>
            <p className="leading-relaxed">
              We may use third-party services such as Google Analytics to monitor and analyze web traffic. These third parties have their own privacy policies and may use cookies. We encourage you to review the privacy policies of any third-party services we use.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-text-dark mb-3">6. Data Security</h2>
            <p className="leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-text-dark mb-3">7. Your Rights</h2>
            <p className="leading-relaxed mb-3">Depending on your location, you may have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access the personal information we hold about you.</li>
              <li>Request correction of inaccurate information.</li>
              <li>Request deletion of your personal information.</li>
              <li>Object to processing of your personal information.</li>
              <li>Data portability.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-text-dark mb-3">8. Children&apos;s Privacy</h2>
            <p className="leading-relaxed">
              Our website is not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-text-dark mb-3">9. Changes to This Policy</h2>
            <p className="leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. We encourage you to review this policy periodically.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-text-dark mb-3">10. Contact Us</h2>
            <p className="leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at our shop or through our contact form on the website.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
