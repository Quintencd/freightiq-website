/**
 * New organization signup notification (marketing website).
 *
 * When a new user/org signs up via www.flowiq.info/signup, send an email to
 * support@flowiq.info with all submitted details.
 *
 * Required Netlify env vars (set in website Netlify dashboard):
 * - SUPPORT_EMAIL_TO   (e.g. support@flowiq.info)
 * - RESEND_API_KEY     (Resend API key)
 */

function isAllowedOrigin(referer = '') {
  return (
    referer.includes('://www.flowiq.info') ||
    referer.includes('://flowiq.info') ||
    referer.includes('://flowiq-website.netlify.app') ||
    referer.includes('://deploy-preview-') ||
    referer.includes('://localhost')
  );
}

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

function buildEmailText(payload) {
  const lines = [];
  lines.push('FlowIQ – New organization signup (website)');
  lines.push('');
  lines.push('Contact');
  lines.push('--------');
  lines.push(`Email:       ${payload.email || '(not provided)'}`);
  lines.push(`Full name:   ${payload.full_name || '(not provided)'}`);
  lines.push(`First name:  ${payload.first_name || '(not provided)'}`);
  lines.push(`Last name:   ${payload.last_name || '(not provided)'}`);
  if (payload.phone) lines.push(`Phone:       ${payload.phone}`);
  lines.push('');
  lines.push('Organization');
  lines.push('-------------');
  lines.push(`Company:     ${payload.org_name || payload.company_name || '(not provided)'}`);
  if (payload.industry) lines.push(`Industry:    ${payload.industry}`);
  if (payload.employees) lines.push(`Company size: ${payload.employees}`);
  if (payload.country) lines.push(`Country:     ${payload.country}`);
  if (payload.selected_plan) lines.push(`Plan:        ${payload.selected_plan}`);
  lines.push(`Signup source: ${payload.signup_source || 'website_signup'}`);
  lines.push('');
  lines.push('Legal');
  lines.push('-----');
  lines.push(`Terms accepted: ${payload.terms_accepted !== false ? 'Yes' : 'No'} (version: ${payload.terms_version || 'n/a'})`);
  lines.push(`Terms accepted at: ${payload.terms_accepted_at || 'n/a'}`);
  lines.push(`Privacy accepted: ${payload.privacy_accepted !== false ? 'Yes' : 'No'} (version: ${payload.privacy_version || 'n/a'})`);
  lines.push(`Privacy accepted at: ${payload.privacy_accepted_at || 'n/a'}`);
  lines.push('');
  lines.push('---');
  lines.push('Sent from FlowIQ website signup (Netlify function signup-notify)');
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

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json; charset=utf-8',
  };

  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const referer = event.headers.referer || event.headers.Referer || '';
    if (!isAllowedOrigin(referer)) {
      return { statusCode: 403, headers, body: JSON.stringify({ error: 'Forbidden' }) };
    }

    const body = typeof event.body === 'string' ? JSON.parse(event.body || '{}') : event.body || {};
    const email = (body.email || '').toString().trim();

    if (!email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required field: email' }),
      };
    }

    const to = requiredEnv('SUPPORT_EMAIL_TO');
    const resendKey = requiredEnv('RESEND_API_KEY');
    const from = 'onboarding@resend.dev';

    const subject = 'FlowIQ – New organization signup (website)';
    const fullName = [body.first_name, body.last_name].filter(Boolean).join(' ').trim() || body.full_name;
    const text = buildEmailText({
      email,
      full_name: fullName || (body.full_name || '').toString().trim(),
      first_name: (body.first_name || '').toString().trim(),
      last_name: (body.last_name || '').toString().trim(),
      phone: (body.phone || '').toString().trim(),
      org_name: (body.org_name || body.company_name || '').toString().trim(),
      company_name: (body.company_name || body.org_name || '').toString().trim(),
      industry: (body.industry || '').toString().trim(),
      employees: (body.employees || '').toString().trim(),
      country: (body.country || '').toString().trim(),
      selected_plan: (body.selected_plan || '').toString().trim(),
      signup_source: (body.signup_source || 'website_signup').toString().trim(),
      terms_accepted: body.terms_accepted,
      terms_version: (body.terms_version || '').toString().trim(),
      terms_accepted_at: (body.terms_accepted_at || '').toString().trim(),
      privacy_accepted: body.privacy_accepted,
      privacy_version: (body.privacy_version || '').toString().trim(),
      privacy_accepted_at: (body.privacy_accepted_at || '').toString().trim(),
    });

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
      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({ error: `Email send failed (${resendRes.status}): ${errText}` }),
      };
    }

    return { statusCode: 200, headers, body: JSON.stringify({ status: 'ok' }) };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err?.message || 'Unknown error' }),
    };
  }
};
