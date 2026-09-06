import React from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <SEOHead
        title="Terms of Service - Sahlino"
        description="Terms of service and usage conditions for Sahlino's free browser-based online tools."
        canonicalPath="/terms"
      />

      <Breadcrumbs items={[{ label: 'Terms of Service' }]} />

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-2">
          Terms of Service
        </h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Last updated: September 2026
        </p>
      </div>

      <div className="space-y-6 text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
        <section>
          <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mb-2">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using Sahlino (the &quot;Service&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the website.
          </p>
        </section>

        <section>
          <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mb-2">
            2. Permitted Use
          </h2>
          <p>
            Sahlino provides browser-based utilities for personal, educational, and commercial purposes. You agree not to misuse the Service, attempt unauthorized access, interfere with site availability, or transmit malicious code or scripts.
          </p>
        </section>

        <section>
          <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mb-2">
            3. Disclaimer of Warranties
          </h2>
          <p>
            The Service and all tools are provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind, whether express or implied. While we strive for rigorous precision in all calculations and data conversions, you are encouraged to verify critical results independently.
          </p>
        </section>

        <section>
          <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mb-2">
            4. Limitation of Liability
          </h2>
          <p>
            In no event shall Sahlino or its maintainers be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use of or inability to use the tools.
          </p>
        </section>

        <section>
          <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mb-2">
            5. Modifications to the Service
          </h2>
          <p>
            We reserve the right to modify, update, or discontinue tools or features at any time without prior notice.
          </p>
        </section>
      </div>
    </div>
  );
};
