(function () {
  const SUPABASE_FUNCTION_URL = 'https://yvbhjlmvpipniedwvdji.supabase.co/functions/v1/public-website-analytics';
  const runtimeConfig = window.FlowIQAnalyticsConfig || {};
  const GTM_CONTAINER_ID = runtimeConfig.gtmContainerId || 'GTM-XXXXXXX'; // Replace with your real GTM container
  const GA4_MEASUREMENT_ID = runtimeConfig.ga4MeasurementId || 'G-XXXXXXXXXX'; // Optional direct GA4 fallback
  const SUPABASE_ANON_KEY = runtimeConfig.supabaseAnonKey ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2YmhqbG12cGlwbmllZHd2ZGppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwNzcxODAsImV4cCI6MjA2MzY1MzE4MH0.nnITbcUjg_J33oK_1JCU82wMTr5Ko501JEHSW_3medw';
  const FIRST_TOUCH_KEY = 'flowiq_web_first_touch';
  const LAST_TOUCH_KEY = 'flowiq_web_last_touch';
  const VISITOR_ID_KEY = 'flowiq_web_visitor_id';
  const SESSION_CONTEXT_KEY = 'flowiq_web_session_context';
  const SESSION_TIMEOUT_MS = 30 * 60 * 1000;
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
    return getOrCreateSessionContext().session_id;
  }

  function createId(prefix) {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
  }

  function getOrCreateVisitorId() {
    try {
      const existing = localStorage.getItem(VISITOR_ID_KEY);
      if (existing) return existing;
      const next = createId('visitor');
      localStorage.setItem(VISITOR_ID_KEY, next);
      return next;
    } catch (_) {
      return createId('visitor');
    }
  }

  function readSessionContext() {
    try {
      const raw = sessionStorage.getItem(SESSION_CONTEXT_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return null;
      if (!parsed.session_id || !parsed.started_at) return null;
      if (Date.now() - Number(parsed.last_seen_at || 0) > SESSION_TIMEOUT_MS) return null;
      return parsed;
    } catch (_) {
      return null;
    }
  }

  function buildAttributionSnapshot() {
    const currentUtm = getUtmParams();
    const referrer = document.referrer || '';
    const category = inferTrafficSourceCategory(currentUtm, referrer);
    const platform = inferTrafficPlatform(currentUtm, referrer);

    return {
      ...currentUtm,
      referrer,
      referrer_host: parseHost(referrer) || null,
      traffic_source_category: category,
      traffic_source_platform: platform,
      search_engine: inferSearchEngine(referrer),
      ai_referrer: inferAiReferrer(referrer),
      captured_at: new Date().toISOString()
    };
  }

  function getOrCreateSessionContext() {
    const now = Date.now();
    const existing = readSessionContext();
    if (existing) {
      existing.last_seen_at = now;
      try {
        sessionStorage.setItem(SESSION_CONTEXT_KEY, JSON.stringify(existing));
      } catch (_) {}
      return existing;
    }

    const attribution = buildAttributionSnapshot();
    const next = {
      session_id: createId('session'),
      visitor_id: getOrCreateVisitorId(),
      started_at: new Date(now).toISOString(),
      started_at_ms: now,
      last_seen_at: now,
      landing_page_path: window.location.pathname || '/',
      landing_page_url: window.location.href,
      landing_page_title: document.title || '',
      landing_attribution: attribution,
      page_view_count: 0,
      journey_path: []
    };

    try {
      sessionStorage.setItem(SESSION_CONTEXT_KEY, JSON.stringify(next));
    } catch (_) {}
    return next;
  }

  function updateSessionPageJourney() {
    const context = getOrCreateSessionContext();
    const currentPath = window.location.pathname || '/';
    const currentUrl = window.location.href;
    const journey = Array.isArray(context.journey_path) ? context.journey_path : [];
    const last = journey[journey.length - 1];

    if (!last || last.page_url !== currentUrl) {
      journey.push({
        page_path: currentPath,
        page_url: currentUrl,
        page_title: document.title || '',
        seen_at: new Date().toISOString()
      });
    }

    context.page_view_count = Number(context.page_view_count || 0) + 1;
    context.journey_path = journey.slice(-20);
    context.last_seen_at = Date.now();

    try {
      sessionStorage.setItem(SESSION_CONTEXT_KEY, JSON.stringify(context));
    } catch (_) {}

    return context;
  }

  function getPreviousPageFromSession(context) {
    const journey = Array.isArray(context?.journey_path) ? context.journey_path : [];
    if (journey.length < 2) return null;
    return journey[journey.length - 2]?.page_path || null;
  }

  function secondsSinceSessionStart(context) {
    const started = Number(context?.started_at_ms || 0);
    if (!started) return 0;
    return Math.max(0, Math.round((Date.now() - started) / 1000));
  }

  function rememberLastTouch(attribution) {
    try {
      localStorage.setItem(LAST_TOUCH_KEY, JSON.stringify(attribution));
    } catch (_) {
      // ignore storage issues
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
      utm_content: params.get('utm_content'),
      gclid: params.get('gclid'),
      gbraid: params.get('gbraid'),
      wbraid: params.get('wbraid'),
      msclkid: params.get('msclkid'),
      fbclid: params.get('fbclid'),
      li_fat_id: params.get('li_fat_id')
    };
  }

  function getFirstTouchAttribution() {
    const current = buildAttributionSnapshot();
    const hasCurrent =
      Object.values(getUtmParams()).some(Boolean) ||
      Boolean(current.referrer_host) ||
      current.traffic_source_category !== 'direct';
    try {
      const existingRaw = localStorage.getItem(FIRST_TOUCH_KEY);
      const existing = existingRaw ? JSON.parse(existingRaw) : null;
      if (!existing && hasCurrent) {
        localStorage.setItem(FIRST_TOUCH_KEY, JSON.stringify(current));
        return current;
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

  function inferAiReferrer(referrer) {
    if (!referrer) return null;
    const host = parseHost(referrer);
    if (!host) return null;
    if (host.includes('chatgpt.com') || host.includes('openai.com')) return 'chatgpt';
    if (host.includes('perplexity.ai')) return 'perplexity';
    if (host.includes('copilot.microsoft.com')) return 'microsoft_copilot';
    if (host.includes('gemini.google.com') || host.includes('bard.google.com')) return 'google_gemini';
    if (host.includes('claude.ai') || host.includes('anthropic.com')) return 'claude';
    return null;
  }

  function inferSocialReferrer(referrer) {
    if (!referrer) return null;
    const host = parseHost(referrer);
    if (!host) return null;
    if (host.includes('linkedin.com')) return 'linkedin';
    if (host.includes('facebook.com') || host.includes('l.facebook.com')) return 'facebook';
    if (host.includes('instagram.com')) return 'instagram';
    if (host.includes('x.com') || host.includes('twitter.com')) return 'x';
    if (host.includes('youtube.com') || host.includes('youtu.be')) return 'youtube';
    return null;
  }

  function inferTrafficPlatform(currentUtm, referrer) {
    const source = String(currentUtm.utm_source || '').toLowerCase();
    const medium = String(currentUtm.utm_medium || '').toLowerCase();
    const campaign = String(currentUtm.utm_campaign || '').toLowerCase();
    const tagged = `${source} ${medium} ${campaign}`;
    if (tagged.includes('chatgpt') || tagged.includes('openai')) return 'chatgpt';
    if (tagged.includes('perplexity')) return 'perplexity';
    if (tagged.includes('gemini')) return 'google_gemini';
    if (tagged.includes('claude')) return 'claude';
    if (source.includes('google')) return medium.includes('cpc') || medium.includes('paid') ? 'google_ads' : 'google';
    if (source.includes('linkedin')) return medium.includes('paid') || medium.includes('cpc') ? 'linkedin_paid' : 'linkedin';
    if (source.includes('facebook') || source.includes('meta') || source.includes('instagram')) return 'meta';

    return inferAiReferrer(referrer) || inferSearchEngine(referrer) || inferSocialReferrer(referrer) || parseHost(referrer) || 'direct';
  }

  function inferTrafficSourceCategory(currentUtm, referrer) {
    const medium = String(currentUtm.utm_medium || '').toLowerCase();
    if (currentUtm.gclid || currentUtm.gbraid || currentUtm.wbraid || currentUtm.msclkid || currentUtm.fbclid || currentUtm.li_fat_id) {
      return 'paid_campaign';
    }
    if (currentUtm.utm_source || currentUtm.utm_medium || currentUtm.utm_campaign) {
      if (medium.includes('cpc') || medium.includes('paid') || medium.includes('ppc')) return 'paid_campaign';
      if (medium.includes('email')) return 'email_campaign';
      if (medium.includes('social')) return 'social_campaign';
      return 'campaign';
    }
    if (!referrer) return 'direct';
    if (inferAiReferrer(referrer)) return 'ai_assistant';
    if (inferSearchEngine(referrer)) return 'organic_search';
    if (inferSocialReferrer(referrer)) return 'organic_social';
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
    const lastTouch = buildAttributionSnapshot();
    const sessionContext = eventType === 'web_page_view'
      ? updateSessionPageJourney()
      : getOrCreateSessionContext();
    const searchEngine = inferSearchEngine(document.referrer || '');
    const trafficSourceCategory = inferTrafficSourceCategory(currentUtm, document.referrer || '');
    const trafficPlatform = inferTrafficPlatform(currentUtm, document.referrer || '');
    rememberLastTouch(lastTouch);
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
        session_id: sessionContext.session_id,
        visitor_id: sessionContext.visitor_id || getOrCreateVisitorId(),
        session_started_at: sessionContext.started_at,
        session_age_seconds: secondsSinceSessionStart(sessionContext),
        session_page_view_count: sessionContext.page_view_count || 0,
        landing_page_path: sessionContext.landing_page_path || null,
        landing_page_url: sessionContext.landing_page_url || null,
        landing_page_title: sessionContext.landing_page_title || null,
        previous_page_path: getPreviousPageFromSession(sessionContext),
        journey_path: Array.isArray(sessionContext.journey_path)
          ? sessionContext.journey_path.map(function (item) { return item.page_path; }).slice(-20)
          : [],
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
        traffic_source_platform: trafficPlatform,
        search_engine: searchEngine,
        ai_referrer: inferAiReferrer(document.referrer || ''),
        country: geo.country || null,
        country_name: geo.country_name || null,
        first_touch_utm_source: firstTouch.utm_source || null,
        first_touch_utm_medium: firstTouch.utm_medium || null,
        first_touch_utm_campaign: firstTouch.utm_campaign || null,
        first_touch_gclid: firstTouch.gclid || null,
        first_touch_msclkid: firstTouch.msclkid || null,
        first_touch_fbclid: firstTouch.fbclid || null,
        first_touch_li_fat_id: firstTouch.li_fat_id || null,
        first_touch_referrer_host: firstTouch.referrer_host || null,
        first_touch_source_category: firstTouch.traffic_source_category || null,
        first_touch_platform: firstTouch.traffic_source_platform || null,
        last_touch_utm_source: lastTouch.utm_source || null,
        last_touch_utm_medium: lastTouch.utm_medium || null,
        last_touch_utm_campaign: lastTouch.utm_campaign || null,
        last_touch_gclid: lastTouch.gclid || null,
        last_touch_msclkid: lastTouch.msclkid || null,
        last_touch_fbclid: lastTouch.fbclid || null,
        last_touch_li_fat_id: lastTouch.li_fat_id || null,
        last_touch_referrer_host: lastTouch.referrer_host || null,
        last_touch_source_category: lastTouch.traffic_source_category || null,
        last_touch_platform: lastTouch.traffic_source_platform || null,
        is_organic_search_session: trafficSourceCategory === 'organic_search'
      }
    };

    try {
      await fetch(SUPABASE_FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`
        },
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

  function buildSignupAttributionParams(ctaName, ctaPosition) {
    const params = new URLSearchParams(window.location.search || '');
    const sessionId = getOrCreateSessionId();
    const pagePath = window.location.pathname || '/';
    const pageSection = ctaPosition || readBodyDataset('defaultCtaPosition', 'unknown');

    const out = new URLSearchParams();
    out.set('session_id', sessionId);
    out.set('website_source_page', pagePath);
    out.set('website_source_section', pageSection || 'unknown');
    out.set('funnel_scope', 'public_website');
    out.set('site_hostname', window.location.hostname.toLowerCase());
    if (ctaName) out.set('website_cta', String(ctaName).slice(0, 80));

    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'plan'].forEach(function (key) {
      const val = params.get(key);
      if (val) out.set(key, val);
    });

    return out;
  }

  function decorateSignupHref(el) {
    if (!el || !el.getAttribute) return;
    const href = el.getAttribute('href') || '';
    if (!href || href.indexOf('/signup') !== 0) return;

    try {
      const ctaName = el.getAttribute('data-analytics') || inferCtaName(el);
      const ctaPosition = el.getAttribute('data-analytics-position') || null;
      const url = new URL(href, window.location.origin);
      const attr = buildSignupAttributionParams(ctaName, ctaPosition);
      attr.forEach(function (value, key) {
        if (!url.searchParams.has(key)) {
          url.searchParams.set(key, value);
        }
      });
      el.setAttribute('href', url.pathname + url.search + url.hash);
    } catch (_) {
      // never block UX
    }
  }

  function setupClickTracking() {
    document.addEventListener('click', function (e) {
      const target = e.target.closest('a,button');
      if (!target) return;
      const href = target.getAttribute('href') || '';
      const ctaName = target.getAttribute('data-analytics') || inferCtaName(target);
      const ctaPosition = target.getAttribute('data-analytics-position') || null;
      const isLikelyCta = /signup|trial|pricing|demo|contact|login|book|start/i.test(ctaName + ' ' + href);
      if (!isLikelyCta) return;

      if (href.indexOf('/signup') === 0) {
        decorateSignupHref(target);
      }

      track('web_cta_click', {
        cta_name: ctaName,
        cta_position: ctaPosition,
        href: target.getAttribute('href') || href || null
      });
    }, { passive: true });
  }

  function setupFormTracking() {
    document.querySelectorAll('form').forEach((form) => {
      const formName = form.getAttribute('id') || form.getAttribute('name') || 'unnamed_form';
      if (/signup/i.test(formName)) {
        let signupStartTracked = false;
        form.addEventListener('focusin', function (event) {
          if (signupStartTracked) return;
          const field = event.target;
          if (!field || !/^(INPUT|SELECT|TEXTAREA)$/.test(field.tagName)) return;
          if (field.type === 'hidden' || field.type === 'submit') return;
          signupStartTracked = true;
          track('web_signup_start', { form_name: formName, trigger: 'first_field_interaction' });
        });
      }
      form.addEventListener('submit', function () {
        if (/demo|lead|contact/i.test(formName)) track('web_demo_request_submit', { form_name: formName });
      });
    });
  }

  addGtmIfConfigured();
  addGa4IfConfigured();

  window.FlowIQWebsiteAnalytics = {
    track
  };

  function init() {
    document.querySelectorAll('a[href^="/signup"]').forEach(decorateSignupHref);
    track('web_page_view', { entry_type: 'page_load' });
    setupClickTracking();
    setupFormTracking();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
