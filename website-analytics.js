(function () {
  if (window.__flowiqWebsiteAnalyticsBootstrapLoaded) return;
  window.__flowiqWebsiteAnalyticsBootstrapLoaded = true;

  var DEFAULT_CONFIG = {
    gtmContainerId: 'GTM-5L45DPGL',
    ga4MeasurementId: 'G-1QJKZJ7V0T',
    clarityProjectId: 'vqjuz4ha1k'
  };

  function ensureRuntimeConfig() {
    if (window.FlowIQAnalyticsConfig && typeof window.FlowIQAnalyticsConfig === 'object') return;
    window.FlowIQAnalyticsConfig = DEFAULT_CONFIG;
  }

  function hasScriptSrc(srcPath) {
    try {
      var scripts = document.getElementsByTagName('script');
      for (var i = 0; i < scripts.length; i += 1) {
        var raw = scripts[i].getAttribute('src') || '';
        if (!raw) continue;
        var normalized = raw.split('?')[0].split('#')[0];
        if (normalized === srcPath) return true;
      }
    } catch (_) {}
    return false;
  }

  function loadScript(src, onload) {
    if (hasScriptSrc(src)) {
      if (typeof onload === 'function') onload();
      return;
    }

    var script = document.createElement('script');
    script.src = src;
    script.async = false;
    script.defer = true;
    script.onload = function () {
      if (typeof onload === 'function') onload();
    };
    script.onerror = function () {
      if (typeof onload === 'function') onload();
    };

    document.head.appendChild(script);
  }

  ensureRuntimeConfig();

  loadScript('/assets/website-analytics.js', function () {
    loadScript('/assets/growth-analytics.js');
  });
}());
