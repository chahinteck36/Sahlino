import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQItem } from '../../types';

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  faqs: FAQItem[];
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  title = 'Frequently Asked Questions',
  subtitle = 'Find answers to common questions about this tool, accuracy, and in-browser processing.',
  faqs,
}) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

  const toggleIndex = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="my-14 pt-8 border-t border-slate-200 dark:border-slate-800" aria-label="FAQ">
      <div className="flex items-center gap-2 mb-2">
        <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{title}</h2>
      </div>
      {subtitle && (
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-6">{subtitle}</p>
      )}

      <div className="space-y-3.5" itemScope itemType="https://schema.org/FAQPage">
        {faqs.map((faq, index) => {
          const isOpen = openIndexes.includes(index);
          return (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-slate-900/50 overflow-hidden transition-colors shadow-2xs"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <button
                onClick={() => toggleIndex(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                aria-expanded={isOpen}
              >
                <span itemProp="name">{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-indigo-600 dark:text-indigo-400' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div
                  className="px-6 pb-5 pt-1 text-sm font-normal text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60"
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <div itemProp="text">{faq.answer}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
