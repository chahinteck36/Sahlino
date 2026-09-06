import React, { useState, useMemo } from 'react';
import {
  CalendarDays,
  Calendar,
  RotateCcw,
  Plus,
  Trash2,
  Check,
  Sparkles,
  Info,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { SEOHead } from '../common/SEOHead';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { AdPlaceholder } from '../common/AdPlaceholder';
import { FAQSection } from '../common/FAQSection';
import { RelatedTools } from '../common/RelatedTools';
import { getToolBySlug } from '../../data/tools';
import { useLanguage } from '../../context/LanguageContext';

interface BusinessDaysCalculatorToolProps {
  onNavigate: (path: string) => void;
}

type WeekendScheme = 'sat_sun' | 'fri_sat' | 'sun_only' | 'custom';

interface HolidayItem {
  id: string;
  name: string;
  date: string; // YYYY-MM-DD
}

const DEFAULT_HOLIDAYS: HolidayItem[] = [
  { id: '1', name: "New Year's Day", date: '2026-01-01' },
  { id: '2', name: 'International Workers Day', date: '2026-05-01' },
  { id: '3', name: 'Christmas Day', date: '2026-12-25' },
];

export const BusinessDaysCalculatorTool: React.FC<BusinessDaysCalculatorToolProps> = ({ onNavigate }) => {
  const { t, getToolName, getToolDesc, getCategoryName } = useLanguage();
  const toolData = getToolBySlug('business-days-calculator')!;

  const getTodayDate = () => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  };

  const getFutureDate = (daysAhead: number) => {
    const d = new Date();
    d.setDate(d.getDate() + daysAhead);
    return d.toISOString().split('T')[0];
  };

  // State
  const [calculationMode, setCalculationMode] = useState<'between' | 'add_days'>('between');
  const [startDate, setStartDate] = useState<string>(getTodayDate());
  const [endDate, setEndDate] = useState<string>(getFutureDate(30));
  const [daysToAdd, setDaysToAdd] = useState<number>(15);
  const [isAddition, setIsAddition] = useState<boolean>(true); // true = add, false = subtract

  // Weekend customization
  const [weekendScheme, setWeekendScheme] = useState<WeekendScheme>('sat_sun');
  // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const [customWeekendDays, setCustomWeekendDays] = useState<number[]>([0, 6]);

  // Holidays
  const [holidays, setHolidays] = useState<HolidayItem[]>(DEFAULT_HOLIDAYS);
  const [newHolidayName, setNewHolidayName] = useState<string>('');
  const [newHolidayDate, setNewHolidayDate] = useState<string>('');

  // Determine which day numbers are excluded as weekends
  const excludedWeekendNumbers = useMemo(() => {
    switch (weekendScheme) {
      case 'sat_sun':
        return [0, 6];
      case 'fri_sat':
        return [5, 6];
      case 'sun_only':
        return [0];
      case 'custom':
        return customWeekendDays;
      default:
        return [0, 6];
    }
  }, [weekendScheme, customWeekendDays]);

  // Calculation for "Between Two Dates"
  const betweenStats = useMemo(() => {
    if (!startDate || !endDate) return null;

    let start = new Date(`${startDate}T00:00:00`);
    let end = new Date(`${endDate}T00:00:00`);

    const isReversed = start > end;
    if (isReversed) {
      const temp = start;
      start = end;
      end = temp;
    }

    const holidaySet = new Set(holidays.map((h) => h.date));

    let workingDays = 0;
    let weekendDays = 0;
    let holidaysExcluded = 0;
    let calendarDays = 0;

    const current = new Date(start);

    // Count day by day inclusive
    while (current <= end) {
      calendarDays++;
      const dayOfWeek = current.getDay(); // 0-6
      const dateString = current.toISOString().split('T')[0];

      if (excludedWeekendNumbers.includes(dayOfWeek)) {
        weekendDays++;
      } else if (holidaySet.has(dateString)) {
        holidaysExcluded++;
      } else {
        workingDays++;
      }

      current.setDate(current.getDate() + 1);
    }

    return {
      workingDays,
      calendarDays,
      weekendDays,
      holidaysExcluded,
      isReversed,
    };
  }, [startDate, endDate, excludedWeekendNumbers, holidays]);

  // Calculation for "Add/Subtract Business Days"
  const addDaysStats = useMemo(() => {
    if (!startDate || daysToAdd <= 0) return null;

    const current = new Date(`${startDate}T00:00:00`);
    const holidaySet = new Set(holidays.map((h) => h.date));
    let needed = daysToAdd;
    let weekendDays = 0;
    let holidaysExcluded = 0;
    let calendarDays = 0;

    const step = isAddition ? 1 : -1;

    while (needed > 0) {
      current.setDate(current.getDate() + step);
      calendarDays++;

      const dayOfWeek = current.getDay();
      const dateString = current.toISOString().split('T')[0];

      if (excludedWeekendNumbers.includes(dayOfWeek)) {
        weekendDays++;
      } else if (holidaySet.has(dateString)) {
        holidaysExcluded++;
      } else {
        needed--;
      }
    }

    return {
      targetDate: current.toISOString().split('T')[0],
      formattedTarget: current.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      calendarDays,
      weekendDays,
      holidaysExcluded,
    };
  }, [startDate, daysToAdd, isAddition, excludedWeekendNumbers, holidays]);

  const handleAddHoliday = () => {
    if (!newHolidayDate) return;
    const item: HolidayItem = {
      id: Date.now().toString(),
      name: newHolidayName.trim() || 'Custom Holiday',
      date: newHolidayDate,
    };
    setHolidays([...holidays, item]);
    setNewHolidayName('');
    setNewHolidayDate('');
  };

  const handleRemoveHoliday = (id: string) => {
    setHolidays(holidays.filter((h) => h.id !== id));
  };

  const handleReset = () => {
    setStartDate(getTodayDate());
    setEndDate(getFutureDate(30));
    setDaysToAdd(15);
    setWeekendScheme('sat_sun');
    setCustomWeekendDays([0, 6]);
    setHolidays(DEFAULT_HOLIDAYS);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <SEOHead
        title={toolData.seoTitle}
        description={toolData.seoDescription}
        canonicalPath="/business-days-calculator"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'Sahlino Business Days Calculator',
          url: 'https://sahlino.com/business-days-calculator',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Any',
          browserRequirements: 'Requires JavaScript',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
          description: toolData.seoDescription,
        }}
      />

      <Breadcrumbs
        items={[
          {
            label: getCategoryName('date-and-time', 'Date & Time'),
            onClick: () => onNavigate('/categories/date-and-time'),
          },
          { label: getToolName(toolData.slug, toolData.name) },
        ]}
      />

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {getToolName(toolData.slug, toolData.name)}
          </h1>
          <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60">
            <CalendarDays className="w-3.5 h-3.5" /> Flexible Global Workweeks
          </span>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-medium max-w-3xl">
          {getToolDesc(toolData.slug, toolData.description)}
        </p>
      </div>

      {/* Mode Switcher */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => setCalculationMode('between')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
            calculationMode === 'between'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Between Two Dates
        </button>
        <button
          onClick={() => setCalculationMode('add_days')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
            calculationMode === 'add_days'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Add / Subtract Working Days
        </button>
      </div>

      {/* Main Calculator Workspace */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
            {calculationMode === 'between' ? 'Count Business Days Between Dates' : 'Calculate Future or Past Business Day'}
          </h2>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

        {/* Inputs & Settings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            {calculationMode === 'between' ? (
              /* Between mode inputs */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm font-bold text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm font-bold text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            ) : (
              /* Add/Subtract mode inputs */
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm font-bold text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
                    Operation
                  </label>
                  <select
                    value={isAddition ? 'add' : 'subtract'}
                    onChange={(e) => setIsAddition(e.target.value === 'add')}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm font-bold text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    <option value="add">+ Add Business Days</option>
                    <option value="subtract">- Subtract Business Days</option>
                  </select>
                </div>
                <div className="sm:col-span-1">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
                    Number of Days
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10000}
                    value={daysToAdd}
                    onChange={(e) => setDaysToAdd(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm font-bold text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            )}

            {/* Weekend Configuration */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
              <label className="text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-300 block mb-3">
                Weekend Configuration
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                {[
                  { id: 'sat_sun', label: 'Sat & Sun (Default)' },
                  { id: 'fri_sat', label: 'Fri & Sat (Middle East)' },
                  { id: 'sun_only', label: 'Sunday Only' },
                  { id: 'custom', label: 'Custom Days' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setWeekendScheme(item.id as WeekendScheme)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold border text-center transition-colors cursor-pointer ${
                      weekendScheme === item.id
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {weekendScheme === 'custom' && (
                <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
                  <span className="text-[11px] font-bold text-slate-500 block mb-2">Select excluded weekend days:</span>
                  <div className="flex flex-wrap gap-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((dayName, idx) => {
                      const isSelected = customWeekendDays.includes(idx);
                      return (
                        <button
                          key={dayName}
                          onClick={() => {
                            if (isSelected) {
                              setCustomWeekendDays(customWeekendDays.filter((d) => d !== idx));
                            } else {
                              setCustomWeekendDays([...customWeekendDays, idx]);
                            }
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800'
                              : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {dayName}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Custom Holidays Manager */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Custom Excluded Holidays ({holidays.length})
                </label>
              </div>

              {/* Add Holiday Form */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 mb-3">
                <input
                  type="text"
                  placeholder="Holiday Name (e.g. Bank Holiday)"
                  value={newHolidayName}
                  onChange={(e) => setNewHolidayName(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="date"
                  value={newHolidayDate}
                  onChange={(e) => setNewHolidayDate(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={handleAddHoliday}
                  disabled={!newHolidayDate}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs font-black transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>

              {/* Holiday Tags */}
              <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto">
                {holidays.map((h) => (
                  <div
                    key={h.id}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300"
                  >
                    <span>{h.name} ({h.date})</span>
                    <button
                      onClick={() => handleRemoveHoliday(h.id)}
                      className="text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                      title="Remove holiday"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/40">
            {calculationMode === 'between' && betweenStats ? (
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-300 block mb-3">
                  Summary Breakdown
                </span>

                <div className="mb-6">
                  <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                    {betweenStats.workingDays}
                  </div>
                  <div className="text-sm font-black text-indigo-600 dark:text-indigo-400 mt-1">
                    Total Working / Business Days
                  </div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                    Calculated from {startDate} to {endDate}
                  </p>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-indigo-200/70 dark:border-indigo-900/50">
                  <div className="flex items-center justify-between text-xs sm:text-sm py-1">
                    <span className="text-slate-600 dark:text-slate-400 font-medium">Total Calendar Days:</span>
                    <strong className="text-slate-900 dark:text-white font-black">{betweenStats.calendarDays} days</strong>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm py-1">
                    <span className="text-slate-600 dark:text-slate-400 font-medium">Weekend Days Excluded:</span>
                    <strong className="text-slate-900 dark:text-white font-black">-{betweenStats.weekendDays} days</strong>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm py-1">
                    <span className="text-slate-600 dark:text-slate-400 font-medium">Holidays Excluded:</span>
                    <strong className="text-slate-900 dark:text-white font-black">-{betweenStats.holidaysExcluded} days</strong>
                  </div>
                </div>
              </div>
            ) : addDaysStats ? (
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-300 block mb-3">
                  Target Result Date
                </span>

                <div className="mb-6">
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    {addDaysStats.formattedTarget}
                  </div>
                  <div className="text-sm font-black text-indigo-600 dark:text-indigo-400 mt-1 font-mono">
                    {addDaysStats.targetDate}
                  </div>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-indigo-200/70 dark:border-indigo-900/50">
                  <div className="flex items-center justify-between text-xs sm:text-sm py-1">
                    <span className="text-slate-600 dark:text-slate-400 font-medium">Elapsed Calendar Days:</span>
                    <strong className="text-slate-900 dark:text-white font-black">{addDaysStats.calendarDays} days</strong>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm py-1">
                    <span className="text-slate-600 dark:text-slate-400 font-medium">Weekend Days Skipped:</span>
                    <strong className="text-slate-900 dark:text-white font-black">{addDaysStats.weekendDays} days</strong>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm py-1">
                    <span className="text-slate-600 dark:text-slate-400 font-medium">Holidays Skipped:</span>
                    <strong className="text-slate-900 dark:text-white font-black">{addDaysStats.holidaysExcluded} days</strong>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="mt-6 pt-4 border-t border-indigo-200/60 dark:border-indigo-900/40 text-[11px] font-medium text-slate-500">
              Dates are computed with zero assumptions regarding specific country legislation. Customize your non-working days as needed.
            </div>
          </div>
        </div>
      </div>

      {/* Ad slot */}
      <AdPlaceholder slotId="ad-slot-businessdays-middle" />

      {/* Educational Guide & Examples */}
      <section className="my-10 space-y-6" aria-label="Educational Guides and Examples">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Practical Use Cases & Examples
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40">
            <h3 className="font-black text-base text-slate-900 dark:text-white mb-2 tracking-tight">
              Project Sprints & Deadlines
            </h3>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
              When committing to a 20 business-day project delivery SLA, skip weekends and public bank holidays to accurately forecast your ship date.
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40">
            <h3 className="font-black text-base text-slate-900 dark:text-white mb-2 tracking-tight">
              Payroll & Invoice Terms
            </h3>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
              Payment terms like &quot;Net 30 business days&quot; require precise excluding of non-banking days. Enter invoice issuance date to find the due date.
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40">
            <h3 className="font-black text-base text-slate-900 dark:text-white mb-2 tracking-tight">
              International Workweek Adjustments
            </h3>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
              Companies coordinating between European/US branches and Middle Eastern partners (who frequently observe Friday & Saturday weekends) can accurately reconcile schedule disparities.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection faqs={toolData.faqs || []} />

      {/* Internal Linking */}
      <RelatedTools
        currentSlug={toolData.slug}
        category={toolData.category}
        categoryName={toolData.categoryName}
        onNavigate={onNavigate}
      />
    </div>
  );
};
