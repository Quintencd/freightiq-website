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

  function ensureSiteStyles() {
    if (!document.getElementById('flowiq-nav-critical-css')) {
      var style = document.createElement('style');
      style.id = 'flowiq-nav-critical-css';
      style.textContent = '.nav-dropdown{position:relative}.nav-dropdown__menu{position:absolute;top:100%;left:50%;z-index:10000;transform:translateX(-50%) translateY(.5rem);opacity:0;visibility:hidden;pointer-events:none}.nav-dropdown:hover .nav-dropdown__menu,.nav-dropdown:focus-within .nav-dropdown__menu,.nav-dropdown.is-open .nav-dropdown__menu{opacity:1;visibility:visible;pointer-events:auto;transform:translateX(-50%) translateY(0)}';
      document.head.appendChild(style);
    }

    var hasStyles = Array.prototype.some.call(document.querySelectorAll('link[rel="stylesheet"]'), function (link) {
      return /\/flowiq-light\.css(?:\?|$)/.test(link.getAttribute('href') || '');
    });

    if (hasStyles) return;

    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/flowiq-light.css?v=12';
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
            '<div class="hidden md:flex items-center space-x-8 flex-shrink-0">' +
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
                    '</div>' +
                  '</div>' +
                '</div>' +
              '</div>' +
              '<a href="/modules" class="text-slate-600 hover:text-orange-600 font-medium transition-colors text-sm uppercase tracking-wide">Modules</a>' +
              '<a href="/pricing" class="text-slate-600 hover:text-orange-600 font-medium transition-colors text-sm uppercase tracking-wide">Pricing</a>' +
              '<a href="/signup" class="bg-freight-orange hover:bg-freight-orange-dark text-white px-6 py-2.5 rounded-full font-semibold shadow-lg shadow-orange-500/20 transition-all hover:shadow-orange-500/40 hover:-translate-y-0.5">Start Free Trial</a>' +
            '</div>' +
            '<button id="mobileMenuBtn" class="md:hidden flex-shrink-0 p-3 -mr-1 text-slate-600 hover:text-slate-900 touch-manipulation" aria-label="Open menu"><i data-lucide="menu" class="w-6 h-6"></i></button>' +
          '</div>' +
        '</div>' +
        '<div id="mobileMenu" class="md:hidden hidden border-t border-slate-200 bg-white/95 backdrop-blur-md absolute w-full left-0 top-20 shadow-xl">' +
          '<div class="px-6 py-6 space-y-4">' +
            '<a href="/" class="block text-slate-600 hover:text-orange-600 font-medium text-lg">Home</a>' +
            '<div class="mobile-solutions-group">' +
              '<button type="button" class="mobile-solutions-toggle" aria-expanded="false" aria-controls="mobileSolutionsPanel">Solutions <i data-lucide="chevron-down" class="w-5 h-5"></i></button>' +
              '<div id="mobileSolutionsPanel" class="mobile-solutions-panel" hidden>' +
                '<a href="/solutions/importers.html"><i data-lucide="ship" class="w-4 h-4"></i><span><strong>Importers</strong><small>Landed cost, shipments, and margin</small></span></a>' +
                '<a href="/solutions/retail-outlets.html"><i data-lucide="shopping-bag" class="w-4 h-4"></i><span><strong>Retail</strong><small>Stock, sales, and ecommerce</small></span></a>' +
                '<a href="/solutions/multi-branch.html"><i data-lucide="network" class="w-4 h-4"></i><span><strong>Multi-branch</strong><small>Locations, inventory, and visibility</small></span></a>' +
                '<a href="/solutions/manufacturers.html"><i data-lucide="factory" class="w-4 h-4"></i><span><strong>Manufacturing</strong><small>Production, costing, and stock flow</small></span></a>' +
              '</div>' +
            '</div>' +
            '<a href="/modules" class="block text-slate-600 hover:text-orange-600 font-medium text-lg">Modules</a>' +
            '<a href="/pricing" class="block text-slate-600 hover:text-orange-600 font-medium text-lg">Pricing</a>' +
            '<a href="/signup" class="block bg-freight-orange text-white px-4 py-3 rounded-xl text-center font-bold text-lg shadow-md">Start Free Trial</a>' +
          '</div>' +
        '</div>' +
      '</nav>';
  }

  function initMobileSolutionsDropdown() {
    var mobileMenu = document.getElementById('mobileMenu');
    if (!mobileMenu) return;

    var toggle = mobileMenu.querySelector('.mobile-solutions-toggle');
    var panel = mobileMenu.querySelector('.mobile-solutions-panel');
    if (!toggle || !panel) return;

    toggle.addEventListener('click', function () {
      var shouldOpen = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
      panel.hidden = !shouldOpen;
      toggle.classList.toggle('is-open', shouldOpen);
    });
  }

  function initSiteNav() {
    ensureSiteStyles();

    var existingNav = document.querySelector('body > nav');
    if (!existingNav) return;
    existingNav.outerHTML = getSiteNav();

    var mobileMenuButton = document.getElementById('mobileMenuBtn');
    var mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenuButton && mobileMenu) {
      mobileMenuButton.addEventListener('click', function () {
        mobileMenu.classList.toggle('hidden');
      });
    }

    initMobileSolutionsDropdown();

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
