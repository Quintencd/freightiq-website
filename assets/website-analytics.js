(function () {
  const SUPABASE_FUNCTION_URL = 'https://yvbhjlmvpipniedwvdji.supabase.co/functions/v1/public-website-analytics';
  const runtimeConfig = window.FlowIQAnalyticsConfig || {};
  const GTM_CONTAINER_ID = runtimeConfig.gtmContainerId || 'GTM-XXXXXXX'; // Replace with your real GTM container
  const GA4_MEASUREMENT_ID = runtimeConfig.ga4MeasurementId || 'G-XXXXXXXXXX'; // Optional direct GA4 fallback
  const FIRST_TOUCH_KEY = 'flowiq_web_first_touch';
  const GEO_CACHE_KEY = 'flowiq_web_geo';
  const GEO_CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000;
  let geoLookupPromise = null;

  function getSiteEnvironment() {
    const host = window.location.hostname.toLowerCase();
    if (host === 'www.flowiq.info' || host === 'flowiq.info') return 'production';
    if (
      host === 'localhost' ||
      host === '127.0.0.1' ||
      host === '::1' ||
      host.endsWith('.localhost')
    ) return 'local';
    if (host.endsWith('.netlify.app')) return 'preview';
    return 'other';
  }

  function parseHost(urlLike) {
    if (!urlLike || typeof urlLike !== 'string') return null;
    try {
      return new URL(urlLike).hostname.toLowerCase();
    } catch (_) {
      return null;
    }
  }

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

  function getStoredGeo() {
    try {
      const raw = localStorage.getItem(GEO_CACHE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return null;
      if (!parsed.country) return null;
      if (!parsed.fetched_at || (Date.now() - new Date(parsed.fetched_at).getTime()) > GEO_CACHE_TTL_MS) return null;
      return parsed;
    } catch (_) {
      return null;
    }
  }

  function storeGeo(geo) {
    try {
      localStorage.setItem(GEO_CACHE_KEY, JSON.stringify({
        country: geo.country || null,
        country_name: geo.country_name || null,
        fetched_at: new Date().toISOString()
      }));
    } catch (_) {
      // ignore storage issues
    }
  }

  async function resolveGeo() {
    const cached = getStoredGeo();
    if (cached) return cached;
    if (geoLookupPromise) return geoLookupPromise;

    geoLookupPromise = fetch('https://ipapi.co/json/', { cache: 'force-cache' })
      .then(function (res) {
        if (!res.ok) throw new Error('geo lookup failed');
        return res.json();
      })
      .then(function (data) {
        const geo = {
          country: data && typeof data.country === 'string' ? data.country : null,
          country_name: data && typeof data.country_name === 'string' ? data.country_name : null
        };
        if (geo.country) storeGeo(geo);
        return geo;
      })
      .catch(function () {
        return { country: null, country_name: null };
      })
      .finally(function () {
        geoLookupPromise = null;
      });

    return geoLookupPromise;
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

  function getFirstTouchAttribution() {
    const current = getUtmParams();
    const hasCurrent = Object.values(current).some(Boolean);
    try {
      const existingRaw = localStorage.getItem(FIRST_TOUCH_KEY);
      const existing = existingRaw ? JSON.parse(existingRaw) : null;
      if (!existing && hasCurrent) {
        const next = { ...current, captured_at: new Date().toISOString() };
        localStorage.setItem(FIRST_TOUCH_KEY, JSON.stringify(next));
        return next;
      }
      if (existing && typeof existing === 'object') {
        if (hasCurrent && !existing.utm_source) {
          const merged = { ...existing, ...current };
          localStorage.setItem(FIRST_TOUCH_KEY, JSON.stringify(merged));
          return merged;
        }
        return existing;
      }
      return current;
    } catch (_) {
      return current;
    }
  }

  function inferDeviceType() {
    const ua = navigator.userAgent || '';
    if (/tablet|ipad/i.test(ua)) return 'tablet';
    if (/mobi|android|iphone|ipod/i.test(ua)) return 'mobile';
    return 'desktop';
  }

  function inferBrowserFamily() {
    const ua = navigator.userAgent || '';
    if (/Edg/i.test(ua)) return 'Edge';
    if (/Chrome/i.test(ua) && !/Edg/i.test(ua)) return 'Chrome';
    if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) return 'Safari';
    if (/Firefox/i.test(ua)) return 'Firefox';
    return 'Other';
  }

  function inferOsFamily() {
    const ua = navigator.userAgent || '';
    if (/Windows/i.test(ua)) return 'Windows';
    if (/Mac OS X|Macintosh/i.test(ua)) return 'macOS';
    if (/Android/i.test(ua)) return 'Android';
    if (/iPhone|iPad|iPod/i.test(ua)) return 'iOS';
    if (/Linux/i.test(ua)) return 'Linux';
    return 'Other';
  }

  function inferPageGroup() {
    const path = window.location.pathname.toLowerCase();
    if (path === '/' || path === '/index.html') return 'homepage';
    if (path.startsWith('/pricing')) return 'pricing';
    if (path.startsWith('/signup')) return 'signup';
    if (path.startsWith('/login')) return 'login';
    if (path.startsWith('/modules')) return 'modules';
    if (path.startsWith('/tools')) return 'tools';
    if (path.startsWith('/solutions')) return 'solutions';
    if (path.startsWith('/compare')) return 'compare';
    if (path.startsWith('/glossary')) return 'glossary';
    if (path.startsWith('/use-cases')) return 'use_cases';
    return 'other';
  }

  function inferSearchEngine(referrer) {
    if (!referrer) return null;
    const value = referrer.toLowerCase();
    if (value.includes('google.')) return 'google';
    if (value.includes('bing.com')) return 'bing';
    if (value.includes('duckduckgo.com')) return 'duckduckgo';
    if (value.includes('search.yahoo.com')) return 'yahoo';
    return null;
  }

  function inferTrafficSourceCategory(currentUtm, referrer) {
    if (currentUtm.utm_source || currentUtm.utm_medium || currentUtm.utm_campaign) return 'campaign';
    if (!referrer) return 'direct';
    if (inferSearchEngine(referrer)) return 'organic_search';
    return 'referral';
  }

  function readBodyDataset(key, fallback = null) {
    try {
      return document.body?.dataset?.[key] || fallback;
    } catch (_) {
      return fallback;
    }
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
    const currentUtm = getUtmParams();
    const firstTouch = getFirstTouchAttribution();
    const searchEngine = inferSearchEngine(document.referrer || '');
    const trafficSourceCategory = inferTrafficSourceCategory(currentUtm, document.referrer || '');
    const geo = await resolveGeo();
    const payload = {
      event_type: eventType,
      event_data: {
        ...eventData,
        ...currentUtm,
        page_url: window.location.href,
        page_path: window.location.pathname,
        page_title: document.title,
        referrer: document.referrer || null,
        referrer_host: parseHost(document.referrer || '') || null,
        session_id: getOrCreateSessionId(),
        site_environment: getSiteEnvironment(),
        site_hostname: window.location.hostname.toLowerCase(),
        device_type: inferDeviceType(),
        browser_family: inferBrowserFamily(),
        os_family: inferOsFamily(),
        page_group: inferPageGroup(),
        page_template: readBodyDataset('pageTemplate', 'marketing'),
        page_intent: readBodyDataset('pageIntent', 'general'),
        page_topic: readBodyDataset('pageTopic', 'flowiq'),
        traffic_source_category: trafficSourceCategory,
        search_engine: searchEngine,
        country: geo.country || null,
        country_name: geo.country_name || null,
        first_touch_utm_source: firstTouch.utm_source || null,
        first_touch_utm_medium: firstTouch.utm_medium || null,
        first_touch_utm_campaign: firstTouch.utm_campaign || null,
        is_organic_search_session: trafficSourceCategory === 'organic_search'
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
        credentials: 'omit',
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
    track('web_page_view', { entry_type: 'page_load' });
    setupClickTracking();
    setupFormTracking();
  });
})();
