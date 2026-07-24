(function () {
  'use strict';

  var search = document.getElementById('moduleSearch');
  var cards = Array.prototype.slice.call(document.querySelectorAll('[data-module-card]'));
  var sections = Array.prototype.slice.call(document.querySelectorAll('[data-category-section]'));
  var filters = Array.prototype.slice.call(document.querySelectorAll('[data-module-filter]'));
  var results = document.getElementById('moduleResults');
  var empty = document.getElementById('moduleEmpty');
  var clearButton = document.querySelector('[data-clear-module-search]');
  if (!search || !cards.length) return;

  var activeCategory = 'all';

  function normalized(value) {
    return String(value || '').trim().toLowerCase();
  }

  function applyFilter() {
    var query = normalized(search.value);
    var visibleCount = 0;

    cards.forEach(function (card) {
      var categoryMatch = activeCategory === 'all' || card.dataset.category === activeCategory;
      var searchMatch = !query || normalized(card.dataset.search).indexOf(query) >= 0;
      var visible = categoryMatch && searchMatch;
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    sections.forEach(function (section) {
      var visibleCards = section.querySelectorAll('[data-module-card]:not([hidden])').length;
      section.hidden = visibleCards === 0;
    });

    filters.forEach(function (button) {
      button.setAttribute('aria-pressed', button.dataset.moduleFilter === activeCategory ? 'true' : 'false');
    });

    if (results) {
      results.textContent = visibleCount + (visibleCount === 1 ? ' capability' : ' capabilities');
    }
    if (empty) empty.hidden = visibleCount !== 0;

    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'module_catalog_filter',
        module_category: activeCategory,
        module_search_query: query || null,
        module_result_count: visibleCount,
        page_path: window.location.pathname,
      });
    } catch (_) {}
  }

  var debounceTimer;
  search.addEventListener('input', function () {
    window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(applyFilter, 120);
  });

  filters.forEach(function (button) {
    button.addEventListener('click', function () {
      activeCategory = button.dataset.moduleFilter || 'all';
      applyFilter();
    });
  });

  if (clearButton) {
    clearButton.addEventListener('click', function () {
      activeCategory = 'all';
      search.value = '';
      applyFilter();
      search.focus();
    });
  }
})();
