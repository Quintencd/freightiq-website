(function () {
  var runtimeConfig = window.FlowIQAnalyticsConfig || {};
  var clarityProjectId = runtimeConfig.clarityProjectId || '';

  function readBodyDataset(key, fallback) {
    try {
      if (!document.body || !document.body.dataset) return fallback || null;
      return document.body.dataset[key] || fallback || null;
    } catch (_) {
      return fallback || null;
    }
  }

  function inferSearchEngine(referrer) {
    if (!referrer) return null;
    var value = referrer.toLowerCase();
    if (value.indexOf('google.') >= 0) return 'google';
    if (value.indexOf('bing.com') >= 0) return 'bing';
    if (value.indexOf('duckduckgo.com') >= 0) return 'duckduckgo';
    if (value.indexOf('search.yahoo.com') >= 0) return 'yahoo';
    if (value.indexOf('baidu.com') >= 0) return 'baidu';
    return null;
  }

  function buildPageMetadata() {
    return {
      page_path: window.location.pathname,
      page_title: document.title || '',
      page_template: readBodyDataset('pageTemplate', 'marketing'),
      page_intent: readBodyDataset('pageIntent', 'general'),
      page_topic: readBodyDataset('pageTopic', 'flowiq'),
      search_engine: inferSearchEngine(document.referrer || ''),
      cta_position: readBodyDataset('defaultCtaPosition', null)
    };
  }

  function withPageMetadata(params, overrides) {
    return Object.assign({}, buildPageMetadata(), params || {}, overrides || {});
  }

  function safePushDataLayer(eventName, params) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: eventName }, params || {}));
  }

  function emitGa4(eventName, params) {
    try {
      if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, params || {});
      } else {
        safePushDataLayer(eventName, params || {});
      }
    } catch (_) {}
  }

  function emitWebEvent(mappedEvent, payload) {
    try {
      if (window.FlowIQWebsiteAnalytics && typeof window.FlowIQWebsiteAnalytics.track === 'function') {
        window.FlowIQWebsiteAnalytics.track(mappedEvent, payload || {});
      }
    } catch (_) {}
  }

  function trackEvent(eventName, params) {
    emitGa4(eventName, params || {});
  }

  function trackGrowthEvent(eventName, params) {
    var payload = withPageMetadata(params);
    trackEvent(eventName, payload);

    if (eventName === 'demo_click') emitWebEvent('web_demo_request_start', withPageMetadata({ source: 'growth_analytics', trigger: 'demo_cta_click' }, payload));
    if (eventName === 'pricing_book_demo_click') emitWebEvent('web_demo_request_start', withPageMetadata({ source: 'growth_analytics', trigger: 'pricing_module_demo_cta_click' }, payload));
    if (eventName === 'pricing_page_view') emitWebEvent('web_page_view', withPageMetadata({ source: 'growth_analytics', funnel_step: 'pricing' }, payload));
    if (eventName === 'view_pricing') emitWebEvent('web_pricing_view', withPageMetadata({ source: 'growth_analytics', trigger: 'pricing_cta_click' }, payload));
    if (eventName === 'pricing_base_plan_view') emitWebEvent('web_pricing_view', withPageMetadata({ source: 'growth_analytics', trigger: 'base_plan_visible' }, payload));
    if (eventName === 'pricing_toggle') emitWebEvent('web_pricing_view', withPageMetadata({ source: 'growth_analytics', trigger: 'billing_toggle' }, payload));
    if (eventName === 'calculator_open') emitWebEvent('web_cta_click', withPageMetadata({ source: 'growth_analytics', cta_name: 'calculator_open' }, payload));
    if (eventName === 'calculator_use') emitWebEvent('web_calculator_use', withPageMetadata({ source: 'growth_analytics' }, payload));
    if (eventName === 'module_preview_view') emitWebEvent('web_module_engagement', withPageMetadata({ source: 'growth_analytics', engagement_type: 'pricing_preview_visible' }, payload));
    if (eventName === 'module_preview_click') emitWebEvent('web_module_engagement', withPageMetadata({ source: 'growth_analytics', engagement_type: 'pricing_preview_click' }, payload));
    if (eventName === 'demo_request') emitWebEvent('web_demo_request_submit', withPageMetadata({ source: 'growth_analytics' }, payload));
    if (eventName === 'contact_submit') emitWebEvent('web_demo_request_submit', withPageMetadata({ source: 'growth_analytics', subtype: 'contact_submit' }, payload));
    if (eventName === 'account_created') emitWebEvent('web_signup_complete', withPageMetadata({ source: 'growth_analytics' }, payload));
    if (eventName === 'landing_visit') emitWebEvent('web_page_view', withPageMetadata({ source: 'growth_analytics', funnel_step: 'landing' }, payload));
    if (eventName === 'scroll_50_percent') emitWebEvent('web_scroll_depth', withPageMetadata({ source: 'growth_analytics', scroll_depth_pct: 50 }, payload));
    if (eventName === 'scroll_90_percent') emitWebEvent('web_scroll_depth', withPageMetadata({ source: 'growth_analytics', scroll_depth_pct: 90 }, payload));
    if (eventName === 'module_view') emitWebEvent('web_cta_click', withPageMetadata({ source: 'growth_analytics', cta_name: 'module_view' }, payload));
    if (eventName === 'module_engagement') emitWebEvent('web_module_engagement', withPageMetadata({ source: 'growth_analytics' }, payload));
    if (eventName === 'seo_landing_view') emitWebEvent('web_page_view', withPageMetadata({ source: 'growth_analytics', funnel_step: 'seo_landing', landing_channel: 'organic_search' }, payload));
    if (eventName === 'video_engagement') emitWebEvent('web_video_engagement', withPageMetadata({ source: 'growth_analytics' }, payload));
  }

  function getSessionFlagKey(suffix) {
    return 'flowiq_growth_' + suffix;
  }

  function trackOncePerSession(flag, eventName, params) {
    try {
      var key = getSessionFlagKey(flag);
      if (sessionStorage.getItem(key) === '1') return;
      sessionStorage.setItem(key, '1');
      trackGrowthEvent(eventName, params || {});
    } catch (_) {
      trackGrowthEvent(eventName, params || {});
    }
  }

  function inferModuleNameFromHref(href) {
    if (!href) return 'unknown_module';
    var cleaned = href.toLowerCase();
    if (cleaned.indexOf('/modules/') >= 0) {
      var parts = cleaned.split('/modules/')[1].split(/[?#]/)[0].replace('.html', '');
      return parts || 'module_page';
    }
    if (cleaned.indexOf('#') >= 0) return cleaned.split('#')[1] || 'module_anchor';
    return 'module_link';
  }

  function isDemoCta(href, text, analyticsEvent, analyticsCtaLabel) {
    var label = String(analyticsCtaLabel || '').toLowerCase();
    return analyticsEvent === 'demo_click' ||
      (analyticsEvent === 'demo_request' && href.indexOf('/book-demo') >= 0) ||
      href.indexOf('/book-demo') >= 0 ||
      /book a? demo|book demo|request plan walkthrough/.test(text || '') ||
      label.indexOf('book demo') >= 0 ||
      label.indexOf('final demo') >= 0;
  }

  function installFunnelTracking() {
    var path = window.location.pathname;
    var title = document.title || '';
    var searchEngine = inferSearchEngine(document.referrer || '');

    if (path === '/' || path === '/index.html' || path === '/landing.html') {
      trackOncePerSession('landing_visit', 'landing_visit', { page_path: path, page_title: title });
    }

    if (path.indexOf('/pricing') >= 0) {
      trackOncePerSession('pricing_page_view', 'pricing_page_view', { page_path: path, page_title: title });
    }

    if (path.indexOf('/modules') >= 0) {
      trackOncePerSession('module_view_page', 'module_view', { module_name: 'modules_page', page_path: path });
    }

    if (readBodyDataset('pageTemplate', '') === 'seo-landing' && searchEngine) {
      trackOncePerSession('seo_landing_' + path, 'seo_landing_view', {
        landing_channel: 'organic_search',
        search_engine: searchEngine
      });
    }
  }

  function installScrollTracking() {
    var did50 = false;
    var did90 = false;

    function onScroll() {
      var doc = document.documentElement;
      var height = Math.max(doc.scrollHeight - window.innerHeight, 1);
      var percent = Math.round((window.scrollY / height) * 100);

      if (!did50 && percent >= 50) {
        did50 = true;
        trackGrowthEvent('scroll_50_percent', { scroll_percent: 50, page_path: window.location.pathname });
      }
      if (!did90 && percent >= 90) {
        did90 = true;
        trackGrowthEvent('scroll_90_percent', { scroll_percent: 90, page_path: window.location.pathname });
      }
      if (did50 && did90) {
        window.removeEventListener('scroll', onScroll);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function installClickTracking() {
    document.addEventListener('click', function (event) {
      var target = event.target && event.target.closest ? event.target.closest('a,button') : null;
      if (!target) return;

      var href = target.getAttribute('href') || '';
      var text = (target.textContent || '').trim().toLowerCase();
      var analyticsEvent = target.getAttribute('data-analytics-event');
      var analyticsCta = target.getAttribute('data-analytics-cta');
      var commonParams = {
        link_target: href || null,
        label: (target.getAttribute('data-analytics-label') || analyticsCta || (target.textContent || '').trim()).slice(0, 120),
        cta_position: target.getAttribute('data-analytics-position') || null,
        cta_context: target.getAttribute('data-analytics-context') || readBodyDataset('pageIntent', null),
        page_path: window.location.pathname
      };

      if (analyticsEvent) {
        if (analyticsEvent === 'demo_request' && href.indexOf('/book-demo') >= 0) {
          trackGrowthEvent('demo_click', Object.assign({}, commonParams, { cta_text: text.slice(0, 120) }));
          return;
        }
        if (analyticsEvent === 'calculator_use' && target.tagName === 'A') {
          trackGrowthEvent('calculator_open', Object.assign({}, commonParams, { tool_path: href }));
          return;
        }
        if (analyticsEvent === 'calculator_use') {
          trackGrowthEvent(analyticsEvent, Object.assign({}, commonParams, {
            calculator_id: target.getAttribute('data-calculator-id') ||
              window.location.pathname.split('/').pop().replace('.html', '') ||
              'website_calculator',
            trigger: 'calculate_button'
          }));
          return;
        }
        trackGrowthEvent(analyticsEvent, commonParams);
        return;
      }

      if (isDemoCta(href, text, analyticsEvent, analyticsCta)) {
        trackGrowthEvent('demo_click', Object.assign({}, commonParams, { cta_text: text.slice(0, 120) }));
        return;
      }

      if (href.indexOf('/signup') >= 0 || /start free trial|free trial|start trial/.test(text)) {
        trackGrowthEvent('trial_signup_click', Object.assign({}, commonParams, { cta_text: text.slice(0, 120) }));
      }

      if (href.indexOf('/modules') >= 0 || href.indexOf('#') >= 0 && window.location.pathname.indexOf('/modules') >= 0) {
        trackGrowthEvent('module_view', Object.assign({}, commonParams, { module_name: inferModuleNameFromHref(href) }));
      }

      if (href.indexOf('/tools/') >= 0 && href.indexOf('calculator') >= 0) {
        trackGrowthEvent('calculator_open', Object.assign({}, commonParams, { tool_path: href }));
      }
    }, { passive: true });
  }

  function installFormTracking() {
    document.querySelectorAll('form').forEach(function (form) {
      form.addEventListener('submit', function () {
        var formName = (form.getAttribute('name') || form.getAttribute('id') || '').toLowerCase();
        var action = (form.getAttribute('action') || '').toLowerCase();
        var formParams = {
          form_name: formName || 'unnamed_form',
          page_path: window.location.pathname,
          cta_position: form.getAttribute('data-analytics-position') || 'form_submit'
        };

        if (formName.indexOf('demo') >= 0 || action.indexOf('public-lead') >= 0) {
          trackGrowthEvent('demo_request', formParams);
          return;
        }

        if (formName.indexOf('contact') >= 0) {
          trackGrowthEvent('contact_submit', formParams);
          return;
        }

        if (formName.indexOf('signup') >= 0) {
          trackGrowthEvent('trial_signup_click', formParams);
          return;
        }

        if (formName.indexOf('lead') >= 0 || formName.indexOf('calculator') >= 0) {
          trackGrowthEvent('calculator_use', formParams);
        }
      });
    });

  }

  function installVideoTracking() {
    var trackedMilestones = {};

    function videoPayload(video, action, extra) {
      return Object.assign({
        video_id: video.getAttribute('id') || video.getAttribute('data-video-id') || 'flowiq_video',
        video_action: action,
        video_src: video.currentSrc || video.querySelector('source')?.getAttribute('src') || null,
        page_path: window.location.pathname
      }, extra || {});
    }

    document.querySelectorAll('[data-video-open]').forEach(function (button) {
      button.addEventListener('click', function () {
        trackGrowthEvent('video_engagement', {
          video_action: 'open',
          video_id: button.getAttribute('data-video-id') || button.getAttribute('aria-label') || 'flowiq_video_modal',
          cta_position: button.getAttribute('data-analytics-position') || 'video_preview',
          page_path: window.location.pathname
        });
      });
    });

    document.querySelectorAll('video[id], video[data-video-id], video[controls]').forEach(function (video) {
      var id = video.getAttribute('id') || video.getAttribute('data-video-id') || video.currentSrc || 'flowiq_video';
      trackedMilestones[id] = {};

      video.addEventListener('play', function () {
        trackGrowthEvent('video_engagement', videoPayload(video, 'play'));
      });

      video.addEventListener('ended', function () {
        trackGrowthEvent('video_engagement', videoPayload(video, 'complete'));
      });

      video.addEventListener('timeupdate', function () {
        if (!video.duration || !isFinite(video.duration)) return;
        var pct = Math.floor((video.currentTime / video.duration) * 100);
        [25, 50, 75].forEach(function (mark) {
          if (pct < mark || trackedMilestones[id][mark]) return;
          trackedMilestones[id][mark] = true;
          trackGrowthEvent('video_engagement', videoPayload(video, 'progress', { video_progress_pct: mark }));
        });
      });
    });
  }

  function installModuleEngagementTracking() {
    if (!('IntersectionObserver' in window)) return;

    var candidates = Array.prototype.slice.call(document.querySelectorAll('[data-module-engagement], .flow-card, a[href*="/modules/"]'));
    if (!candidates.length) return;

    var seen = new Set();
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var target = entry.target;
        var label = target.getAttribute('data-module-engagement') ||
          target.querySelector('strong')?.textContent ||
          target.textContent ||
          target.getAttribute('href') ||
          'module_engagement';
        label = label.trim().slice(0, 80);
        if (seen.has(label)) {
          observer.unobserve(target);
          return;
        }
        seen.add(label);
        trackGrowthEvent('module_engagement', {
          module_name: label,
          engagement_type: 'visible',
          page_path: window.location.pathname
        });
        observer.unobserve(target);
      });
    }, { threshold: 0.55, rootMargin: '0px 0px -10% 0px' });

    candidates.forEach(function (item) {
      observer.observe(item);
    });
  }

  function installSchema() {
    if (document.getElementById('flowiq-org-schema')) return;

    var orgSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'FlowIQ',
      url: 'https://www.flowiq.info',
      logo: 'https://www.flowiq.info/flowiq-logo.png',
      sameAs: ['https://linkedin.com/company/flowiq']
    };

    var websiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'FlowIQ',
      url: 'https://www.flowiq.info/',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://www.flowiq.info/glossary/{search_term_string}.html',
        'query-input': 'required name=search_term_string'
      }
    };

    var orgScript = document.createElement('script');
    orgScript.id = 'flowiq-org-schema';
    orgScript.type = 'application/ld+json';
    orgScript.text = JSON.stringify(orgSchema);
    document.head.appendChild(orgScript);

    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
      var websiteScript = document.createElement('script');
      websiteScript.id = 'flowiq-website-schema';
      websiteScript.type = 'application/ld+json';
      websiteScript.text = JSON.stringify(websiteSchema);
      document.head.appendChild(websiteScript);
    }

    if (window.location.pathname.indexOf('calculator') >= 0) {
      var toolSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: document.title.replace(/\s*\|.*$/, ''),
        applicationCategory: 'FinanceApplication'
      };
      var toolScript = document.createElement('script');
      toolScript.id = 'flowiq-tool-schema';
      toolScript.type = 'application/ld+json';
      toolScript.text = JSON.stringify(toolSchema);
      document.head.appendChild(toolScript);
    }
  }

  function installClarity() {
    if (!clarityProjectId) return;
    if (window.clarity) return;

    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r);
      t.async = 1;
      t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', clarityProjectId);
  }

  window.trackEvent = trackEvent;
  window.FlowIQGrowthAnalytics = {
    trackEvent: trackGrowthEvent,
    trackAccountCreated: function (params) { trackGrowthEvent('account_created', params || {}); }
  };

  document.addEventListener('DOMContentLoaded', function () {
    installSchema();
    installFunnelTracking();
    installScrollTracking();
    installClickTracking();
    installFormTracking();
    installVideoTracking();
    installModuleEngagementTracking();
    installClarity();
  });
})();
