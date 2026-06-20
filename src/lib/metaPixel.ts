/**
 * Meta Pixel (Facebook Pixel) Integration & Standard Events tracking helper.
 * Provides easy hooks and tracking for ViewContent, InitiateCheckout, and Purchase events.
 */

declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

// Get the pixel ID from Vite env variables or use a default standard/placeholder
const PIXEL_ID = (import.meta as any).env?.VITE_FB_PIXEL_ID || '';

/**
 * Initialize Meta Pixel on the client side
 */
export const initMetaPixel = () => {
  if (typeof window === 'undefined') return;

  if (!PIXEL_ID) {
    console.log('📢 [Meta Pixel] No execution ID provided (VITE_FB_PIXEL_ID is empty). Running in debug mode - events will be logged to console.');
    return;
  }

  // Standard Meta Pixel initialization script
  (function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
    if (f.fbq) return;
    n = f.fbq = function() {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  window.fbq('init', PIXEL_ID);
  window.fbq('track', 'PageView');
  console.log(`✅ [Meta Pixel] Initialized successfully with ID: ${PIXEL_ID}`);
};

/**
 * Track when a user views a product page / landing page
 */
export const trackViewContent = (productName = 'جهاز الحجامة الذكي المتكامل', value = 999, currency = 'EGP') => {
  if (typeof window === 'undefined') return;

  const eventData = {
    content_name: productName,
    content_category: 'Cupping Device',
    value: value,
    currency: currency,
  };

  if (window.fbq) {
    window.fbq('track', 'ViewContent', eventData);
    console.log('🔥 [Meta Pixel Event] ViewContent sent:', eventData);
  } else {
    console.log('📢 [Meta Pixel Debug] ViewContent captured:', eventData);
  }
};

/**
 * Track when a user clicks order / checkout button and arrives on the Checkout page
 */
export const trackInitiateCheckout = (productName = 'جهاز الحجامة الذكي المتكامل', value = 999, currency = 'EGP') => {
  if (typeof window === 'undefined') return;

  const eventData = {
    content_name: productName,
    content_category: 'Cupping Device',
    value: value,
    currency: currency,
    num_items: 1,
  };

  if (window.fbq) {
    window.fbq('track', 'InitiateCheckout', eventData);
    console.log('🔥 [Meta Pixel Event] InitiateCheckout sent:', eventData);
  } else {
    console.log('📢 [Meta Pixel Debug] InitiateCheckout captured:', eventData);
  }
};

/**
 * Track when a user completes their order and views the success screen
 */
export const trackPurchase = (orderId: string, value = 999, currency = 'EGP', productName = 'جهاز الحجامة الذكي المتكامل') => {
  if (typeof window === 'undefined') return;

  const eventData = {
    content_name: productName,
    content_category: 'Cupping Device',
    value: value,
    currency: currency,
    order_id: orderId,
    num_items: 1,
  };

  if (window.fbq) {
    window.fbq('track', 'Purchase', eventData);
    console.log('🔥 [Meta Pixel Event] Purchase sent:', eventData);
  } else {
    console.log('📢 [Meta Pixel Debug] Purchase captured:', eventData);
  }
};
