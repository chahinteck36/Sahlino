import React from 'react';
import { getToolGuide } from '../../data/toolGuides';
import { useLanguage } from '../../context/LanguageContext';
import { HelpCircle, CheckCircle2, Lightbulb, AlertTriangle, BookOpen, Cpu } from 'lucide-react';

interface ToolGuideSectionProps {
  toolSlug: string;
}

export const ToolGuideSection: React.FC<ToolGuideSectionProps> = ({ toolSlug }) => {
  const { language, isRTL } = useLanguage();
  const isAr = language === 'ar';
  const isRtl = isRTL;

  const guide = getToolGuide(toolSlug);

  if (!guide) return null;

  return (
    <section className="my-10 space-y-8" aria-label={isAr ? 'دليل استخدام وشرح الأداة' : 'Tool Guide and Educational Instructions'}>
      {/* 1. How to Use Steps */}
      {guide.steps && guide.steps.length > 0 && (
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {isAr ? guide.howToUseTitleAr || 'طريقة الاستخدام' : guide.howToUseTitle || 'How to Use'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {guide.steps.map((st) => (
              <div
                key={st.step}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/60 relative"
              >
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-xl bg-emerald-600 text-white font-black text-xs mb-3 shadow-xs">
                  {st.step}
                </span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1.5">
                  {isAr ? st.titleAr : st.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {isAr ? st.descAr : st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. How it Works */}
      {guide.howItWorksText && (
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40">
          <div className="flex items-center gap-2 mb-3">
            <Cpu className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {isAr ? guide.howItWorksTitleAr || 'كيف تعمل الأداة وطريقة المعالجة' : guide.howItWorksTitle || 'How it Works & Technical Details'}
            </h2>
          </div>

          <p className="text-sm sm:text-base font-medium text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
            {isAr ? guide.howItWorksTextAr : guide.howItWorksText}
          </p>

          {guide.howItWorksHighlights && guide.howItWorksHighlights.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {guide.howItWorksHighlights.map((hl, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40"
                >
                  <h3 className="font-bold text-sm text-emerald-950 dark:text-emerald-200 mb-1">
                    {isAr ? hl.titleAr : hl.title}
                  </h3>
                  <p className="text-xs text-emerald-800 dark:text-emerald-300/80 leading-relaxed">
                    {isAr ? hl.descAr : hl.desc}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 3. Real-World Examples */}
      {guide.examples && guide.examples.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-amber-500 shrink-0" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {isAr ? guide.examplesTitleAr || 'أمثلة عملية وحالات استخدام حقيقية' : guide.examplesTitle || 'Practical Real-World Examples'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guide.examples.map((ex, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-3"
              >
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {isAr ? ex.titleAr : ex.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  {isAr ? ex.scenarioAr : ex.scenario}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800 font-mono text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300">
                    <span className="font-sans font-bold text-slate-500 block text-[10px] uppercase">
                      {isAr ? 'المدخلات (Input):' : 'Input:'}
                    </span>
                    {isAr ? ex.inputAr : ex.input}
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 border border-emerald-100 dark:border-emerald-800/50">
                    <span className="font-sans font-bold text-emerald-600 dark:text-emerald-400 block text-[10px] uppercase">
                      {isAr ? 'النتيجة (Output):' : 'Output:'}
                    </span>
                    {isAr ? ex.outputAr : ex.output}
                  </div>
                </div>

                {ex.explanation && (
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans pt-1">
                    {isAr ? ex.explanationAr : ex.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Important Notes */}
      {guide.importantNotes && guide.importantNotes.length > 0 && (
        <div className="p-5 sm:p-6 rounded-3xl border border-amber-200/80 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <h3 className="font-bold text-sm sm:text-base text-amber-950 dark:text-amber-200">
              {isAr ? guide.importantNotesTitleAr || 'ملاحظات وتنبيهات هامة' : guide.importantNotesTitle || 'Important Notes & Tips'}
            </h3>
          </div>
          <div className="space-y-2">
            {guide.importantNotes.map((note, idx) => (
              <div key={idx} className="text-xs sm:text-sm text-amber-900 dark:text-amber-300 leading-relaxed">
                <strong>{isAr ? note.titleAr : note.title}: </strong>
                <span>{isAr ? note.descAr : note.desc}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
