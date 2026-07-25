// src/lib/analytics.ts

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

const MEASUREMENT_ID = 'G-6QHQFW1ETK';

// Check if GA should run (only in production unless explicitly enabled via local storage for debugging)
const isAnalyticsEnabled = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Allow debugging in development mode if localStorage item is set
  const debugEnabled = localStorage.getItem('enable_ga_dev') === 'true';
  const isProd = import.meta.env.PROD;
  
  return isProd || debugEnabled;
};

let isInitialized = false;

/**
 * Dynamically loads the GA4 script and initializes the dataLayer/gtag function.
 * Ensures duplicate initialization cannot occur.
 */
export function initGA(): void {
  if (typeof window === 'undefined') return;
  if (isInitialized) return;
  if (!isAnalyticsEnabled()) {
    return;
  }

  try {
    // 1. Setup the script element
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // 2. Setup the global dataLayer and gtag function
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };

    // 3. Initialize config
    window.gtag('js', new Date());
    window.gtag('config', MEASUREMENT_ID, {
      send_page_view: false, // We will handle page views manually to support route changes properly
    });

    isInitialized = true;
  } catch (error) {
    console.error('Failed to initialize GA4:', error);
  }
}

/**
 * Tracks a custom event in Google Analytics.
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, any>
): void {
  if (typeof window === 'undefined' || !isAnalyticsEnabled() || !window.gtag) {
    return;
  }
  
  try {
    window.gtag('event', eventName, params);
  } catch (error) {
    console.error(`Failed to track event: ${eventName}`, error);
  }
}

/**
 * Tracks a page view event.
 */
export function trackPageView(pagePath: string, title?: string): void {
  trackEvent('page_view', {
    page_path: pagePath,
    page_title: title || document.title,
    page_location: window.location.href,
  });
}

/**
 * Specialized helper to track button clicks with standard parameters.
 */
export function trackButtonClick(
  buttonText: string,
  sectionName: string,
  destinationUrl?: string
): void {
  trackEvent('click', {
    event_category: 'engagement',
    event_label: buttonText,
    button_text: buttonText,
    section_name: sectionName,
    destination_url: destinationUrl,
  });
}
