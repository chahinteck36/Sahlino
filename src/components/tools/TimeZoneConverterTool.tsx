import React, { useState, useMemo } from 'react';
import {
  Globe,
  Clock,
  ArrowRightLeft,
  Copy,
  Check,
  Plus,
  Trash2,
  Sun,
  Moon,
  ShieldCheck,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { SEOHead } from '../common/SEOHead';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { AdPlaceholder } from '../common/AdPlaceholder';
import { FAQSection } from '../common/FAQSection';
import { RelatedTools } from '../common/RelatedTools';
import { getToolBySlug } from '../../data/tools';
import { useLanguage } from '../../context/LanguageContext';

interface TimeZoneConverterToolProps {
  onNavigate: (path: string) => void;
}

export interface CityZone {
  city: string;
  country: string;
  iana: string;
}

const POPULAR_ZONES: CityZone[] = [
  { city: 'London', country: 'United Kingdom', iana: 'Europe/London' },
  { city: 'New York', country: 'United States (EDT/EST)', iana: 'America/New_York' },
  { city: 'Paris', country: 'France (CEST/CET)', iana: 'Europe/Paris' },
  { city: 'Tokyo', country: 'Japan (JST)', iana: 'Asia/Tokyo' },
  { city: 'Dubai', country: 'United Arab Emirates (GST)', iana: 'Asia/Dubai' },
  { city: 'Los Angeles', country: 'United States (PDT/PST)', iana: 'America/Los_Angeles' },
  { city: 'Singapore', country: 'Singapore (SGT)', iana: 'Asia/Singapore' },
  { city: 'Sydney', country: 'Australia (AEST/AEDT)', iana: 'Australia/Sydney' },
  { city: 'Berlin', country: 'Germany (CEST/CET)', iana: 'Europe/Berlin' },
  { city: 'Cairo', country: 'Egypt (EEST)', iana: 'Africa/Cairo' },
  { city: 'Mumbai', country: 'India (IST)', iana: 'Asia/Kolkata' },
  { city: 'Toronto', country: 'Canada (EDT/EST)', iana: 'America/Toronto' },
  { city: 'São Paulo', country: 'Brazil (BRT)', iana: 'America/Sao_Paulo' },
  { city: 'Chicago', country: 'United States (CDT/CST)', iana: 'America/Chicago' },
  { city: 'Hong Kong', country: 'Hong Kong (HKT)', iana: 'Asia/Hong_Kong' },
  { city: 'Auckland', country: 'New Zealand (NZST/NZDT)', iana: 'Pacific/Auckland' },
];

export const TimeZoneConverterTool: React.FC<TimeZoneConverterToolProps> = ({ onNavigate }) => {
  const { t, getToolName, getToolDesc, getCategoryName } = useLanguage();
  const toolData = getToolBySlug('time-zone-converter')!;

  // Initial user timezone detection
  const detectedZone = useMemo(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York';
    } catch {
      return 'America/New_York';
    }
  }, []);

  const getTodayDateString = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getCurrentTimeString = () => {
    const d = new Date();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const [sourceZone, setSourceZone] = useState<string>(() => {
    const matched = POPULAR_ZONES.find((z) => z.iana === detectedZone);
    return matched ? matched.iana : 'America/New_York';
  });

  const [destinationZone, setDestinationZone] = useState<string>('Europe/London');
  const [selectedDate, setSelectedDate] = useState<string>(getTodayDateString());
  const [selectedTime, setSelectedTime] = useState<string>(getCurrentTimeString());
  const [copiedMain, setCopiedMain] = useState<boolean>(false);
  const [copiedCity, setCopiedCity] = useState<string | null>(null);

  // Multi-comparison list
  const [comparisonList, setComparisonList] = useState<string[]>([
    'Europe/London',
    'America/New_York',
    'Europe/Paris',
    'Asia/Tokyo',
    'Asia/Dubai',
    'Australia/Sydney',
  ]);

  // Helper to construct exact target UTC instant from local date + time in sourceZone
  const sourceDateTime = useMemo(() => {
    try {
      const [year, month, day] = selectedDate.split('-').map(Number);
      const [hours, minutes] = selectedTime.split(':').map(Number);

      // Guess UTC timestamp by constructing local date
      const localDate = new Date(Date.UTC(year, month - 1, day, hours, minutes));

      // Calculate difference between local date in target timezone and UTC
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: sourceZone,
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
      });

      const parts = formatter.formatToParts(localDate);
      const partObj: Record<string, string> = {};
      parts.forEach((p) => {
        partObj[p.type] = p.value;
      });

      const actualYear = parseInt(partObj.year, 10);
      const actualMonth = parseInt(partObj.month, 10);
      const actualDay = parseInt(partObj.day, 10);
      let actualHour = parseInt(partObj.hour, 10);
      if (actualHour === 24) actualHour = 0;
      const actualMinute = parseInt(partObj.minute, 10);

      const asRenderedInTz = Date.UTC(actualYear, actualMonth - 1, actualDay, actualHour, actualMinute);
      const offsetMs = asRenderedInTz - localDate.getTime();

      // True UTC instant representing that exact wall-clock time in sourceZone
      return new Date(localDate.getTime() - offsetMs);
    } catch {
      return new Date();
    }
  }, [selectedDate, selectedTime, sourceZone]);

  // Format date & time in a specific time zone
  const formatInZone = (date: Date, iana: string) => {
    try {
      const timeFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: iana,
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });

      const dateFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: iana,
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });

      const offsetFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: iana,
        timeZoneName: 'shortOffset',
      });

      const parts = offsetFormatter.formatToParts(date);
      const tzName = parts.find((p) => p.type === 'timeZoneName')?.value || '';

      const hour24Formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: iana,
        hour: 'numeric',
        hour12: false,
      });
      let hour24 = parseInt(hour24Formatter.format(date), 10);
      if (hour24 === 24) hour24 = 0;
      const isDaytime = hour24 >= 6 && hour24 < 18;

      return {
        timeString: timeFormatter.format(date),
        dateString: dateFormatter.format(date),
        offset: tzName,
        isDaytime,
        hour24,
      };
    } catch {
      return {
        timeString: '--:--',
        dateString: 'Invalid date',
        offset: 'UTC',
        isDaytime: true,
        hour24: 12,
      };
    }
  };

  const sourceDetails = formatInZone(sourceDateTime, sourceZone);
  const destDetails = formatInZone(sourceDateTime, destinationZone);

  const swapZones = () => {
    const temp = sourceZone;
    setSourceZone(destinationZone);
    setDestinationZone(temp);
  };

  const setNow = () => {
    setSelectedDate(getTodayDateString());
    setSelectedTime(getCurrentTimeString());
  };

  const handleCopyMain = () => {
    const text = `${sourceDetails.timeString} (${sourceZone}, ${sourceDetails.offset}) = ${destDetails.timeString} on ${destDetails.dateString} (${destinationZone}, ${destDetails.offset})`;
    navigator.clipboard.writeText(text);
    setCopiedMain(true);
    setTimeout(() => setCopiedMain(false), 2000);
  };

  const handleCopyCity = (cityName: string, timeStr: string, dateStr: string, offset: string) => {
    const text = `${cityName}: ${timeStr}, ${dateStr} (${offset})`;
    navigator.clipboard.writeText(text);
    setCopiedCity(cityName);
    setTimeout(() => setCopiedCity(null), 2000);
  };

  const addComparisonZone = (iana: string) => {
    if (!comparisonList.includes(iana)) {
      setComparisonList([...comparisonList, iana]);
    }
  };

  const removeComparisonZone = (iana: string) => {
    setComparisonList(comparisonList.filter((z) => z !== iana));
  };

  const getCityName = (iana: string) => {
    const found = POPULAR_ZONES.find((z) => z.iana === iana);
    if (found) return found.city;
    const parts = iana.split('/');
    return parts[parts.length - 1].replace(/_/g, ' ');
  };

  const getCountryName = (iana: string) => {
    const found = POPULAR_ZONES.find((z) => z.iana === iana);
    return found ? found.country : iana;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <SEOHead
        title={toolData.seoTitle}
        description={toolData.seoDescription}
        canonicalPath="/time-zone-converter"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'Sahlino Time Zone Converter',
          url: 'https://toolora.app/time-zone-converter',
          applicationCategory: 'UtilitiesApplication',
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
            <Globe className="w-3.5 h-3.5" /> IANA Live Precision
          </span>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-medium max-w-3xl">
          {getToolDesc(toolData.slug, toolData.description)}
        </p>
      </div>

      {/* Primary Conversion Card */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 sm:p-8 shadow-xs">
        {/* Date & Time Input Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
                Select Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm font-bold text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
                Select Time
              </label>
              <div className="relative">
                <input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm font-bold text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <button
              onClick={setNow}
              className="self-end px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              Current Time
            </button>
          </div>

          <button
            onClick={handleCopyMain}
            className="self-end inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-black rounded-xl transition-colors cursor-pointer"
          >
            {copiedMain ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            <span>{copiedMain ? 'Copied to Clipboard!' : 'Copy Result'}</span>
          </button>
        </div>

        {/* Source and Destination Converters */}
        <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center py-6">
          {/* Source Zone */}
          <div className="md:col-span-5 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400 block mb-2">
              From (Source Time Zone)
            </span>
            <select
              value={sourceZone}
              onChange={(e) => setSourceZone(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 mb-4 cursor-pointer"
            >
              {POPULAR_ZONES.map((z) => (
                <option key={z.iana} value={z.iana}>
                  {z.city} — {z.country} ({z.iana})
                </option>
              ))}
            </select>

            <div className="flex items-baseline justify-between">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  {sourceDetails.timeString}
                </div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                  {sourceDetails.dateString}
                </div>
              </div>
              <div className="text-right">
                <span className="inline-block px-2.5 py-1 text-xs font-mono font-bold rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {sourceDetails.offset}
                </span>
                <div className="flex items-center gap-1 justify-end text-[11px] font-bold text-slate-400 mt-1">
                  {sourceDetails.isDaytime ? <Sun className="w-3.5 h-3.5 text-amber-500" /> : <Moon className="w-3.5 h-3.5 text-indigo-400" />}
                  <span>{sourceDetails.isDaytime ? 'Daytime' : 'Night'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Swap Button */}
          <div className="md:col-span-1 flex justify-center py-2 md:py-0">
            <button
              onClick={swapZones}
              className="p-3.5 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hover:scale-105 transition-all shadow-xs cursor-pointer"
              title="Swap source and destination"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Destination Zone */}
          <div className="md:col-span-5 p-6 rounded-2xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/40 dark:bg-indigo-950/20">
            <span className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-2">
              To (Destination Time Zone)
            </span>
            <select
              value={destinationZone}
              onChange={(e) => setDestinationZone(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 mb-4 cursor-pointer"
            >
              {POPULAR_ZONES.map((z) => (
                <option key={z.iana} value={z.iana}>
                  {z.city} — {z.country} ({z.iana})
                </option>
              ))}
            </select>

            <div className="flex items-baseline justify-between">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400 tracking-tight">
                  {destDetails.timeString}
                </div>
                <div className="text-xs font-medium text-slate-600 dark:text-slate-300 mt-1">
                  {destDetails.dateString}
                </div>
              </div>
              <div className="text-right">
                <span className="inline-block px-2.5 py-1 text-xs font-mono font-bold rounded-lg bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
                  {destDetails.offset}
                </span>
                <div className="flex items-center gap-1 justify-end text-[11px] font-bold text-slate-500 dark:text-slate-400 mt-1">
                  {destDetails.isDaytime ? <Sun className="w-3.5 h-3.5 text-amber-500" /> : <Moon className="w-3.5 h-3.5 text-indigo-400" />}
                  <span>{destDetails.isDaytime ? 'Daytime' : 'Night'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-City Comparison Section */}
      <div className="mt-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              Multi-City Global Comparison
            </h2>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
              Compare simultaneous local times corresponding to <strong className="text-slate-700 dark:text-slate-300">{sourceDetails.timeString}</strong> ({getCityName(sourceZone)})
            </p>
          </div>

          {/* Add City Dropdown */}
          <div className="flex items-center gap-2">
            <select
              onChange={(e) => {
                if (e.target.value) {
                  addComparisonZone(e.target.value);
                  e.target.value = '';
                }
              }}
              defaultValue=""
              className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-hidden cursor-pointer"
            >
              <option value="" disabled>+ Add city to compare...</option>
              {POPULAR_ZONES.filter((z) => !comparisonList.includes(z.iana)).map((z) => (
                <option key={z.iana} value={z.iana}>
                  {z.city} ({z.country})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid of Compared Cities */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {comparisonList.map((iana) => {
            const formatted = formatInZone(sourceDateTime, iana);
            const cityName = getCityName(iana);
            const countryName = getCountryName(iana);

            return (
              <div
                key={iana}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 hover:border-slate-300 dark:hover:border-slate-700 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="font-black text-sm text-slate-900 dark:text-white truncate tracking-tight">
                      {cityName}
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      {formatted.isDaytime ? (
                        <Sun className="w-3.5 h-3.5 text-amber-500" title="Daytime" />
                      ) : (
                        <Moon className="w-3.5 h-3.5 text-indigo-400" title="Night" />
                      )}
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {formatted.offset}
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate mb-3">
                    {countryName}
                  </p>

                  <div className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                    {formatted.timeString}
                  </div>
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                    {formatted.dateString}
                  </div>
                </div>

                <div className="mt-4 pt-3.5 border-t border-slate-200/70 dark:border-slate-800/80 flex items-center justify-between text-xs">
                  <button
                    onClick={() =>
                      handleCopyCity(cityName, formatted.timeString, formatted.dateString, formatted.offset)
                    }
                    className="text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1.5 font-bold transition-colors cursor-pointer"
                  >
                    {copiedCity === cityName ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedCity === cityName ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    onClick={() => removeComparisonZone(iana)}
                    className="text-slate-400 hover:text-rose-500 p-1.5 rounded-lg transition-colors cursor-pointer"
                    title={`Remove ${cityName}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ad slot */}
      <AdPlaceholder slotId="ad-slot-timezone-middle" />

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
