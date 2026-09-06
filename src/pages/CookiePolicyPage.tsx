import React from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const CookiePolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <SEOHead
        title="Cookie Policy - Sahlino"
        description="Learn about how Sahlino uses cookies and local browser storage to provide theme and language settings."
        canonicalPath="/cookie-policy"
      />

      <Breadcrumbs items={[{ label: 'Cookie Policy' }]} />

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-2">
          Cookie Policy
        </h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Last updated: September 2026
        </p>
      </div>

      <div className="space-y-6 text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
        <section>
          <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mb-2">
            1. What Are Cookies?
          </h2>
          <p>
            Cookies are small text files stored on your computer or mobile device when you visit a website. They help websites remember your device and preferences.
          </p>
        </section>

        <section>
          <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mb-2">
            2. How Sahlino Uses Cookies & Local Storage
          </h2>
          <p>
            Sahlino operates with minimal data persistence. We primarily use browser <code>localStorage</code> rather than intrusive tracking cookies to:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm">
            <li>Remember your selected interface theme (Light or Dark mode).</li>
            <li>Remember your preferred language setting.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mb-2">
            3. Third-Party Analytics & Advertising
          </h2>
          <p>
            Third-party services that deliver advertisements or perform basic traffic measurement may use cookies to serve ads based on prior visits or general geographic signals. Sahlino does not control these third-party cookies directly.
          </p>
        </section>

        <section>
          <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mb-2">
            4. Managing Your Cookies
          </h2>
          <p>
            Most modern web browsers allow you to manage or delete cookies and local storage through browser settings. Disabling cookies will not prevent you from using Sahlino&apos;s calculators or tools.
          </p>
        </section>
      </div>
    </div>
  );
};
