/**
 * Public lead capture for FlowIQ marketing website (unauthenticated).
 *
 * This function MUST live under `freightiq-website/netlify/functions/` because
 * the marketing site uses `freightiq-website/` as its Netlify base/publish directory.
 * If this file only exists at repo root (`/netlify/functions`), the marketing site will
 * return 404 at `/.netlify/functions/public-lead`.
 *
 * Behavior:
 * - Accepts `application/x-www-form-urlencoded` form POSTs from the website.
 * - Sends an email to SUPPORT_EMAIL_TO via Resend.
 * - Best-effort submits to Netlify Forms for dashboard visibility.
 * - Redirects user to `/thank-you.html` on success.
 *
 * Required Netlify env vars (set in the *marketing site* on Netlify):
 * - SUPPORT_EMAIL_TO
 * - RESEND_API_KEY
 * - RESEND_FROM
 */

function isAllowedRequest({ origin = '', referer = '', host = '' }) {
  // Primary allowlist (production + netlify deploy URLs)
  const allowedHost =
    host === 'www.flowiq.info' ||
    host === 'flowiq.info' ||
    host.endsWith('.netlify.app') ||
    host.startsWith('deploy-preview-');

  const allowedRef =
    origin.includes('://www.flowiq.info') ||
    origin.includes('://flowiq.info') ||
    origin.includes('://flowiq-website.netlify.app') ||
    origin.includes('://deploy-preview-') ||
    origin.includes('://localhost') ||
    referer.includes('://www.flowiq.info') ||
    referer.includes('://flowiq.info') ||
    referer.includes('://flowiq-website.netlify.app') ||
    referer.includes('://deploy-preview-') ||
    referer.includes('://localhost');

  // Some browsers/extensions strip referer/origin; host check keeps this robust.
  return allowedHost || allowedRef;
}

function parseFormBody(event) {
  const contentType = (event.headers['content-type'] || event.headers['Content-Type'] || '').toLowerCase();

  if (contentType.includes('application/json')) {
    return JSON.parse(event.body || '{}');
  }

  // Default for HTML forms: urlencoded
  const params = new URLSearchParams(event.body || '');
  return Object.fromEntries(params.entries());
}

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

function buildEmailText({ request_type, name, email, phone, company, message, first_name, last_name }) {
  const lines = [];
  lines.push(`Type: ${request_type || 'contact'}`);
  if (name) lines.push(`Name: ${name}`);
  if (first_name || last_name) lines.push(`Name: ${(first_name || '').trim()} ${(last_name || '').trim()}`.trim());
  if (email) lines.push(`Email: ${email}`);
  if (phone) lines.push(`Phone: ${phone}`);
  if (company) lines.push(`Company: ${company}`);
  lines.push('');
  lines.push('Message:');
  lines.push(message || '(no message provided)');
  lines.push('');
  lines.push('---');
  lines.push('Sent from FlowIQ marketing website');
  return lines.join('\n');
}

async function sendViaResend({ apiKey, to, from, replyTo, subject, text }) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text,
      reply_to: replyTo || undefined,
    }),
  });
  return res;
}

async function submitToNetlifyForms({ netlifySiteUrl, formName, fields }) {
  // Best-effort storage in Netlify Forms. Non-fatal if it fails.
  const formData = new URLSearchParams({ 'form-name': formName, ...fields });
  const res = await fetch(`${netlifySiteUrl}/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formData.toString(),
  });
  return res.ok;
}

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'text/plain; charset=utf-8',
  };

  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: 'Method Not Allowed' };

  try {
    const origin = event.headers.origin || event.headers.Origin || '';
    const referer = event.headers.referer || event.headers.Referer || '';
    const host = event.headers.host || event.headers.Host || '';

    if (!isAllowedRequest({ origin, referer, host })) {
      return { statusCode: 403, headers, body: 'Forbidden' };
    }

    const body = parseFormBody(event);

    // Honeypot (spam): if filled, pretend success but do nothing.
    if (body['bot-field']) {
      return {
        statusCode: 303,
        headers: { ...headers, Location: '/thank-you.html' },
        body: '',
      };
    }

    const request_type = (body.request_type || body['request-type'] || body['form-name'] || 'demo').toString().trim();
    const name = (body.name || '').toString().trim();
    const email = (body.email || '').toString().trim();
    const phone = (body.phone || '').toString().trim();
    const company = (body.company || '').toString().trim();
    const message = (body.message || '').toString().trim();
    const first_name = (body.first_name || '').toString().trim();
    const last_name = (body.last_name || '').toString().trim();

    if (!email) return { statusCode: 400, headers, body: 'Missing required field: email' };
    if (request_type === 'demo' && (!first_name || !last_name)) {
      return { statusCode: 400, headers, body: 'Missing required fields: first_name, last_name' };
    }
    if (request_type === 'contact' && (!name || !message)) {
      return { statusCode: 400, headers, body: 'Missing required fields: name, message' };
    }
    if (request_type === 'deck' && !name) {
      return { statusCode: 400, headers, body: 'Missing required field: name' };
    }

    const to = requiredEnv('SUPPORT_EMAIL_TO');
    const resendKey = requiredEnv('RESEND_API_KEY');
    const from = requiredEnv('RESEND_FROM');

    const subject =
      request_type === 'deck'
        ? 'FlowIQ – Deck request'
        : request_type === 'contact'
          ? 'FlowIQ – Contact request'
          : 'FlowIQ – Demo request';

    const text = buildEmailText({ request_type, name, email, phone, company, message, first_name, last_name });

    const resendRes = await sendViaResend({
      apiKey: resendKey,
      to,
      from,
      replyTo: email,
      subject,
      text,
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text().catch(() => '');
      return { statusCode: 502, headers, body: `Email send failed (${resendRes.status}): ${errText}` };
    }

    // Store in Netlify Forms too (best-effort)
    const netlifySiteUrl = process.env.URL || process.env.DEPLOY_PRIME_URL || 'https://www.flowiq.info';
    const formName = request_type === 'deck' ? 'deck' : request_type === 'contact' ? 'contact' : 'demo';
    try {
      await submitToNetlifyForms({
        netlifySiteUrl,
        formName,
        fields: {
          name: name || `${first_name} ${last_name}`.trim(),
          email,
          phone,
          company,
          message,
          request_type,
        },
      });
    } catch {
      // non-fatal
    }

    return {
      statusCode: 303,
      headers: { ...headers, Location: '/thank-you.html' },
      body: '',
    };
  } catch (err) {
    return { statusCode: 500, headers, body: err?.message || 'Unknown error' };
  }
};

