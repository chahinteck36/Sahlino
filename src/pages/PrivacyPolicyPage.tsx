import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <SEOHead
        title="Privacy Policy - Sahlino"
        description="Sahlino respects your privacy. Learn how our client-side architecture keeps your images, files, and data completely on your local device."
        canonicalPath="/privacy-policy"
      />

      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-2">
          Privacy Policy
        </h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Last updated: September 2026 • Effective immediately
        </p>
      </div>

      <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs sm:text-sm text-emerald-800 dark:text-emerald-200 mb-8 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-bold">Key Takeaway: Zero Server Transmission</strong>
          Sahlino uses client-side web technologies. The JSON text you format, the images you resize or compress, and the mathematical calculations you run are executed locally in your browser sandbox. We never store, read, or send your payload data to external servers.
        </div>
      </div>

      <div className="prose dark:prose-invert max-w-none space-y-6 text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
        <section>
          <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mb-2">
            1. Information We Do Not Collect
          </h2>
          <p>
            Unlike conventional web utilities, Sahlino does not operate backend conversion APIs for processing file uploads or user inputs. When using our tools:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm">
            <li>We do not upload or store your images or files on any server.</li>
            <li>We do not inspect or record the contents of your JSON snippets or code.</li>
            <li>We do not log your calculation numbers, dates, or time zone queries.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mb-2">
            2. Information Collected Automatically
          </h2>
          <p>
            When you visit Sahlino, like any standard web application, our hosting provider may collect routine technical logs such as IP addresses, browser user-agent strings, referral URLs, and requested page paths. This non-identifiable technical data is used solely for traffic reliability, preventing denial-of-service abuse, and maintaining platform uptime.
          </p>
        </section>

        <section>
          <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mb-2">
            3. Local Browser Storage
          </h2>
          <p>
            Sahlino may utilize your browser&apos;s <code>localStorage</code> solely to save user-initiated preferences, such as your selected color theme (Light / Dark) and language choice. This data resides strictly inside your browser and is never sent to our servers.
          </p>
        </section>

        <section>
          <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mb-2">
            4. Third-Party Services & Advertising
          </h2>
          <p>
            To keep Sahlino 100% free for global users, we may display clean advertisements. Advertising partners may utilize standard cookies or web beacons according to their respective privacy standards. You can configure cookie permissions or disable ad tracking via your browser preferences.
          </p>
        </section>

        <section>
          <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mb-2">
            5. Contact Information
          </h2>
          <p>
            If you have questions regarding this Privacy Policy, please contact us via our Contact Page.
          </p>
        </section>
      </div>
    </div>
  );
};
