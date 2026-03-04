(function () {
  var runtimeConfig = window.FlowIQAnalyticsConfig || {};
  var clarityProjectId = runtimeConfig.clarityProjectId || '';

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
    var payload = params || {};
    trackEvent(eventName, payload);

    if (eventName === 'trial_signup_click') emitWebEvent('web_signup_start', { source: 'growth_analytics', trigger: 'trial_cta_click' });
    if (eventName === 'pricing_page_view') emitWebEvent('web_page_view', { source: 'growth_analytics', intent: 'pricing' });
    if (eventName === 'calculator_use') emitWebEvent('web_cta_click', { source: 'growth_analytics', cta_name: 'calculator_use' });
    if (eventName === 'demo_request') emitWebEvent('web_demo_request_submit', { source: 'growth_analytics' });
    if (eventName === 'contact_submit') emitWebEvent('web_demo_request_submit', { source: 'growth_analytics', subtype: 'contact_submit' });
    if (eventName === 'account_created') emitWebEvent('web_signup_complete', { source: 'growth_analytics' });
    if (eventName === 'landing_visit') emitWebEvent('web_page_view', { source: 'growth_analytics', funnel_step: 'landing' });
    if (eventName === 'module_view') emitWebEvent('web_cta_click', { source: 'growth_analytics', cta_name: 'module_view' });
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

  function installFunnelTracking() {
    var path = window.location.pathname;
    var title = document.title || '';

    if (path === '/' || path === '/index.html' || path === '/landing.html') {
      trackOncePerSession('landing_visit', 'landing_visit', { page_path: path, page_title: title });
    }

    if (path.indexOf('/pricing') >= 0) {
      trackOncePerSession('pricing_page_view', 'pricing_page_view', { page_path: path, page_title: title });
    }

    if (path.indexOf('/modules') >= 0) {
      trackOncePerSession('module_view_page', 'module_view', { module_name: 'modules_page', page_path: path });
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

      if (analyticsEvent) {
        trackGrowthEvent(analyticsEvent, {
          link_target: href || null,
          label: (target.textContent || '').trim().slice(0, 120),
          page_path: window.location.pathname
        });
        return;
      }

      if (href.indexOf('/signup') >= 0 || /start free trial|free trial|start trial/.test(text)) {
        trackGrowthEvent('trial_signup_click', { cta_text: text.slice(0, 120), page_path: window.location.pathname });
      }

      if (href.indexOf('/modules') >= 0 || href.indexOf('#') >= 0 && window.location.pathname.indexOf('/modules') >= 0) {
        trackGrowthEvent('module_view', { module_name: inferModuleNameFromHref(href), link_target: href });
      }

      if (href.indexOf('/tools/') >= 0 && href.indexOf('calculator') >= 0) {
        trackGrowthEvent('calculator_use', { tool_path: href });
      }
    }, { passive: true });
  }

  function installFormTracking() {
    document.querySelectorAll('form').forEach(function (form) {
      form.addEventListener('submit', function () {
        var formName = (form.getAttribute('name') || form.getAttribute('id') || '').toLowerCase();
        var action = (form.getAttribute('action') || '').toLowerCase();

        if (formName.indexOf('demo') >= 0 || action.indexOf('public-lead') >= 0) {
          trackGrowthEvent('demo_request', { form_name: formName || 'demo_form', page_path: window.location.pathname });
          return;
        }

        if (formName.indexOf('contact') >= 0) {
          trackGrowthEvent('contact_submit', { form_name: formName, page_path: window.location.pathname });
          return;
        }

        if (formName.indexOf('signup') >= 0) {
          trackGrowthEvent('trial_signup_click', { form_name: formName, page_path: window.location.pathname });
          return;
        }

        if (formName.indexOf('lead') >= 0 || formName.indexOf('calculator') >= 0) {
          trackGrowthEvent('calculator_use', { form_name: formName, page_path: window.location.pathname });
        }
      });
    });

    var calcSubmit = document.getElementById('calc-submit');
    if (calcSubmit) {
      calcSubmit.addEventListener('click', function () {
        trackGrowthEvent('calculator_use', { tool_path: window.location.pathname, trigger: 'calculate_button' });
      });
    }
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

    var softwareSchema = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'FlowIQ',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '29',
        priceCurrency: 'USD'
      }
    };

    var orgScript = document.createElement('script');
    orgScript.id = 'flowiq-org-schema';
    orgScript.type = 'application/ld+json';
    orgScript.text = JSON.stringify(orgSchema);
    document.head.appendChild(orgScript);

    var softwareScript = document.createElement('script');
    softwareScript.id = 'flowiq-software-schema';
    softwareScript.type = 'application/ld+json';
    softwareScript.text = JSON.stringify(softwareSchema);
    document.head.appendChild(softwareScript);

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
    installClarity();
  });
})();
