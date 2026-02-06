/* FlowIQ marketing site - Feature interest select (custom dropdown) */
(function () {
  'use strict';

  const features = [
    'ImportIQ (landed cost & shipments)',
    'InventoryIQ (stock & valuation)',
    'PurchaseIQ (purchasing & receiving)',
    'InvoiceIQ (invoicing & margins)',
    'ForecastIQ (demand planning)',
    'CompaniesIQ (customers & suppliers)',
    'ManufacturingIQ (BOMs & production)',
    'Other / Not sure yet',
  ];

  function setupFeatureSelect(root) {
    const form = root.closest('form');
    const hiddenInput = form?.querySelector('#feature_interest[name="feature_interest"]');
    const button = root.querySelector('#featureButton');
    const buttonLabel = root.querySelector('#featureButtonLabel');
    const chevron = root.querySelector('#featureChevron');
    const menu = root.querySelector('#featureMenu');
    const list = root.querySelector('#featureList');
    const error = root.querySelector('#featureError');

    if (!form || !hiddenInput || !button || !buttonLabel || !menu || !list || !error) return;

    function setButtonText(value) {
      if (!value) {
        buttonLabel.textContent = 'Select a feature';
        buttonLabel.classList.remove('text-slate-900');
        buttonLabel.classList.add('text-slate-400');
        return;
      }
      buttonLabel.textContent = value;
      buttonLabel.classList.remove('text-slate-400');
      buttonLabel.classList.add('text-slate-900');
    }

    function openMenu() {
      menu.classList.remove('hidden');
      button.setAttribute('aria-expanded', 'true');
      chevron?.classList.add('rotate-180');
    }

    function closeMenu() {
      menu.classList.add('hidden');
      button.setAttribute('aria-expanded', 'false');
      chevron?.classList.remove('rotate-180');
    }

    function isOpen() {
      return !menu.classList.contains('hidden');
    }

    function selectFeature(value) {
      hiddenInput.value = value;
      setButtonText(value);
      error.classList.add('hidden');
      closeMenu();
    }

    function renderList() {
      const selected = hiddenInput.value || '';
      list.innerHTML = '';

      for (const value of features) {
        const li = document.createElement('li');
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.setAttribute('role', 'option');
        btn.setAttribute('aria-selected', value === selected ? 'true' : 'false');

        btn.className =
          'w-full text-left px-4 py-2 text-sm text-slate-900 hover:bg-slate-50 focus:bg-slate-50 focus:outline-none';
        if (value === selected) {
          btn.className =
            'w-full text-left px-4 py-2 text-sm text-orange-700 bg-orange-50 hover:bg-orange-50 focus:bg-orange-50 focus:outline-none';
        }

        btn.textContent = value;
        btn.addEventListener('click', () => selectFeature(value));
        li.appendChild(btn);
        list.appendChild(li);
      }
    }

    button.addEventListener('click', () => {
      if (isOpen()) closeMenu();
      else openMenu();
    });

    document.addEventListener('click', (e) => {
      if (!isOpen()) return;
      if (root.contains(e.target)) return;
      closeMenu();
    });

    root.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen()) {
        e.preventDefault();
        closeMenu();
        button.focus();
      }
    });

    form.addEventListener('submit', (e) => {
      if (hiddenInput.value) return;
      e.preventDefault();
      error.classList.remove('hidden');
      openMenu();
    });

    setButtonText(hiddenInput.value);
    renderList();
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-feature-select]').forEach(setupFeatureSelect);
  });
})();

