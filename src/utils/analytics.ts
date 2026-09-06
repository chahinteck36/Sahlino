/**
 * Google Analytics & Search Console integration stub for Sahlino.
 * Prepared for clean production hookup without hardcoding fake IDs.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const initAnalytics = (measurementId?: string) => {
  if (!measurementId || typeof window === 'undefined') return;

  // Dynamically load Google Analytics script if ID is provided
  if (!document.getElementById('ga-script')) {
    const script = document.createElement('script');
    script.id = 'ga-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', measurementId, { send_page_view: false });
  }
};

export const trackPageView = (path: string, title: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title,
    });
  }
};

export const trackToolUsage = (toolSlug: string, action: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'tool_action', {
      event_category: 'Tool',
      event_label: toolSlug,
      action_name: action,
    });
  }
};
