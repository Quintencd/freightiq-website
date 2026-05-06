(function () {
  const ENDPOINT = 'https://yvbhjlmvpipniedwvdji.supabase.co/functions/v1/public-website-analytics';
  const SESSION_KEY = 'flowiq_website_session_id';
  const SCROLL_MARKS = [25, 50, 75, 90];
  const sentScrollMarks = new Set();

  function uuid() {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') return window.crypto.randomUUID();
    return `web_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  }

  function getSessionId() {
    try {
      const existing = window.sessionStorage.getItem(SESSION_KEY);
      if (existing) return existing;
      const next = uuid();
      window.sessionStorage.setItem(SESSION_KEY, next);
      return next;
    } catch (_) {
      return uuid();
    }
  }

  function deviceType() {
    const ua = navigator.userAgent || '';
    if (/tablet|ipad/i.test(ua)) return 'tablet';
    if (/mobi|android|iphone|ipod/i.test(ua)) return 'mobile';
    return 'desktop';
  }

  function params() {
    const search = new URLSearchParams(window.location.search || '');
    return {
      utm_source: search.get('utm_source'),
      utm_medium: search.get('utm_medium'),
      utm_campaign: search.get('utm_campaign'),
      utm_term: search.get('utm_term'),
      utm_content: search.get('utm_content')
    };
  }

  function baseEventData(extra) {
    const host = window.location.hostname;
    return {
      ...params(),
      ...extra,
      session_id: getSessionId(),
      referrer: document.referrer || null,
      page_path: window.location.pathname,
      page_url: window.location.href,
      page_title: document.title,
      site_hostname: host,
      site_environment: /(^|\.)flowiq\.info$/i.test(host) ? 'production' : 'preview',
      device_type: deviceType(),
      browser_language: navigator.language || null,
      viewport_width: window.innerWidth || null,
      viewport_height: window.innerHeight || null
    };
  }

  function send(eventType, eventData) {
    const payload = JSON.stringify({
      event_type: eventType,
      event_data: baseEventData(eventData || {})
    });
    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon(ENDPOINT, new Blob([payload], { type: 'application/json' }));
        return;
      }
      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        credentials: 'omit',
        keepalive: true
      }).catch(function () {});
    } catch (_) {}
  }

  function classifyCta(element) {
    const label = (element.dataset.analyticsCta || element.textContent || '').trim().slice(0, 120);
    const href = element.getAttribute('href') || '';
    if (/signup/i.test(href) || /sign\s*up|trial|get started/i.test(label)) return { type: 'signup', label, href };
    if (/demo|book/i.test(href + label)) return { type: 'demo', label, href };
    if (/pricing/i.test(href + label)) return { type: 'pricing', label, href };
    if (/calculator|savings|roi/i.test(href + label)) return { type: 'calculator', label, href };
    return { type: 'cta', label, href };
  }

  document.addEventListener('click', function (event) {
    const target = event.target && event.target.closest
      ? event.target.closest('a,button,[data-analytics-cta]')
      : null;
    if (!target) return;
    const cta = classifyCta(target);
    if (!cta.label && !cta.href) return;
    send('web_cta_click', {
      cta_type: cta.type,
      cta_label: cta.label,
      cta_href: cta.href,
      page_section: target.closest('section')?.id || null
    });
    if (cta.type === 'demo') send('web_demo_request_start', { cta_label: cta.label, cta_href: cta.href });
    if (cta.type === 'pricing') send('web_pricing_view', { cta_label: cta.label, cta_href: cta.href });
  }, { passive: true });

  document.addEventListener('input', function (event) {
    const target = event.target;
    if (!target || !target.closest || !target.closest('[data-calculator]')) return;
    const calculator = target.closest('[data-calculator]');
    send('web_calculator_use', {
      calculator_id: calculator.getAttribute('data-calculator'),
      input_name: target.name || target.id || null
    });
  }, { passive: true });

  window.addEventListener('scroll', function () {
    const height = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const pct = Math.round((window.scrollY / height) * 100);
    SCROLL_MARKS.forEach(function (mark) {
      if (pct >= mark && !sentScrollMarks.has(mark)) {
        sentScrollMarks.add(mark);
        send('web_scroll_depth', { scroll_depth_pct: mark });
      }
    });
  }, { passive: true });

  window.FlowIQWebsiteAnalytics = { track: send };
  send('web_page_view', {
    content_group: document.body.getAttribute('data-content-group') || null,
    landing_page_variant: document.body.getAttribute('data-landing-variant') || null
  });
}());
