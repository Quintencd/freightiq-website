import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { execFileSync } from 'node:child_process';
const read = path => fs.readFileSync(new URL('../' + path, import.meta.url), 'utf8');

test('public ERP route is no longer ignored and keeps canonical and rewrite', () => {
  const root = new URL('../', import.meta.url);
  assert.match(read('.gitignore'), /!\/erp-for-multi-branch-businesses\.html/);
  assert.match(read('erp-for-multi-branch-businesses.html'), /rel="canonical" href="https:\/\/www.flowiq.info\/erp-for-multi-branch-businesses"/);
  assert.match(read('netlify.toml'), /from = "\/erp-for-multi-branch-businesses"\s+to = "\/erp-for-multi-branch-businesses.html"/);
  const ignored = execFileSync('git', ['ls-files', '--others', '--ignored', '--exclude-standard', '--', 'erp-for-multi-branch-businesses.html'], { cwd: root, encoding: 'utf8' });
  assert.equal(ignored, '');
});

test('Business Units page and its module image are not ignored', () => {
  const root = new URL('../', import.meta.url);
  assert.match(read('.gitignore'), /!\/modules\/business-units\.html/);
  assert.match(read('.gitignore'), /!\/assets\/img\/generated\/business-command-story\.webp/);
  assert.match(read('modules/business-units.html'), /business-command-story\.webp/);
  const ignored = execFileSync('git', ['ls-files', '--others', '--ignored', '--exclude-standard', '--', 'modules/business-units.html', 'assets/img/generated/business-command-story.webp'], { cwd: root, encoding: 'utf8' });
  assert.equal(ignored, '');
});

test('calculator clearly separates free estimate from app workflow; formula remains unchanged', () => {
  const html = read('tools/landed-cost-calculator.html');
  assert.match(html, /standalone planning tool/);
  assert.match(html, /does not allocate mixed SKUs, convert currencies or update inventory/);
  assert.doesNotMatch(html, /5–15%|calculator feeds directly|This calculator is not a standalone/);
  assert.match(html, /var total = productCost \+ freight \+ duty;/);
  assert.match(html, /var perUnit = total \/ units;/);
  assert.match(html, /data-calculator-id="landed-cost"/);
});

test('signup completion emits once with and without growth bridge', () => {
  const html = read('signup/index.html');
  const block = html.slice(html.indexOf('                const signupCompletion ='), html.indexOf("                messageDiv.className = 'p-4 rounded-lg bg-green"));
  for (const bridge of [true, false]) {
    const events = [];
    const window = { FlowIQWebsiteAnalytics: { track: (...args) => events.push(args) } };
    if (bridge) window.FlowIQGrowthAnalytics = { trackAccountCreated: payload => window.FlowIQWebsiteAnalytics.track('web_signup_complete', payload) };
    vm.runInNewContext(block, { window, accountTypeValue: 'organization', signupReferralSource: 'search', shopifyInstallClaim: null });
    assert.equal(events.length, 1);
    assert.equal(events[0][0], 'web_signup_complete');
  }
});

test('required fields and Turnstile remain enforced; validation receives structured telemetry', () => {
  const html = read('signup/index.html');
  assert.match(html, /if \(!turnstileToken\)/);
  assert.match(html, /validationErrors.push\('security verification'\)/);
  assert.match(html, /validationError.code = 'required_fields_missing'/);
  assert.match(html, /validation_fields: Array.isArray/);
  assert.match(html, /assets\/signup-error-telemetry\.js/);
  assert.match(html, /isRepeatedRequiredFieldError/);
  assert.match(html, /signupFailureStage = 'signup_request';\s+const response = await fetch/);
});

test('identical incomplete signup attempts emit one validation event per browser session', () => {
  const storage = new Map();
  const context = {
    sessionStorage: {
      getItem: key => storage.get(key) || null,
      setItem: (key, value) => storage.set(key, value),
    },
  };
  vm.runInNewContext(read('assets/signup-error-telemetry.js'), context);
  const { shouldTrackRequiredFields } = context.FlowIQSignupErrorTelemetry;
  assert.equal(shouldTrackRequiredFields(['industry', 'country']), true);
  assert.equal(shouldTrackRequiredFields(['country', 'industry']), false);
  assert.equal(shouldTrackRequiredFields(['industry', 'employees']), true);
});
