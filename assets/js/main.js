/* FlowIQ Marketing Site - Main JS */
(function () {
  'use strict';

  function initStoryReveals() {
    var items = Array.prototype.slice.call(document.querySelectorAll('.story-reveal'));
    if (!items.length) return;

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach(function (item) {
        item.classList.add('is-visible');
      });
      return;
    }

    if (!('IntersectionObserver' in window)) {
      items.forEach(function (item) {
        item.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });

    items.forEach(function (item) {
      observer.observe(item);
    });
  }

  window.FlowIQStoryReveal = initStoryReveals;

  var LIGHT_CSS_VERSION = '24';
  var PREMIUM_SITE_CSS_VERSION = '3';

  function getPageFamily(pathname) {
    var path = pathname || window.location.pathname || '/';
    if (path === '/' || path === '/index.html') return 'home';
    if (/^\/pricing(?:\.html)?\/?$/.test(path)) return 'pricing';
    if (path === '/modules' || path === '/modules.html' || path.indexOf('/modules/') === 0) return 'modules';
    if (path.indexOf('/solutions/') === 0) return 'solutions';
    if (path.indexOf('/customers/') === 0) return 'customers';
    if (path === '/walkthroughs' || path === '/walkthroughs/' || path.indexOf('/walkthroughs/') === 0) return 'walkthroughs';
    if (path.indexOf('/tools/') === 0 || path.indexOf('calculator') !== -1) return 'tools';
    if (path.indexOf('/compare/') === 0 || path.indexOf('/flowiq-vs-') === 0) return 'compare';
    if (path.indexOf('/glossary/') === 0) return 'glossary';
    if (path.indexOf('/use-cases/') === 0) return 'use-cases';
    if (/software|erp-|inventory|forecast|landed-cost|stock-|bookkeeping|accounting|payroll|freight|import-cost|spreadsheet/.test(path)) return 'article';
    if (/privacy|terms/.test(path)) return 'legal';
    if (/signup|login|book-demo|thank-you/.test(path)) return 'conversion';
    return 'standard';
  }

  function normalizeWebsiteShell() {
    var family = getPageFamily(window.location.pathname);
    document.body.classList.add('marketing-shell', 'premium-light-page', 'fiq-family-' + family);
    document.body.setAttribute('data-page-family', family);

    var normalizedPath = (window.location.pathname || '/').replace(/\/index\.html$/, '/');
    if (
      /^\/(compare|glossary)\/?$/.test(normalizedPath) ||
      /^\/use-cases\/(?:[^/]+(?:\.html)?)?$/.test(normalizedPath)
    ) {
      document.body.classList.add('fiq-editorial-index');
    }

    if (!document.querySelector('.site-atmosphere')) {
      var atmosphere = document.createElement('div');
      atmosphere.className = 'site-atmosphere fixed inset-0 z-[-1] h-full w-full';
      atmosphere.setAttribute('aria-hidden', 'true');
      document.body.insertBefore(atmosphere, document.body.firstChild);
    }

    var main = document.querySelector('main');
    if (main) {
      main.classList.add('premium-main');
      var firstSection = main.querySelector(':scope > section:first-child');
      if (firstSection && !firstSection.classList.contains('fresh-hero')) {
        firstSection.classList.add('fiq-auto-hero');
      }
      main.querySelectorAll(':scope > article, :scope > section:not(.fresh-hero):not(.fresh-section):not(.fresh-flow-band):not(.fresh-cta)').forEach(function (section) {
        if (!section.classList.contains('story-card') && !section.classList.contains('homepage-live-flow-section')) {
          section.classList.add('fiq-premium-section');
        }
      });
    }

    document.querySelectorAll('form').forEach(function (form) {
      form.classList.add('fiq-premium-form');
    });
  }

  function ensureSiteStyles() {
    if (!document.getElementById('flowiq-nav-critical-css')) {
      var style = document.createElement('style');
      style.id = 'flowiq-nav-critical-css';
      style.textContent = '.nav-dropdown{position:relative}.nav-dropdown__menu{position:absolute;top:100%;left:50%;z-index:10000;transform:translateX(-50%) translateY(.5rem);opacity:0;visibility:hidden;pointer-events:none}.nav-dropdown:hover .nav-dropdown__menu,.nav-dropdown:focus-within .nav-dropdown__menu,.nav-dropdown.is-open .nav-dropdown__menu{opacity:1;visibility:visible;pointer-events:auto;transform:translateX(-50%) translateY(0)}';
      document.head.appendChild(style);
    }

    if (!document.getElementById('flowiq-compact-type-scale-css')) {
      var compactType = document.createElement('style');
      compactType.id = 'flowiq-compact-type-scale-css';
      compactType.textContent = [
        '.premium-light-page .fresh-home{padding-top:clamp(5.6rem,7vw,6.6rem)!important}',
        '.fiq-family-home .fresh-hero{min-height:auto!important;gap:clamp(1.25rem,3vw,2.5rem)!important;padding-block:clamp(.75rem,2.2vw,1.6rem)!important}',
        '.fiq-family-home .fresh-hero h1{max-width:38rem!important;font-size:clamp(2.2rem,3.25vw,3.35rem)!important;line-height:1.05!important;letter-spacing:0!important}',
        '.fiq-family-home .fresh-hero p{font-size:clamp(1rem,1.45vw,1.18rem)!important;line-height:1.55!important}',
        '.fiq-family-home .homepage-tour-band h2,.fiq-family-home .fresh-flow-band h2,.fiq-family-home .fresh-section h2,.fiq-family-home .fresh-cta h2{font-size:clamp(1.55rem,2.45vw,2.5rem)!important;line-height:1.08!important;letter-spacing:0!important}',
        '.premium-light-page .solution-conversion-hero{padding:clamp(1.15rem,2.4vw,1.9rem)!important;gap:clamp(1rem,2.3vw,1.8rem)!important}',
        '.premium-light-page .solution-conversion-hero h1{max-width:18ch!important;font-size:clamp(1.85rem,2.55vw,2.65rem)!important;line-height:1.1!important;letter-spacing:0!important}',
        '.premium-light-page .solution-conversion-hero p{font-size:clamp(1rem,1.35vw,1.12rem)!important;line-height:1.55!important}',
        '.premium-light-page .fiq-auto-hero :where(h1,h2){font-size:clamp(1.9rem,2.9vw,3rem)!important;line-height:1.08!important;letter-spacing:0!important}',
        '.premium-light-page .fiq-redesign-title{font-size:clamp(2rem,3.15vw,3.25rem)!important;line-height:1.06!important;letter-spacing:0!important}',
        '.fiq-family-pricing #scale-path,.fiq-family-pricing h1{font-size:clamp(1.95rem,2.9vw,3rem)!important;line-height:1.08!important}',
        '.fiq-family-article h1,.fiq-family-glossary h1,.fiq-family-compare h1,.fiq-family-use-cases h1,.fiq-family-legal h1{font-size:clamp(1.9rem,3vw,3.1rem)!important;line-height:1.1!important}',
        '.premium-light-page main > :where(section,article):first-of-type :where(h1,.fiq-redesign-title){font-size:clamp(1.9rem,3vw,3.1rem)!important;line-height:1.08!important;letter-spacing:0!important}',
        '@media(max-width:720px){.fiq-family-home .fresh-hero h1,.premium-light-page .fiq-auto-hero :where(h1,h2),.premium-light-page .solution-conversion-hero h1,.premium-light-page .fiq-redesign-title,.premium-light-page main > :where(section,article):first-of-type :where(h1,.fiq-redesign-title){font-size:clamp(1.9rem,8vw,2.45rem)!important;line-height:1.08!important;max-width:none!important}}'
      ].join('');
      document.head.appendChild(compactType);
    }

    var hasStyles = false;
    Array.prototype.forEach.call(document.querySelectorAll('link[rel="stylesheet"]'), function (link) {
      if (!/\/flowiq-light\.css(?:\?|$)/.test(link.getAttribute('href') || '')) return;
      hasStyles = true;
      link.setAttribute('href', '/flowiq-light.css?v=' + LIGHT_CSS_VERSION);
    });

    if (hasStyles) return;

    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/flowiq-light.css?v=' + LIGHT_CSS_VERSION;
    document.head.appendChild(link);
  }

  function ensureLucideScript() {
    if (window.lucide || document.querySelector('script[src*="unpkg.com/lucide"]')) return;
    var script = document.createElement('script');
    script.src = 'https://unpkg.com/lucide@latest';
    script.defer = true;
    script.addEventListener('load', function () {
      if (window.lucide) window.lucide.createIcons();
    });
    document.head.appendChild(script);
  }

  function ensurePremiumSiteStyles() {
    var existing = document.getElementById('flowiq-premium-site-css');
    if (existing) {
      existing.setAttribute('href', '/assets/css/site-premium.css?v=' + PREMIUM_SITE_CSS_VERSION);
      return;
    }

    var link = document.createElement('link');
    link.id = 'flowiq-premium-site-css';
    link.rel = 'stylesheet';
    link.href = '/assets/css/site-premium.css?v=' + PREMIUM_SITE_CSS_VERSION;
    document.head.appendChild(link);
  }

  function getSiteNav() {
    return '' +
      '<nav class="fixed w-full z-50 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm supports-[backdrop-filter]:bg-white/60">' +
        '<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">' +
          '<div class="flex justify-between items-center h-20 gap-2">' +
            '<div class="flex items-center min-w-0 flex-shrink">' +
              '<a href="/" class="flex items-center gap-2 group min-w-0">' +
                '<img src="/flowiq-logo.png" alt="FlowIQ - Smarter business in motion" class="h-[52px] w-auto max-w-[205px] object-contain group-hover:opacity-90 transition-opacity duration-300" width="205" height="52" loading="eager">' +
              '</a>' +
            '</div>' +
            '<div class="hidden md:flex items-center space-x-6 flex-shrink-0">' +
              '<a href="/" class="text-slate-600 hover:text-orange-600 font-medium transition-colors text-sm uppercase tracking-wide">Home</a>' +
              '<div class="nav-dropdown">' +
                '<button type="button" class="nav-dropdown__trigger">Solutions <i data-lucide="chevron-down" class="w-4 h-4"></i></button>' +
                '<div class="nav-dropdown__menu">' +
                  '<div class="nav-dropdown__panel">' +
                    '<div class="nav-dropdown__links">' +
                      '<a class="nav-dropdown__link" href="/solutions/importers.html"><i data-lucide="ship" class="w-5 h-5"></i><span><strong>Importers</strong><br><small>Landed cost, shipments, and margin</small></span></a>' +
                      '<a class="nav-dropdown__link" href="/solutions/retail-outlets.html"><i data-lucide="shopping-bag" class="w-5 h-5"></i><span><strong>Retail</strong><br><small>Stock, sales, and ecommerce</small></span></a>' +
                      '<a class="nav-dropdown__link" href="/solutions/multi-branch.html"><i data-lucide="network" class="w-5 h-5"></i><span><strong>Multi-branch</strong><br><small>Locations, inventory, and visibility</small></span></a>' +
                      '<a class="nav-dropdown__link" href="/solutions/manufacturers.html"><i data-lucide="factory" class="w-5 h-5"></i><span><strong>Manufacturing</strong><br><small>Production, costing, and stock flow</small></span></a>' +
                      '<a class="nav-dropdown__link" href="/solutions/rfid-stock-tracking.html"><i data-lucide="scan-line" class="w-5 h-5"></i><span><strong>RFID stock tracking</strong><br><small>Scan proof for stock movement</small></span></a>' +
                    '</div>' +
                  '</div>' +
                '</div>' +
              '</div>' +
              '<div class="nav-dropdown nav-dropdown--modules">' +
                '<button type="button" class="nav-dropdown__trigger">Modules <i data-lucide="chevron-down" class="w-4 h-4"></i></button>' +
                '<div class="nav-dropdown__menu nav-dropdown__menu--modules">' +
                  '<div class="nav-dropdown__panel modules-mega-menu">' +
                    '<div class="modules-mega-menu__intro">' +
                      '<span>Explore FlowIQ</span>' +
                      '<strong>More than 30 connected capabilities.</strong>' +
                      '<p>Build the operating system your business needs now, then add specialist workflows without creating another silo.</p>' +
                      '<a href="/modules">View every module <i data-lucide="arrow-right" class="w-4 h-4"></i></a>' +
                    '</div>' +
                    '<div class="modules-mega-menu__group">' +
                      '<span>Run the business</span>' +
                      '<a href="/modules/dashboardiq.html"><i data-lucide="layout-dashboard"></i><span><strong>DashboardIQ</strong><small>Executive control</small></span></a>' +
                      '<a href="/modules/salesiq.html"><i data-lucide="target"></i><span><strong>SalesIQ</strong><small>Pipeline and follow-up</small></span></a>' +
                      '<a href="/modules/inventoryiq.html"><i data-lucide="boxes"></i><span><strong>InventoryIQ</strong><small>Stock and cost truth</small></span></a>' +
                      '<a href="/modules/accountingiq.html"><i data-lucide="calculator"></i><span><strong>AccountingIQ</strong><small>Finance and close</small></span></a>' +
                    '</div>' +
                    '<div class="modules-mega-menu__group">' +
                      '<span>Plan and execute</span>' +
                      '<a href="/modules/importiq.html"><i data-lucide="ship"></i><span><strong>ImportIQ</strong><small>Landed cost control</small></span></a>' +
                      '<a href="/modules/forecastiq.html"><i data-lucide="trending-up"></i><span><strong>ForecastIQ</strong><small>Demand and replenishment</small></span></a>' +
                      '<a href="/modules/manufacturing.html"><i data-lucide="factory"></i><span><strong>Manufacturing</strong><small>BOMs and work orders</small></span></a>' +
                      '<a href="/modules/projectsiq.html"><i data-lucide="folder-kanban"></i><span><strong>ProjectsIQ</strong><small>Work, cost, and proof</small></span></a>' +
                    '</div>' +
                    '<div class="modules-mega-menu__group modules-mega-menu__group--accent">' +
                      '<span>Automate and extend</span>' +
                      '<a href="/modules/ai-auto-capture.html"><i data-lucide="sparkles"></i><span><strong>AI Auto Capture</strong><small>Email-to-review queues</small></span></a>' +
                      '<a href="/modules/agentsiq.html"><i data-lucide="bot"></i><span><strong>AgentsIQ</strong><small>Guarded AI assistance</small></span></a>' +
                      '<a href="/modules/rfid-stock-tracking.html"><i data-lucide="scan-line"></i><span><strong>RFID Stock Tracking</strong><small>Supervised scan evidence</small></span></a>' +
                      '<a href="/modules/business-units.html"><i data-lucide="network"></i><span><strong>Business Units</strong><small>Local control, group view</small></span></a>' +
                    '</div>' +
                  '</div>' +
                '</div>' +
              '</div>' +
              '<a href="/walkthroughs" class="text-slate-600 hover:text-orange-600 font-medium transition-colors text-sm uppercase tracking-wide">Walkthroughs</a>' +
              '<a href="/tools/" class="text-slate-600 hover:text-orange-600 font-medium transition-colors text-sm uppercase tracking-wide">Tools</a>' +
              '<a href="/pricing" class="text-slate-600 hover:text-orange-600 font-medium transition-colors text-sm uppercase tracking-wide">Pricing</a>' +
              '<a href="https://app.flowiq.info/login" class="text-slate-600 hover:text-orange-600 font-semibold transition-colors text-sm uppercase tracking-wide">Login</a>' +
              '<a href="/signup" class="bg-freight-orange hover:bg-freight-orange-dark text-white px-6 py-2.5 rounded-full font-semibold shadow-lg shadow-orange-500/20 transition-all hover:shadow-orange-500/40 hover:-translate-y-0.5">Start Free Trial</a>' +
            '</div>' +
            '<button id="mobileMenuBtn" class="md:hidden flex-shrink-0 p-3 -mr-1 text-slate-600 hover:text-slate-900 touch-manipulation" aria-label="Open menu"><i data-lucide="menu" class="w-6 h-6"></i></button>' +
          '</div>' +
        '</div>' +
        '<div id="mobileMenu" class="md:hidden hidden border-t border-slate-200 bg-white/95 backdrop-blur-md absolute w-full left-0 top-20 shadow-xl">' +
          '<div class="px-6 py-6 space-y-4">' +
            '<a href="/" class="block text-slate-600 hover:text-orange-600 font-medium text-lg">Home</a>' +
            '<div class="mobile-solutions-group mobile-nav-group">' +
              '<button type="button" class="mobile-solutions-toggle" aria-expanded="false" aria-controls="mobileSolutionsPanel">Solutions <i data-lucide="chevron-down" class="w-5 h-5"></i></button>' +
              '<div id="mobileSolutionsPanel" class="mobile-solutions-panel" hidden>' +
                '<a href="/solutions/importers.html"><i data-lucide="ship" class="w-4 h-4"></i><span><strong>Importers</strong><small>Landed cost, shipments, and margin</small></span></a>' +
                '<a href="/solutions/retail-outlets.html"><i data-lucide="shopping-bag" class="w-4 h-4"></i><span><strong>Retail</strong><small>Stock, sales, and ecommerce</small></span></a>' +
                '<a href="/solutions/multi-branch.html"><i data-lucide="network" class="w-4 h-4"></i><span><strong>Multi-branch</strong><small>Locations, inventory, and visibility</small></span></a>' +
                '<a href="/solutions/manufacturers.html"><i data-lucide="factory" class="w-4 h-4"></i><span><strong>Manufacturing</strong><small>Production, costing, and stock flow</small></span></a>' +
                '<a href="/solutions/rfid-stock-tracking.html"><i data-lucide="scan-line" class="w-4 h-4"></i><span><strong>RFID stock tracking</strong><small>Scan proof for stock movement</small></span></a>' +
              '</div>' +
            '</div>' +
            '<div class="mobile-solutions-group mobile-nav-group">' +
              '<button type="button" class="mobile-solutions-toggle" aria-expanded="false" aria-controls="mobileModulesPanel">Modules <i data-lucide="chevron-down" class="w-5 h-5"></i></button>' +
              '<div id="mobileModulesPanel" class="mobile-solutions-panel" hidden>' +
                '<a href="/modules"><i data-lucide="grid-2x2" class="w-4 h-4"></i><span><strong>Explore all modules</strong><small>Browse more than 30 capabilities</small></span></a>' +
                '<a href="/modules/ai-auto-capture.html"><i data-lucide="sparkles" class="w-4 h-4"></i><span><strong>AI Auto Capture</strong><small>Incoming document review queues</small></span></a>' +
                '<a href="/modules/importiq.html"><i data-lucide="ship" class="w-4 h-4"></i><span><strong>ImportIQ</strong><small>Landed cost and shipments</small></span></a>' +
                '<a href="/modules/inventoryiq.html"><i data-lucide="boxes" class="w-4 h-4"></i><span><strong>InventoryIQ</strong><small>Stock and cost control</small></span></a>' +
                '<a href="/modules/accountingiq.html"><i data-lucide="calculator" class="w-4 h-4"></i><span><strong>AccountingIQ</strong><small>Finance and reporting</small></span></a>' +
              '</div>' +
            '</div>' +
            '<a href="/walkthroughs" class="block text-slate-600 hover:text-orange-600 font-medium text-lg">Walkthroughs</a>' +
            '<a href="/tools/" class="block text-slate-600 hover:text-orange-600 font-medium text-lg">Tools</a>' +
            '<a href="/pricing" class="block text-slate-600 hover:text-orange-600 font-medium text-lg">Pricing</a>' +
            '<a href="https://app.flowiq.info/login" class="block text-slate-600 hover:text-orange-600 font-medium text-lg">Login</a>' +
            '<a href="/signup" class="block bg-freight-orange text-white px-4 py-3 rounded-xl text-center font-bold text-lg shadow-md">Start Free Trial</a>' +
          '</div>' +
        '</div>' +
      '</nav>';
  }

  function initMobileNavDropdowns() {
    var mobileMenu = document.getElementById('mobileMenu');
    if (!mobileMenu) return;

    mobileMenu.querySelectorAll('.mobile-nav-group').forEach(function (group) {
      var toggle = group.querySelector('.mobile-solutions-toggle');
      var panel = group.querySelector('.mobile-solutions-panel');
      if (!toggle || !panel) return;

      toggle.addEventListener('click', function () {
        var shouldOpen = toggle.getAttribute('aria-expanded') !== 'true';
        toggle.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
        panel.hidden = !shouldOpen;
        toggle.classList.toggle('is-open', shouldOpen);
      });
    });
  }

  function initSiteNav() {
    ensureSiteStyles();
    ensurePremiumSiteStyles();
    ensureLucideScript();
    normalizeWebsiteShell();

    var existingNav = document.querySelector('body > nav');
    if (existingNav) {
      existingNav.outerHTML = getSiteNav();
    } else {
      document.body.insertAdjacentHTML('afterbegin', getSiteNav());
    }

    var mobileMenuButton = document.getElementById('mobileMenuBtn');
    var mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenuButton && mobileMenu) {
      mobileMenuButton.addEventListener('click', function () {
        mobileMenu.classList.toggle('hidden');
      });
    }

    initMobileNavDropdowns();

    if (window.lucide) window.lucide.createIcons();
  }

  function initDropdownKeyboard() {
    var dropdowns = Array.prototype.slice.call(document.querySelectorAll('.nav-dropdown'));
    if (!dropdowns.length) return;

    function closeAll(except) {
      dropdowns.forEach(function (dropdown) {
        if (dropdown === except) return;
        dropdown.classList.remove('is-open');
        dropdown.querySelector('.nav-dropdown__trigger')?.setAttribute('aria-expanded', 'false');
      });
    }

    dropdowns.forEach(function (dropdown) {
      var trigger = dropdown.querySelector('.nav-dropdown__trigger');
      if (!trigger) return;

      trigger.setAttribute('aria-haspopup', 'true');
      trigger.setAttribute('aria-expanded', 'false');

      trigger.addEventListener('click', function (event) {
        event.preventDefault();
        var shouldOpen = !dropdown.classList.contains('is-open');
        closeAll(dropdown);
        dropdown.classList.toggle('is-open', shouldOpen);
        trigger.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
      });

      trigger.addEventListener('keydown', function (event) {
        if (event.key !== 'ArrowDown') return;
        var firstLink = trigger.parentElement?.querySelector('.nav-dropdown__menu a');
        if (!firstLink) return;
        event.preventDefault();
        closeAll(dropdown);
        dropdown.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
        firstLink.focus();
      });
    });

    document.addEventListener('click', function (event) {
      if (event.target.closest('.nav-dropdown')) return;
      closeAll();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape') return;
      closeAll();
    });

    document.querySelectorAll('.nav-dropdown__link').forEach(function (link) {
      link.addEventListener('click', function () {
        closeAll();
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initSiteNav();
      initStoryReveals();
      initDropdownKeyboard();
    });
  } else {
    initSiteNav();
    initStoryReveals();
    initDropdownKeyboard();
  }
})();
