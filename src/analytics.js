// Google Analytics 4 — lightweight, opt-in via env var.
//
// Setup (2 min, Derrick's Google account):
//   1. analytics.google.com → create GA4 property → get Measurement ID (G-XXXXXXXXXX)
//   2. Netlify → this site → Site settings → Environment variables → add
//      VITE_GA_MEASUREMENT_ID = G-XXXXXXXXXX → redeploy
// Until the ID is set, no tracking script loads and this is a no-op.

const ID = import.meta.env.VITE_GA_MEASUREMENT_ID

export function initAnalytics() {
  if (!ID || typeof document === 'undefined') return
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${ID}`
  document.head.appendChild(s)
  window.dataLayer = window.dataLayer || []
  window.gtag = function () {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', ID)
}

// Fired on successful estimate-form submits so Derrick can see lead conversions.
export function trackLead(formName) {
  try {
    if (typeof window.gtag === 'function') window.gtag('event', 'generate_lead', { form: formName })
  } catch {
    /* analytics must never break the form */
  }
}
