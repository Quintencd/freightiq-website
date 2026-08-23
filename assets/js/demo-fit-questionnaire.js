/* FlowIQ marketing site - demo-fit questionnaire controls */
(function () {
  'use strict';

  const form = document.getElementById('demo-fit-form');
  if (!form) return;

  const moduleError = document.getElementById('moduleInterestError');
  const featureInterest = document.getElementById('feature_interest');
  const leadRoute = document.getElementById('lead_route');
  const leadSource = document.getElementById('lead_source');
  const planInterest = document.getElementById('plan_interest');
  const moduleInputs = Array.from(form.querySelectorAll('[data-module-interest]'));

  const moduleReferralMap = {
    importiq: 'ImportIQ',
    inventoryiq: 'InventoryIQ',
    purchaseiq: 'PurchaseIQ',
    salesiq: 'SalesIQ and InvoiceIQ',
    invoiceiq: 'SalesIQ and InvoiceIQ',
    forecastiq: 'ForecastIQ',
    accountingiq: 'AccountingIQ and BankingIQ',
    bankingiq: 'AccountingIQ and BankingIQ',
    manufacturing: 'ManufacturingIQ',
    payrolliq: 'PayrollIQ and WorkIQ',
    workiq: 'PayrollIQ and WorkIQ',
    reportsiq: 'ReportsIQ and automation',
  };

  function selectedModules() {
    return moduleInputs.filter((input) => input.checked).map((input) => input.value);
  }

  function syncModules() {
    const values = selectedModules();
    featureInterest.value = values.join(', ');
    moduleError?.classList.toggle('hidden', values.length > 0);
    return values;
  }

  function selectedValue(name) {
    return form.querySelector(`input[name="${name}"]:checked`)?.value || '';
  }

  function classifyForSubmission(modules) {
    const teamSize = selectedValue('team_size');
    const timeline = selectedValue('timeline');
    const buyingRole = selectedValue('buying_role');
    const onboardingReadiness = selectedValue('onboarding_readiness');
    const teamScore = ['11-25', '26-50', '51-100', '101+'].includes(teamSize) ? 2 : 0;
    const timelineScore = ['Within 30 days', '1-3 months'].includes(timeline) ? 2 : 0;
    const roleScore = buyingRole === 'Decision maker' ? 2 : buyingRole === 'Part of the decision team' ? 1 : 0;
    const readinessScore = onboardingReadiness === 'Ready to assign an owner and prepare our data' ? 2 : onboardingReadiness === 'Interested, but we need to plan resources first' ? 1 : 0;
    const breadthScore = modules.length >= 2 && !modules.includes('Not sure yet') ? 1 : 0;
    const score = teamScore + timelineScore + roleScore + readinessScore + breadthScore;

    if (score >= 6) return 'qualified_demo';
    if (['1-5', '6-10'].includes(teamSize) && (timeline === 'Exploring for later' || onboardingReadiness === 'Prefer to start with self-guided resources')) {
      return 'self_serve';
    }
    return 'nurture_or_incomplete';
  }

  function applyJourneyContext() {
    const params = new URLSearchParams(window.location.search);
    const requestedSource = (params.get('source') || '').trim().slice(0, 80);
    const requestedPlan = (params.get('plan') || '').trim().slice(0, 80);
    let requestedModule = (params.get('module') || '').trim().toLowerCase();

    if (!requestedModule && document.referrer) {
      try {
        const referrer = new URL(document.referrer);
        if (referrer.origin === window.location.origin) {
          const moduleMatch = referrer.pathname.match(/^\/modules\/([^/.]+)/);
          requestedModule = moduleMatch?.[1]?.toLowerCase() || '';
          if (moduleMatch && !requestedSource) leadSource.value = 'module_detail';
        }
      } catch {
        // Keep the generic source when the browser does not provide a valid referrer.
      }
    }

    if (requestedSource) leadSource.value = requestedSource;
    if (requestedPlan) planInterest.value = requestedPlan;

    const moduleValue = moduleReferralMap[requestedModule];
    if (!moduleValue) return;
    const moduleInput = moduleInputs.find((input) => input.value === moduleValue);
    if (moduleInput) moduleInput.checked = true;
  }

  moduleInputs.forEach((input) => input.addEventListener('change', syncModules));

  form.addEventListener('submit', function (event) {
    const modules = syncModules();
    if (modules.length === 0) {
      event.preventDefault();
      moduleError?.classList.remove('hidden');
      moduleInputs[0]?.focus();
      return;
    }

    leadRoute.value = classifyForSubmission(modules);
  });

  applyJourneyContext();
  syncModules();
})();
