/**
 * New organization signup notification (marketing site).
 * Called by flowiq_website/signup/index.html after successful public-signup.
 *
 * Sends an email to support with signup details. If SUPPORT_EMAIL_TO or
 * RESEND_API_KEY are not set, returns 200 and skips sending (no 502/500).
 *
 * Netlify env vars (optional):
 * - SUPPORT_EMAIL_TO   (e.g. support@flowiq.info)
 * - RESEND_API_KEY     (Resend API key)
 */

function isAllowedOrigin(referer = '') {
  return (
    referer.includes('://app.flowiq.info') ||
    referer.includes('://www.flowiq.info') ||
    referer.includes('://flowiq.info') ||
    referer.includes('://freightiq.netlify.app') ||
    referer.includes('://deploy-preview-') ||
    referer.includes('://localhost')
  );
}

function buildEmailText(payload) {
  const lines = [];
  lines.push('FlowIQ – New organization signup');
  lines.push('');
  lines.push('Contact');
  lines.push('--------');
  lines.push(`Email:       ${payload.email || '(not provided)'}`);
  lines.push(`Full name:   ${payload.full_name || '(not provided)'}`);
  lines.push(`First name:  ${payload.first_name || '(not provided)'}`);
  lines.push(`Last name:   ${payload.last_name || '(not provided)'}`);
  lines.push('');
  lines.push('Organization');
  lines.push('-------------');
  lines.push(`Company:     ${payload.org_name || payload.company_name || '(not provided)'}`);
  lines.push(`Signup source: ${payload.signup_source || 'public_signup'}`);
  lines.push('');
  lines.push('Legal');
  lines.push('-----');
  lines.push(`Terms accepted: ${payload.terms_accepted !== false ? 'Yes' : 'No'} (version: ${payload.terms_version || 'n/a'})`);
  lines.push(`Terms accepted at: ${payload.terms_accepted_at || 'n/a'}`);
  lines.push(`Privacy accepted: ${payload.privacy_accepted !== false ? 'Yes' : 'No'} (version: ${payload.privacy_version || 'n/a'})`);
  lines.push(`Privacy accepted at: ${payload.privacy_accepted_at || 'n/a'}`);
  lines.push('');
  lines.push('---');
  lines.push('Sent from FlowIQ signup (Netlify function signup-notify)');
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
    const orgName = (body.org_name || body.company_name || '').toString().trim();

    if (!email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required field: email' }),
      };
    }

    const to = process.env.SUPPORT_EMAIL_TO;
    const resendKey = process.env.RESEND_API_KEY;

    // If not configured, return 200 so signup flow never sees 502
    if (!to || !resendKey) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ status: 'ok', skipped: 'SUPPORT_EMAIL_TO or RESEND_API_KEY not set' }),
      };
    }

    const from = 'onboarding@resend.dev';
    const subject = 'FlowIQ – New organization signup';
    const text = buildEmailText({
      email,
      full_name: (body.full_name || '').toString().trim(),
      first_name: (body.first_name || '').toString().trim(),
      last_name: (body.last_name || '').toString().trim(),
      org_name: orgName,
      company_name: orgName,
      signup_source: (body.signup_source || 'public_signup').toString().trim(),
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
