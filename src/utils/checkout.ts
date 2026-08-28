/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const HOTMART_CHECKOUT_URL = 'https://pay.hotmart.com/O106740525J?checkoutMode=10';

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }
}

/**
 * Executes the Meta Pixel 'InitiateCheckout' event and redirects the user to Hotmart.
 */
export function handleHotmartCheckout(e?: React.SyntheticEvent | Event) {
  if (e && typeof e.preventDefault === 'function') {
    e.preventDefault();
  }

  // Fire Meta Pixel InitiateCheckout event at the exact moment of click
  try {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', 'InitiateCheckout');
    }
  } catch (error) {
    console.error('Meta Pixel tracking error:', error);
  }

  // Redirect to the Hotmart checkout URL
  window.location.href = HOTMART_CHECKOUT_URL;
}
