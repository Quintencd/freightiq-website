(function () {
  const SUPABASE_FUNCTION_URL = 'https://yvbhjlmvpipniedwvdji.supabase.co/functions/v1/public-website-analytics';
  const runtimeConfig = window.FlowIQAnalyticsConfig || {};
  const GTM_CONTAINER_ID = runtimeConfig.gtmContainerId || 'GTM-XXXXXXX'; // Replace with your real GTM container
  const GA4_MEASUREMENT_ID = runtimeConfig.ga4MeasurementId || 'G-XXXXXXXXXX'; // Optional direct GA4 fallback

  function getOrCreateSessionId() {
    const key = 'flowiq_web_session_id';
    try {
      const existing = localStorage.getItem(key);
      if (existing) return existing;
      const next = `${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
      localStorage.setItem(key, next);
      return next;
    } catch (_) {
      return `${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    }
  }

  function getUtmParams() {
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get('utm_source'),
      utm_medium: params.get('utm_medium'),
      utm_campaign: params.get('utm_campaign'),
      utm_term: params.get('utm_term'),
      utm_content: params.get('utm_content')
    };
  }

  function addGtmIfConfigured() {
    if (!GTM_CONTAINER_ID || GTM_CONTAINER_ID === 'GTM-XXXXXXX') return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    const gtmScript = document.createElement('script');
    gtmScript.async = true;
    gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}`;
    document.head.appendChild(gtmScript);
  }

  function addGa4IfConfigured() {
    if (!GA4_MEASUREMENT_ID || GA4_MEASUREMENT_ID === 'G-XXXXXXXXXX') return;
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
    document.head.appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA4_MEASUREMENT_ID);
  }

  async function track(eventType, eventData = {}) {
    const payload = {
      event_type: eventType,
      event_data: {
        ...eventData,
        ...getUtmParams(),
        page_url: window.location.href,
        page_path: window.location.pathname,
        page_title: document.title,
        referrer: document.referrer || null,
        session_id: getOrCreateSessionId()
      }
    };

    try {
      if (navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
        navigator.sendBeacon(SUPABASE_FUNCTION_URL, blob);
        return;
      }
      await fetch(SUPABASE_FUNCTION_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true
      });
    } catch (_) {
      // analytics must never block UX
    }
  }

  function inferCtaName(el) {
    const txt = ((el?.innerText || el?.textContent || '') + '').trim().toLowerCase();
    if (!txt) return 'unknown_cta';
    if (txt.includes('trial') || txt.includes('get started') || txt.includes('sign up')) return 'start_trial';
    if (txt.includes('book') && txt.includes('demo')) return 'book_demo';
    if (txt.includes('pricing')) return 'view_pricing';
    if (txt.includes('contact')) return 'contact';
    if (txt.includes('login') || txt.includes('sign in')) return 'login';
    return txt.slice(0, 60);
  }

  function setupClickTracking() {
    document.addEventListener('click', function (e) {
      const target = e.target.closest('a,button');
      if (!target) return;
      const href = target.getAttribute('href') || '';
      const ctaName = target.getAttribute('data-analytics') || inferCtaName(target);
      const isLikelyCta = /signup|trial|pricing|demo|contact|login|book|start/i.test(ctaName + ' ' + href);
      if (!isLikelyCta) return;

      track('web_cta_click', {
        cta_name: ctaName,
        href: href || null
      });
    }, { passive: true });
  }

  function setupFormTracking() {
    document.querySelectorAll('form').forEach((form) => {
      form.addEventListener('submit', function () {
        const formName = form.getAttribute('id') || form.getAttribute('name') || 'unnamed_form';
        if (/signup/i.test(formName)) track('web_signup_start', { form_name: formName });
        else if (/demo|lead|contact/i.test(formName)) track('web_demo_request_submit', { form_name: formName });
      });
    });
  }

  addGtmIfConfigured();
  addGa4IfConfigured();

  window.FlowIQWebsiteAnalytics = {
    track
  };

  document.addEventListener('DOMContentLoaded', function () {
    track('web_page_view');
    setupClickTracking();
    setupFormTracking();
  });
})();
