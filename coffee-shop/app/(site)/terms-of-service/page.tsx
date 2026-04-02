import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Read the terms of service for using the Bloom Coffee website.',
}

export default function TermsOfServicePage() {
  const lastUpdated = 'January 1, 2025'

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-4xl text-text-dark mb-4">Terms of Service</h1>
        <p className="text-text-dark/60 font-body text-sm mb-10">Last updated: {lastUpdated}</p>

        <div className="prose prose-sm max-w-none font-body text-text-dark/80 space-y-8">
          <section>
            <h2 className="font-heading text-2xl text-text-dark mb-3">1. Acceptance of Terms</h2>
            <p className="leading-relaxed">
              By accessing and using the Bloom Coffee website (&quot;Site&quot;), you accept and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our Site.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-text-dark mb-3">2. Use of the Site</h2>
            <p className="leading-relaxed mb-3">You agree to use this Site only for lawful purposes. You must not:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the Site in any way that violates applicable laws or regulations.</li>
              <li>Transmit any unsolicited or unauthorized advertising or promotional material.</li>
              <li>Attempt to gain unauthorized access to any part of the Site.</li>
              <li>Engage in any conduct that restricts or inhibits anyone&apos;s use of the Site.</li>
              <li>Use the Site to transmit any harmful, offensive, or disruptive content.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-text-dark mb-3">3. Intellectual Property</h2>
            <p className="leading-relaxed">
              All content on this Site, including but not limited to text, graphics, logos, images, and software, is the property of Bloom Coffee or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-text-dark mb-3">4. Disclaimer of Warranties</h2>
            <p className="leading-relaxed">
              This Site is provided &quot;as is&quot; and &quot;as available&quot; without any representations or warranties, express or implied. Bloom Coffee makes no representations or warranties in relation to this Site or the information and materials provided on this Site.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-text-dark mb-3">5. Limitation of Liability</h2>
            <p className="leading-relaxed">
              To the fullest extent permitted by law, Bloom Coffee shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, this Site or its content.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-text-dark mb-3">6. Menu and Pricing</h2>
            <p className="leading-relaxed">
              Menu items, descriptions, and prices displayed on this Site are for informational purposes only and may not reflect current in-store availability or pricing. Bloom Coffee reserves the right to change menu items and prices without notice.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-text-dark mb-3">7. Allergen Information</h2>
            <p className="leading-relaxed">
              Allergen information provided on this Site is intended as a guide only. Our products are prepared in an environment that may handle common allergens. If you have a severe food allergy, please speak directly with our staff before ordering.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-text-dark mb-3">8. Third-Party Links</h2>
            <p className="leading-relaxed">
              This Site may contain links to third-party websites. These links are provided for your convenience only. We have no control over the content of those sites and accept no responsibility for them or for any loss or damage that may arise from your use of them.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-text-dark mb-3">9. Modifications</h2>
            <p className="leading-relaxed">
              Bloom Coffee reserves the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to the Site. Your continued use of the Site after any changes constitutes your acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-text-dark mb-3">10. Governing Law</h2>
            <p className="leading-relaxed">
              These Terms of Service shall be governed by and construed in accordance with the laws of Thailand. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Thailand.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-text-dark mb-3">11. Contact Us</h2>
            <p className="leading-relaxed">
              If you have any questions about these Terms of Service, please contact us through the contact form on our website or visit us in person.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
