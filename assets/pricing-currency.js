(function () {
  if (window.location.pathname.indexOf('/pricing') === -1) return;

  var currencyState = {
    selected: 'ZAR',
    rates: { ZAR: 1, USD: 0.055, EUR: 0.051 },
    detectedCountry: 'ZA'
  };

  var basePrices = {
    monthly: { starter: 490, growth: 5990, professional: 10900, scale: 19900 },
    annual: { starter: 5292, growth: 64692, professional: 117720, scale: 214920 }
  };

  var symbols = { ZAR: 'R', USD: '$', EUR: 'EUR ' };

  function formatPrice(amount, currency) {
    if (!Number.isFinite(amount)) return '-';
    if (currency === 'ZAR') return Number(amount).toLocaleString('en-ZA', { maximumFractionDigits: 0 });
    if (currency === 'USD') return Number(amount).toLocaleString('en-US', { maximumFractionDigits: 0 });
    return Number(amount).toLocaleString('en-IE', { maximumFractionDigits: 0 });
  }

  function getBillingInterval() {
    return document.getElementById('billingAnnual') && document.getElementById('billingAnnual').classList.contains('bg-orange-500') ? 'annual' : 'monthly';
  }

  function convertAmount(zarAmount, currency) {
    if (currency === 'ZAR') return zarAmount;
    return zarAmount * (currencyState.rates[currency] || 1);
  }

  function applyCurrency() {
    var interval = getBillingInterval();

    ['starter', 'growth', 'professional', 'scale'].forEach(function (plan) {
      var numEl = document.querySelector('.price-' + plan);
      var row = numEl && numEl.closest('div.flex.items-baseline');
      var symEl = row ? row.querySelector('span.text-slate-500.text-xs') : null;
      var labelEl = document.querySelector('.price-label-' + plan);
      if (!numEl) return;

      var converted = convertAmount(basePrices[interval][plan], currencyState.selected);
      numEl.textContent = formatPrice(converted, currencyState.selected);
      if (symEl) symEl.textContent = symbols[currencyState.selected] || '';

      if (labelEl) {
        if (interval === 'monthly') {
          labelEl.textContent = 'per month';
        } else {
          labelEl.textContent = 'per year';
        }
      }
    });

    var badge = document.getElementById('currencyDetected');
    if (badge) {
      badge.textContent = 'Auto-detected: ' + currencyState.detectedCountry;
    }
  }

  function installSelector() {
    var mount = document.querySelector('main .flex.justify-center.mb-6');
    if (!mount || document.getElementById('currencySelector')) return;

    var wrapper = document.createElement('div');
    wrapper.className = 'flex justify-center mb-8';
    wrapper.innerHTML = [
      '<div class="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2">',
      '<span class="text-xs font-bold text-slate-600 uppercase tracking-wide">Currency</span>',
      '<select id="currencySelector" class="text-sm font-semibold bg-white text-slate-900 border border-slate-200 rounded-md px-2 py-1">',
      '<option value="USD">USD</option>',
      '<option value="ZAR">ZAR</option>',
      '<option value="EUR">EUR</option>',
      '</select>',
      '<span id="currencyDetected" class="text-xs text-slate-500"></span>',
      '</div>'
    ].join('');

    mount.insertAdjacentElement('afterend', wrapper);
    var selector = document.getElementById('currencySelector');
    if (!selector) return;

    selector.value = currencyState.selected;
    selector.addEventListener('change', function () {
      currencyState.selected = selector.value;
      applyCurrency();
      if (window.FlowIQGrowthAnalytics) {
        window.FlowIQGrowthAnalytics.trackEvent('pricing_page_view', {
          selected_currency: currencyState.selected,
          billing_interval: getBillingInterval()
        });
      }
    });
  }

  function detectCountryAndRates() {
    fetch('https://ipapi.co/json/')
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data && data.country) {
          currencyState.detectedCountry = data.country;
          currencyState.selected = data.country === 'ZA' ? 'ZAR' : 'USD';
          var selector = document.getElementById('currencySelector');
          if (selector) selector.value = currencyState.selected;
          applyCurrency();
        }
      })
      .catch(function () {});

    fetch('https://api.frankfurter.app/latest?from=ZAR&to=USD,EUR')
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data && data.rates) {
          if (typeof data.rates.USD === 'number') currencyState.rates.USD = data.rates.USD;
          if (typeof data.rates.EUR === 'number') currencyState.rates.EUR = data.rates.EUR;
          applyCurrency();
        }
      })
      .catch(function () {});
  }

  document.addEventListener('DOMContentLoaded', function () {
    installSelector();
    applyCurrency();
    detectCountryAndRates();

    document.getElementById('billingMonthly')?.addEventListener('click', function () {
      setTimeout(applyCurrency, 0);
    });
    document.getElementById('billingAnnual')?.addEventListener('click', function () {
      setTimeout(applyCurrency, 0);
    });
  });
})();
